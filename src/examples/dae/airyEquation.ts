export default {
    name:"Airy equation",
    model:
`//Airy equation
//x''-tx=0
//t0 = -15

x2(t0)=0.272374204308642020825783;
x1(t0)=0.2782174908708289;

x2'= t*x1;
x1'= x2;
`,
    parameters:{
        "t0":-15,
        "time":15,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":5,
        "step-err-tol":1,
        "step":150,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};