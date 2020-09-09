import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";



export class PerpendicularDistanceSimplification implements ISimplificationAlgorithm{
    constructor(protected tolerance:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        while(true){
            let result = this.run(points);
            if(result.length==points.length)
                return result;
            points = result;
        }
    }
    protected run(points:DAEVector[]):DAEVector[]{
        if(points.length<=2)
            return points.slice();
        let result:DAEVector[] = [];
        result.push(points[0]);
        for(let i = 0;i<points.length-2;){
            if(DAEVector.distanceLinePoint(points[i],points[i+2],points[i+1])<this.tolerance){
                result.push(points[i+2]);
                i+=2;
            }else{
                result.push(points[i+1]);
                i++;
            }
        }
        result.push(points[points.length-1]);
        return result;
    }
}