import {IDAESolver} from "../../idaeSolver";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { IDAESystem } from "../../idaeSystem";
import { DAEVector } from "../../daeVector";
import { NewtonSolver } from "../../../math/newton";
import { gauss} from "../../../math/gauss";
import {IDAE_GAUSSLEGENDRE6,IDAE_RADAUIIA3,IDAE_RADAUIIA5} from "../idae/rk";

class IDAE_ADAMS_MOULTON extends IDAESolver{
    stepSolver:NewtonSolver;
    stages:number;
    prevValues:vector[];
    b:number[];
    solver: IDAESolver;
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver,b:number[],solver:IDAESolver,stages:number)
    {
        super(step,systemSolver);
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
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {
        
        if (this.prevValues.length+1 != this.stages)
        {
            this.prevValues.splice(0,0, this.solve_dx(x,z,t,system));
            //call some method with comparable accuracy
            let result:DAEVector = this.solver.makeStep(x, z, t,system);
            return result;
        }
        let tNew = t + this.step;
        let _dx:vector = vector.empty(system.length_x());
        for (let j = 0; j < this.stages - 1; j++)
        {
            _dx.addSelf(vector.scale(this.prevValues[j], this.b[j+1]/this.b[0]));
        }
        let xNew = x.clone();
        let zNew = z.clone();
        let dx = vector.sub(xNew,x).scaleSelf(1/(this.step*this.b[0])).subSelf(_dx);
        let F:vector = vector.empty(system.length_x()+system.length_z());
        F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
        F.addSubVector(system.g(xNew,zNew,tNew),system.length_x());
        let f0norm = F.norm2();
        for (let i = 0; i < this.stepSolver.getIterations(); i++)
        {
            let J:matrix = matrix.emptySquare(system.length_x()+system.length_z());
            J.addSubMatrix(system.dfdx(xNew,dx,zNew,tNew).addSelf(system.dfddx(xNew,dx,zNew,tNew).scaleSelf(1/(this.step*this.b[0]))),0,0);
            J.addSubMatrix(system.dfdz(xNew,dx,zNew,tNew),0,system.length_x());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),system.length_x(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),system.length_x(),system.length_x());

            let dxz = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            xNew.addSelf(dxz.getSubVector(0,system.length_x()));
            zNew.addSelf(dxz.getSubVector(system.length_x(),system.length_z()));

            dx = vector.sub(xNew,x).scaleSelf(1/(this.step*this.b[0])).subSelf(_dx);

            F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
            F.addSubVector(system.g(xNew,zNew,tNew),system.length_x());
            if (i>=this.stepSolver.getMinIterations()&&F.norm2() < this.stepSolver.getAbsTol() + this.stepSolver.getRelTol()*f0norm)
            {
                this.prevValues.splice(0,0, this.solve_dx(xNew,zNew,tNew,system));
                this.prevValues.splice(this.prevValues.length-1,1);
                return new DAEVector(xNew,zNew,tNew);
            }
        }
        throw new Error("Divergence");
    }
}

export class IDAE_AM2 extends IDAE_ADAMS_MOULTON
{
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver)
    {
        super(step,systemSolver,stepSolver,[1/2,1/2], new IDAE_RADAUIIA3(step,stepSolver),2);
    }
}
export class IDAE_AM3 extends IDAE_ADAMS_MOULTON
{
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver)
    {
        super(step,systemSolver,stepSolver,[5/12,2/3,-1/12], new IDAE_RADAUIIA3(step,stepSolver),3);
    }
}
export class IDAE_AM4 extends IDAE_ADAMS_MOULTON
{
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver)
    {
        super(step,systemSolver,stepSolver,[3/8,19/24,-5/24,1/24], new IDAE_RADAUIIA5(step,stepSolver),4);
    }
}
export class IDAE_AM5 extends IDAE_ADAMS_MOULTON
{
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver)
    {
        super(step,systemSolver,stepSolver,[251/720,323/360,-11/30,53/360,-19/720], new IDAE_RADAUIIA5(step,stepSolver),5);
    }
}
export class IDAE_AM6 extends IDAE_ADAMS_MOULTON
{
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver)
    {
        super(step,systemSolver,stepSolver,[95/288,1427/1440,-133/240,241/720,-173/1440,3/160], new IDAE_GAUSSLEGENDRE6(step,step,1,stepSolver),6);
    }
}