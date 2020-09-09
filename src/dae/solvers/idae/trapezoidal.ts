import {
    DAEVector
} from "../../daeVector";
import { IDAESolver } from "../../idaeSolver";
import { IDAESystem } from "../../idaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import { NewtonSolver } from "../../../math/newton";
/*
explicit
    x_{n+1} = x_n + 0.5*h(f(x_n,t_n)+f(x_n+hf(x_n,t_n),t_{n+1}))
    {
        1.  f(x_n,k_1,z_n,t_n) = 0
        implicit Nx
        2.  g(x_n+hk_1,z^1_n,t_{n+1}) = 0
        implicit Nz
        3.  f(x_n+hk_1,k_2,z^1_n,t_{n+1}) = 0
        implicit Nx
        4.  x_{n+1} = x_n + 0.5*h(k_1 + k_2)
        explicit Nx
        5.  g(x_{n+1},z_{n+1},t_{n+1}) = 0
        implicit Nz
    }
implicit
    x_{n+1} = x_n + 0.5*h(f(x_n,t_n)+f(x_{n+1}.t_{n+1}))
    {
        1.  f(x_n,k_1,z_n,t_n) = 0
        implicit Nx
        2.  g(x_{n+1},z_{n+1},t_{n+1}) = 0
            f(x_{n+1},(x_{n+1}-x_n)/(2h)-k_1,z_{n+1},t_{n+1}) = 0
        implicit Nx + Nz system
    }
*/


/**
 * explicit trapezoidal method for implicit dae with index one
 */
export class IDAE_ETrapezoidal extends IDAESolver{
    constructor(step:number,systemSolver:NewtonSolver){
            super(step,systemSolver);
    }
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {
        //1.    f(x_n,k_1,z_n,t_n) = 0
        let x1 = this.solve_dx(x,z,t,system).scaleSelf(this.step).addSelf(x);
        let tNew = t + this.step;
        //2.    g(x_n+hk_1,z^1_n,t_{n+1}) = 0
        let z1 = this.solve_z(x1,z,tNew,system);
        //3.    f(x_n+hk_1,k_2,z^1_n,t_{n+1}) = 0
        let x2 = this.solve_dx(x1,z1,tNew,system).scaleSelf(this.step).addSelf(x);
        //4.    x_{n+1} = x_n + 0.5*h(k_1 + k_2)
        let xNew = x1.addSelf(x2).scaleSelf(0.5);
        //5.    g(x_{n+1},z_{n+1},t_{n+1}) = 0
        let zNew = this.solve_z(xNew,z1,tNew,system);
        return new DAEVector(xNew,zNew,tNew);
    }
}
/**
 * implicit trapezoidal method for implicit dae with index one
 */
