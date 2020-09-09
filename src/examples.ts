


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
t * x^2*der(x)^3 - x^3*der(x)^2 + t*(t^2+1)*der(x)-t*t*x = 0;
z = sqrt(t*t+0.5);  //exact solution`
                },
                "stiff-equation":{
                    name:"Stiff equation",
                    text:
`//stiff equation

constant x0 = 0;
constant a = -21;
constant c1 = x0 + 1/(a + 1);

x' = a*x+exp(-t);
z = c1 * exp(a*t) - exp(-t)/(a+1);//analytical solution
x(t0) = x0;`
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
z(t0) = 1;

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
constant x0 = 1;
constant t0 = 0;

x(t0) = x0;
x' = a * x;
z = x0*exp(a*x-a*t0);//analytic solution
`
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
                "implicid van-der-pol":{
                        name:"Implicit Van der Pol oscillator",
                        text:
`
//Van der Pol oscillator

constant mu = 20;
constant a = 0;
constant omega = 1;

x1(t0) = 1;
x2(t0) = 0;

x1' - x2 =0;
x2' = mu*(1-x1*x1)*x2-x1 + a*sin(omega*t);
`
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
                "double-pendulum":{
                        name:"Double pendulum",
                        text:
`//double pendulum

constant m = 1;
constant r = 1;
constant g = 9.82;

p1(t0) = 0;
p2(t0) = 0;
theta1(t0) = 1.5;
theta2(t0) = 3.;

macro dtheta1() 6/(m*r^2)*(2*p1 - 3*cos(theta1 - theta2)*p2)/(16-9*cos(theta1 - theta2)^2);
macro dtheta2() 6/(m*r^2)*(8*p2 - 3*cos(theta1 - theta2)*p1)/(16-9*cos(theta1 - theta2)^2);

der(theta1) =#dtheta1() ;
der(theta2) = #dtheta2();
der(p1) = -0.5*m*(r^2)*(#dtheta1()*#dtheta2()*sin(theta1-theta2)+3*g/r*sin(theta1));
der(p2) = -0.5*m*(r^2)*(-#dtheta1()*#dtheta2()*sin(theta1-theta2)+g/r*sin(theta2));

x1 =r*sin(theta1);
y1 = -r*cos(theta1);
x2 = r*sin(theta1) + r*sin(theta2);
y2 = -r*cos(theta1) - r*cos(theta2);
`
                },
                "mathieu":{
                        name:"Mathieu's differential equation",
                        text:
`//Methieu's differential equation

constant q = 1;
constant a = 2;

y(t0) = 0;
dyt(t0) = 0;

dyt' = y*(2*q*cos(2*t)-a);
y' = dyt;

`
                },
                "linear-system":{
                        name:"Linear system",
                        text:
`//Linear system
/*
x_i' = sum_j x_j * a_{ij} + t * b_i
*/

macro a[1][1]()  1;
macro  a[1][2]() -1;
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
        der(x[i]) = sum(j in [1:3]){ x[j]*#a[i][j]() }+#b[i]()*t;
}
`
                },
                "pendulum":{
                        name:"Pendulum",
                        text:
`//penduluum
//t = [0,0.5]

constant m = 1;
constant r = 1;
constant g = 9.8;
constant angle = pi()/6;

x1(t0) = r*sin(angle);
y1(t0) = -r*cos(angle);
x2(t0) = 0;
y2(t0) = 0;
T(t0) = 0.0;
x3(t0) = 0.0;
y3(t0) = 0.0;

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
constant m1 = 0.012277471;
constant m2 = 1 - m1;

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
`
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
constant g = 9.82;
constant k = 1;

x(t0) = 1;
v(t0) = 0;

v' = -m*g;
x' = v;

state jump{
        set v = -v*k;
} from initial, jump on(v<0 and x<0);

terminal state end{
}from initial, jump on(abs(v)=0 and abs(x)=0);`
                },
                "jumping-ball-spring":{
                        name:"Jumping ball on a spring",
                        text:
`//Jumping ball on a spring
constant m = 1;
constant g = 9.82;
constant k = 1;
constant k_spring = 0.1;
constant h0;

x(t0) = 1;
v(t0) = 0;

v' = -m*g - k_spring*(x - h0);
x' = v;

state jump{
        set v = -v*k;
} from initial, jump on(v<0 and x<0);

terminal state end{
}from initial, jump on(abs(v)=0 and abs(x)=0);
`
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
} from initial, together on(st<);

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
} from initial, separate on(x1>x2&&v1>v2);`
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
} from initial, zero on(x<0);`
                },
                "knee-problem":{
                        name:"Knee problem",
                        text:
`
//knee problem
//t = [0,2]

constant epsilon = 1e-6;

x(t0) = 1;
z = {t<1?1 - x:0};
epsilon*x' = (1 - t)*x - x^2;

state zero on(x<0){
	set x = abs(x);
} from initial on(x<0), zero on(x<0);`
                },
                "falling-body":{
                        name:"Falling body",
                        text:
`
//falling body
//x'' = -1 + x'^2

x1(t0) = 1;
x2(t0) = 0;

eq_1:x1' = x2;
eq_2:x2' = -1 + x2^2;

terminal state zero{
        eq_1:x1' = 0;
        eq_2:x2' = 0;
} from initial on(x<=0);`
                },
                "heater":{
                        name:"Heater",
                        text:
`//Heater
constant Tref = 25;
constant dT = 10;
constant C = 5;
T(t0) = 20;
c = -C;
T' = c*T;
state switchOff{
        c = -C;
} from initial,switchOn on(T>Tref+dT);
state switchOn{
        c = C;
}from initial,switchOff on(T<Tref-dT);

`
                },
                "heaterDiscrete":{
                        name:"Heater with discrete time",
                        text:
`//Heater with discrete time
constant Tref = 25;
constant THyst = 5;//hysteresis
constant dt = 0.10;//switch every 0.1 seconds
constant C = 5;

_state(t0) = 1;//on state
timer(t0) = 0;
T(t0) = 20;
c(t0) = 0;
timer' = 1;
_state' = 0;
c' = 0;
T' = c*T;
state switch{
        set _state = {_state>0?{T>Tref+THyst?-1:1}:{T<Tref-THyst?1:-1}};
        set c = {_state>0?{T>Tref+THyst?-C:C}:{T<Tref-THyst?C:-C}};
        set timer = 0;
} from initial,switch on(timer>dt);
`
                }
        }
};
