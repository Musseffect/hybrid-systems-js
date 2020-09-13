export default {
    name:"An Arenstorf orbit",
    model:
`//period is 17.0652165601579625588917206249
const m1 = 0.012277471;
const m2 = 1 - m1;

x1' = x2;
x2' = x1 + 2*y2 - m2*(x1+m1)/D1-m1*(x1-m2)/D2;
y1' = y2;
y2' = y1 - 2*x2 - m2*y1/D1-m1*y1/D2;

D1 = ((x1 + m1)^2 + y1^2)^1.5;
D2 = ((x1 - m2)^2 + y1^2)^1.5;
x1(t0) = 0.994;
x2(t0) = 0;
y1(t0) = 0;
y2(t0) = -2.00158510637908252240537862224;
`,
    parameters:{
        "t0":0,
        "time":17.066,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":0.01,
        "step-err-tol":0.001,
        "step":10000,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};