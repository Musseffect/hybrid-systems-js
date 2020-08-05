import { vector } from "../math/vector";
import { EDAEHybridSystem } from "./edaeHybridSystem";
import { EDAESolver } from "./EDAESolver";
import { EventDetector, AdaptiveStepStrategy, HybridSolution, DAEVector } from "./solver";
export class EDAEHybridSolver {
    eventDetector: EventDetector;
    adaptiveStepStrategy: AdaptiveStepStrategy | null;
    constructor(eventDetector: EventDetector, adaptiveStepStrategy: AdaptiveStepStrategy | null) {
        this.eventDetector = eventDetector;
        this.adaptiveStepStrategy = adaptiveStepStrategy;
    }
    solve(x0: vector, t0: number, t1: number, solver: EDAESolver, system: EDAEHybridSystem): HybridSolution {
        let solutionValues: DAEVector[] = [];
        let states: number[] = [];
        let t = t0;
        let x = x0;
        let z = system.g(x, t);
        let oldValues = new DAEVector(x, z, t);
        solutionValues.push(oldValues);
        states.push(system.getCurrentStateIndex());
        let varValues  ;
        while (oldValues.t < t1) {
            //calculate new step size
            let currentStep = solver.getStep();
            let isStepChanged: boolean = false;
            if (this.adaptiveStepStrategy != null) {
                let h = this.adaptiveStepStrategy.findStepEDAE(oldValues.x, oldValues.z, oldValues.t, system);
                if (h > 0 && h < solver.getStep()) {
                    solver.setStep(h);
                    isStepChanged = true;
                }
            }
            //calculate variable values at t_{n+1}, t_{n+1} = t_n + h
            let curValues = solver.makeStep(oldValues.x, oldValues.z, oldValues.t, system);
            //check for state change in the interval [t_n,t_n+h]
            if (this.eventDetector.checkEventEDAE(oldValues, curValues, solver, system)) {
                //check for terminal state
                if (system.isTerminal()) {
                    break;
                }
                //reset multistep method
                solver.setStep(currentStep);
            }
            else if (isStepChanged)
                solver.setStep(currentStep);
            oldValues = curValues;
            //Save variable values
            {
                /*let values: DAEVector = { x: null, z: null, t: null };
                values.t = oldValues.t;
                let x = [];
                for (let i = 0; i < saveVariablesX.length; i++) {
                    x.push(oldValues.x.get(saveVariablesX[i]));
                }
                values.x = new vector(x);
                let z = [];
                for (let i = 0; i < saveVariablesZ.length; i++) {
                    z.push(oldValues.z.get(saveVariablesZ[i]));
                }
                values.z = new vector(z);*/
            }
            solutionValues.push(oldValues);
            states.push(system.getCurrentStateIndex());
            if (solutionValues.length*(system.length_x()+system.length_z()+2) > 1.31e6) {//10 MB max
                console.info(`Solution was terminated due to memory limit of 10MB`);
                break;
            }
        }
        return new HybridSolution(solutionValues, states);
    }
}
