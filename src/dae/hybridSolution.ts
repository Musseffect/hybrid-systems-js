import {vector} from "../math/vector";
import { IDAEHybridSystem } from "./idaeHybridSystem";
import { EDAEHybridSystem, EDAEHybridState } from "./edaeHybridSystem";
import { IDAESolver } from "./IDAESolver";
import { EDAESolver } from "./EDAESolver";
import { DAEVector } from "./daeVector";


/*export abstract class HybridState{
    name:string;
    links:HybridStateLink[];
    terminal:boolean;
    abstract f(x:vector,z:vector,t:number):vector;
    abstract g(x:vector,z:vector,t:number):vector;
    abstract dfdx(x:vector,z:vector,t:number):matrix;
    abstract dfdz(x:vector,z:vector,t:number):matrix;

    
}*/
class SolutionStatistics{
    steps:number;
    statesSwitched:number;
    minStep:number;
    maxStep:number;
}

export class HybridSolution{
    values:DAEVector[];
    states:number[];
    stateSwitches:number[];
    statistics:SolutionStatistics;
    constructor(values:DAEVector[],states:number[],stateSwitches:number[],statistics:SolutionStatistics){
        this.values = values;
        this.states = states;
        this.stateSwitches = stateSwitches;
        this.statistics = statistics;
    }
}