export default {
    name:"Logistic differential equation",
    model:
`//Logistic differential equation
constant k = 1;
constant a = 1;

x(t0) = 0.5;

x' = k*x*(a-x);
`,
    parameters:{
        "t0":0,
        "time":10,
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