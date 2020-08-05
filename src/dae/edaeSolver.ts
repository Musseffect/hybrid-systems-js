import { vector } from "../math/vector";
import { DAEVector } from "./solver";
import { EDAESystem } from "./edaeSystem";

export abstract class EDAESolver {
    protected step: number;
    public setStep(value: number) {
        this.step = value;
    }
    public getStep(): number {
        return this.step;
    }
    constructor(step: number) {
        this.step = step;
    }
    public abstract makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector;
}
