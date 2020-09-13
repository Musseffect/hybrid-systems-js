export default {
    name:"Jumping ball on a spring",
    model:
`//Jumping ball on a spring
const m = 1;
const g = 9.82;
const k = 0.95;
const k_spring = 0.1;
const h0;

x(t0) = 1;
v(t0) = 0;

v' = -m*g - k_spring*(x - h0);
x' = v;

state jump{
        set v = -v*k;
} from initial, jump on(v<0 and x<0);

terminal state end{
}from initial, jump on(abs(v)=0 and abs(x)=0);
`,
    parameters:{
        "t0":0,
        "time":15,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":250,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};