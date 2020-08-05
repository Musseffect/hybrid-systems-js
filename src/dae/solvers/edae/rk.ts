import {
    DAEVector
} from "../../solver";
import { EDAESolver } from "../../edaeSolver";
import { EDAESystem } from "../../edaeSystem";
import { vector } from "../../../math/vector";
import { matrix } from "../../../math/matrix";
import { gauss } from "../../../math/gauss";
import { NewtonSolver } from "../../../nonlinear/newton";


/**
 * explicit rk methods for explicit dae of index 1
 */
abstract class EDAE_ERK extends EDAESolver
{
    protected a:number[][];
    protected b:number[];
    protected c:number[];
    constructor(step:number,a:number[][],b:number[],c:number[]){
        super(step);
        this.a = a;
        this.b = b;
        this.c = c;
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        let k:vector[] = [];
        for(let i=0;i<this.c.length;i++){
            let _x = x.clone();
            for(let j=0;j<i;j++){
                _x.add(vector.scale(k[j],this.step*this.a[i-1][j]));
            }
            let _t = t + this.c[i] * this.step;
            k.push(system.f(_x,system.g(_x,_t),_t));
        }
        let xNew = x.clone();
        for(let i=0;i<this.b.length;i++){
            xNew.add(k[i].scaleSelf(this.step*this.b[i]));
        }
        let tNew = t + this.step;
        return new DAEVector(xNew,system.g(xNew,tNew),tNew);
    }
}
/**
 * explicit rk methods with adaptive step for explicit dae of index 1
 */
abstract class EDAE_ERKA extends EDAE_ERK{
    protected _b:number[];
    protected errorOrder:number;
    protected errorTolerance:number;
    protected maxStep:number;
    protected minStep:number;
    constructor(step:number,maxStep:number,errorOrder:number,errorTolerance:number,a:number[][],b:number[],c:number[],_b:number[]){
        super(step,a,b,c);
        this._b = _b;
        this.errorOrder = errorOrder;
        this.errorTolerance = errorTolerance;
        this.minStep = step;
        this.maxStep = maxStep;
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        while(true){
            let k:vector[] = [];
            for(let i=0;i<this.c.length;i++){
                let _x = x.clone();
                for(let j=0;j<i;j++){
                    _x.add(vector.scale(k[j],this.step*this.a[i-1][j]));
                }
                let _t = t + this.c[i] * this.step;
                k.push(system.f(_x,system.g(_x,_t),_t));
            }
            let difference = vector.empty(x.length());
            for(let i=0;i<this._b.length;i++){
                difference.addSelf(vector.scale(k[i],this._b[i]-this.b[i]));
            }
            let difNorm = difference.norm2();
            var stepOpt=Math.pow(this.errorTolerance*0.5/difNorm,1/this.errorOrder)*this.step;
            if(isNaN(stepOpt))
            {
                stepOpt=this.minStep;
            }
            stepOpt=Math.min(Math.max(this.minStep,stepOpt),this.maxStep);
            if(stepOpt*2<this.step)
            {
                this.step=stepOpt;
                continue;
            }
            this.step = stepOpt;
            let xNew = x.clone();
            let tNew = t + this.step;
            for(let i=0;i<this.b.length;i++){
                xNew.add(vector.scale(k[i],this.step*this.b[i]));
            }
            return new DAEVector(xNew,system.g(xNew,tNew),tNew);
        }
    }
}
/**
 * implicit rk methods for explicit dae of index 1
 */
