


export const examples:{dae:Record<string,{name:string,text:string}>,hybrid:Record<string,{name:string,text:string}>} = {
        dae:{
                //https://www.mathworks.com/help/matlab/math/solve-differential-algebraic-equations-daes.html
                "robertson-problem":{
                    name:"Robertson problem",
                    text:
`
//https://www.mathworks.com/help/matlab/math/solve-differential-algebraic-equations-daes.html
//Robertson problem

x1(t0) = 1;
x2(t0) = 0;
x1'=-0.04*x1+10^4*x2*x3;
x2'=0.04-1e4*x2*x3-3e7*x2^2;
x3 = 1 - x1 - x2;`
                },
                    "weissinger":{
                        name:"Weissinger implicit DE",
                        text:
`
//Weissinger implicit dif. eq.
//t0 = 1

x(t0) = sqrt(3/2);
t * x^2*der(x)^3 - x^2*der(x)^2 + t*(t^2+1)*der(x)-t*t*x = 0;
z = sqrt(t*t+0.5);  //exact solution`
                },
                "stiff-equation":{
                    name:"Stiff equation",
                    text:
`
//stiff equation

x' = -21*x+exp(-t);
x(t0) = 0;`
                },
                "lorenz-system":{
                    name:"Lorenz system",
                    text:
`
//Lorenz system

constant sigma = 10;
constant rho=28;
constant beta=8/3;

x(t0) = 1;
y(t0) = 1;
z(t0) = 1

x' = sigma* (y-x);
y' = x * (rho - z) - y;
z' = x*z-beta*z;`
                },
                "dalquist-equation":{
                    name:"Dalquist equation",
                    text:
`
//Dalquist equation
//t0 = 0, t1 = 2

constant a = 2;

x(t0) = 1;
x' = a * x`
                },
                "van-der-pol-oscillator":{
                    name:"Van der Pol oscillator",
                    text:
`
//Van der Pol oscillator

constant mu = 20;
constant a = 0;
constant omega = 1;

x1(t0) = 1;
x2(t0) = 0;

x1' = x2;
x2' = mu*(1-x1*x1)*x2-x1 + a*sin(omega*t);`
                },
                "airy-equation":{
                    name:"Airy equation",
                    text:
`
//Airy equation
//x''-tx=0
//t0 = -15

x2(t0)=0.0;
x1(t0)=0.255;

x2'= t*x1;
x1'= x2;`
                },
                "lotka-volterra":{
                    name:"Lotka-Volterra equations",
                    text:
`
//prey hunter Lotka–Volterra

constant alpha = 1.1;
constant beta = 0.4;
constant delta = 0.1;
constant gamma = 0.4;

x(t0) = 10;
y(t0) = 10;

x' = x*alpha-beta*x*y;
y' = delta*x*y - gamma*y;`
                },
                "logistic-equation":{
                    name:"Logistic differential equation",
                    text:
`
//Logistic differential equation
constant k = 1;
constant a = 1;

x(t0) = 0.5;

x' = k*x*(a-x);`
                },
                "pendulum":{
                        name:"Pendulum",
                        text:
`
//penduluum
//t = [0,0.5]

constant m = 1;
constant r = 1;
constant g = 9.8;

y1(t0) = 1;
y2(t0) = 0;

y1' = y2;
y2' = y3;
m*x3 = T*x1/r;
m*y3 = T*y1/r - g;
x1^2 + y1^2 = r^2;
x1*x2 + y1*y2 = 0;
x2^2 + y2^2+ x1*x3 + y3*y1 = 0;`
                },
                "orbit":{
                        name:"An Arenstorf orbit",
                        text:
`
//period is 17.0652165601579625588917206249
x1' = x2;
x2' = x1 + 2*y2 - m2*(x1+m1)/D1-m1*(x1-m2)/D2;
y1' = y2;
y2' = y1 - 2*x2 - m2*y1/D1-m1*y1/D2;

D1 = ((x1 + m1)^2 + y1^2)^1.5;
D2 = ((x1 - m2)^2 + y1^2)^1.5;
x1(t0) = 0.994;
x2(t0) = 0;
y1(t0) = 0;
y2(t0) = −2.00158510637908252240537862224;


constant m1 = 0.012277471;
constant m2 = 1 - m1;`
                },
                "oregonator":{
                        name:"Oregonator",
                        text:
`
//t = [0,400]
constant a1 = 77.27;
constant a2 = 8.375e-5;
constant a3 = 0.161;

x1' = a1 * x2 + a1 * x1 - a1 * a2 * x1^2 - a1 * x1 * x2;
x2' = (-x2 + x1*x2 + x3) / a1;
x3' = a3 * (x1 - x3);

x1(t0) = 400;
x2(t0) = 1;
x3(t0) = 400;
`
                },
                "brusselator":{
                        name:"Brusselator",
                        text:
`
//t = [0,30]
x1(t0) = 1.5;
x2(t0) = 3;

x1' = 1 + x1^2 * x2 - 4*x1;
x2' = 3*x1 - x1^2 * x2;
`
                }
        },
        hybrid:{
                "jumping-ball":{
                        name:"Jumping ball",
                        text:
`
//Jumping ball
constant m = 1;
constant g = 9.8;
constant k = 1;

x(t0) = 1;
v(t0) = 0;

v' = -m*g;
x' = v;

state jump{
        set v = -v*k;
} from init, jump on(v<0 and x<0);

terminal state end{
}from init, jump on(abs(v)=0 and abs(x)=0);`
                },
                "two-masses":{
                        name:"Two masses",
                        text:
`
//Two masses
constant k1 = n1 = m1 = m2 = 1, k2 = n2 = 2;

x1(t0) = 0;
x2(t0) = 3;
st(t0) = 0;

state separate{
        x1' = v1;
        v1' = k1*(n1-x1)/m1;
        x2' = v2;
        v2' = k2*(n2-x2)/m2;
        set st = 10;
        a1 = k1*(n1 - x1)/m1;
        a2 = k2*(n2 - x2)/m2;
} from init, together on(st<);

state together{
        set st = 10;
        set v1 = (m1 * v1 + m2*v2)/(m1 + m2);
        set v2 = v1;
        v1' = (k1*n1+k2*n2-x1*(k1+k2))/(m1+m2);
        v2' = (k1*n1+k2*n2-x2*(k1+k2))/(m1+m2);
        x1' = v1;
        x2' = v2;
        a1 = (k1*n1 + k2*n2-x1*(k1+k2))/(m1+m2);
        a2 = (k1*n1 + k2*n2-x2*(k1+k2))/(m1+m2);
} from init, separate on(x1>x2&&v1>v2);`
                },
                "abs-equation":{
                        name:"Abs value differential equation",
                        text:
`
//abs value
//t = [0,40]
x(t0) = 1;

x' = -abs(x);
z = exp(-t);//analytic solution

state zero{
	set x = abs(x);
} from init, zero on(x<0);`
                },
                "knee-problem":{
                        name:"Knee problem",
                        text:
`
//knee problem
//t = [0,2]

constant epsilon = 1e-6;

x(t0) = 1;
if(t<1){
	z = 1 - x;
}else{
	z = 0;
}
epsilon*x' = (1 - t)*x - x^2;

state zero on(x<0){
	set x = abs(x);
} from init on(x<0), zero on(x<0);`
                },
                "falling-body":{
                        name:"Falling body",
                        text:
`
//falling body
//x'' = -1 + x'^2

x1(t0) = 1;
x2(t0) = 0;

x1' = x2;
x2' = -1 + x1^2;

terminal state zero{
} from init on(x<=0);`
                }
        }
};
