import { matrix } from "./matrix";
import { vector } from "./vector";

export class gauss{
    /**
     * gauss method for linear equations with rows sorting
     */
    static solve(A:matrix,b:vector):vector{
        var rang=b.length();
        var x:vector=vector.empty(rang);
        let epsilon=0.001
        var indexes = new Array(rang);
        for (var i = 0; i < rang; i++){
            indexes[i] = i;
        }
        for (var l = 0; l < rang; l++){
            var max = l;
            for (var i = l + 1; i < rang; i++){
                if (Math.abs(A.get(indexes[i],l))>Math.abs(A.get(indexes[max],l)))
                    max = i;
            }
            if (max != l){
                var temp = indexes[l];
                indexes[l] = indexes[max];
                indexes[max] = temp;
            }
            if (Math.abs(A.get(indexes[l],l)) < epsilon){
                for(var i=0;i<rang;i++)
                    x.set(0.0,i);
                return x;
            }
            for (var i = l + 1; i < rang; i++)
                A.set(A.get(indexes[l],i) / A.get(indexes[l],l),indexes[l],i);
            b.set(b.get(indexes[l]) / A.get(indexes[l],l), indexes[l]);
            A.set(1,indexes[l],l);
    
            for (var i = l + 1; i < rang; i++){
                for (var k = l + 1; k < rang; k++)
                    A.set(A.get(indexes[i],k) - A.get(indexes[i],l) * A.get(indexes[l],k),indexes[i],k);
                b.set(b.get(indexes[i]) - A.get(indexes[i],l) * b.get(indexes[l]), indexes[i]);
                A.set(0,indexes[i],l);
            }
        }
        x.set(b.get(indexes[rang - 1]),rang - 1);
        for (var i = rang - 2; i > -1; i--){
            var k = 0.;
            for (var j = i + 1; j < rang; j++){
                k = k + A.get(indexes[i],j) * x.get(j);
            }
            x.set(b.get(indexes[i]) - k,i);
        }
        return x;
    }
}