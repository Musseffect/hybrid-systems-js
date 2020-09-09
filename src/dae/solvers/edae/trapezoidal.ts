import {
    DAEVector
} from "../../daeVector";
import { EDAESolver } from "../../edaeSolver";
import { EDAESystem } from "../../edaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import { NewtonSolver } from "../../../math/newton";

/*
explicit
    x_{n+1} = x_n + 0.5*h(f(x_n,t_n)+f(x_n+hf(x_n,t_n),t_{n+1}))
    {
        1.  k_1 = f(x_n,z_n,t_n)
        explicit Nx
        2.  k_2 = f(x_n + h*k_1,g(x_n + h*k_1,t_{n+1}),t_{n+1})
        explicit Nx
        3.  x_{n+1} = x_n + 0.5*h(k_1 + k_2)
        explicit Nx
        4.  z_{n+1} = g(x_{n+1},t_{n+1})
        explicit Nz
    }
implicit
    x_{n+1} = x_n + 0.5*h(f(x_n,t_n)+f(x_{n+1},t_{n+1}))
    {
        1.  k_1 = f(x_n,z_n,t_n)
        explicit Nx
        2.  x_{n+1} - x_n - 0.5*h(k_1+f(x_{n+1},g(x_{n+1},t_{n+1}),t_{n+1})) = 0
        implicit Nx
        3.  z_{n+1} = g(x_{n+1},t_{n+1})
        explicit Nz
    }
*/

/**
 * explicit trapezoidal method for explicit dae with index one
 */
export class EDAE_ETrapezoidal extends EDAESolver{
    constructor(step:number){
        super(step);
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        let tNew = t+this.step;
        let k_1 = system.f(x,z,t).scaleSelf(this.step);
        let _x = vector.add(x,k_1);
        let k_2 = system.f(_x,system.g(_x,tNew),tNew).scaleSelf(this.step);
        let xNew = k_1.addSelf(k_2).scaleSelf(0.5).addSelf(x);
        let zNew = system.g(xNew,tNew);
        return new DAEVector(xNew,zNew,tNew);
    }
}
/**
 * implicit trapezoidal method for explicit dae with index one
 */
export class EDAE_ITrapezoidal extends EDAESolver{
    protected stepSolver:NewtonSolver;
    constructor(step:number,stepSolver:NewtonSolver){
            super(step);
            this.stepSolver = stepSolver;
    }
    /*
        x_{n+1} - x_n - 0.5* h * (k_1+f(x_{n+1},g(x_{n+1},t_{n+1}),t_{n+1})) = 0
        dF_i/dx_{n+1}_j = \delta_ij - 0.5*h * df/dx - 0.5*h*df/dz * dg/dx(x_{n+1],t_{n+1})
     */
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        let k_1 = system.f(x,z,t);
        let xNew = x.clone().addSelf(vector.scale(k_1,this.step));//better approximation for xNew
        let tNew = t + this.step;
        let zNew = system.g(xNew,tNew);
        let F = system.f(xNew,zNew,tNew).addSelf(k_1).scaleSelf(-0.5*this.step).addSelf(xNew).subSelf(x);
        let f0norm = F.norm2();
        for(let i=0;i<this.stepSolver.getIterations();i++){
            let J:matrix = matrix.identity(system.length_x());
            J.subSelf(system.dfdx(xNew,zNew,tNew).addSelf(matrix.mult(system.dfdz(xNew,zNew,tNew),system.dgdx(xNew,tNew))).scaleSelf(0.5*this.step));
            let dx = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            xNew.addSelf(dx);

            zNew = system.g(xNew,tNew);

            F = system.f(xNew,zNew,tNew).addSelf(k_1).scaleSelf(-0.5*this.step).addSelf(xNew).subSelf(x);
            let fnorm = F.norm2();
            if(i>=this.stepSolver.getMinIterations()&&fnorm<this.stepSolver.getAbsTol() + this.stepSolver.getRelTol() * f0norm){
                return new DAEVector(xNew, zNew, tNew);
            }
        }
        throw new Error("Divergence");
    }
}