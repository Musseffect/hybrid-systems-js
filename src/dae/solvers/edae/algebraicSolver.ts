import {
    DAEVector
} from "../../solver";
import { EDAESolver } from "../../edaeSolver";
import { EDAESystem } from "../../edaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";



/**
 * solver for z = g(t)
 */

export class EDAE_AlgebraicSolver extends EDAESolver{
    public makeStep(x:vector,z:vector,t:number,system:EDAESystem):DAEVector{
        let xNew = x;
        let tNew = t + this.step;
        let zNew = system.g(xNew,tNew);
        return new DAEVector(xNew, zNew, tNew);
    }
}