export class IDAE_ITrapezoidal extends IDAESolver{
    protected stepSolver:NewtonSolver;
    constructor(step:number,systemSolver:NewtonSolver,stepSolver:NewtonSolver){
            super(step,systemSolver);
            this.stepSolver = stepSolver;
    }
    /*x_{n+1} = x_n + 0.5*h(f(x_n,t_n)+f(x_{n+1}.t_{n+1}))
    {
        1.  f(x_n,k_1,z_n,t_n) = 0
        implicit Nx
        2.  Fx = f(x_{n+1},(x_{n+1}-x_n)*2/h-k_1,z_{n+1},t_{n+1}) = 0
            Fz = g(x_{n+1},z_{n+1},t_{n+1}) = 0
        implicit Nx + Nz system
        dFx/dx_{n+1} = df/dx + df/ddx *2/h
        dFx/dz_{n+1} = df/dz
        dFz/dx_{n+1} = dg/dx
        dFz/dz_{n+1} = dg/dz
    }*/
    public makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector {

        /*let k1 = this.solve_dx(x,z,t,system);
        let xz0 = vector.concat([x.clone().addSelf(vector.scale(k1,this.step)),z]);
        let tNew = t + this.step;
        let xzNew = this.stepSolver.solve((xzNew:vector)=>{
            let xNew = xzNew.getSubVector(0,system.length_x());
            let zNew = xzNew.getSubVector(system.length_x(),system.length_z());
            let dx = vector.sub(xNew,x).scale(2/this.step).sub(k1);

            let F:vector = vector.empty(x.length()+z.length());
            F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
            F.addSubVector(system.g(xNew,zNew,tNew),x.length());
            return F;

        },(xzNew:vector)=>{
            let xNew = xzNew.getSubVector(0,system.length_x());
            let zNew = xzNew.getSubVector(system.length_x(),system.length_z());
            let dx = vector.sub(xNew,x).scale(2/this.step).sub(k1);

            let J:matrix = matrix.emptySquare(x.length()+z.length());
            J.addSubMatrix(system.dfdx(xNew,dx,zNew,tNew).addSelf(system.dfddx(xNew,dx,zNew,tNew).scaleSelf(2/this.step)),0,0);
            J.addSubMatrix(system.dfdz(xNew,dx,zNew,tNew),0,x.length());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),x.length(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),x.length(),x.length());
            return J;
        },system.length_x() + system.length_z(), xz0);
        
        return new DAEVector(xzNew.getSubVector(0,system.length_x()),xzNew.getSubVector(system.length_x(),system.length_z()),tNew);*/

    /*x_{n+1} = x_n + 0.5*h(f(x_n,t_n)+f(x_{n+1}.t_{n+1}))
    {
        1.  f(x_n,k_1,z_n,t_n) = 0
        implicit Nx
        2.  Fx = f(x_{n+1},(x_{n+1}-x_n)*2/h-k_1,z_{n+1},t_{n+1}) = 0
            Fz = g(x_{n+1},z_{n+1},t_{n+1}) = 0
        implicit Nx + Nz system
        dFx/dx_{n+1} = df/dx + df/ddx *2/h
        dFx/dz_{n+1} = df/dz
        dFz/dx_{n+1} = dg/dx
        dFz/dz_{n+1} = dg/dz
    }*/
        
        //1.    f(x_n,k_1,z_n,t_n) = 0
        let k1 = this.solve_dx(x,z,t,system);
        let tNew = t + this.step;
        let xNew = x.clone().addSelf(vector.scale(k1,this.step));//better approximation for xNew
        let zNew = z.clone();
        let dx = vector.sub(xNew,x).scaleSelf(2/this.step).subSelf(k1);
        let F:vector = vector.empty(x.length()+z.length());
        F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
        F.addSubVector(system.g(xNew,zNew,tNew),x.length());
        let f0norm = F.norm2();
        for(let i=0;i<this.stepSolver.getIterations();i++){
            let J:matrix = matrix.emptySquare(x.length()+z.length());

            J.addSubMatrix(system.dfdx(xNew,dx,zNew,tNew).addSelf(system.dfddx(xNew,dx,zNew,tNew).scaleSelf(2/this.step)),0,0);
            J.addSubMatrix(system.dfdz(xNew,dx,zNew,tNew),0,x.length());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),x.length(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),x.length(),x.length());

            let dxz = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            xNew.addSelf(dxz.getSubVector(0,x.length()));
            zNew.addSelf(dxz.getSubVector(x.length(),z.length()));
            
            dx = vector.sub(xNew,x).scaleSelf(2/this.step).subSelf(k1);

            F = vector.empty(x.length()+z.length());
            F.addSubVector(system.f(xNew,dx,zNew,tNew),0);
            F.addSubVector(system.g(xNew,zNew,tNew),x.length());
            let fnorm = F.norm2();
            if(i>=this.stepSolver.getMinIterations()&&fnorm<this.stepSolver.getRelTol()+this.stepSolver.getAbsTol()*f0norm){
                return new DAEVector(xNew,zNew,tNew);
            }
        }
        throw new Error("Divergence");
    }
}