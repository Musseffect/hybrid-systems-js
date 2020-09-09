import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";


export class LangSimplification implements ISimplificationAlgorithm{
    constructor(protected tolerance:number,protected lookahead:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        let result:DAEVector[] = [];
        result.push(points[0]);
        let current = 0;
        while(current<points.length-1){
            let end = Math.min(current+this.lookahead,points.length-1);
            let _end = end;
            for(let i=current+1;i<_end;i++){
                if(DAEVector.distanceLinePoint(points[current],points[_end],points[i])>this.tolerance){
                    i = current;
                    _end-=1;
                    continue;
                }
                result.push(points[_end]);
                current = _end;
                break;
            }
            if(current+1<_end)
            {
                result.push(points[end]);
                current = end;
            }

        }
        return result;
    }
}
