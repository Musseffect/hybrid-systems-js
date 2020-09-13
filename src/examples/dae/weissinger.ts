export default {
    name:"Weissinger implicit DE",
    model:
`//Weissinger implicit dif. eq.
//t0 = 1

x(t0) = sqrt(3/2);
t * x^2*der(x)^3 - x^3*der(x)^2 + t*(t^2+1)*der(x)-t*t*x = 0;
z = sqrt(t*t+0.5);  //exact solution
`,
    parameters:{
        "t0":1,
        "time":10,
        "dae-form":"implicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":250,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1,
        "sys-solver-min-iters":15
    }
};