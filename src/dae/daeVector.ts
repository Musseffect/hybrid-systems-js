import {vector} from "../math/vector";
export class DAEVector{
    x:vector;
    z:vector;
    t:number;
    constructor(x:vector,z:vector,t:number){
        this.x = x;
        this.z = z;
        this.t = t;
    }
    lengthSqr(){
        return this.t*this.t + this.x.norm2Sqr() + this.z.norm2Sqr();
    }
    length(){
        return Math.sqrt(this.t*this.t + this.x.norm2Sqr() + this.z.norm2Sqr());
    }
    static distance(a:DAEVector,b:DAEVector){
        return Math.sqrt(Math.pow(a.t - b.t,2) + vector.sub(a.x,b.x).norm2Sqr() + vector.sub(a.z,b.z).norm2Sqr());
    }
    static distanceSqr(a:DAEVector,b:DAEVector){
        return Math.pow(a.t - b.t,2) + vector.sub(a.x,b.x).norm2Sqr() + vector.sub(a.z,b.z).norm2Sqr();
    }
    static dot(a:DAEVector,b:DAEVector){
        return a.t * b.t + vector.dot(a.x,b.x) + vector.dot(a.z,b.z);
    }
    static sub(a:DAEVector,b:DAEVector){
        return new DAEVector(vector.sub(a.x,b.x),vector.sub(a.z,b.z),a.t - b.t);
    }
    static distanceLinePoint(p1:DAEVector,p2:DAEVector,point:DAEVector):number{
        let a = DAEVector.distanceSqr(point,p1);//dist from p to p1
        let b = DAEVector.dot(DAEVector.sub(point,p1),DAEVector.sub(p2,p1));
        let c = DAEVector.distanceSqr(p1,p2);
        return Math.sqrt(a-b*b/c);
    }
}