import {vector} from "../math/vector";
import { IDAEHybridSystem } from "./idaeHybridSystem";
import { EDAEHybridSystem } from "./edaeHybridSystem";
import { IDAESolver } from "./IDAESolver";
import { EDAESolver } from "./EDAESolver";


export abstract class HybridState{
    name:string;
    links:HybridStateLink[];
    terminal:boolean;
    abstract f(x:vector,z:vector,t:number):vector;
    abstract g(x:vector,z:vector,t:number):vector;
    abstract dfdx(x:vector,z:vector,t:number):matrix;
    abstract dfdz(x:vector,z:vector,t:number):matrix;
}
export interface HybridStateLink{
    getNewState():number;
    pr(x:vector,z:vector,t:number):boolean;
    p(x:vector,z:vector,t:number):number;
    dpdt(x:vector,z:vector,t:number):number;
    dpdz(x:vector,z:vector,t:number):vector;
    dpdx(x:vector,z:vector,t:number):vector;
    setConditions(x:vector,z:vector,t:number):vector;
}
export class DAEVector{
    x:vector;
    z:vector;
    t:number;
    constructor(x:vector,z:vector,t:number){
        this.x = x;
        this.z = z;
        this.t = t;
    }
}
export class HybridSolution{
    values:DAEVector[];
    states:number[];
    constructor(values:DAEVector[],states:number[]){
        this.values = values;
        this.states = states;
    }
}
export interface AdaptiveStepStrategy{
    findStepIDAE(x:vector,z:vector,t:number,solver:IDAESolver,system:IDAEHybridSystem):number;
    findStepEDAE(x:vector,z:vector,t:number,system:EDAEHybridSystem):number;
}
export interface EventDetector{
    checkEventIDAE(oldValues:DAEVector,curValues:DAEVector,solver:IDAESolver,system:IDAEHybridSystem):boolean;
    checkEventEDAE(oldValues:DAEVector,curValues:DAEVector,solver:EDAESolver,system:EDAEHybridSystem):boolean;
}
export class AdaptiveStepNewton implements AdaptiveStepStrategy{
    gamma:number;
    minStep:number;
    constructor(gamma:number,minStep:number){
        this.gamma = gamma;
        this.minStep = minStep;
    }
    //TODO Test
    findStepIDAE(x:vector,z:vector,t:number,solver:IDAESolver,system:IDAEHybridSystem):number{
        let step = 10e8;
        let links = system.getCurrentLinks();
        links.forEach((link)=>
        {
            let dxdt = solver.solve_dx(x,z,t,system);
            let dzdt = solver.solve_dzdt(dxdt,x,z,t,system);
            let denom = vector.dot(link.dpdx(x,z,t),dxdt) + vector.dot(link.dpdz(x,z,t),dzdt) + link.dpdt(x,z,t);
            let h = -this.gamma * link.p(x,z,t)/denom;
            step = (h<0||isNaN(h)?step:Math.min(step,h));
        });
        return Math.max(step,this.minStep);
    }
    //TODO Test
    findStepEDAE(x: vector, z: vector, t: number, system: EDAEHybridSystem): number {
        let step = 10e8;
        let links = system.getCurrentLinks();
        links.forEach((link)=>
        {
            let dxdt = system.f(x,z,t);
            let dzdt:vector=system.dgdt(x,t).addSelf(system.dgdx(x,t).multVec(dxdt));
            let denom = vector.dot(link.dpdx(x,z,t),dxdt) + vector.dot(link.dpdz(x,z,t),dzdt) + link.dpdt(x,z,t);
            let h = -this.gamma * link.p(x,z,t)/denom;
            step = (h<0||isNaN(h)?step:Math.min(step,h));
        });
        return Math.max(step,this.minStep);
    }

}
export class EventDetectorSimple implements EventDetector{
    //TODO Test
    checkEventIDAE(oldValues:DAEVector,curValues:DAEVector,solver:IDAESolver,system:IDAEHybridSystem):boolean{
        //throw new Error("Method not implemented.");
        let value = 10e8;
        let index = -1;
        let links = system.getCurrentLinks();
        links.forEach((link,id)=>
        {
            let p = link.p(curValues.x,curValues.z,curValues.t);
            if(p>=0&&p<value){
                value = p;
                index = id;
            }
        });
        if(index!=-1){
            curValues.x = links[index].setConditions(curValues.x,curValues.z,curValues.t);
            return true;
        }
        return false;
    }
    //TODO Test
    checkEventEDAE(oldValues: DAEVector, curValues: DAEVector, solver: EDAESolver, system: EDAEHybridSystem): boolean {
        //throw new Error("Method not implemented.");
        let value = 10e8;
        let index = -1;
        let links = system.getCurrentLinks();
        links.forEach((link,id)=>
        {
            let p = link.p(curValues.x,curValues.z,curValues.t);
            if(p>=0&&p<value){
                value = p;
                index = id;
            }
        });
        if(index!=-1){
            curValues.x = links[index].setConditions(curValues.x,curValues.z,curValues.t);
            return true;
        }
        return false;
    }
}
/**
 * Event detection on time step interval with newton method for cases, when signs of event condition function doesn't change and bisection method
 * for cases with change of sign
 */
