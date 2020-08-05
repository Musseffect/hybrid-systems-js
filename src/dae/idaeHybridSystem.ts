import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { IDAESystem } from "./idaeSystem";
import { HybridState, HybridStateLink } from "./solver";


export abstract class IDAEHybridSystem implements IDAESystem {
    protected states: HybridState[];
    protected statesMap: Record<string, number>;
    protected currentState: number;
    getCurrentStateIndex(): number {
        return this.currentState;
    }
    getCurrentLinks(): HybridStateLink[] {
        return this.states[this.currentState].links;
    }
    getCurrentState(): HybridState {
        return this.states[this.currentState];
    }
    isTerminal(): boolean {
        return this.states[this.currentState].terminal;
    }
    setCurrentState(state:number){
        this.currentState = state;
    }
    abstract f(x: vector, dx: vector, z: vector, t: number): vector;
    abstract g(x: vector, z: vector, t: number): vector;
    abstract dfdx(x: vector, dx: vector, z: vector, t: number): matrix;
    abstract dfddx(x: vector, dx: vector, z: vector, t: number): matrix;
    abstract dfdz(x: vector, dx: vector, z: vector, t: number): matrix;
    abstract dgdx(x: vector, z: vector, t: number): matrix;
    abstract dgdz(x: vector, z: vector, t: number): matrix;
    abstract dgdt(x: vector, z: vector, t: number): vector;
    abstract length_z(): number;
    abstract length_x(): number;
}
