
import { 
    EDAE_EEuler, 
    EDAE_IEuler
} from "./dae/solvers/edae/euler";
import { 
    IDAE_EEuler,
    IDAE_IEuler 
} from "./dae/solvers/idae/euler";
import {     EDAE_RK4, 
    EDAE_RK4_2,
    EDAE_RK4_RALSTON,
    EDAE_DOPRI5, 
    EDAE_RADAUIA5, 
    EDAE_BS23, 
    EDAE_LOBATTOIIIA2, 
    EDAE_LOBATTOIIIA4, 
    EDAE_LOBATTOIIIB2, 
    EDAE_LOBATTOIIIB4, 
    EDAE_LOBATTOIIIC2, 
    EDAE_LOBATTOIIIC4, 
    EDAE_RADAUIIA3, 
    EDAE_RADAUIIA5, 
    EDAE_GAUSSLEGENDRE4, 
    EDAE_GAUSSLEGENDRE6,
    EDAE_HeunEuler, 
    EDAE_MidpointEuler, 
    EDAE_RK6, 
    EDAE_RK6_2, 
    EDAE_RK8 } from "./dae/solvers/edae/rk";
import { 
    IDAE_RK4,
    IDAE_RK4_2,
    IDAE_RK4_RALSTON,
    IDAE_DOPRI5, 
    IDAE_RADAUIA5, 
    IDAE_BS23, 
    IDAE_LOBATTOIIIA2, 
    IDAE_LOBATTOIIIA4, 
    IDAE_LOBATTOIIIB2, 
    IDAE_LOBATTOIIIB4, 
    IDAE_LOBATTOIIIC2, 
    IDAE_LOBATTOIIIC4, 
    IDAE_RADAUIIA3, 
    IDAE_RADAUIIA5, 
    IDAE_GAUSSLEGENDRE4, 
    IDAE_GAUSSLEGENDRE6,
    IDAE_HeunEuler, 
    IDAE_MidpointEuler, 
    IDAE_RK6, 
    IDAE_RK6_2, 
    IDAE_RK8 } from "./dae/solvers/idae/rk";
import { IDAE_EMidpoint, IDAE_IMidpoint } from "./dae/solvers/idae/midpoint";
import { IDAE_ETrapezoidal, IDAE_ITrapezoidal } from "./dae/solvers/idae/trapezoidal";
import { EDAE_IMidpoint, EDAE_EMidpoint } from "./dae/solvers/edae/midpoint";
import { EDAE_ETrapezoidal, EDAE_ITrapezoidal } from "./dae/solvers/edae/trapezoidal";
import { EDAE_AlgebraicSolver } from "./dae/solvers/edae/algebraicSolver";
import { IDAE_AlgebraicSolver } from "./dae/solvers/idae/algebraicSolver";
import { EDAESolver } from "./dae/edaeSolver";
import { IDAESolver } from "./dae/idaeSolver";
import { NewtonSolver } from "./math/newton";


export class UIParameters{
    solver:{
        daeForm:string,
        method:string,
        step:number,
        t0:number,
        time:number,
        stepControl:{
            minStep:number,
            errTol:number
        }
        implicitStepSolver:{
            iters:number,
            minIters:number,
            absTol:number,
            relTol:number,
            alpha:number
        },
        implicitSystemSolver:{
            iters:number,
            minIters:number,
            absTol:number,
            relTol:number,
            alpha:number
        }
    };
    eventDetection:{
        borderTol:number,
        adaptiveStep:{
            enabled:boolean,
            gamma:number,
            minStep:number
        },
        zeroCrossing:{
            enabled:boolean,
            newtonIters:number,
            newtonAlpha:number,
            absTol:number,
            relTol:number,
            bisectIters:number,
            timeAbsTol:number,
            timeRelTol:number
        }
    };
    simplification:{
        enabled:boolean,
        method:string,
        maxPoints:number,
        tolerance:number
    };
}

class Method{
    name:string;
    autostep:boolean;
    implicit:boolean;
    edaeInit:(params:UIParameters)=>EDAESolver;
    idaeInit:(params:UIParameters)=>IDAESolver;
}