abstract class EDAE_IRK extends EDAESolver{
    protected a:number[][];
    protected b:number[];
    protected c:number[];
    protected stepSolver:NewtonSolver;
    protected stages:number;
    constructor(step:number,stepSolver:NewtonSolver,
        a:number[][],b:number[],c:number[],stages:number){
        super(step);
        this.a = a;
        this.b = b;
        this.c = c;
        this.stepSolver = stepSolver;
        this.stages = stages;
    }
    /*  USE LATEX, LUKE
        k_i = f(x_n + h * sum_{j=1}^{S} k_j * a_ij, g(x_n + h * sum_{j=1}^{S} k_j * a_ij, t_n + h * c_i), t_n + h * c_i)

        F_i = k_i - f(x_n + h * sum k_j * aij, g(x_n + h * sum_{j=1}^{S} k_j * a_ij, t_n + h * c_i), t_n + h * c_i) = 0

        dF_il/dk_jm = \delta_il_jm - df_l/dx_m * h * a_ij - df_l/dz dg_l/dx_m * h * a_ij

        memory layout:
                  j->
        |-------------------|
        | dF0/dk0 | dF0/dk1 |
    i   |---------|---------|
    |   | dF1/dk0 | dF1/dk1 |
    v   |-------------------|
     */
    protected function(k:vector[],x:vector,z:vector,t:number,system:EDAESystem):vector{
        let F:vector = vector.empty(system.length_x()*this.stages);
        for(let i = 0;i<this.stages;i++){
            let _t = t + this.c[i]*this.step;
            let _x = x.clone();
            for(let j=0;j<this.stages;j++)
                _x.addSelf(vector.scale(k[j],this.a[i][j]*this.step));
            let _z = system.g(_x,_t);
            F.addSubVector(k[i],i*system.length_x());
            F.subSubVector(system.f(_x,_z,_t),i*system.length_x());
        }
        return F;
    }
    protected jacobiMatrix(k:vector[],x:vector,z:vector,t:number,system:EDAESystem):matrix{
        let J:matrix=matrix.identity(this.stages*system.length_x());
        for(let i = 0;i<this.stages;i++){
            let _t = t + this.c[i]*this.step;
            let _x = x.clone();
            for(let j=0;j<this.stages;j++)
                _x.addSelf(vector.scale(k[j],this.a[i][j]*this.step));
            let _z = system.g(_x,_t);
            let dfdx = system.dfdx(_x,_z,_t);
            let dfdz = system.dfdz(_x,_z,_t);
            let dgdx = system.dgdx(_x,_t);
            let value = matrix.mult(dfdz,dgdx).addSelf(dfdx);
            for(let j=0;j<this.stages;j++){
                J.subSubMatrix(value.scaleSelf(this.step*this.a[i][j]),i*system.length_x(),j*system.length_x());
            }
        }
        return J;
    }
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        let k:vector[] = [];
        for(let i=0;i<this.stages;i++){
            k.push(vector.empty(system.length_x()));
        }

        let F:vector = this.function(k,x,z,t,system);
        let f0norm = F.norm2();
        for(let it = 0;it<this.stepSolver.getIterations();it++){
            let J:matrix = this.jacobiMatrix(k,x,z,t,system);
            let dk = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
            for(let i=0;i<this.stages;i++){
                k[i].addSelf(dk.getSubVector(i*system.length_x(),system.length_x()));
            }
            F = this.function(k,x,z,t,system);
            let fnorm = F.norm2();

            if(it>=this.stepSolver.getMinIterations()&&fnorm<this.stepSolver.getAbsTol()+this.stepSolver.getRelTol()*f0norm){
                let xNew = x.clone();
                for(let j=0;j<this.stages;j++){
                    xNew.addSelf(k[j].scaleSelf(this.step * this.b[j]));
                }
                let tNew = t + this.step;
                return new DAEVector(xNew,system.g(xNew,tNew),tNew);
            }
        }
        throw new Error("Divergence");
    }
}
/**
 * implicit rk methods with adaptive step for explicit dae of index 1
 */
