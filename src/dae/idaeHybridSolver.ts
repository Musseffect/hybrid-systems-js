import { vector } from "../math/vector";
import { IDAEHybridSystem } from "./idaeHybridSystem";
import { IDAESolver } from "./IDAESolver";
import {  HybridSolution } from "./hybridSolution";
import { EventDetection } from "./eventDetection";
import { AdaptiveStepStrategy } from "./adaptiveStep";
import { DAEVector } from "./daeVector";

const maxFloats = 2097152;


export class IDAEHybridSolver {
    eventDetector: EventDetection;
    adaptiveStepStrategy: AdaptiveStepStrategy | null;
    constructor(eventDetector: EventDetection, adaptiveStepStrategy: AdaptiveStepStrategy | null) {
        this.eventDetector = eventDetector;
        this.adaptiveStepStrategy = adaptiveStepStrategy;
    }
    solve(x0: vector, z0:vector, t0: number, t1: number, solver: IDAESolver, system: IDAEHybridSystem): HybridSolution {
        let solutionValues: DAEVector[] = [];
        let states: number[] = [];
        let stateSwitches: number[] = [];

        let stats = {statesSwitched:0,steps:0,minStep:10e8,maxStep:0};

        let t = t0;
        let x = x0;
        let z = solver.solve_z(x, z0, t, system.getCurrentState());
        let oldValues = new DAEVector(x, z, t);
        solutionValues.push(oldValues);

        states.push(system.getCurrentStateIndex());
        stateSwitches.push(t0);
        
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
            stats.minStep = Math.min(stats.minStep,currentStep);
            stats.maxStep = Math.max(stats.maxStep,currentStep);
            stats.steps++;
            //get values
            let curValues = solver.makeStep(oldValues.x, oldValues.z, oldValues.t, system.getCurrentState());
            //check for state change in the interval [t,t+h]
            if (this.eventDetector.checkEventIDAE(oldValues, curValues, solver, system)) {
                states.push(system.getCurrentStateIndex());
                stateSwitches.push(curValues.t);
                stats.statesSwitched++;
                if (system.isTerminal()) {
                    break;
                }
                //reset multistep method
                solver.setStep(currentStep);
            }
            else if (isStepChanged)
                solver.setStep(currentStep);
            oldValues = curValues;
            solutionValues.push(oldValues);
            if (states.length*2+solutionValues.length*(system.getCurrentState().length_x()+system.getCurrentState().length_z()+1) > maxFloats) {
                console.info(`Solution was terminated prematurely due to memory limit`);
                break;
            }
        }
        return new HybridSolution(solutionValues, states, stateSwitches, stats);
    }
}
