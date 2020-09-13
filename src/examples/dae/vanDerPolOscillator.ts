export default {
    name:"Van der Pol oscillator",
    model:
`//Van der Pol oscillator

const mu = 20;
const a = 0;
const omega = 1;

x1(t0) = 1;
x2(t0) = 0;

x1' = x2;
x2' = mu*(1-x1*x1)*x2-x1 + a*sin(omega*t);
`,
    parameters:{
        "t0":0,
        "time":50,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":500,
        "step":10000,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};