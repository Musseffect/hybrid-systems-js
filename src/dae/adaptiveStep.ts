import {vector} from "../math/vector";
import { IDAESolver } from "./IDAESolver";
import { IDAEHybridSystem } from "./idaeHybridSystem";
import { EDAEHybridSystem } from "./edaeHybridSystem";



export interface AdaptiveStepStrategy{
    findStepIDAE(x:vector,z:vector,t:number,solver:IDAESolver,system:IDAEHybridSystem):number;
    findStepEDAE(x:vector,z:vector,t:number,system:EDAEHybridSystem):number;
}
export class AdaptiveStepNewton implements AdaptiveStepStrategy{
    gamma:number;
    minStep:number;
    constructor(gamma:number,minStep:number){
        this.gamma = gamma;
        this.minStep = minStep;
    }
    findStepIDAE(x:vector,z:vector,t:number,solver:IDAESolver,system:IDAEHybridSystem):number{
        let step = 10e8;
        let state = system.getCurrentState();
        let links = state.getLinks();
        links.forEach((link)=>
        {
            let dxdt = solver.solve_dx(x,z,t,state);
            let dzdt = solver.solve_dzdt(dxdt,x,z,t,state);
            let denom = vector.dot(link.dpdx(x,z,t),dxdt) + vector.dot(link.dpdz(x,z,t),dzdt) + link.dpdt(x,z,t);
            let h = -this.gamma * link.p(x,z,t)/denom;
            step = (h<0||isNaN(h)?step:Math.min(step,h));
        });
        return Math.max(step,this.minStep);
    }
    findStepEDAE(x: vector, z: vector, t: number, system: EDAEHybridSystem): number {
        let step = 10e8;
        let state = system.getCurrentState();
        let links = state.getLinks();
        links.forEach((link)=>
        {
            let dxdt = state.f(x,z,t);
            let dzdt:vector=state.dgdt(x,t).addSelf(state.dgdx(x,t).multVec(dxdt));
            let denom = vector.dot(link.dpdx(x,z,t),dxdt) + vector.dot(link.dpdz(x,z,t),dzdt) + link.dpdt(x,z,t);
            let h = -this.gamma * link.p(x,z,t)/denom;
            step = (h<0||isNaN(h)?step:Math.min(step,h));
        });
        return Math.max(step,this.minStep);
    }

}
