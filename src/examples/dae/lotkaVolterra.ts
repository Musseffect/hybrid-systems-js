export default {
    name:"Lotka-Volterra equations",
    model:
`//prey hunter Lotka–Volterra

const alpha = 1.1;
const beta = 0.4;
const delta = 0.1;
const gamma = 0.4;

x(t0) = 10;
y(t0) = 10;

x' = x*alpha-beta*x*y;
y' = delta*x*y - gamma*y;
`,
    parameters:{
        "t0":0,
        "time":10,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":0.1,
        "step":50,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};