export const methods:Record<string,Method> = {
    edopri5:{
        name:"DOPRI5",
        autostep:true,
        implicit:false,
        edaeInit:function(p:UIParameters){
            let s = p.solver.stepControl;
            return new EDAE_DOPRI5(s.minStep,p.solver.step,s.errTol);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_DOPRI5(
                p.solver.stepControl.minStep,
                p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters),
                p.solver.stepControl.errTol
                );
        }
    },
    eeuler:{
        name:"Euler",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_EEuler(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_EEuler(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    emidpoint:{
        name:"Midpoint",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_EMidpoint(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_EMidpoint(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    etrapezoidal:{
        name:"Trapezoidal",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_ETrapezoidal(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_ETrapezoidal(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters)
                );
        }
    },
    erk4:{
        name:"Standart RK4",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK4(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RK4(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters)
                );
        }
    },
    "erk4-2":{
        name:"Alt. RK4",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK4_2(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RK4_2(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters))
        }
    },
    "erk4-ralston":{
        name:"RK4 by Ralston",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK4_RALSTON(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RK4_RALSTON(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters))
        }
    },
    "ebs23":{
        name:"Bogacki Shampine 23 emb.",
        autostep:true,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_BS23(p.solver.stepControl.minStep,p.solver.step,p.solver.stepControl.errTol);
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_BS23(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    erk6:{
        name:"RK6",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK6(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RK6(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    "erk6-2":{
        name:"Alt. RK6",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK6_2(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RK6_2(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    erk8:{
        name:"RK8",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK8(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RK8(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    ealgebraic:{
        name:"Algebraic solver",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_AlgebraicSolver(p.solver.step);
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_AlgebraicSolver(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    ieuler:{
        name:"Euler",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            return new EDAE_IEuler(p.solver.step,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_IEuler(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    imidpoint:{
        name:"Midpoint",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            return new EDAE_IMidpoint(p.solver.step,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_IMidpoint(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    itrapezoidal:{
        name:"Trapezoidal",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            return new EDAE_ITrapezoidal(p.solver.step,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_ITrapezoidal(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters),
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        }
    },
    iradauia5:{
        name:"RADAU IA5",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            return new EDAE_RADAUIA5(p.solver.step,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RADAUIA5(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    iradauiia3:{
        name:"RADAU IIA3",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            return new EDAE_RADAUIIA3(p.solver.step,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RADAUIIA3(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    iradauiia5:{
        name:"RADAU IIA5",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let i = p.solver.implicitStepSolver;
            return new EDAE_RADAUIIA5(p.solver.step,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let s = p.solver.implicitSystemSolver;
            return new IDAE_RADAUIIA5(p.solver.step,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    lobattoiiia2:{
        name:"LOBATTO IIIA2",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_LOBATTOIIIA2(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_LOBATTOIIIA2(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    lobattoiiia4:{
        name:"LOBATTO IIIA4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_LOBATTOIIIA4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_LOBATTOIIIA4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    lobatoiiib2:{
        name:"LOBATTO IIIB2",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_LOBATTOIIIB2(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_LOBATTOIIIB2(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    lobattoiiib4:{
        name:"LOBATTO IIIB4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_LOBATTOIIIB4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_LOBATTOIIIB4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    lobattoiiic2:{
        name:"LOBATTO IIIC2",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_LOBATTOIIIC2(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_LOBATTOIIIC2(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    lobattoiiic4:{
        name:"LOBATTO IIIC4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_LOBATTOIIIC4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_LOBATTOIIIC4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    gausslegendre4:{
        name:"GAUSS LEGENDRE 4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_GAUSSLEGENDRE4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_GAUSSLEGENDRE4(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    gausslegendre6:{
        name:"GAUSS LEGENDRE 6",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let i = p.solver.implicitStepSolver;
            return new EDAE_GAUSSLEGENDRE6(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(i.iters,i.absTol,i.relTol,i.alpha,i.minIters));
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_GAUSSLEGENDRE6(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    },
    iheunEuler:{
        name:"Heun Euler emb.",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            return new EDAE_HeunEuler(c.minStep,p.solver.step,c.errTol);
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_HeunEuler(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }
    },
    imidpointEuler:{
        name:"Midpoint Euler emb.",
        autostep:true,
        implicit:false,
        edaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            return new EDAE_MidpointEuler(c.minStep,p.solver.step,c.errTol);
        },
        idaeInit:function(p:UIParameters){
            let c = p.solver.stepControl;
            let s = p.solver.implicitSystemSolver;
            return new IDAE_MidpointEuler(c.minStep,p.solver.step,c.errTol,
                new NewtonSolver(s.iters,s.absTol,s.relTol,s.alpha,s.minIters));
        }

    }
}