abstract class EDAE_IRKA extends EDAE_IRK{
    protected _b:number[];
    protected errorOrder:number;
    protected errorTolerance:number;
    protected minStep:number;
    protected maxStep:number;
    constructor(step:number,maxStep:number,errorOrder:number,errorTolerance:number,stepSolver:NewtonSolver,a:number[][],b:number[],c:number[],_b:number[],stages:number){
        super(step,stepSolver,a,b,c,stages);
        this._b = _b;
        this.errorOrder = errorOrder;
        this.errorTolerance = errorTolerance;
        this.minStep = step;
        this.maxStep = maxStep;
    }
    protected function(k:vector[],x:vector,z:vector,t:number,system:EDAESystem):vector{
        let F:vector = vector.empty(system.length_x()*this.stages);
        for(let i = 0;i<this.stages;i++){
            let _t = t + this.c[i]*this.step;
            let _x = x.clone();
            for(let j=0;j<this.stages;j++)
                _x.addSelf(vector.scale(k[j],this.a[i][j]*this.step));
            let _z = system.g(_x,_t);
            F.addSubVector(k[i],i*system.length_x());
            F.subSubVector(system.f(_x,_z,_t),i*system.length_x());
        }
        return F;
    }
    protected jacobiMatrix(k:vector[],x:vector,z:vector,t:number,system:EDAESystem):matrix{
        let J:matrix=matrix.identity(this.stages*system.length_x());
        for(let i = 0;i<this.stages;i++){
            let _t = t + this.c[i]*this.step;
            let _x = x.clone();
            for(let j=0;j<this.stages;j++)
                _x.addSelf(vector.scale(k[j],this.a[i][j]*this.step));
            let _z = system.g(_x,_t);
            let dfdx = system.dfdx(_x,_z,_t);
            let dfdz = system.dfdz(_x,_z,_t);
            let dgdx = system.dgdx(_x,_t);
            let value = matrix.mult(dfdz,dgdx).addSelf(dfdx);
            for(let j=0;j<this.stages;j++){
                J.subSubMatrix(value.scaleSelf(this.step*this.a[i][j]),i*system.length_x(),j*system.length_x());
            }
        }
        return J;
    }
    //TODO test
    public makeStep(x: vector, z: vector, t: number, system: EDAESystem): DAEVector {
        while(true){
            let shouldThrow = true;
            let k:vector[] = [];
            for(let i=0;i<this.stages;i++){
                k.push(vector.empty(system.length_x()));
            }
            let F:vector = this.function(k,x,z,t,system);
            let f0norm = F.norm2();
            for(let it = 0;it<this.stepSolver.getIterations();it++){
                let J:matrix = this.jacobiMatrix(k,x,z,t,system);
                let dk = gauss.solve(J,F.scaleSelf(-this.stepSolver.getAlpha()));
                for(let i=0;i<this.stages;i++){
                    k[i].addSelf(dk.getSubVector(i*system.length_x(),system.length_x()));
                }
                F = this.function(k,x,z,t,system);
                let fnorm = F.norm2();
    
                if(it>=this.stepSolver.getMinIterations()&&fnorm<this.stepSolver.getAbsTol()+this.stepSolver.getRelTol()*f0norm){
                    let difference = vector.empty(x.length());
                    for(let i=0;i<this._b.length;i++){
                        difference.addSelf(vector.scale(k[i],this._b[i]-this.b[i]));
                    }
                    let difNorm = difference.norm2();
                    var stepOpt=Math.pow(this.errorTolerance*0.5/difNorm,1/this.errorOrder)*this.step;
                    if(isNaN(stepOpt))
                    {
                        stepOpt=this.minStep;
                    }
                    stepOpt=Math.min(Math.max(this.minStep,stepOpt),this.maxStep);
                    if(stepOpt*2<this.step)
                    {
                        this.step=stepOpt;
                        shouldThrow = false;
                        break;
                    }
                    this.step = stepOpt;
                    let xNew = x.clone();
                    let tNew = t + this.step;
                    for(let j=0;j<this.stages;j++){
                        xNew.addSelf(k[j].scaleSelf(this.step * this.b[j]));
                    }
                    return new DAEVector(xNew,system.g(xNew,tNew),tNew);
                }
            }
            if(shouldThrow)
                throw new Error("Divergence");
        }
    }
}
/**
 * classic RK4
 */
