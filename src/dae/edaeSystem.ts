import { vector } from "../math/vector";
import { matrix } from "../math/matrix";


export interface EDAESystem {
    f(x: vector, z: vector, t: number): vector;
    g(x: vector, t: number): vector;
    dfdx(x: vector, z: vector, t: number): matrix;
    dfdz(x: vector, z: vector, t: number): matrix;
    dgdx(x: vector, t: number): matrix;
    length_x(): number;
    length_z(): number;
}
