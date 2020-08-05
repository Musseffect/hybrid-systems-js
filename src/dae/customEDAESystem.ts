import { EDAESystem } from "./edaeSystem";
import { ExpressionNode } from "../compiler/expressionNodes";
import { vector } from "../math/vector";
import {matrix} from "../math/matrix";


class CustomEDAESystem implements EDAESystem{
    _f:ExpressionNode[];
    _g:ExpressionNode[];
    _dfdx:ExpressionNode[][];
    _dfdz:ExpressionNode[][];
    _dgdx:ExpressionNode[][];
    length_x():number{
        return this._f.length;
    }
    length_z():number{
        return this._g.length;
    }
    f(x:vector,z:vector,t:number):vector{
        let result = vector.empty(this.length_x());
        let args = x.data.concat(z.data, [t]);
        this._f.forEach(function(item,i){
            result.set(item.execute(args) ,i);
        });
        return result;
    }
    g(z:vector,t:number):vector{
        let result = vector.empty(this.length_z());
        let args = z.data.concat([t]);
        this._f.forEach(function(item,i){
            result.set(item.execute(args) ,i);
        });
        return result;
    }
    dfdx(x:vector,z:vector,t:number):matrix{
        let result = matrix.emptySquare(this.length_x());
        let args = x.data.concat(z.data, [t]);
        //for each row
        this._dfdx.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dfdz(x:vector,z:vector,t:number):matrix{
        let result = matrix.empty(this.length_x(),this.length_z());
        let args = x.data.concat(z.data, [t]);
        //for each row
        this._dfdx.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
    dgdx(x:vector,t:number):matrix{
        let result = matrix.empty(this.length_z(),this.length_x());
        let args = x.data.concat([t]);
        //for each row
        this._dgdx.forEach(function(row,j){
            //for each cell in row
            row.forEach(function(item,i){
                result.set(item.execute(args),j, i);
            });
        })
        return result;
    }
}