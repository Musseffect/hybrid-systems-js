import { EDAEHybridSystem } from "../dae/edaeHybridSystem"
import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { ExpressionNode } from "../compiler/expressionNodes";
import { HybridState, HybridStateLink } from "../dae/solver";



export abstract class HybridState{
    name:string;
    links:HybridStateLink[];
    terminal:boolean;
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

class CustomHybridStateLink implements HybridStateLink{
    newState:number;
    _p:ExpressionNode;
    _dpdt:ExpressionNode;
    _dpdz:ExpressionNode[];
    _dpdx:ExpressionNode[];
    initialConditions:({index:number,expression:ExpressionNode})[];
    getNewState():number{
        return this.newState;
    }
    pr(x:vector,z:vector,t:number):boolean{
        let value = this.p(x,z,t);
        return value<0?true:false;
    }
    p(x:vector,z:vector,t:number):number{
        let args = x.data.concat(z.data,[t]);
        return this._p.execute(args);
    }
    dpdt(x:vector,z:vector,t:number):number{
        let args = x.data.concat(z.data,[t]);
        return this._dpdt.execute(args);
    }
    setConditions(x:vector,z:vector,t:number):vector{
        let result = x.clone();
        let args = x.data.concat(z.data,[t]);
        this.initialConditions.forEach(function(item){
            result.set(item.expression.execute(args),item.index);
        });
        return result;
    }
    dpdz(x:vector,z:vector,t:number):vector{
        let result = vector.empty(z.length());
        let args = x.data.concat(z.data,[t]);
        this._dpdz.forEach(function(item,i){
            result.set(item.execute(args),i);
        });
        return result;
    }
    dpdx(x:vector,z:vector,t:number):vector{
        let result = vector.empty(x.length());
        let args = x.data.concat(z.data,[t]);
        this._dpdx.forEach(function(item,i){
            result.set(item.execute(args),i);
        });
        return result;
    }
}

class CustomEDAEHybridSystem extends EDAEHybridSystem{
    _f:ExpressionNode[];
    _g:ExpressionNode[];
    length_x():number{
        return this._f.length;
    }
    length_z():number{
        return this._g.length;
    }
    f(x: vector, z: vector, t: number): vector {
        throw new Error("Method not implemented.");
    }
    g(x: vector, t: number): vector {
        throw new Error("Method not implemented.");
    }
    dfdx(x: vector, z: vector, t: number): matrix {
        throw new Error("Method not implemented.");
    }
    dfdz(x: vector, z: vector, t: number): matrix {
        throw new Error("Method not implemented.");
    }
    dgdx(x: vector, t: number): matrix {
        throw new Error("Method not implemented.");
    }
    dgdt(x: vector, t: number): vector {
        throw new Error("Method not implemented.");
    }
    length_x(): number {
        throw new Error("Method not implemented.");
    }
    length_z(): number {
        throw new Error("Method not implemented.");
    }
}