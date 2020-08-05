import {
    DAEVector
} from "../../solver";
import { IDAESolver } from "../../idaeSolver";
import { IDAESystem } from "../../idaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import { NewtonSolver } from "../../../nonlinear/newton";
/*
explicit
    x_{n+1} = x_n + h f(x_n+0.5h*f(x_n, t_n), t_n + 0.5*h)
    {
        1.  f(x_n, k_1, z_n, t_n) = 0
        implicit Nx
        2.  g(x_n + 0.5 * h * k_1, z^1_n, t_n+0.5*h) = 0
        implicit Nz
        3.  f(x_n + 0.5 * h * k_1, k_2, z^1_n, t_n+0.5*h) = 0
        implicit Nx
        4.  x_{n+1} = x_n + h*k_2
        explicit Nx
        5.  g(x_{n+1}, z_{n+1}, t_{n+1}) = 0
        implicit Nz
    }
implicit
    x_{n+1}=x_n + h f(0.5*(x_n+x_{n+1}),t_n+0.5*h)
    {
        1.  f(0.5*(x_{n}+x_{n+1}), (x_{n+1} - x_n)/h, 0.5*(z_{n}+z_{n+1}), t_n + 0.5*h) = 0
            g(x_{n+1}, z_{n+1}, t_{n+1}) = 0
        implicit Nx + Nz
    }
*/

/**
 * explicit midpoint method for implicit dae with index one
 */
export class IDAE_EMidpoint extends IDAESolver{
    constructor(step:number,systemSolver:NewtonSolver){
            super(step,systemSolver);
    }
    //TODO: TEST
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {
        let x1 = this.solve_dx(x,z,t,system).scaleSelf(0.5*this.step).addSelf(x);
        let z1 = this.solve_z(x1,z,t + 0.5*this.step,system);
        let tNew = t + this.step;
        let xNew = this.solve_dx(x1,z1,t + 0.5*this.step,system).scaleSelf(this.step).addSelf(x);
        let zNew = this.solve_z(xNew,z1,tNew,system);
        return new DAEVector(xNew,zNew,tNew);
        /*x_{n+1} = x_n + h f(x_n+0.5h*f(x_n, t_n), t_n + 0.5*h)
        {
            1.  f(x_n, k_1, z_n, t_n) = 0
            implicit Nx
            2.  g(x_n + 0.5 * h * k_1, z^1_n, t_n+0.5*h) = 0
            implicit Nz
            3.  f(x_n + 0.5 * h * k_1, k_2, z^1_n, t_n+0.5*h) = 0
            implicit Nx
            4.  x_{n+1} = x_n + h*k_2
            explicit Nx
            5.  g(x_{n+1}, z_{n+1}, t_{n+1}) = 0
            implicit Nz
        }*/
    }
}
/**
 * implicit midpoint method for implicit dae with index one
 */
/*
Fx = f(0.5*(x_{n}+x_{n+1}), (x_{n+1} - x_n)/h, 0.5*(z_{n}+z_{n+1}), t_n + 0.5*h) = 0
Fz = g(x_{n+1}, z_{n+1}, t_{n+1}) = 0
dFx/dx_{n+1} = 0.5*df/dx + df/ddx *1/h
dFx/dz_{n+1} = 0.5*df/dz
dFz/dx_{n+1} = dg/dx
dFz/dz_{n+1} = dg/dz
*/
export class IDAE_IMidpoint extends IDAESolver{
    constructor(step:number,systemSolver:NewtonSolver){
            super(step,systemSolver);
    }
    //TODO: TEST
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {

        /*let xz0 = vector.concat([x,z]);
        let tHalf = t + this.step*0.5;
        let tNew = t + this.step;
        let xzNew = this.stepSolver.solve((xzNew:vector)=>{
            let xNew = xzNew.getSubVector(0,system.length_x());
            let zNew = xzNew.getSubVector(system.length_x(),system.length_z());
            let dx = vector.sub(xNew,x).scale(1/this.step);
            let xHalf = vector.add(x,xNew).scaleSelf(0.5);
            let zHalf = vector.add(z,zNew).scaleSelf(0.5);

            let F = vector.empty(x.length()+z.length());
            F.addSubVector(system.f(xHalf,dx,zHalf,tHalf),0);
            F.addSubVector(system.g(xNew,zNew,tNew),x.length());
            return F;
        },(xzNew:vector)=>{
            let xNew = xzNew.getSubVector(0,system.length_x());
            let zNew = xzNew.getSubVector(system.length_x(),system.length_z());
            let dx = vector.sub(xNew,x).scale(1/this.step);
            let xHalf = vector.add(x,xNew).scaleSelf(0.5);
            let zHalf = vector.add(z,zNew).scaleSelf(0.5);

            let J:matrix = matrix.emptySquare(x.length()+z.length());
            J.addSubMatrix(system.dfdx(xHalf,dx,zHalf,tHalf).scaleSelf(0.5).addSelf(system.dfddx(xHalf,dx,zHalf,tHalf).scaleSelf(1/this.step)),0,0);
            J.addSubMatrix(system.dfdz(xHalf,dx,zHalf,tHalf).scaleSelf(0.5),0,x.length());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),x.length(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),x.length(),x.length());
            return J;
        },system.length_x()+system.length_z(),xz0);

        return new DAEVector(xzNew.getSubVector(0,system.length_x()),xzNew.getSubVector(system.length_x(),system.length_z()),tNew);*/


        let tNew = t + this.step;
        let xNew = x.clone();
        let zNew = z.clone();
        let tHalf = t + 0.5*this.step;
        let F:vector = vector.empty(x.length()+z.length());
        let dx = vector.empty(x.length());
        let xHalf = vector.add(x,xNew).scaleSelf(0.5);
        let zHalf = vector.add(z,zNew).scaleSelf(0.5);

        F.addSubVector(system.f(xHalf,dx,zHalf,tHalf),0);
        F.addSubVector(system.g(xNew,zNew,tNew),x.length());
        let f0norm = F.norm2();
        for(let i=0;i<this.systemSolver.getIterations();i++){
            let J:matrix = matrix.emptySquare(x.length()+z.length());

            J.addSubMatrix(system.dfdx(xHalf,dx,zHalf,tHalf).scaleSelf(0.5).addSelf(system.dfddx(xHalf,dx,zHalf,tHalf).scaleSelf(1/this.step)),0,0);
            J.addSubMatrix(system.dfdz(xHalf,dx,zHalf,tHalf).scaleSelf(0.5),0,x.length());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),x.length(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),x.length(),x.length());
            let dxz = gauss.solve(J,F.scaleSelf(-this.systemSolver.getAlpha()));
            xNew.addSelf(dxz.getSubVector(0,x.length()));
            zNew.addSelf(dxz.getSubVector(x.length(),z.length()));

            dx = vector.sub(xNew,x).scale(1/this.step);
            xHalf = vector.add(x,xNew).scaleSelf(0.5);
            zHalf = vector.add(z,zNew).scaleSelf(0.5);

            F = vector.empty(x.length()+z.length());
            F.addSubVector(system.f(xHalf,dx,zHalf,tHalf),0);
            F.addSubVector(system.g(xNew,zNew,tNew),x.length());
            let fnorm = F.norm2();
            if(i>=this.systemSolver.getMinIterations()&&fnorm<this.systemSolver.getAbsTol()+this.systemSolver.getRelTol()*f0norm){
                return new DAEVector(xNew,zNew,tNew);
            }
        }
        throw new Error("Divergence");
    }
}