export class EDAE_RK4 extends EDAE_ERK{
    //TODO: TEST
    constructor(step:number){
        super(step,
            [
                [0.5],
                [0,0.5],
                [0,0,1]
            ],
            [1/6,1/3,1/3,1/6],
            [0,0.5,0.5,1]
            );
    }
}
export class EDAE_RK4_2 extends EDAE_ERK{
    //TODO: TEST
    constructor(step:number){
        super(step,
            [
                [1/3],
                [-1/3,1],
                [1,-1,1]
            ],
            [1/8,3/8,3/8,1/8],
            [0,1/3,2/3,1]
            );
    }
}
export class EDAE_RK4_RALSTON extends EDAE_ERK{
    //TODO: TEST
    constructor(step:number){
        super(step,
            [
                [0.4],
                [0.29697761,0.15875964],
                [0.2181004,-3.05096516,3.83286476]
            ],
            [0.17476028,-0.55148066,1.20553560,0.17118478],
            [0,0.4,0.45573725,1]
            );
    }
}
export class EDAE_RK6 extends EDAE_ERK{
    //TODO: TEST
    constructor(step:number){
        super(step,
            [
                [2/5],
                [0,4/5],
                [169/1458,110/729,-65/1458],
                [-44/675,-88/135,76/351,336/325],
                [21/106,0,-105/689,-324/689,45/106],
                [-2517/4864,-55/38,10615/31616,567/7904,7245/4864,2597/2432]
            ],
            [0,0,1375/4992,6561/20384,3375/12544,53/768,19/294],
            [0,2/5,4/5,2/9,8/15,0,1]
            );
    }

}
export class EDAE_RK6_2 extends EDAE_ERK{
    //TODO: TEST
    constructor(step:number){
        super(step,
            [
                [1/3],
                [0,2/3],
                [1/12,1/3,-1/12],
                [25/48,-55/24,35/48,15/8],
                [3/20,-11/24,-1/8,1/2,1/10],
                [-261/260,33/13,43/156,-118/39,32/195,80/39]
            ],
            [13/200,0,11/40,11/40,4/25,4/25,13/200],
            [0,1/3,2/3,1/3,5/6,1/6,1]
            );
    }

}
export class EDAE_RK8 extends EDAE_ERK{
    //TODO: TEST
    constructor(step:number){
        var root21=Math.sqrt(21);
        super(step,
            [
                [1/2],
                [1/4,1/4],
                [1/7,(-7-3*root21)/98,0,(21+5*root21)/49],
                [(11+root21)/84,0,(18+4*root21)/63,(21-root21)/252],
                [(5+root21)/48,0,(9+root21)/36,(-231+14*root21)/360,(63-7*root21)/80],
                [(10-root21)/42,0,(-432+92*root21)/315,(633-145*root21)/90,(-503+115*root21)/70,(63-13*root21)/35],
                [1/14,0,0,0,(14-3*root21)/126,(13-3*root21)/63,1/9],
                [1/32,0,0,0,(91-21*root21)/576,11/72,(-385-75*root21)/1152,(63+13*root21)/128],
                [1/14,0,0,0,1/9,(-733-147*root21)/2205,(515+111*root21)/504,(-51-11*root21)/56,(132+28*root21)/245],
                [0,0,0,0,(-42+7*root21)/18,(-18+28*root21)/45,(-273-53*root21)/72,(301+53*root21)/72,(28-28*root21)/45,(49-7*root21)/18]
            ],
            [1/20,0,0,0,0,0,0,49/180,16/45,49/180,1/20],
            [0,1/2,1/2,(7+root21)/14,(7+root21)/14,1/2,(7-root21)/14,
                (7-root21)/14,1/2,(7+root21)/14,1]
            );
    }
}


export class EDAE_DOPRI5 extends EDAE_ERKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number){
        super(step,maxStep,5,errorTolerance,
            [
                [1/5],
                [3/40,9/40],
                [44/45,-56/15, 32/9],
                [19372/6561,-25360/2187, 64448/6561,-212/729],
                [9017/3168,-355/33, 46732/5247,49/176,-5103/18656],
                [35/384,0,500/1113,125/192,-2187/6784,11/84]
            ],
            [35/384,0,500/1113,125/192,-2187/6784,11/84,0],
            [0,1/5,3/10,4/5,8/9,1,1],
            [5179/57600,0,7571/16695,393/640,-92097/339200,187/2100,1/40],
            );
    }
}
/**
 * BogackiShampine23
 */
export class EDAE_BS23 extends EDAE_ERKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number){
        super(step,maxStep,3,errorTolerance,
            [
                [1/2],
                [0,3/4],
                [2/9,1/3, 4/9]
            ],
            [2/9,1/3,4/9,0],
            [0,0.5,0.75,1],
            [7/24,1/4,1/3,1/8]
            );
    }
}
/**
 * 
 */
export class EDAE_HeunEuler extends EDAE_ERKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number){
        super(step,maxStep,2,errorTolerance,
            [
                [1]
            ],
            [1/2,1/2],
            [0,1],
            [1,0]
            );
    }
}
export class EDAE_MidpointEuler extends EDAE_ERKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number){
        super(step,maxStep,2,errorTolerance,
            [
                [1/2]
            ],
            [0,1],
            [0,0.5],
            [1,0]
            );
    }
}

