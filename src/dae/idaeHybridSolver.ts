import { vector } from "../math/vector";
import { IDAEHybridSystem } from "./idaeHybridSystem";
import { IDAESolver } from "./IDAESolver";
import { EventDetector, AdaptiveStepStrategy, HybridSolution, DAEVector } from "./solver";

//TODO: test
export class IDAEHybridSolver {
    eventDetector: EventDetector;
    adaptiveStepStrategy: AdaptiveStepStrategy | null;
    constructor(eventDetector: EventDetector, adaptiveStepStrategy: AdaptiveStepStrategy | null) {
        this.eventDetector = eventDetector;
        this.adaptiveStepStrategy = adaptiveStepStrategy;
    }
    solve(x0: vector, t0: number, t1: number, solver: IDAESolver, system: IDAEHybridSystem, saveVariables: number[]): HybridSolution {
        let solutionValues: DAEVector[] = [];
        let states: number[] = [];
        let t = t0;
        let x = x0;
        let z = solver.solve_z(x, vector.empty(system.length_z()), t, system);
        let oldValues = new DAEVector(x, z, t);
        solutionValues.push(oldValues);
        states.push(system.getCurrentStateIndex());
        while (oldValues.t < t1) {
            //find step
            let currentStep = solver.getStep();
            let isStepChanged: boolean = false;
            if (this.adaptiveStepStrategy != null) {
                let h = this.adaptiveStepStrategy.findStepIDAE(oldValues.x, oldValues.z, oldValues.t, solver, system);
                if (h > 0 && h < solver.getStep()) {
                    solver.setStep(h);
                    isStepChanged = true;
                }
            }
            //get values
            let curValues = solver.makeStep(oldValues.x, oldValues.z, oldValues.t, system);
            //check for state change in the interval [t,t+h]
            if (this.eventDetector.checkEventIDAE(oldValues, curValues, solver, system)) {
                //set t;
                //set x;
                //TODO call setters
                curValues.z = solver.solve_z(curValues.x, curValues.z, curValues.t, system);
                if (system.isTerminal()) {
                    return new HybridSolution(solutionValues, states);
                }
                //reset multistep method
                solver.setStep(currentStep);
            }
            else if (isStepChanged)
                solver.setStep(currentStep);
            oldValues = curValues;
            solutionValues.push(oldValues);
            states.push(system.getCurrentStateIndex());
        }
        return new HybridSolution(solutionValues, states);
    }
}
