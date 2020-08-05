import {
    DAEVector
} from "../../solver";
import { IDAESolver } from "../../idaeSolver";
import { IDAESystem } from "../../idaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";



/**
 * solver for purely algebraic system g(z,t) = 0
 */

export class EDAE_AlgebraicSolver extends IDAESolver{
    public makeStep(x:vector,z:vector,t:number,system:IDAESystem):DAEVector{
        let xNew = x;
        let tNew = t + this.step;
        let zNew = this.solve_z(x,z,tNew,system);
        return new DAEVector(xNew, zNew, tNew);
    }
}





