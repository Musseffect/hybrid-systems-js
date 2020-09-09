import { vector } from "../math/vector";


export interface HybridStateLink{
    getNewState():number;
    pr(x:vector,z:vector,t:number):boolean;
    p(x:vector,z:vector,t:number):number;
    dpdt(x:vector,z:vector,t:number):number;
    dpdz(x:vector,z:vector,t:number):vector;
    dpdx(x:vector,z:vector,t:number):vector;
    setConditions(x:vector,z:vector,t:number):vector;
}