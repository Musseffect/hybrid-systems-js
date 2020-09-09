import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";



export class RadialDistanceSimplification implements ISimplificationAlgorithm{
    constructor(protected tolerance:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        let result:DAEVector[] = [];
        let current = points[0];
        result.push(points[0]);
        for(let i = 1;i<points.length-1;i++){
            if(DAEVector.distanceSqr(points[i],current)>this.tolerance*this.tolerance){
                current = points[i];
                result.push(points[i]);
            }
        }
        result.push(points[points.length-1]);
        return result;
    }
}