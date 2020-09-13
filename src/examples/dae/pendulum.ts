export default {
    name:"Pendulum",
    model:
`//penduluum
//t = [0,0.5]

const m = 1;
const r = 1;
const g = 9.8;
const angle = pi()/6;

x1(t0) = r*sin(angle);
y1(t0) = -r*cos(angle);
x2(t0) = 0;
y2(t0) = 0;
T(t0) = 0.0;
x3(t0) = 0.0;
y3(t0) = 0.0;

y1' = y2;
y2' = y3;
m*x3 = T*x1/r;
m*y3 = T*y1/r - g;
x1^2 + y1^2 = r^2;
x1*x2 + y1*y2 = 0;
x2^2 + y2^2+ x1*x3 + y3*y1 = 0;
`,
    parameters:{
        "t0":0,
        "time":0.5,
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