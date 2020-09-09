import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { IDAESystem } from "./idaeSystem";
import { HybridStateLink } from "./hybridStateLink";

export abstract class IDAEHybridState implements IDAESystem{
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

export class IDAEHybridSystem{
    protected states: IDAEHybridState[];
    /*protected statesMap: Record<string, number>;*/
    protected currentState: number;
    constructor(states:IDAEHybridState[]){
        this.states = states;
        this.currentState = 0;
    }
    getCurrentStateIndex(): number {
        return this.currentState;
    }
    getCurrentState(): IDAEHybridState {
        return this.states[this.currentState];
    }
    isTerminal(): boolean {
        return this.states[this.currentState].isTerminal();
    }
    setCurrentState(state:number){
        this.currentState = state;
    }
    /*abstract f(x: vector, dx: vector, z: vector, t: number): vector;
    abstract g(x: vector, z: vector, t: number): vector;
    abstract dfdx(x: vector, dx: vector, z: vector, t: number): matrix;
    abstract dfddx(x: vector, dx: vector, z: vector, t: number): matrix;
    abstract dfdz(x: vector, dx: vector, z: vector, t: number): matrix;
    abstract dgdx(x: vector, z: vector, t: number): matrix;
    abstract dgdz(x: vector, z: vector, t: number): matrix;
    abstract dgdt(x: vector, z: vector, t: number): vector;
    abstract length_z(): number;
    abstract length_x(): number;*/
}
