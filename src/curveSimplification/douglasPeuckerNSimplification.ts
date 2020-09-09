import { ISimplificationAlgorithm } from "./ISimplificationAlgorithm";
import {DAEVector} from "../dae/daeVector";

class PriorityQueue<T>{
    items:{value:T,priority:number}[];
    constructor(){
        this.items = [];
    }
    insert(item:T,priority:number):void{
        for(let i=0;i<this.items.length;i++){
            if(this.items[i].priority<priority){
                this.items.splice(i,0,{value:item,priority:priority});
                return;
            }
        }
        this.items.push({value:item,priority:priority});
    }
    dequeueu():T{
        return this.items.shift().value;
        //return this.items[0].value;
    }
    length():number{
        return this.items.length;
    }
}

class Edge{
    start:number;
    end:number;
    point:number;
    constructor(start:number,end:number,point:number){
        this.start = start;
        this.end = end;
        this.point = point;
    }
}


export class DouglasPeuckerNSimplification implements ISimplificationAlgorithm{
    maxPoints:number;
    constructor(maxPoints:number){
        this.maxPoints = maxPoints;
    }
    process(start:number,end:number,points:DAEVector[],queue:PriorityQueue<Edge>){
        let maxDist = 0;
        let index = start;
        for(let i=start+1;i<end;i++){
            let distance = DAEVector.distanceLinePoint(points[start],points[end],points[i]);
            if(distance>maxDist){
                maxDist = distance;
                index = i;
            }
        }
        if(index!=start)
            queue.insert(new Edge(start,end,index),maxDist);
    }
    simplify(points: DAEVector[]): DAEVector[] {
        if(points.length<=this.maxPoints){
            return points.slice();
        }
        let queue = new PriorityQueue<Edge>();
        let choosenPoints:number[] = [];
        choosenPoints.push(0);
        choosenPoints.push(points.length-1);
        let start = 0;
        let end = points.length-1;
        this.process(start,end,points,queue);
        while(choosenPoints.length<this.maxPoints&&queue.length()>0){
            let edge = queue.dequeueu();
            choosenPoints.push(edge.point);
            start = edge.start;
            end = edge.point;
            this.process(start,end,points,queue);
            start = edge.point;
            end = edge.end;
            this.process(start,end,points,queue);
        }
        choosenPoints.sort((a,b)=>a-b);
        let result:DAEVector[] = choosenPoints.map(function(index){
            return points[index];
        });
        return result;
    }
}