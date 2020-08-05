import {EDAESolver} from "../../edaeSolver";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { EDAESystem } from "../../edaeSystem";
import { DAEVector } from "../../solver";
import { NewtonSolver } from "../../../nonlinear/newton";
import { gauss} from "../../../math/gauss";
import {EDAE_GAUSSLEGENDRE6,EDAE_RADAUIIA3,EDAE_RADAUIIA5} from "../edae/rk";




class EDAE_BDF extends EDAESolver{
    stepSolver:NewtonSolver;
    stages:number;
    prevValues:vector[];
    a:number[];
    b0:number;
    solver: EDAESolver;
    constructor(step:number,stepSolver:NewtonSolver,a:number[],b0:number,solver:EDAESolver,stages:number){
        super(step);
        this.stepSolver = stepSolver;
        this.stages = stages;
        this.a = a;
        this.b0 = b0;
        this.solver = solver;
        this.prevValues = [];
    }
    public setStep(value:number):void{
        super.setStep(value);
        this.prevValues = [];
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        
        this.prevValues.splice(0,0, x.clone());
        if (this.prevValues.length != this.stages)
        {
            //call some method with comparable accuracy
            let result:DAEVector = this.solver.makeStep(x, z, t,system);
            return result;
        }
        //solve f(xn+1,a[0]*xn+1+SUM(a[i]*xn+1-i)/h,t+h)
        let tNew = t + this.step;
        let _dx:vector = vector.empty(system.length_x());
        for (let j = 0; j < this.stages; j++)
        {
            _dx.subSelf(vector.scale(this.prevValues[j], this.a[j]));
        }
        let xNew = x.clone();
        let zNew = system.g(xNew,tNew);
        let F = system.f(xNew,zNew,tNew).scaleSelf(-this.b0*this.step).addSelf(xNew).addSelf(_dx);
        let f0norm = F.norm2();
        for (let i = 0; i < this.stepSolver.getIterations(); i++)
        {
            let J:matrix = matrix.identity(system.length_x());
            J.subSelf(system.dfdx(xNew,zNew,tNew).addSelf(matrix.mult(system.dfdz(xNew,zNew,tNew),system.dgdx(xNew,tNew))).scaleSelf(this.step * this.b0));
            
            let dx = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            xNew.addSelf(dx);
            zNew = system.g(xNew,tNew);
            F = system.f(xNew,zNew,tNew).scaleSelf(-this.b0*this.step).addSelf(xNew).addSelf(_dx);
            if (i>=this.stepSolver.getMinIterations()&&F.norm2() < this.stepSolver.getAbsTol() + this.stepSolver.getRelTol()*f0norm)
            {
                this.prevValues.splice(this.prevValues.length-1,1);
                return new DAEVector(xNew,zNew,tNew);
            }
        }
        throw new Error("Divergence");
    }
}


export class EDAE_BDF2 extends EDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[4/3,-1/3],2/3, new EDAE_RADAUIIA3(step,stepSolver),2);
    }
}
export class EDAE_BDF3 extends EDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[18/11,-9/11,2/11],6/11, new EDAE_RADAUIIA3(step,stepSolver),3);
    }
}
export class EDAE_BDF4 extends EDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[48/25,-36/25,16/25,-3/25],12/25,new EDAE_RADAUIIA5(step,stepSolver),4);
    }
}
export class EDAE_BDF5 extends EDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[300/137,-300/137,200/137,-75/137,12/137],60/137,new EDAE_RADAUIIA5(step,stepSolver),5);
    }
}
export class EDAE_BDF6 extends EDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[360/147,-450/147,400/147,-225/147,72/147,-10/147],60/147,new EDAE_GAUSSLEGENDRE6(step,step,1,stepSolver),6);
    }
}