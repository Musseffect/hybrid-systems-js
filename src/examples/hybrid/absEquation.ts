export default {
    name:"Abs equation",
    model:
`//abs value
//t = [0,40]
x(t0) = 1;

x' = -abs(x);
z = exp(-t);//analytic solution

state zero{
	set x = abs(x);
} from initial, zero on(x<0);
`,
    parameters:{
        "t0":0,
        "time":40,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":0.1,
        "step":30,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};