import {EDAESolver} from "../../edaeSolver";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { EDAESystem } from "../../edaeSystem";
import { DAEVector } from "../../solver";
import {EDAE_RK4,EDAE_RK6} from "../edae/rk";

class EDAE_ADAMS_BASHFORTH extends EDAESolver{
    stages:number;
    prevValues:vector[];
    b:number[];
    solver: EDAESolver;
    constructor(step:number,b:number[],solver:EDAESolver,stages:number){
        super(step);
        this.b = b;
        this.solver = solver;
        this.stages = stages;
        this.prevValues = [];
    }
    public setStep(value:number):void{
        super.setStep(value);
        this.prevValues = [];
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        this.prevValues.splice(0,0, system.f(x,z,t));
        if(this.prevValues.length != this.stages){
            let result:DAEVector = this.solver.makeStep(x, z, t,system);
            return result;
        }
        let tNew = t + this.step;
        let xNew = x.clone();
        for(let i=0;i<this.stages;i++){
            xNew.addSelf(vector.scale(this.prevValues[i],this.step*this.b[i]));
        }
        let zNew = system.g(xNew,tNew);
        this.prevValues.splice(this.prevValues.length-1,1);
        return new DAEVector(xNew,zNew,tNew);
    }
}


export class EDAE_AB2 extends EDAE_ADAMS_BASHFORTH
{
    constructor(step:number)
    {
        super(step,[3/2,-1/2], new EDAE_RK4(step),2);
    }
}
export class EDAE_AB3 extends EDAE_ADAMS_BASHFORTH
{
    constructor(step:number)
    {
        super(step,[23/12,-4/3,5/12], new EDAE_RK4(step),3);
    }
}
export class EDAE_AB4 extends EDAE_ADAMS_BASHFORTH
{
    constructor(step:number)
    {
        super(step,[55/24,-59/24,37/24,-3/8], new EDAE_RK4(step),4);
    }
}
export class EDAE_AB5 extends EDAE_ADAMS_BASHFORTH
{
    constructor(step:number)
    {
        super(step,[1901/720,-1387/360,109/30,-637/360,251/720], new EDAE_RK6(step),5);
    }
}
export class EDAE_AB6 extends EDAE_ADAMS_BASHFORTH
{
    constructor(step:number)
    {
        super(step,[4277/1440,-2641/480,4991/720,-3649/720,959/480,-95/288], new EDAE_RK6(step),6);
    }
}