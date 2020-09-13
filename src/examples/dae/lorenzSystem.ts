export default {
    name:"Lorenz system",
    model:
`//Lorenz system

const sigma = 10;
const rho=28;
const beta=8/3;

x(t0) = 1;
y(t0) = 1;
z(t0) = 1;

x' = sigma* (y-x);
y' = x * (rho - z) - y;
z' = x*z-beta*z;
`,
    parameters:{
        "t0":0,
        "time":20,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":20,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};