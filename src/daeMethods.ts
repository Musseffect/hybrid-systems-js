
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
import { UIParameters } from "./UIParameters";


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
            return new EDAE_DOPRI5(p["min-step"],p["step"],p["step-err-tol"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_DOPRI5(
                p["min-step"],
                p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]),
                p["step-err-tol"]
                );
        }
    },
    erk4:{
        name:"Standart RK4",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK4(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RK4(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"])
                );
        }
    },
    eeuler:{
        name:"Euler",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_EEuler(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_EEuler(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    emidpoint:{
        name:"Midpoint",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_EMidpoint(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_EMidpoint(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    etrapezoidal:{
        name:"Trapezoidal",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_ETrapezoidal(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_ETrapezoidal(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"])
                );
        }
    },
    "erk4-2":{
        name:"Alt. RK4",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK4_2(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RK4_2(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]))
        }
    },
    "erk4-ralston":{
        name:"RK4 by Ralston",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK4_RALSTON(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RK4_RALSTON(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]))
        }
    },
    "ebs23":{
        name:"Bogacki Shampine 23 emb.",
        autostep:true,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_BS23(p["min-step"],p["step"],p["step-err-tol"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_BS23(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    erk6:{
        name:"RK6",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK6(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RK6(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    "erk6-2":{
        name:"Alt. RK6",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK6_2(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RK6_2(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    erk8:{
        name:"RK8",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_RK8(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RK8(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ealgebraic:{
        name:"Algebraic solver",
        autostep:false,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_AlgebraicSolver(p["step"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_AlgebraicSolver(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ieuler:{
        name:"Euler",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_IEuler(p["step"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_IEuler(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    imidpoint:{
        name:"Midpoint",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_IMidpoint(p["step"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_IMidpoint(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    itrapezoidal:{
        name:"Trapezoidal",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_ITrapezoidal(p["step"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_ITrapezoidal(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]),
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        }
    },
    iradauia5:{
        name:"RADAU IA5",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_RADAUIA5(p["step"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RADAUIA5(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    iradauiia3:{
        name:"RADAU IIA3",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_RADAUIIA3(p["step"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RADAUIIA3(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    iradauiia5:{
        name:"RADAU IIA5",
        autostep:false,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_RADAUIIA5(p["step"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_RADAUIIA5(p["step"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ilobattoiiia2:{
        name:"LOBATTO IIIA2",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_LOBATTOIIIA2(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_LOBATTOIIIA2(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ilobattoiiia4:{
        name:"LOBATTO IIIA4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_LOBATTOIIIA4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_LOBATTOIIIA4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ilobatoiiib2:{
        name:"LOBATTO IIIB2",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_LOBATTOIIIB2(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_LOBATTOIIIB2(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ilobattoiiib4:{
        name:"LOBATTO IIIB4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_LOBATTOIIIB4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_LOBATTOIIIB4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ilobattoiiic2:{
        name:"LOBATTO IIIC2",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_LOBATTOIIIC2(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_LOBATTOIIIC2(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    ilobattoiiic4:{
        name:"LOBATTO IIIC4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_LOBATTOIIIC4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_LOBATTOIIIC4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    igausslegendre4:{
        name:"GAUSS LEGENDRE 4",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_GAUSSLEGENDRE4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_GAUSSLEGENDRE4(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    igausslegendre6:{
        name:"GAUSS LEGENDRE 6",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_GAUSSLEGENDRE6(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["step-solver-iters"],p["step-solver-abs-tol"],p["step-solver-rel-tol"],p["step-solver-alpha"],p["step-solver-min-iters"]));
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_GAUSSLEGENDRE6(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    },
    iheunEuler:{
        name:"Heun Euler emb.",
        autostep:true,
        implicit:true,
        edaeInit:function(p:UIParameters){
            return new EDAE_HeunEuler(p["min-step"],p["step"],p["step-err-tol"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_HeunEuler(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }
    },
    imidpointEuler:{
        name:"Midpoint Euler emb.",
        autostep:true,
        implicit:false,
        edaeInit:function(p:UIParameters){
            return new EDAE_MidpointEuler(p["min-step"],p["step"],p["step-err-tol"]);
        },
        idaeInit:function(p:UIParameters){
            return new IDAE_MidpointEuler(p["min-step"],p["step"],p["step-err-tol"],
                new NewtonSolver(p["sys-solver-iters"],p["sys-solver-abs-tol"],p["sys-solver-rel-tol"],p["sys-solver-alpha"],p["sys-solver-min-iters"]));
        }

    }
}