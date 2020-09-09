import {vector} from "../math/vector";
import { IDAEHybridSystem } from "./idaeHybridSystem";
import { EDAEHybridSystem, EDAEHybridState } from "./edaeHybridSystem";
import { IDAESolver } from "./IDAESolver";
import { EDAESolver } from "./EDAESolver";
import { DAEVector } from "./daeVector";

export interface EventDetection{
    checkEventIDAE(oldValues:DAEVector,curValues:DAEVector,solver:IDAESolver,system:IDAEHybridSystem):boolean;
    checkEventEDAE(oldValues:DAEVector,curValues:DAEVector,solver:EDAESolver,system:EDAEHybridSystem):boolean;
}
export class EventDetectionSimple implements EventDetection{
    /**
     * Event detection for implicit dae hybrid system
     * @param oldValues values at t
     * @param curValues values at t+h, used to store initial values in case of state change
     * @param solver implicit dae solver
     * @param system hybrid system
     * @returns true when state has changed
     */
    checkEventIDAE(oldValues:DAEVector,curValues:DAEVector,solver:IDAESolver,system:IDAEHybridSystem):boolean{
        let value = 10e8;
        let index = -1;
        let state = system.getCurrentState();
        let links = state.getLinks();
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
            system.setCurrentState(links[index].getNewState());
            return true;
        }
        return false;
    }
    /**
     * Event detection for explicit dae hybrid system
     * @param oldValues values at t
     * @param curValues values at t+h, used to store initial values in case of state change
     * @param solver explicit dae solver
     * @param system hybrid system
     * @returns true when state has changed
     */
    checkEventEDAE(oldValues: DAEVector, curValues: DAEVector, solver: EDAESolver, system: EDAEHybridSystem): boolean {
        let value = 10e8;
        let index = -1;
        let state = system.getCurrentState();
        let links = state.getLinks();
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
            system.setCurrentState(links[index].getNewState());
            return true;
        }
        return false;
    }
}
/**
 * Event detection on time step interval with newton method for cases, when signs of event condition function doesn't change and bisection method
 * for cases with change of sign
 */
export class EventDetectionComplex implements EventDetection
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
    /**
     * Event detection for implicit dae hybrid system
     * @param oldValues values at t
     * @param curValues values at t+h, used to store initial values in case of state change
     * @param solver implicit dae solver
     * @param system hybrid system
     * @returns true when state has changed
     */
    checkEventIDAE(oldValues:DAEVector,curValues:DAEVector,solver:IDAESolver,system:IDAEHybridSystem):boolean{
        let time = 10e8;
        let index = -1;
        let state = system.getCurrentState();
        let links = state.getLinks();
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
            //Newton method for root finding
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
            z = solver.solve_z(x,z,time,state);
            curValues.x = links[index].setConditions(x,z,time);
            curValues.t = time;
            curValues.z = solver.solve_z(curValues.x,z,curValues.t,state);
            system.setCurrentState(links[index].getNewState());
            //curValues.z = z;
            return true;
        }
        return false;
    }
    /**
     * Event detection for explicit dae hybrid system
     * @param oldValues values at t
     * @param curValues values at t+h, used to store initial values in case of state change
     * @param solver explicit dae solver
     * @param system hybrid system
     * @returns true when state has changed
     */
    checkEventEDAE(oldValues: DAEVector, curValues: DAEVector, solver: EDAESolver, system: EDAEHybridSystem): boolean {
        let time = 10e8;
        let index = -1;
        let state = system.getCurrentState();
        let links = state.getLinks();
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
            let z = state.g(x,time);
            curValues.x = links[index].setConditions(x,z,time);
            curValues.t = time;
            curValues.z = state.g(curValues.x,curValues.t);
            system.setCurrentState(links[index].getNewState());
            //curValues.z = z;
            return true;
        }
        return false;
    }
}

