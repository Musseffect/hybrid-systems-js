import {IDAESolver} from "../../idaeSolver";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { IDAESystem } from "../../idaeSystem";
import { DAEVector } from "../../daeVector";
import { NewtonSolver } from "../../../math/newton";
import { gauss} from "../../../math/gauss";
import {IDAE_GAUSSLEGENDRE6,IDAE_RADAUIIA3,IDAE_RADAUIIA5} from "../idae/rk";



class IDAE_BDF extends IDAESolver{
    stages:number;
    prevValues:vector[];
    a:number[];
    b0:number;
    solver: IDAESolver;
    constructor(step:number,stepSolver:NewtonSolver,a:number[],b0:number,solver:IDAESolver,stages:number){
        super(step,stepSolver);
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
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {
        
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
        let zNew = z.clone();
        let dx = vector.add(xNew,_dx).scale(1/(this.step*this.b0));
        let F:vector = vector.empty(system.length_x()+system.length_z());
        F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
        F.addSubVector(system.g(xNew,zNew,tNew),system.length_x());
        let f0norm = F.norm2();
        for (let i = 0; i < this.systemSolver.getIterations(); i++)
        {
            let J:matrix = matrix.emptySquare(system.length_x()+system.length_z());
            J.addSubMatrix(system.dfdx(xNew,dx,zNew,tNew).addSelf(system.dfddx(xNew,dx,zNew,tNew).scaleSelf(1/(this.step*this.b0))),0,0);
            J.addSubMatrix(system.dfdz(xNew,dx,zNew,tNew),0,system.length_x());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),system.length_x(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),system.length_x(),system.length_x());

            let dxz = gauss.solve(J,F.scaleSelf(-this.systemSolver.getAlpha()));
            xNew.addSelf(dxz.getSubVector(0,system.length_x()));
            zNew.addSelf(dxz.getSubVector(0,system.length_z()));
            dx = vector.add(xNew,_dx).scale(1/(this.step*this.b0));
            
            F = vector.empty(system.length_x()+system.length_z());
            F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
            F.addSubVector(system.g(xNew,zNew,tNew),system.length_x());

            if (i>=this.systemSolver.getMinIterations()&&F.norm2() < this.systemSolver.getAbsTol() + this.systemSolver.getRelTol()*f0norm)
            {
                this.prevValues.splice(this.prevValues.length-1,1);
                return new DAEVector(xNew,zNew,tNew);
            }
        }
        throw new Error("Divergence");
    }
}

export class IDAE_BDF2 extends IDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[4/3,-1/3],2/3, new IDAE_RADAUIIA3(step,stepSolver),2);
    }
}
export class IDAE_BDF3 extends IDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[18/11,-9/11,2/11],6/11, new IDAE_RADAUIIA3(step,stepSolver),3);
    }
}
export class IDAE_BDF4 extends IDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[48/25,-36/25,16/25,-3/25],12/25,new IDAE_RADAUIIA5(step,stepSolver),4);
    }
}
export class IDAE_BDF5 extends IDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[300/137,-300/137,200/137,-75/137,12/137],60/137,new IDAE_GAUSSLEGENDRE6(step,step,1,stepSolver),5);
    }
}
export class IDAE_BDF6 extends IDAE_BDF
{
    constructor(step:number,stepSolver:NewtonSolver)
    {
        super(step,stepSolver,[360/147,-450/147,400/147,-225/147,72/147,-10/147],60/147,new IDAE_GAUSSLEGENDRE6(step,step,1,stepSolver),6);
    }
}