import {EDAESolver} from "../../edaeSolver";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { EDAESystem } from "../../edaeSystem";
import { DAEVector } from "../../solver";
import { NewtonSolver } from "../../../nonlinear/newton";
import { gauss} from "../../../math/gauss";
import {EDAE_GAUSSLEGENDRE6,EDAE_RADAUIIA3,EDAE_RADAUIIA5} from "../edae/rk";

class EDAE_ADAMS_MOULTON extends EDAESolver{
    stepSolver:NewtonSolver;
    stages:number;
    prevValues:vector[];
    b:number[];
    solver: EDAESolver;
    constructor(step:number,stepSolver:NewtonSolver,b:number[],solver:EDAESolver,stages:number)
    {
        super(step);
        this.stepSolver = stepSolver;
        this.solver = solver;
        this.b = b;
        this.stages = stages;
        this.prevValues = [];
    }
    public setStep(value:number):void{
        super.setStep(value);
        this.prevValues = [];
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        
        if (this.prevValues.length+1 != this.stages)
        {
            this.prevValues.splice(0,0, system.f(x,z,t));
            //call some method with comparable accuracy
            let result:DAEVector = this.solver.makeStep(x, z, t,system);
            return result;
        }
        //solve f(xn+1,a[0]*xn+1+SUM(a[i]*xn+1-i)/h,t+h)
        let tNew = t + this.step;
        let _dx:vector = vector.empty(system.length_x());
        for (let j = 0; j < this.stages - 1; j++)
        {
            _dx.subSelf(vector.scale(this.prevValues[j], this.b[j+1]*this.step));
        }
        let xNew = x.clone();
        let zNew = system.g(xNew,tNew);
        let F = system.f(xNew,zNew,tNew).scaleSelf(-this.b[0]*this.step).addSelf(_dx).addSelf(xNew).subSelf(x);
        let f0norm = F.norm2();
        for (let i = 0; i < this.stepSolver.getIterations(); i++)
        {
            let J:matrix = matrix.identity(system.length_x());
            J.subSelf(system.dfdx(xNew,zNew,tNew).addSelf(matrix.mult(system.dfdz(xNew,zNew,tNew),system.dgdx(xNew,tNew))).scaleSelf(this.step*this.b[0]));

            let dx = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            xNew.addSelf(dx);
            F = system.f(xNew,zNew,tNew).scaleSelf(-this.b[0]*this.step).addSelf(_dx).addSelf(xNew).subSelf(x);
            if (i>=this.stepSolver.getMinIterations()&&F.norm2() < this.stepSolver.getAbsTol() + this.stepSolver.getRelTol()*f0norm)
            {
                this.prevValues.splice(0,0, system.f(xNew,zNew,tNew));
                this.prevValues.splice(this.prevValues.length-1,1);
                return new DAEVector(xNew,zNew,tNew);
            }
        }
        throw new Error("Divergence");
    }
}


export class EDAE_AM2 extends EDAE_ADAMS_MOULTON
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[1/2,1/2], new EDAE_RADAUIIA3(step,stepSolver),2);
    }
}
export class EDAE_AM3 extends EDAE_ADAMS_MOULTON
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[5/12,2/3,-1/12], new EDAE_RADAUIIA3(step,stepSolver),3);
    }
}
export class EDAE_AM4 extends EDAE_ADAMS_MOULTON
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[3/8,19/24,-5/24,1/24], new EDAE_RADAUIIA5(step,stepSolver),4);
    }
}
export class EDAE_AM5 extends EDAE_ADAMS_MOULTON
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[251/720,323/360,-11/30,53/360,-19/720], new EDAE_RADAUIIA5(step,stepSolver),5);
    }
}
export class EDAE_AM6 extends EDAE_ADAMS_MOULTON
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[95/288,1427/1440,-133/240,241/720,-173/1440,3/160], new EDAE_GAUSSLEGENDRE6(step,step,1,stepSolver),6);
    }
}