import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";

export class MaxPointsSimplification implements ISimplificationAlgorithm{
    constructor(protected maxPoints:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        if(points.length<=this.maxPoints)
            return points.slice();
        return points.slice(0,this.maxPoints);
    }
}

