export default {
    name:"Falling body",
    model:
`//falling body
//x'' = -1 + x'^2

x1(t0) = 1;
x2(t0) = 0;

eq_1:x1' = x2;
eq_2:x2' = -1 + x2^2;

terminal state zero{
        eq_1:x1' = 0;
        eq_2:x2' = 0;
} from initial on(x<=0);
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