import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";


export class NthPointSimplification implements ISimplificationAlgorithm{
    constructor(protected maxPoints:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        if(points.length<=this.maxPoints)
            return points.slice();
        let result:DAEVector[] = [];
        result.push(points[0]);
        let delta = (points.length-1)/(this.maxPoints-1);
        for(let i = delta,j = 2;i<points.length&&j<this.maxPoints;i+=delta,j++){
            result.push(points[Math.round(i)]);
        }
        result.push(points[points.length-1]);
        return result;
    }
}