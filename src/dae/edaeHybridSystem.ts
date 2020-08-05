import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { EDAESystem } from "./edaeSystem";
import { HybridState, HybridStateLink } from "./solver";

export abstract class EDAEHybridState implements EDAESystem {
    name:string;
    links:HybridStateLink[];
    terminal:boolean;
    abstract f(x:vector,z:vector,t:number):vector;
    abstract g(x:vector,z:vector,t:number):vector;
    abstract dfdx(x:vector,z:vector,t:number):matrix;
    abstract dfdz(x:vector,z:vector,t:number):matrix;
    abstract dgdx(x: vector, t: number): matrix;
    abstract dgdt(x: vector, t: number): vector;
    abstract length_x(): number;
    abstract length_z(): number;
}

export abstract class EDAEHybridSystem{
    protected states: EDAEHybridState[];
    protected statesMap: Record<string, number>;
    protected currentState: number;
    setCurrentState(state: number) {
        this.currentState = state;
    }
    getCurrentStateIndex(): number {
        return this.currentState;
    }
    getCurrentLinks(): HybridStateLink[] {
        return this.states[this.currentState].links;
    }
    getCurrentState(): EDAEHybridState {
        return this.states[this.currentState];
    }
    isTerminal(): boolean {
        return this.states[this.currentState].terminal;
    }
    /*abstract f(x: vector, z: vector, t: number): vector;
    abstract g(x: vector, t: number): vector;
    abstract dfdx(x: vector, z: vector, t: number): matrix;
    abstract dfdz(x: vector, z: vector, t: number): matrix;
    abstract dgdx(x: vector, t: number): matrix;
    abstract dgdt(x: vector, t: number): vector;
    abstract length_x(): number;
    abstract length_z(): number;*/
}
