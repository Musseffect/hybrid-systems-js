export default {
    name:"Linear system",
    model:
`//Linear system
/*
x_i' = sum_j x_j * a_{ij} + t * b_i
*/

macro a[1][1]()  1;
macro a[1][2]() -1;
macro a[1][3]()  -2;

macro a[2][1]() -3;
macro a[2][2]() -1;
macro a[2][3]() -0.2;

macro a[3][1]() 0.12;
macro a[3][2]() 0.15;
macro a[3][3]() 3;

macro b[1]() 1;
macro b[2]() -0.13;
macro b[3]() 0.5;

x[1](t0) = 1;
x[2](t0) = -0.3;
x[3](t0) = 0.0;

for(i in [1:3]){
        der(x[i]) = sum(j in [1:3]){ x[j] * #a[i][j]() } + #b[i]()*t;
}//Linear system
/*
x_i' = sum_j x_j * a_{ij} + t * b_i
*/
`,
    parameters:{
        "t0":0,
        "time":10,
        "dae-form":"explicit",
        "dae-method":"edopri5",
        "min-step":10,
        "step-err-tol":10,
        "step":50,
        "simplification":true,
        "simp-method":"douglas-peucker",
        "simp-tol":1
    }
};