export class EDAE_RADAUIA5 extends EDAE_IRK{
    //TODO: TEST
    constructor(step:number,stepSolver:NewtonSolver){
        let root6=Math.sqrt(6);
        super(step,stepSolver,
            [
                [1/9,(-1-root6)/18,(-1+root6)/18],
                [1/9,(88+7*root6)/360,(88-43*root6)/360],
                [1/9,(88+43*root6)/360,(80-7*root6)/360]
            ],
            [1/9,(16+root6)/36,(16-root6)/36],
            [0,(6-root6)/10,(6+root6)/10],
            3
            );
    }
}
export class EDAE_RADAUIIA3 extends EDAE_IRK{
    //TODO: TEST
    constructor(step:number,stepSolver:NewtonSolver){
        let root6=Math.sqrt(6);
        super(step,stepSolver,
            [
                [5/12,-1/12],
                [3/4,1/4]
            ],
            [3/4,1/4],
            [1/3,1],
            2
            );
    }
    
}
export class EDAE_RADAUIIA5 extends EDAE_IRK{
    //TODO: TEST
    constructor(step:number,stepSolver:NewtonSolver){
        let root6=Math.sqrt(6);
        super(step,stepSolver,
            [
                [11/45-7*root6/360,37/225-169*root6/1800,-2/225+root6/75],
                [37/225+169*root6/1800,11/45+7*root6/360,-2/225-root6/75],
                [4/9-root6/36,4/9+root6/36,1/9]
            ],
            [4/9-root6/36,4/9+root6/36,1/9],
            [2/5-root6/10,2/5+root6/10,1],
            3
            );
    }
    
}
/**
 * Embedded gauss-legendre 4th order
 */
export class EDAE_GAUSSLEGENDRE4 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        let sqrt3 = Math.sqrt(3); 
        super(step,maxStep,4,errorTolerance,stepSolver,
            [
                [1/4,1/4-sqrt3/6],
                [1/4+sqrt3/6,1/4]
            ],
            [0.5,0.5],
            [(3-sqrt3)/6,(3+sqrt3)/6],
            [(1+sqrt3)/2,(1-sqrt3)/2],
            2
            );
    }
}
/**
 * Embedded gauss-legendre 6th order
 */
export class EDAE_GAUSSLEGENDRE6 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        let sqrt15 = Math.sqrt(15); 
        super(step,maxStep,6,errorTolerance,stepSolver,
            [
                [5/36,2/9-sqrt15/15,5/36-sqrt15/30],
                [5/36+sqrt15/24,2/9,5/36,-sqrt15/24],
                [5/36+sqrt15/30,2/9+sqrt15/15,5/36]
            ],
            [5/18,4/9,5/18],
            [0.5-sqrt15/10,0.5,0.5+sqrt15/10],
            [-5/6,8/3,-5/6],
            3
            );
    }
}
export class EDAE_LOBATTOIIIA2 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        super(step,maxStep,2,errorTolerance,stepSolver,
            [
                [0,0],
                [1/2,1/2]
            ],
            [1/2,1/2],
            [0,1],
            [1,0],
            2
            );
    }
}
export class EDAE_LOBATTOIIIA4 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        super(step,maxStep,4,errorTolerance,stepSolver,
            [
                [0,0,0],
                [5/24,1/3,-1/24],
                [1/6,2/3,1/36]
            ],
            [1/6,2/3,1/6],
            [0,0.5,1],
            [-1/2,2,-1/2],
            3
            );
    }
}
export class EDAE_LOBATTOIIIB2 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        super(step,maxStep,2,errorTolerance,stepSolver,
            [
                [1/2,0],
                [1/2,0]
            ],
            [1/2,1/2],
            [1/2,1/2],
            [1,0],
            2
            );
    }
}
export class EDAE_LOBATTOIIIB4 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        super(step,maxStep,4,errorTolerance,stepSolver,
            [
                [1/6,-1/6,0],
                [1/6,1/3,0],
                [1/6,5/6,0]
            ],
            [1/6,2/3,1/6],
            [0,0.5,1],
            [-1/2,2,-1/2],
            3
            );
    }
}
export class EDAE_LOBATTOIIIC2 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        super(step,maxStep,2,errorTolerance,stepSolver,
            [
                [1/2,-1/2],
                [1/2,1/2]
            ],
            [1/2,1/2],
            [0,1],
            [1,0],
            2
            );
    }
}
export class EDAE_LOBATTOIIIC4 extends EDAE_IRKA{
    //TODO: TEST
    constructor(step:number,maxStep:number,errorTolerance:number,stepSolver:NewtonSolver){
        super(step,maxStep,4,errorTolerance,stepSolver,
            [
                [1/6,-1/3,1/6],
                [1/6,5/12,-1/12],
                [1/6,2/3,1/6]
            ],
            [1/6,2/3,1/6],
            [0,0.5,1],
            [-1/2,2,-1/2],
            3
            );
    }
}