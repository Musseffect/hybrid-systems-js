export default {
    name:"Dalquist equation",
    model:
`//Dalquist equation
//t0 = 0, t1 = 2

const a = 2;
const x0 = 1;
const t0 = 0;

x(t0) = x0;
x' = a * x;
z = x0*exp(a*x-a*t0);//analytic solution
`,
    parameters:{
        "t0":0,
        "time":2,
        "dae-form":"explicit",
        "dae-method":"erk4",
        "step":10,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};