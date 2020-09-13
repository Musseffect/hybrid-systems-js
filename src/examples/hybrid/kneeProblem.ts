export default {
    name:"Knee problem",
    model:
`//knee problem
//t = [0,2]

const epsilon = 1e-6;

x(t0) = 1;
z = {t<1?1 - x:0};
epsilon*x' = (1 - t)*x - x^2;

state zero on(x<0){
	set x = abs(x);
} from initial on(x<0), zero on(x<0);
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