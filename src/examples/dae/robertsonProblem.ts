export default {
    name:"",
    model:
`//https://www.mathworks.com/help/matlab/math/solve-differential-algebraic-equations-daes.html
//Robertson problem
t = [0,10^6]

x1(t0) = 1;
x2(t0) = 0;
x1'=-0.04*x1+10^4*x2*x3;
x2'=0.04-1e4*x2*x3-3e7*x2^2;
x3 = 1 - x1 - x2;
`,
    parameters:{
        "t0":0,
        "time":10e6,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":200,
        "step":10,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-max-tol":""
    }
};