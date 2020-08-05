import {
    DAEVector
} from "../../solver";
import { IDAESolver } from "../../idaeSolver";
import { IDAESystem } from "../../idaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import {NewtonSolver} from "../../../nonlinear/newton";

export class IDAE_EEuler extends IDAESolver{
    constructor(step:number,systemSolver:NewtonSolver){
        super(step,systemSolver);
    }

    private solve_x(x:vector,z:vector,t:number,system:IDAESystem){
        return this.systemSolver.solve((xNew:vector)=>{
            let derx = vector.sub(xNew,x).scale(1/this.step);
            return system.f(x,derx,z,t).scaleSelf(this.step);
        },(xNew:vector)=>{
            let derx = vector.sub(xNew,x).scale(1/this.step);
            return system.dfddx(x,derx,z,t);
        },x.length(),x);

        /*//solve for x_{n+1}
        let xNew = x.clone();
        let F:vector;
        let derx = vector.empty(x.length());
        F = system.f(x,derx,z,t).scaleSelf(-this.step * this.alpha);
        let f0norm = F.norm2();
        for(let i=0;i<this.newtonIterations;i++){
            let J:matrix;
            J = system.dfddx(x,derx,z,t);
            let dx = gauss.solve(J,F);
            xNew.addSelf(dx);

            derx = vector.sub(xNew,x).scale(1/this.step);
            F = system.f(x,derx,z,t).scaleSelf(-this.step * this.alpha);
            let fnorm = F.norm2()/this.step;
            if(fnorm<this.fAbsTol+this.fRelTol*f0norm){
                return xNew;
            }
        }
        throw new Error("divergence at solve_x");*/
    }
    /*private solve_z(x:vector,z:vector,t:number,system:IDAESystem){
        //solve g(x_{n+1}, z_{n+1}, t_{n+1}) = 0 for z_{n+1} 
        let zNew = z.clone();
        for(let i=0;i<this.newtonIterations;i++){
            let J:matrix;
            J = system.dgdz(x, zNew, t);
            let F:vector;
            F = system.g(x,zNew,t).scaleSelf(this.alpha);
            let dz = gauss.solve(J, F);
            zNew.addSelf(dz);
            if(F.norm2()<this.fAbsTol){
                return zNew;
            } 
        }
        throw "divergence at solve_z";
    }*/
    public makeStep(x:vector,z:vector,t:number,system:IDAESystem):DAEVector{
        let xNew = this.solve_x(x,z,t,system);
        let tNew = t + this.step;
        let zNew = this.solve_z(xNew,z,tNew,system);
        return new DAEVector(xNew, zNew, tNew);
    }
}

    //TODO test both variants on lorenz and vanderpol
    /*
    df/dx_{n+1} = df/dx + df/ddx * 1/h
    df/dz_{n+1} = df/dz
    dg/dx_{n+1} = dg/dx
    dg/dz_{n+1} = dg/dz
    F = {
        f(x_{n+1},(x_{n+1}-x_{n})/h, z_{n+1},t_{n+1}) = 0
        g(x_{n+1}, z_{n+1}, t_{n+1}) = 0
    }
    OR
    df/dx_{n+1} = df/dx * h + df/ddx
    df/dz_{n+1} = df/dz * h
    dg/dx_{n+1} = dg/dx * h
    dg/dz_{n+1} = dg/dz * h
    F = {
        f(x_{n+1},(x_{n+1}-x_{n})/h, z_{n+1}, t_{n+1}) * h = 0
        g(x_{n+1},z_{n+1}, t_{n+1}) * h = 0
    }
    */
export class IDAE_IEuler extends IDAESolver{
    constructor(step:number,systemSolver:NewtonSolver){
        super(step,systemSolver);
    }
    public makeStep(x:vector,z:vector,t:number,system:IDAESystem):DAEVector{
        /*let xz0 = vector.concat([x,z]);
        let tNew = t + this.step;
        let xzNew = this.stepSolver.solve((xzNew:vector)=>{
            let xNew = xzNew.getSubVector(0,system.length_x());
            let zNew = xzNew.getSubVector(system.length_x(),system.length_z());
            let derx = vector.sub(xNew,x).scale(1/this.step);
            let F:vector = vector.empty(system.length_x()+system.length_z());
            F.addSubVector(system.f(xNew,derx,zNew,tNew),0);
            F.addSubVector(system.g(xNew,zNew,tNew),system.length_x());
            return F;
        }, (xzNew:vector)=>{
            let xNew = xzNew.getSubVector(0,system.length_x());
            let zNew = xzNew.getSubVector(system.length_x(),system.length_z());
            let J:matrix;
            J = matrix.emptySquare(x.length()+z.length());
            //scale both part of (J dx = -F) by step
            J.addSubMatrix(system.dfdx(xNew,derx,zNew,tNew).addSelf(system.dfddx(xNew,derx,zNew,tNew).scaleSelf(1/this.step)),0,0);
            J.addSubMatrix(system.dfdz(xNew,derx,zNew,tNew),0,x.length());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),x.length(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),x.length(),x.length());
            return J;
        }, system.length_x()+system.length_z(), xz0);
        return new DAEVector(xzNew.getSubVector(0,system.length_x()),xzNew.getSubVector(system.length_x(),system.length_z()),tNew);*/
        let xNew = x.clone();
        let zNew = z.clone();
        let tNew = t + this.step;
        let derx = vector.empty(x.length());
        let F:vector;
        F = vector.empty(x.length()+z.length());
        F.addSubVector(system.f(xNew,derx,zNew,tNew),0);
        F.addSubVector(system.g(xNew,zNew,tNew),x.length());
        let f0norm = F.norm2();;
        for(let i=0;i<this.systemSolver.getIterations();i++){
            let J:matrix;
            J = matrix.emptySquare(x.length()+z.length());
            //scale both part of (J dx = -F) by step
            J.addSubMatrix(system.dfdx(xNew,derx,zNew,tNew).addSelf(system.dfddx(xNew,derx,zNew,tNew).scaleSelf(1/this.step)),0,0);
            J.addSubMatrix(system.dfdz(xNew,derx,zNew,tNew),0,x.length());
            J.addSubMatrix(system.dgdx(xNew,zNew,tNew),x.length(),0);
            J.addSubMatrix(system.dgdz(xNew,zNew,tNew),x.length(),x.length());

            let dxz = gauss.solve(J,F.scaleSelf(-this.systemSolver.getAlpha()));
            xNew.addSelf(dxz.getSubVector(0,x.length()));
            zNew.addSelf(dxz.getSubVector(x.length(),z.length()));

            derx = vector.sub(xNew,x).scale(1/this.step);

            F = vector.empty(x.length()+z.length());
            F.addSubVector(system.f(xNew,derx,zNew,tNew),0);
            F.addSubVector(system.g(xNew,zNew,tNew),x.length());
            let fnorm = F.norm2();
            if(i>=this.systemSolver.getMinIterations()&&fnorm<this.systemSolver.getAbsTol()+this.systemSolver.getRelTol()*f0norm){
                return new DAEVector(xNew, zNew, tNew);
            }
        }
        throw new Error("Divergence");
    }
}