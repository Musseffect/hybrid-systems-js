import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { gauss } from "../math/gauss";
import { IDAEHybridState } from "./idaeHybridSystem";
import { IDAESystem } from "./idaeSystem";
import { DAEVector } from "./daeVector";
import {NewtonSolver} from "../math/newton";

export abstract class IDAESolver {
    protected systemSolver:NewtonSolver;
    protected step: number;
    public constructor(step: number, newtonSolver:NewtonSolver) {
        this.step = step;
        this.systemSolver = newtonSolver;
    }
    public setStep(value: number) {
        this.step = value;
    }
    public getStep(): number {
        return this.step;
    }
    public solve_z(x: vector, z: vector, t: number, system: IDAESystem): vector {
        if (system.length_z() == 0)
            return z;
        //solve g(x_{n+1},z_{n+1},t_{n+1}) = 0 for z_{n+1} 
        return this.systemSolver.solve((zNew:vector)=>{
            return system.g(x,zNew,t);
        },(zNew:vector)=>{
            return system.dgdz(x, zNew, t);
        },system.length_z(),z.clone());
        /*let zNew = z.clone();
        let F: vector = system.g(x, zNew, t);
        let f0norm: number = F.norm2();
        for (let i = 0; i < this.systemSolver.getIterations(); i++) {
            let J: matrix;
            J = system.dgdz(x, zNew, t);
            let fnorm = F.norm2();
            let dz = gauss.solve(J, F.scaleSelf(-this.systemSolver.getAlpha()));
            zNew.addSelf(dz);
            F = system.g(x, zNew, t);
            if (fnorm < this.systemSolver.getAbsTol() + this.systemSolver.getRelTol() * f0norm) {
                return zNew;
            }
        }
        throw "divergence at solve_z";*/
    }
    public solve_dx(x: vector, z: vector, t: number, system: IDAESystem): vector {
        if (system.length_x() == 0)
            return new vector([]);
        //solve f(x,dx,z,t) = 0
        return this.systemSolver.solve((dx:vector)=>{
            return system.f(x, dx, z, t);
        },(dx:vector)=>{
            return system.dfddx(x, dx, z, t);
        },system.length_x());
        /*
        let dx = vector.empty(system.length_x());
        let F: vector = system.f(x, dx, z, t);
        let f0norm: number = F.norm2();
        for (let i = 0; i < this.systemSolver.getIterations(); i++) {
            let J: matrix;
            J = system.dfddx(x, dx, z, t);
            let fnorm = F.norm2();
            let _dx = gauss.solve(J, F.scaleSelf(-this.systemSolver.getAlpha()));
            dx.addSelf(_dx);
            F = system.f(x, dx, z, t);
            if (fnorm < this.systemSolver.getAbsTol() + this.systemSolver.getRelTol() * f0norm) {
                return dx;
            }
        }
        throw "divergence at solve_dx";*/
    }
    public solve_dzdt(dx: vector, x: vector, z: vector, t: number, state: IDAEHybridState): vector {
        if (state.length_z() == 0)
            return z;
        let A: matrix = state.dgdz(x, z, t);
        let b: vector;
        if (state.length_x() != 0)
            b = state.dgdx(x, z, t).multVec(dx).addSelf(state.dgdt(x, z, t)).scaleSelf(-1);
        else
            b = state.dgdt(x, z, t).scaleSelf(-1);
        //solve linear system
        //dg/dz dz/dt = -dg/dx x' - dg/dt
        let dzdt = gauss.solve(A, b);
        return dzdt;
    }
    public abstract makeStep(x: vector, z: vector, t: number, system: IDAESystem): DAEVector;
}
