import { matrix } from "../math/matrix";
import { vector } from "../math/vector";
import { gauss } from "../math/gauss";


interface AlgebraicSystem{
    length():number;
    F(x:vector):vector;
    J(x:vector):matrix;
}

export class NewtonSolver{
    protected iterations:number;
    protected fAbsTol:number;
    protected fRelTol:number;
    protected alpha:number;
    protected minIterations:number = 0;
    public getMinIterations():number{
        return this.minIterations;
    }
    public getIterations():number{
        return this.iterations;
    }
    public getAbsTol():number{
        return this.fAbsTol;
    }
    public getRelTol():number{
        return this.fRelTol;
    }
    public getAlpha():number{
        return this.alpha;
    }
    public setMinIterations(value:number):void{
        this.minIterations = value;
    }
    public setIterations(value:number):void{
        this.iterations = value;
    }
    public setAbsTol(value:number):void{
        this.fAbsTol = value;
    }
    public setRelTol(value:number):void{
        this.fRelTol = value;
    }
    public setAlpha(value:number):void{
        this.alpha = value;
    }
    public constructor(iterations:number,fAbsTol:number,fRelTol:number,alpha:number,minIterations:number = 0){
        this.iterations = iterations;
        this.fAbsTol = fAbsTol;
        this.fRelTol = fRelTol;
        this.alpha = alpha;
        this.minIterations = minIterations;
    }
    public solve(F:(x:vector)=>vector, J:(x:vector)=>matrix,length:number,x0?:vector):vector{
        let x:vector;
        if(x0==undefined)
            x = vector.empty(length);
        else
            x = x0.clone();
        let f:vector  = F(x);
        let f0Norm = f.norm2();
        for(let i=0;i<this.iterations;i++){
            let j:matrix = J(x);
            let dx:vector = gauss.solve(j,f.scaleSelf(-this.alpha));
            x.addSelf(dx);
            f = F(x);
            if(i>=this.minIterations&&f.norm2()<this.fAbsTol+this.fRelTol*f0Norm){
                return x;
            }
        }
        throw new Error("Divergence of newton method");
    }
    public solveSystem(system:AlgebraicSystem,x0?:vector):vector{
        let x:vector;
        if(x0==undefined)
            x = vector.empty(system.length());
        else
            x = x0.clone();
        let F:vector  = system.F(x);
        let f0Norm = F.norm2();
        for(let i=0;i<this.iterations;i++){
            let J:matrix = system.J(x);
            let dx:vector = gauss.solve(J,F.scaleSelf(-this.alpha));
            x.addSelf(dx);
            F = system.F(x);
            if(i>=this.minIterations&&F.norm2()<this.fAbsTol+this.fRelTol*f0Norm){
                return x;
            }
        }
        throw new Error("Divergence of newton method");
    }
}