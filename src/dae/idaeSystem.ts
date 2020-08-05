import { vector } from "../math/vector";
import { matrix } from "../math/matrix";


export interface IDAESystem {
    f(x: vector, dx: vector, z: vector, t: number): vector;
    g(x: vector, z: vector, t: number): vector;
    dfdx(x: vector, dx: vector, z: vector, t: number): matrix;
    dfddx(x: vector, dx: vector, z: vector, t: number): matrix;
    dfdz(x: vector, dx: vector, z: vector, t: number): matrix;
    dgdx(x: vector, z: vector, t: number): matrix;
    dgdz(x: vector, z: vector, t: number): matrix;
    length_x(): number;
    length_z(): number;
}
