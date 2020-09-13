export default {
    name:"Stiff equation",
    model:
`//stiff equation

const x0 = 0;
const a = -21;
const c1 = x0 + 1/(a + 1);

x' = a*x+exp(-t);
z = c1 * exp(a*t) - exp(-t)/(a+1);//analytical solution
x(t0) = x0;
`,
    parameters:{
        "t0":0,
        "time":5,
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