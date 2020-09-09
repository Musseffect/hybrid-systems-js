import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";


export class ReumannWitkamSimplification implements ISimplificationAlgorithm{
    constructor(protected tolerance:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        let result:DAEVector[] = [];
        result.push(points[0]);
        let current = 1;
        for(let i = 1;i<points.length-1;i++){
            if(DAEVector.distanceLinePoint(result[result.length-1],points[current],points[i])>this.tolerance){
                result.push(points[i-1]);
                current = i;
            }
        }
        result.push(points[points.length-1]);
        return result;
    }
}