import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";


export class OpheimSimplification implements ISimplificationAlgorithm{
    constructor(protected minTolerance:number,protected maxTolerance:number){
    }
    simplify(points:DAEVector[]):DAEVector[]{
        let result:DAEVector[] = [];
        result.push(points[0]);
        let current = 0;
        while(true){
            let i = current+1;
            if(DAEVector.distance(points[current],points[i])<this.minTolerance){
                for(let j=i+1;j<=points.length-1;j++){
                    if(DAEVector.distance(points[current],points[j])<this.maxTolerance){
                        i = j-1;
                    }
                }
                if(i>=points.length-1)
                    break;
            }
            let j = i + 1;
            for(;j<points.length-1;j++){
                let perpDist = DAEVector.distanceLinePoint(points[current],points[i],points[j]);
                if(perpDist>this.minTolerance){
                    result.push(points[j]);
                    current = j;
                    break;
                }
                if(DAEVector.distance(points[current],points[j])>this.maxTolerance){
                    result.push(points[j]);
                    current = j;
                    break;
                }
            }
            if(j==points.length-1)
                break;
        }
        result.push(points[points.length-1]);
        return result;
    }
}