export class EventDetectorComplex implements EventDetector
{
    newtonIterations:number = 30;
    relTol:number = 1e-6;
    absTol:number = 1e-5;
    alpha:number = 0.95;
    bisectionIterations:number = 30;
    timeAbsTol:number = 1e-4;
    timeRelTol:number = 1e-4;
    constructor(newtonIterations:number = 30,relTol:number = 1e-6,
        absTol:number = 1e-5,alpha:number = 0.95,bisectionIterations:number = 30,timeAbsTol:number = 1e-4,timeRelTol:number = 1e-4){
        this.newtonIterations = newtonIterations;
        this.relTol = relTol;
        this.absTol = absTol;
        this.alpha = alpha;
        this.bisectionIterations = bisectionIterations;
        this.timeAbsTol = timeAbsTol;
        this.timeRelTol = timeRelTol;
    }
    //TODO Test
    checkEventIDAE(oldValues:DAEVector,curValues:DAEVector,solver:IDAESolver,system:IDAEHybridSystem):boolean{
        let time = 10e8;
        let index = -1;
        let links = system.getCurrentLinks();
        let step = curValues.t - oldValues.t;
        let dx = vector.sub(curValues.x,oldValues.x).scaleSelf(1/step);
        let dz = vector.sub(curValues.z,oldValues.z).scaleSelf(1/step);
        //assume that x and z are linear in interval [oldT,curT]
        links.forEach((link,id)=>
        {
            let p0 = link.p(oldValues.x,oldValues.z,oldValues.t);
            let p1 = link.p(curValues.x,curValues.z,curValues.t);
            if(p0>=0&&oldValues.t<time){
                time = oldValues.t;
                index = id;
                return;
            }else if(p1>=0&&curValues.t<time){
                time = curValues.t;
                index = id;
            }
            let _p0 = Math.min(Math.abs(p1),Math.abs(p0));
            let p = p0;
            let t = oldValues.t;
            let x = oldValues.x;
            let z = oldValues.z;
            let flag = false;
            //newton
            for(let i=0;i<this.newtonIterations;i++){
                let dpdt = vector.dot(link.dpdx(x,z,t),dx) + 
                vector.dot(link.dpdz(x,z,t),dz) + link.dpdt(x,z,t);
                p = Math.max(Math.abs(p),this.absTol)*Math.sign(p);
                let dt = -this.alpha*p / dpdt;
                //dt = Math.max(this.timeAbsTol,Math.abs(dt))*Math.sign(dt);
                t += dt;
                if(t<oldValues.t||t>curValues.t)
                    break;
                x = vector.mix(oldValues.x,curValues.x,(t-oldValues.t)/step);
                z = vector.mix(oldValues.z,curValues.z,(t-oldValues.t)/step);
                p = link.p(x,z,t);
                if(p>=0&&Math.abs(p)<_p0*this.relTol + this.absTol){
                    if(t<time){
                        time = t;
                        index = id;
                    }
                    return;
                }
            }
            //bisection
            {
                if(p1>=0&&p0<=0){
                    let t1 = curValues.t;
                    let t0 = oldValues.t;
                    for(let i=0;i<this.bisectionIterations;i++){
                        let t = (t1 + t0)/2;
                        let x = vector.mix(oldValues.x,curValues.x,(t-oldValues.t)/step);
                        let z = vector.mix(oldValues.z,curValues.z,(t-oldValues.t)/step);
                        let p = link.p(x,z,t);
                        let dt = 0;
                        if(p>=0){
                            p1 =p;
                            t1 = t;
                            dt = t-t0;
                            if(p<_p0*this.relTol + this.absTol&&dt<this.timeAbsTol+step*this.timeRelTol&&t<time){
                                time = t;
                                index = id;
                                break;
                            }
                        }else{
                            p0 = p;
                            t0 = t;
                            dt = t1 - t;
                        }
                    }
                }
            }
            //TODO add false position from matlab article
        });
        if(index!=-1){
            let x = vector.mix(oldValues.x,curValues.x,(time-oldValues.t)/step);
            let z = vector.mix(oldValues.z,curValues.z,(time-oldValues.t)/step);
            z = solver.solve_z(x,z,time,system);
            curValues.x = links[index].setConditions(x,z,time);
            curValues.t = time;
            curValues.z = solver.solve_z(curValues.x,z,curValues.t,system);
            system.setCurrentState(links[index].getNewState());
            //curValues.z = z;
            return true;
        }
        return false;
    }
    //Tested
    checkEventEDAE(oldValues: DAEVector, curValues: DAEVector, solver: EDAESolver, system: EDAEHybridSystem): boolean {
        let time = 10e8;
        let index = -1;
        let links = system.getCurrentLinks();
        let step = curValues.t - oldValues.t;
        let dx = vector.sub(curValues.x,oldValues.x).scaleSelf(1/step);
        let dz = vector.sub(curValues.z,oldValues.z).scaleSelf(1/step);
        //assume that x and z are linear in interval [oldT,curT]
        links.forEach((link,id)=>
        {
            let p0 = link.p(oldValues.x,oldValues.z,oldValues.t);
            let p1 = link.p(curValues.x,curValues.z,curValues.t);
            if(p0>=0&&oldValues.t<time){
                time = oldValues.t;
                index = id;
                return;
            }else if(p1>=0&&curValues.t<time){
                time = curValues.t;
                index = id;
            }
            let _p0 = Math.min(Math.abs(p1),Math.abs(p0));
            let p = p0;
            let t = oldValues.t;
            let x = oldValues.x;
            let z = oldValues.z;
            let flag = false;
            //newton
            for(let i=0;i<this.newtonIterations;i++){
                let dpdt = vector.dot(link.dpdx(x,z,t),dx) + 
                vector.dot(link.dpdz(x,z,t),dz) + link.dpdt(x,z,t);
                p = Math.max(Math.abs(p),this.absTol)*Math.sign(p);
                let dt = -this.alpha*p / dpdt;
                //dt = Math.max(this.timeAbsTol,Math.abs(dt))*Math.sign(dt);
                t += dt;
                if(t<oldValues.t||t>curValues.t)
                    break;
                x = vector.mix(oldValues.x,curValues.x,(t-oldValues.t)/step);
                z = vector.mix(oldValues.z,curValues.z,(t-oldValues.t)/step);
                p = link.p(x,z,t);
                if(p>=0&&Math.abs(p)<_p0*this.relTol + this.absTol){
                    if(t<time){
                        time = t;
                        index = id;
                    }
                    return;
                }
            }
            //bisection
            {
                if(p1>=0&&p0<=0){
                    let t1 = curValues.t;
                    let t0 = oldValues.t;
                    for(let i=0;i<this.bisectionIterations;i++){
                        let t = (t1 + t0)/2;
                        let x = vector.mix(oldValues.x,curValues.x,(t-oldValues.t)/step);
                        let z = vector.mix(oldValues.z,curValues.z,(t-oldValues.t)/step);
                        let p = link.p(x,z,t);
                        let dt = 0;
                        if(p>=0){
                            p1 =p;
                            t1 = t;
                            dt = t-t0;
                            if(p<_p0*this.relTol + this.absTol&&dt<this.timeAbsTol+step*this.timeRelTol&&t<time){
                                time = t;
                                index = id;
                                break;
                            }
                        }else{
                            p0 = p;
                            t0 = t;
                            dt = t1 - t;
                        }
                    }
                }
            }
            //TODO add false position from matlab article
        });
        if(index!=-1){
            let x = vector.mix(oldValues.x,curValues.x,(time-oldValues.t)/step);
            //let z = vector.mix(oldValues.z,curValues.z,(time-oldValues.t)/step);
            let z = system.g(x,time);
            curValues.x = links[index].setConditions(x,z,time);
            curValues.t = time;
            curValues.z = system.g(curValues.x,curValues.t);
            system.setCurrentState(links[index].getNewState());
            //curValues.z = z;
            return true;
        }
        return false;
    }
}

