

export class UIParameters {
    /*solver: {
        daeForm: string;
        method: string;
        step: number;
        t0: number;
        time: number;
        stepControl: {
            minStep: number;
            errTol: number;
        };
        implicitStepSolver: {
            iters: number;
            minIters: number;
            absTol: number;
            relTol: number;
            alpha: number;
        };
        implicitSystemSolver: {
            iters: number;
            minIters: number;
            absTol: number;
            relTol: number;
            alpha: number;
        };
    };
    eventDetection: {
        borderTol: number;
        adaptiveStep: {
            enabled: boolean;
            gamma: number;
            minStep: number;
        };
        zeroCrossing: {
            enabled: boolean;
            newtonIters: number;
            newtonAlpha: number;
            absTol: number;
            relTol: number;
            bisectIters: number;
            timeAbsTol: number;
            timeRelTol: number;
        };
    };
    simplification: {
        enabled: boolean;
        method: string;
        maxPoints: number;
        tolerance: number;
        lookahead: number;
        nthPoint: number;
        maxTolerance: number;
    };*/
    "dae-form":string;
    "dae-method":string;
    "step":number;
    "t0":number;
    "time":number;
    "min-step":number;
    "step-err-tol":number;
    "step-solver-iters":number;
    "step-solver-min-iters":number;
    "step-solver-abs-tol":number;
    "step-solver-rel-tol":number;
    "step-solver-alpha":number;
    "sys-solver-iters":number;
    "sys-solver-min-iters":number;
    "sys-solver-abs-tol":number;
    "sys-solver-rel-tol":number;
    "sys-solver-alpha":number;
    "adaptive-step":boolean;
    "adaptive-min-step":number;
    "adaptive-step-gamma":number;
    "zero-crossing":boolean;
    "zc-border-tol":number;
    "zc-newton-iters":number;
    "zc-newton-alpha":number;
    "zc-abs-tol":number;
    "zc-rel-tol":number;
    "zc-bisect-iters":number;
    "zc-time-abs-tol":number;
    "zc-time-rel-tol":number;
    "simplification":boolean;
    "simp-method":string;
    "simp-max-points":number;
    "simp-tol":number;
    "simp-look-ahead":number;
    "simp-nth-point":number;
    "simp-max-tol":number;
}
