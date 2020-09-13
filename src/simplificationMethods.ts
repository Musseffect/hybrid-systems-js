import { DouglasPeuckerNSimplification } from "./curveSimplification/douglasPeuckerNSimplification";
import { DouglasPeuckerSimplification } from "./curveSimplification/douglasPeuckerSimplification";
import { ISimplificationAlgorithm } from "./curveSimplification/ISimplificationAlgorithm";
import { LangSimplification } from "./curveSimplification/langSimplification";
import { MaxPointsSimplification } from "./curveSimplification/maxPointsSimplification";
import { NthPointSimplification } from "./curveSimplification/nthPointSimplification";
import { OpheimSimplification } from "./curveSimplification/opheimSimplification";
import { PerpendicularDistanceSimplification } from "./curveSimplification/perpendicularDistanceSimplification";
import { RadialDistanceSimplification } from "./curveSimplification/radialDistanceSimplification";
import { ReumannWitkamSimplification } from "./curveSimplification/reumannWitkamSimplification";
import { UIParameters } from "./UIParameters";




export const simpMethods:Record<string,(params:UIParameters)=>ISimplificationAlgorithm> = {
    "douglas-peucker":function(params:UIParameters){
        return new DouglasPeuckerSimplification(params["simp-tol"]);
    },
    "douglas-peucker-n":function(params:UIParameters){
        return new DouglasPeuckerNSimplification(params["simp-max-points"]);
    },
    "radial-distance":function(params:UIParameters){
        return new RadialDistanceSimplification(params["simp-tol"]);
    },
    "perp-distance":function(params:UIParameters){
        return new PerpendicularDistanceSimplification(params["simp-tol"]);
    },
    "lang":function(params:UIParameters){
        return new LangSimplification(params["simp-tol"],params["simp-look-ahead"]);
    },
    "opheim":function(params:UIParameters){
        return new OpheimSimplification(params["simp-tol"],params["simp-max-tol"]);
    },
    "reumann":function(params:UIParameters){
        return new ReumannWitkamSimplification(params["simp-tol"]);
    },
    "nth-point":function(params:UIParameters){
        return new NthPointSimplification(params["simp-nth-point"]);
    },
    "max-points":function(params:UIParameters){
        return new MaxPointsSimplification(params["simp-max-points"]);
    }
}