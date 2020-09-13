import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";


export class NthPointSimplification implements ISimplificationAlgorithm{
    constructor(protected nthPoint:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        let result:DAEVector[] = [];
        for(let i = 0;i<points.length;i+=this.nthPoint){
            result.push(points[i]);
        }
        result.push(points[points.length-1]);
        return result;
    }
}