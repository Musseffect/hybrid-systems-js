
export default {
    name:"Brusselator",
    model:
`//t = [0,30]
x1(t0) = 1.5;
x2(t0) = 3;

x1' = 1 + x1^2 * x2 - 4*x1;
x2' = 3*x1 - x1^2 * x2;
`,
    parameters:{
        "t0":0,
        "time":250,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":250,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-max-tol":""
    }
};