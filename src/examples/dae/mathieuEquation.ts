export default {
    name:"Mathieu's differential equation",
    model:
`//Methieu's differential equation

const q = 1;
const a = 2;

y(t0) = 0;
dyt(t0) = 0;

dyt' = y*(2*q*cos(2*t)-a);
y' = dyt;
`,
    parameters:{
        "t0":0,
        "time":10,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":0.1,
        "step":20,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};