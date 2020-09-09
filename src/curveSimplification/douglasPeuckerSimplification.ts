import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import { DAEVector } from "../dae/daeVector";



export class DouglasPeuckerSimplification implements ISimplificationAlgorithm
{
    protected epsilon:number;
    constructor(epsilon:number){
        this.epsilon = epsilon;
    }
    simplify(points:DAEVector[]):DAEVector[]{
        return this.run(points,0,points.length-1);
    }
    protected run(points:DAEVector[],start:number,end:number):DAEVector[]{
        let maxDist = 0.0;
        let index = start+1;
        let first = points[start];
        let last = points[end];
        for(let i = start + 1;i<end;i++){
            let dist = DAEVector.distanceLinePoint(first,last,points[i]);
            if(dist>=maxDist){
                index = i;
                maxDist = dist;
            }
        }
        if(maxDist>this.epsilon){
            let res1 = this.run(points,start,index);
            let res2 = this.run(points,index,end);
            res1.pop();
            return res1.concat(res2);
        }else{
            return [first,last];
        }
    }
}