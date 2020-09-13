export default {
    name:"Weissinger implicit DE",
    model:
`//double pendulum

const m = 1;
const r = 1;
const g = 9.82;

p1(t0) = 0;
p2(t0) = 0;
theta1(t0) = 1.5;
theta2(t0) = 3.;

macro dtheta1() 6/(m*r^2)*(2*p1 - 3*cos(theta1 - theta2)*p2)/(16-9*cos(theta1 - theta2)^2);
macro dtheta2() 6/(m*r^2)*(8*p2 - 3*cos(theta1 - theta2)*p1)/(16-9*cos(theta1 - theta2)^2);

der(theta1) = #dtheta1() ;
der(theta2) = #dtheta2();
der(p1) = -0.5*m*(r^2)*(#dtheta1()*#dtheta2()*sin(theta1-theta2)+3*g/r*sin(theta1));
der(p2) = -0.5*m*(r^2)*(-#dtheta1()*#dtheta2()*sin(theta1-theta2)+g/r*sin(theta2));

x1 =r*sin(theta1);
y1 = -r*cos(theta1);
x2 = r*sin(theta1) + r*sin(theta2);
y2 = -r*cos(theta1) - r*cos(theta2);
`,
    parameters:{
        "t0":1,
        "time":10,
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