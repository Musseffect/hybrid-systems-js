export default {
    name:"Oregonator",
    model:
`//t = [0,400]
const a1 = 77.27;
const a2 = 8.375e-5;
const a3 = 0.161;

x1' = a1 * x2 + a1 * x1 - a1 * a2 * x1^2 - a1 * x1 * x2;
x2' = (x3 - x2 - x1*x2) / a1;
x3' = a3 * (x1 - x3);

x1(t0) = 400;
x2(t0) = 1;
x3(t0) = 400;
`,
    parameters:{
        "t0":0,
        "time":400,
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