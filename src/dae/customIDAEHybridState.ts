import { IDAEHybridState } from "./idaeHybridSystem";
import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { Expression } from "../compiler/expression";
import { HybridStateLink } from "./hybridStateLink";



export class CustomIDAEHybridState extends IDAEHybridState{
    _f:Expression[];
    _g:Expression[];
    _dfdx:Expression[][];
    _dfddx:Expression[][];
    _dfdz:Expression[][];
    _dgdx:Expression[][];
    _dgdz:Expression[][];
    _dgdt:Expression[];
    init(_f:Expression[],_g:Expression[],_dfdx:Expression[][],_dfddx:Expression[][],
        _dfdz:Expression[][],_dgdx:Expression[][],_dgdz:Expression[][],_dgdt:Expression[]):CustomIDAEHybridState{
        this._f = _f;
        this._g = _g;
        this._dfdx = _dfdx;
        this._dfddx = _dfddx;
        this._dfdz = _dfdz;
        this._dgdx = _dgdx;
        this._dgdz = _dgdz;
        this._dgdt = _dgdt;
        return this;
    }
    pushLink(link:HybridStateLink){
        this.links.push(link);
    }
    f(x:vector,dx:vector,z:vector,t:number):vector{
        let result = vector.empty(this.length_x());
        let args = x.data.concat(dx.data, z.data, [t]);
        this._f.forEach(function(item,i){
            result.set(item.execute(args) ,i);
        });
        return result;
    }
    g(x:vector,z:vector,t:number):vector{
        let result = vector.empty(this.length_z());
        let args = x.data.concat(z.data, [t]);
        this._g.forEach(function(item,i){
            result.set(item.execute(args) ,i);
        });
        return result;
    }
    dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
        let result = matrix.emptySquare(this.length_x());
        let args = x.data.concat(dx.data, z.data, [t]);
        //for each row
        this._dfdx.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
        let result = matrix.emptySquare(this.length_x());
        let args = x.data.concat(dx.data, z.data, [t]);
        //for each row
        this._dfddx.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
        let result = matrix.empty(this.length_x(),this.length_z());
        let args = x.data.concat(dx.data, z.data, [t]);
        //for each row
        this._dfdz.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dgdz(x:vector,z:vector,t:number):matrix{
        let result = matrix.emptySquare(this.length_z());
        let args = x.data.concat(z.data, [t]);
        this._dgdz.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dgdx(x:vector,z:vector,t:number):matrix{
        let result = matrix.empty(this.length_z(),this.length_x());
        let args = x.data.concat(z.data, [t]);
        this._dgdx.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dgdt(x: vector, z: vector, t: number): vector{
        let result = vector.empty(this.length_z());
        let args = x.data.concat(z.data,[t]);
        this._dgdt.forEach(function(item,i){
            result.set(item.execute(args),i);
        })
        return result;
    }
    length_x(): number{
        return this._f.length;
    }
    length_z(): number{
        return this._g.length;
    }
}