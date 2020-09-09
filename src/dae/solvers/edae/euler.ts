import {
    DAEVector
} from "../../daeVector";
import { EDAESolver } from "../../edaeSolver";
import { EDAESystem } from "../../edaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import { NewtonSolver } from "../../../math/newton";

/**
 * forward euler for explicit dae with index one
 */
export class EDAE_EEuler extends EDAESolver{
    public makeStep(x:vector,z:vector,t:number,system:EDAESystem):DAEVector{
        let xNew = system.f(x,z,t).scaleSelf(this.step).addSelf(x);
        let tNew = t + this.step;
        let zNew = system.g(xNew,tNew);
        return new DAEVector(xNew, zNew, tNew);
    }
}
/**
 * backward euler method for explicit dae with index one
 */
export class EDAE_IEuler extends EDAESolver{
    protected stepSolver:NewtonSolver;
    constructor(step:number,stepSolver:NewtonSolver){
        super(step);
        this.stepSolver = stepSolver;
    }
    /*
    F = x_{n+1} - x_n - hf(x_{n+1},g(x_{n+1},t_{n+1}),t_{n+1}) = 0
    dFi/dx_{n+1}j = \delta_ij - h*df/dx - h*df/dz*dg/dx
    */
    public makeStep(x:vector,z:vector,t:number,system:EDAESystem):DAEVector{
        let xNew = x.clone();
        let tNew = t + this.step;
        let zNew = system.g(xNew,tNew);
        let F:vector = system.f(xNew,zNew,tNew).scaleSelf(-this.step).addSelf(xNew).subSelf(x);
        let f0norm = F.norm2();
        for(let i=0;i<this.stepSolver.getIterations();i++){
            let J:matrix = matrix.identity(system.length_x());
            
            J.subSelf(system.dfdx(xNew,zNew,tNew).addSelf(matrix.mult(system.dfdz(xNew,zNew,tNew),system.dgdx(xNew,tNew))).scaleSelf(this.step));
            let dx = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            xNew.addSelf(dx);
            
            zNew = system.g(xNew,tNew);
            F = system.f(xNew,zNew,tNew).scaleSelf(-this.step).addSelf(xNew).subSelf(x);
            let fnorm = F.norm2();
            if(i>=this.stepSolver.getMinIterations()&&fnorm<this.stepSolver.getAbsTol()+this.stepSolver.getRelTol()*f0norm){
                return new DAEVector(xNew, zNew, tNew);
            }
        }
        throw new Error("Divergence of newton method");
    }
    /*
    Fx = x_{n+1} - x_n - hf(x_{n+1},z_{n+1},t_{n+1}) = 0
    Fz = z_{n+1} - g(x_{n+1},t_{n+1}) = 0
    dFx/dx = \delta - h df/dx
    dFx/dz = - h dfdz
    dFz/dx = - dg/dx
    dFz/dz = \delta
    J = 
     - - - - - - - - -
    | dFx/dx | dFx/dz |
    | dFz/dx | dFz/dz |
     - - - - - - - - - 
    */
   /* OLD
    public makeStep(x:vector,z:vector,t:number,system:EDAESystem):DAEVector{
        let xNew = x.clone();
        let zNew = z.clone();
        let tNew = t + this.step;
        let length = system.length_x() + system.length_z();
        for(let i=0;i<this.newtonIterations;i++){
            let J:matrix = matrix.identity(length);
            let F:vector = vector.empty(length);
            let dfdx = system.dfdx(xNew,zNew, tNew);
            J.addSubMatrix(dfdx.scaleSelf(-this.step),0,0);
            let dfdz = system.dfdz(xNew,zNew, tNew);
            J.addSubMatrix(dfdz.scale(-this.step,dfdz),0,x.length());//строка столбец
            let dgdx = system.dgdx(xNew, tNew);
            J.subSubMatrix(dgdx,x.length(),0);//строка столбец
            let f = system.f(xNew, zNew, tNew);
            f.scaleSelf(-this.step);
            F.addSubVector(f.addSelf(xNew).subSelf(x),0);
            let g = system.g(xNew, tNew);
            F.subSubVector(zNew.sub(g,g), x.length());
            let fnorm = F.norm2();
            let dxz = gauss.solve(J,F.scaleSelf(-this.alpha));
            xNew.addSelf(dxz.getSubVector(0,x.length()));
            zNew.addSelf(dxz.getSubVector(x.length(),z.length()));
            if(fnorm<this.fAbsTol){
                return new DAEVector(xNew, zNew, tNew);
            }
        }
        throw new Error("Divergence of newton method");
    }*/
}