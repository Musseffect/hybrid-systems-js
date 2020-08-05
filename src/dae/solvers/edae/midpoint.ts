import {
    DAEVector
} from "../../solver";
import { EDAESolver } from "../../edaeSolver";
import { EDAESystem } from "../../edaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import { NewtonSolver } from "../../../nonlinear/newton";
/*
explicit
    x_{n+1} = x_n + h f(x_n+0.5h*f(x_n,t_n),t_n + 0.5*h)
    {
        1.  k_1 = f(x_n,z_n,t_n)
        explicit Nx
        2.  x_{n+1} = x_n + h*f(x_n + 0.5*h * k_1,g(x_n + 0.5 *h* k_1,t_n + 0.5*h),t_n + 0.5*h)
        explicit Nx
        3.  z_{n+1} = g(x_{n+1},t_{n+1})
        explicit Nz
    }
implicit
    x_{n+1}=x_n + h f(0.5*(x_n+x_{n+1}),t_n+0.5*h)
    { 
        1.  x_{n+1} - x_n - h*f(0.5*(x_n+x_{n+1}),0.5*(z_n+z_{n+1}),t_n+0.5*h) = 0
            z_{n+1} - g(x_{n+1},t_{n+1}) = 0
        implicit Nx + Nz

        OR

        1. x_{n+1} - x_n - h * f(0.5*(x_n+x_{n+1}),0.5*(z_n + g(x_{n+1],t_{n+1})),t_n + 0.5*j)=0
        implicit Nx
        2. z_{n+1} = g(x_{n+1},t_{n+1})
        explicit Nz
    }
*/

/**
 * explicit midpoint method for explicit dae with index one
 */
export class EDAE_EMidpoint extends EDAESolver{
    constructor(step:number){
        super(step);
    }
    //TODO: TEST
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        let k = system.f(x,z,t).scaleSelf(this.step*0.5).addSelf(x);
        let kz = system.g(k,t+0.5*this.step);
        let xNew = system.f(k,kz,t+0.5*this.step).scaleSelf(this.step).addSelf(x);
        let tNew = t + this.step;
        let zNew = system.g(xNew,tNew);
        return new DAEVector(xNew,zNew,tNew);
    }
}
/**
 * implicit midpoint method for explicit dae with index one
 */
export class EDAE_IMidpoint extends EDAESolver{
    protected stepSolver:NewtonSolver;
    constructor(step:number,stepSolver:NewtonSolver){
            super(step);
            this.stepSolver = stepSolver;
    }
    /*
        x_{n+1} - x_n - h * f(0.5*(x_n+x_{n+1}),0.5*(z_n + g(x_{n+1],t_{n+1})),t_n + 0.5*j)=0
        dF_i/dx_{n+1}_j = \delta_ij - 0.5*h * df/dx - 0.5*h*df/dz * dg/dx(x_{n+1],t_{n+1})
     */
    //TODO: TEST
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        let xNew = x.clone().addSelf(vector.scale(system.f(x,z,t),this.step));//better approximation for xNew
        let tNew = t+this.step;
        let xHalf = vector.add(x,xNew).scaleSelf(0.5);
        let zHalf = system.g(xNew,tNew).addSelf(z).scaleSelf(0.5);
        let F:vector = system.f(xHalf,zHalf,t+0.5*this.step).scale(-this.step).addSelf(xNew).subSelf(x);
        let f0norm = F.norm2();
        for(let i=0;i<this.stepSolver.getIterations();i++)
        {
            let J:matrix = matrix.identity(system.length_x());
            J.subSelf(system.dfdx(xHalf,zHalf,t+0.5*this.step).addSelf(matrix.mult(system.dfdz(xHalf,zHalf,t+0.5*this.step),system.dgdx(xNew,tNew))).scaleSelf(0.5*this.step));
            let dx = gauss.solve(J,F.scale(-this.stepSolver.getAlpha()));
            xNew.addSelf(dx);

            xHalf = vector.add(x,xNew).scaleSelf(0.5);
            zHalf = system.g(xNew,tNew).addSelf(z).scaleSelf(0.5);

            F = system.f(xHalf,zHalf,t+0.5*this.step).scale(-this.step).addSelf(xNew).subSelf(x);
            let fnorm = F.norm2();
            if(i>=this.stepSolver.getMinIterations()&&fnorm<=this.stepSolver.getAbsTol()+this.stepSolver.getRelTol()*f0norm){
                return new DAEVector(xNew,system.g(xNew,tNew),tNew);
            }
        }
        throw new Error("Divergence");
    }
}

