import { vector } from "../math/vector";
import { Expression } from "../compiler/expression";
import { HybridStateLink } from "../dae/hybridStateLink";

export class Setter{
    index:number;
    expression:Expression;
    constructor(index:number,expression:Expression){
        this.index = index;
        this.expression = expression;
    }
}


export class CustomHybridStateLink implements HybridStateLink{
    newState:number;
    _p:Expression;
    _dpdt:Expression;
    _dpdz:Expression[];
    _dpdx:Expression[];
    setters:Setter[];
    constructor(newState:number,setters:Setter[],
        _p:Expression,_dpdx:Expression[],_dpdz:Expression[],_dpdt:Expression){
        this.newState = newState;
        this.setters = setters;
        this._p = _p;
        this._dpdx = _dpdx;
        this._dpdz = _dpdz;
        this._dpdt = _dpdt;
    }
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
        this.setters.forEach(function(item){
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