export default {
    name:"Two masses",
    model:
`//Two masses
const k1 = 1;
const n1 = 1;
const m1 = 1;
const m2 = 1;
const k2 = 2;
const n2 = 2;

x1(t0) = 0;
x2(t0) = 3;
st(t0) = 0;

st' = -st;
x1' = v1;
v1' = 0;
x2' = v2;
v2' = 0;
a1 = a;
a2 = 0;

state separate{
        x1' = v1;
        v1' = k1*(n1-x1)/m1;
        x2' = v2;
        v2' = k2*(n2-x2)/m2;
        set st = 0;
        a1 = k1*(n1 - x1)/m1;
        a2 = k2*(n2 - x2)/m2;
} from initial, together on(st<abs(a1)+abs(a2));

state together{
        set st = 10;
        set v1 = (m1 * v1 + m2*v2)/(m1 + m2);
        set v2 = v1;
        v1' = (k1*n1+k2*n2-x1*(k1+k2))/(m1+m2);
        v2' = (k1*n1+k2*n2-x2*(k1+k2))/(m1+m2);
        x1' = v1;
        x2' = v2;
        a1 = (k1*n1 + k2*n2-x1*(k1+k2))/(m1+m2);
        a2 = (k1*n1 + k2*n2-x2*(k1+k2))/(m1+m2);
} from initial, separate on(x1>x2&&v1>v2);`,
    parameters:{
        "t0":0,
        "time":10,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":50,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};