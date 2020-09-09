import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { EDAESystem } from "./edaeSystem";
import { HybridStateLink } from "./hybridStateLink";
import { Expression } from "../compiler/expression";


export abstract class EDAEHybridState implements EDAESystem{
    protected name:string;
    protected links:HybridStateLink[];
    protected terminal:boolean;
    constructor(name:string,links:HybridStateLink[],terminal:boolean){
        this.name = name;
        this.links = links;
        this.terminal = terminal;
    }
    isTerminal():boolean{
        return this.terminal;
    }
    getLinks():HybridStateLink[]{
        return this.links;
    }
    getName():string{
        return this.name;
    }
    abstract f(x: vector, z: vector, t: number): vector;
    abstract g(x: vector, t: number): vector;
    abstract dfdx(x: vector, z: vector, t: number): matrix;
    abstract dfdz(x: vector, z: vector, t: number): matrix;
    abstract dgdx(x: vector, t: number): matrix;
    abstract dgdt(x: vector, t: number): vector;
    abstract length_x(): number;
    abstract length_z(): number;
}

export class EDAEHybridSystem{
    protected states: EDAEHybridState[];
    /*protected statesMap: Record<string, number>;*/
    protected currentState: number;
    constructor(states:EDAEHybridState[]){
        this.states = states;
        this.currentState = 0;
    }
    setCurrentState(state: number) {
        this.currentState = state;
    }
    getCurrentStateIndex(): number {
        return this.currentState;
    }
    getCurrentState(): EDAEHybridState {
        return this.states[this.currentState];
    }
    isTerminal(): boolean {
        return this.states[this.currentState].isTerminal();
    }
}
