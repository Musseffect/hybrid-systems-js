import {IDAESolver} from "../../idaeSolver";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { IDAESystem } from "../../idaeSystem";
import { DAEVector } from "../../solver";
import { NewtonSolver } from "../../../nonlinear/newton";
import { gauss} from "../../../math/gauss";
import {IDAE_RK4,IDAE_RK6} from "../idae/rk";

class IDAE_ADAMS_BASHFORTH extends IDAESolver{
    stages:number;
    prevValues:vector[];
    b:number[];
    solver: IDAESolver
    constructor(step:number,systemSolver:NewtonSolver,b:number[],solver:IDAESolver,stages:number){
        super(step,systemSolver);
        this.b = b;
        this.solver = solver;
        this.stages = stages;
        this.prevValues = [];
    }
    public setStep(value:number):void{
        super.setStep(value);
        this.prevValues = [];
    }
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {
        this.prevValues.splice(0,0, this.solve_dx(x,z,t,system));
        if(this.prevValues.length != this.stages){
            let result:DAEVector = this.solver.makeStep(x, z, t,system);
            return result;
        }
        let tNew = t + this.step;
        let xNew = x.clone();
        for(let i=0;i<this.stages;i++){
            xNew.addSelf(vector.scale(this.prevValues[i],this.step*this.b[i]));
        }
        let zNew = this.solve_z(xNew,z,tNew,system);
        this.prevValues.splice(this.prevValues.length-1,1);
        return new DAEVector(xNew,zNew,tNew);
    }
}


export class IDAE_AB2 extends IDAE_ADAMS_BASHFORTH
{
    constructor(step:number,systemSolver:NewtonSolver)
    {
        super(step,systemSolver,[3/2,-1/2], new IDAE_RK4(step,systemSolver),2);
    }
}
export class IDAE_AB3 extends IDAE_ADAMS_BASHFORTH
{
    constructor(step:number,systemSolver:NewtonSolver)
    {
        super(step,systemSolver,[23/12,-4/3,5/12], new IDAE_RK4(step,systemSolver),3);
    }
}
export class IDAE_AB4 extends IDAE_ADAMS_BASHFORTH
{
    constructor(step:number,systemSolver:NewtonSolver)
    {
        super(step,systemSolver,[55/24,-59/24,37/24,-3/8], new IDAE_RK4(step,systemSolver),4);
    }
}
export class IDAE_AB5 extends IDAE_ADAMS_BASHFORTH
{
    constructor(step:number,systemSolver:NewtonSolver)
    {
        super(step,systemSolver,[1901/720,-1387/360,109/30,-637/360,251/720], new IDAE_RK6(step,systemSolver),5);
    }
}
export class IDAE_AB6 extends IDAE_ADAMS_BASHFORTH
{
    constructor(step:number,systemSolver:NewtonSolver)
    {
        super(step,systemSolver,[4277/1440,-2641/480,4991/720,-3649/720,959/480,-95/288], new IDAE_RK6(step,systemSolver),6);
    }
}