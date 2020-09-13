import {
    Expression,
    Function,
    Negation,
    Constant,
    Division,
    Multiplication, 
    Subtraction,
    Addition
} from "./expression";
export interface FunctionDerivative{
    (args:Expression[]):Expression;
}


export abstract class FunctionDef{
    name:string;
    argCount:number;
    derivatives:Array<(args: Expression[])=>Expression>;
    constructor(name:string,argCount:number,derivatives:FunctionDerivative[]){
        this.name = name;
        this.argCount = argCount;
        this.derivatives = derivatives;
    }
    abstract exec(args:number[]):number;
    getDerivative(index:number, args:Expression[]):Expression{
        return this.derivatives[index](args);
    }
}
class sin extends FunctionDef{
    constructor(){
        super("sin",1, [sin.der]);
    }
    exec(args:number[]){
        return Math.sin(args[0]);
    }
    static der(args:Expression[]){
        return new Function("cos",args);
    }
}
class cos extends FunctionDef{
    constructor(){
        super("cos",1, [cos.der]);
    }
    exec(args:number[]){
        return Math.cos(args[0]);
    }
    static der(args:Expression[]){
        return new Negation(new Function("cos",args));
    }
}
class sinc extends FunctionDef{
    constructor(){
        super("sinc",1,[sinc.der]);
    }
    exec(args:number[]){
        return sinc.call(args[0]);
    }
    static call(x:number){
        x = Math.abs(x);
        if(x<0.001)
            return 1.0-x*x/6.0*(1.-x*x/20);//truncated maclaurin series 
        return Math.sin(x)/x;
    }
    static der(args:Expression[]){
        return new Division(
            new Subtraction(new Function("cos",args),new Function("sinc",args)),
            args[0]
            );
    }
};
class tan extends FunctionDef{
    constructor(){
        super("tan",1,[tan.der]);
    }
    exec(args:number[]){
        return Math.tan(args[0]);
    }
    static der(args:Expression[]){
        return new Function("pow",[
            new Function("cos", args),
            new Constant(2)]);
    }
};
class cot extends FunctionDef{
    constructor(){
        super("cot",1,[cot.der]);
    }
    exec(args:number[]){
        return Math.cos(args[0])/Math.sin(args[0]);
    }
    static der(args:Expression[]){
        return new Negation(
            new Function("pow",[
                new Function("sin",args),
                new Constant(2)])
        );
    }
};
class asin extends FunctionDef{
    constructor(){
        super("asin",1,[asin.der]);
    }
    exec(args:number[]){
        return Math.asin(args[0]);
    }
    static der(args:Expression[]){
        return new Division(new Constant(1.0),
        new Function("sqrt",
        [
            new Subtraction(
                new Constant(1),
                new Multiplication(args[0],args[0]))
        ])) 
    }
};
class acos extends FunctionDef{
    constructor(){
        super("acos",1,[acos.der]);
    }
    exec(args:number[]){
        return Math.acos(args[0]);
    }
    static der(args:Expression[]){
        return new Negation(
            new Division(new Constant(1.0),
        new Function("sqrt",
        [
            new Subtraction(
                new Constant(1),
                new Multiplication(args[0],args[0]))
        ])));
    }};
class atan extends FunctionDef{
    constructor(){
        super("atan",1,[atan.der]);
    }
    exec(args:number[]){
        return Math.atan(args[0]);
    }
    static der(args:Expression[]){
        return new Division(new Constant(1.0),
            new Addition(
                new Constant(1),
                new Multiplication(args[0],args[0])
                )
        );
    }};
class acot extends FunctionDef{
    constructor(){
        super("acot",1,[acot.der]);
    }
    exec(args:number[]){
        return Math.PI/2-Math.atan(args[0]);
    }
    static der(args:Expression[]){
        return new Negation(new Division(new Constant(1.0),
            new Addition(
                new Constant(1),
                new Multiplication(args[0],args[0])
                )
        ));
    }};
class sinh extends FunctionDef{
    constructor(){
        super("sinh",1,[sinh.der]);
    }
    exec(args:number[]){
        return Math.sinh(args[0]);
    }
    static der(args:Expression[]){
        return new Function("cosh",args);
    }};
class cosh extends FunctionDef{
    constructor(){
        super("cosh",1,[cosh.der]);
    }
    exec(args:number[]){
        return Math.cosh(args[0]);
    }
    static der(args:Expression[]){
        return new Function("sinh",args);
    }};
class tanh extends FunctionDef{
    constructor(){
        super("tanh",1,[tanh.der]);
    }
    exec(args:number[]){
        return Math.tanh(args[0]);
    }
    static der(args:Expression[]){
        return new Function("pow",[
            new Function("cosh",args)
            ,new Constant(-2)
        ]);
    }};
class coth extends FunctionDef{
    constructor(){
        super("coth",1,[coth.der]);
    }
    exec(args:number[]){
        return 1.0/Math.tanh(args[0]);
    }
    static der(args:Expression[]){
        return new Negation(new Function("pow",[
            new Function("sinh",args)
            ,new Constant(-2)
        ]));
    }};
class asinh extends FunctionDef{
    constructor(){
        super("asinh",1,[asinh.der]);
    }
    exec(args:number[]){
        return Math.asinh(args[0]);
    }
    static der(args:Expression[]){
        return new Division(new Constant(1),
            new Function("sqrt",[new Addition(
                new Multiplication(args[0],args[0]),
                new Constant(1)
            )])
        ); 
    }};
class acosh extends FunctionDef{
    constructor(){
        super("acosh",1,[acosh.der]);
    }
    exec(args:number[]){
        return Math.acosh(args[0]);
    }
    static der(args:Expression[]){
        return new Division(new Constant(1),
            new Function("sqrt",[new Subtraction(
                new Multiplication(args[0],args[0]),
                new Constant(1)
            )])
        );
    }};
class atanh extends FunctionDef{
    constructor(){
        super("atanh",1,[atanh.der]);
    }
    exec(args:number[]){
        return Math.atanh(args[0]);
    }
    static der(args:Expression[]){
        return new Division(
            new Constant(1),
            new Subtraction(
                new Constant(1),
                new Multiplication(args[0],args[0])
            ),
        )
    }};
class acoth extends FunctionDef{
    constructor(){
        super("acoth",1,[acoth.der]);
    }
    exec(args:number[]){
        return 0.5*Math.log((1+args[0])/(args[0]-1));
    }
    static der(args:Expression[]){
        return new Division(
            new Constant(1),
            new Subtraction(
                new Constant(1),
                new Multiplication(args[0],args[0])
            ),
        )
    }};
class erf extends FunctionDef{
    constructor(){
        super("erf",1,[erf.der]);
    }
    static call(x:number):number{
       var sign = Math.sign(x);
       x = Math.abs(x);
       var a1 = 0.254829592;
       var a2 = -0.284496736;
       var a3 = 1.421413741;
       var a4 = -1.453152027;
       var a5 = 1.061405429;
       var p = 0.3275911;
       var t = 1.0 / (1.0 + p * x);
       var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
       return sign * y;
    }
    exec(args:number[]){
        return erf.call(args[0]);
    }
    static der(args:Expression[]){
        return new Multiplication(new Constant(2.0 / Math.sqrt(Math.PI)), new Function("exp", [new Negation(new Multiplication(args[0], args[0]))]));
    }
};
class exp extends FunctionDef{
    constructor(){
        super("exp",1,[exp.der]);
    }
    exec(args:number[]){
        return Math.exp(args[0]);
    }
    static der(args:Expression[]){
        return new Function("exp", args);
    }
};
class pow extends FunctionDef{
    constructor(){
        super("pow",2,[pow.derX,pow.derY]);
    }
    exec(args:number[]){
        return Math.pow(args[0], args[1]);
    }
    static derX(args:Expression[]){
        return new Multiplication(args[1], new Function("pow", [
            args[0],new Subtraction(args[1], new Constant(1))
        ]));
    }
    static derY(args:Expression[]){
        return new Multiplication(new Function("ln", [args[0]]), new Function("pow", args));
    }
};
class ln extends FunctionDef{
    constructor(){
        super("ln",1,[ln.der]);
    }
    exec(args:number[]){
        return Math.log(args[0]);
    }
    static der(args:Expression[]){return new Division(new Constant(1.0), args[0]); 
    }
};
class log extends FunctionDef{
    constructor(){
        super("log",2,[log.derX,log.derY]);
    }
    exec(args:number[]){
        return Math.log(args[1])/Math.log(args[0]);
    }
    static derX(args:Expression[]){
        return new Division(
            new Function("ln",[args[1]]),
            new Multiplication(
                new Function("pow",[
                    new Function("ln",[args[0]]),
                    new Constant(2)]),
                    args[0])
        );
    }
    static derY(args:Expression[]){
        return new Division(
            new Constant(1),
            new Multiplication(args[1],new Function("ln",[args[0]]))
        );
    }
};
class lg extends FunctionDef{
    constructor(){
        super("lg",1,[lg.der]);
    }
    exec(args:number[]){
        return Math.log10(args[0]);
    }
    static der(args:Expression[]){
        return new Division(
            new Constant(1.0/Math.log(10)),
            args[0]);
    }
};
class sqrt extends FunctionDef{
    constructor(){
        super("sqrt",1,[sqrt.der]);
    }
    exec(args:number[]){
        return Math.sqrt(args[0]);
    }
    static der(args:Expression[]){
        return new Division(new Constant(0.5),new Function("sqrt",args));
    }
};
class abs extends FunctionDef{
    constructor(){
        super("abs",1,[abs.der]);
    }
    exec(args:number[]){
        return Math.abs(args[0]);
    }
    static der(args:Expression[]){
        return new Function("step",args);
    }
};
class min extends FunctionDef{
    constructor(){
        super("min",2,null);
    }
    exec(args:number[]){
        return Math.min(args[0], args[1]);
    }
};
class max extends FunctionDef{
    constructor(){
        super("max",2,null);
    }
    exec(args:number[]){
        return Math.max(args[0], args[1]);
    }
};
class sign extends FunctionDef{
    constructor(){
        super("sign",1,null);
    }
    exec(args:number[]){
        return Math.sign(args[0]);
    }
};
class step extends FunctionDef{
    constructor(){
        super("step",1,null);
    }
    static call(x:number):number{
        return x<0?0:1;
    }
    exec(args:number[]){
        return step.call(args[0]);
    }
};
class frac extends FunctionDef{
    constructor(){
        super("frac",1,null);
    }
    static call(x:number):number{
        return (x-Math.floor(x));
    }
    exec(args:number[]){
        return frac.call(args[0]);
    }
}
class squarewave extends FunctionDef{
    constructor(){
        super("squarewave",1,null);
    }
    static call(x:number):number{
        return Math.sign(frac.call(x/2)-0.5);
        //return Math.sign(Math.abs(x)%1);
    }
    exec(args:number[]){
        return squarewave.call(args[0]);
    }
}
class smoothstep extends FunctionDef{
    constructor(){
        super("smoothstep",1,null);
    }
    static call(x:number):number{
        x = Math.max(Math.min(1,x),0);
        return x*x*(3-2*x);
    }
    exec(args:number[]){
        return smoothstep.call(args[0]);
    }
    /*static der(args:Expression[]){
        let x = args[0];
        return new 
        x = Math.max(Math.min(1,x),0);
        return new Constant(6*x*(1-x));
    }*/
};
class e extends FunctionDef{
    constructor(){
        super("e",0,[]);
    }
    exec(args:number[]){
        return Math.E;
    }
};
class pi extends FunctionDef{
    constructor(){
        super("pi",0,[]);
    }
    exec(args:number[]){
        return Math.PI;
    }
};
class floor extends FunctionDef{
    constructor(){
        super("floor",1,null);
    }
    static call(x:number):number{
        return Math.floor(x);
    }
    exec(args:number[]){
        return floor.call(args[0]);
    }
}
class ceil extends FunctionDef{
    constructor(){
        super("ceil",1,null);
    }
    static call(x:number):number{
        return Math.ceil(x);
    }
    exec(args:number[]){
        return ceil.call(args[0]);
    }
}
class round extends FunctionDef{
    constructor(){
        super("round",1,null);
    }
    static call(x:number):number{
        return Math.round(x);
    }
    exec(args:number[]){
        return round.call(args[0]);
    }
}
class lerp extends FunctionDef{
    constructor(){
        super("lerp",3,[lerp.derX,lerp.derY,lerp.derT]);
    }
    static call(x:number,y:number,t:number):number{
        return x*(1-t)+y*t;
    }
    exec(args:number[]){
        return lerp.call(args[0],args[1],args[2]);
    }
    static derX(args:Expression[]){
        return new Subtraction(new Constant(1),args[2]);
    }
    static derY(args:Expression[]){
        return args[2];
    }
    static derT(args:Expression[]){
        return new Subtraction(args[1],args[0]);
    }
}
class clamp extends FunctionDef{
    constructor(){
        super("clamp",3,null);
    }
    static call(x:number,min:number,max:number):number{
        return Math.max(min,Math.min(x,max));
    }
    exec(args:number[]){
        return clamp.call(args[0],args[1],args[2]);
    }
}
class saturate extends FunctionDef{
    constructor(){
        super("saturate",1,null);
    }
    static call(x:number):number{
        return Math.max(0,Math.min(x,1));
    }
    exec(args:number[]){
        return saturate.call(args[0]);
    }
}

export var functionDictionary:Record<string,FunctionDef> = {
    sin:new sin(),
    cos:new cos(),
    tan:new tan(),
    cot:new cot(),
    asin:new asin(),
    acos:new acos(),
    atan:new atan(),
    acot:new acot(),
    sinh:new sinh(),
    cosh:new cosh(),
    tanh:new tanh(),
    coth:new coth(),
    asinh:new asinh(),
    acosh:new acosh(),
    atanh:new atanh(),
    acoth:new acoth(),
    erf:new erf(),
    exp:new exp(),
    pow:new pow(),
    ln:new ln(),
    log:new log(),
    lg:new lg(),
    sqrt:new sqrt(),
    abs:new abs(),
    min:new min(),
    max:new max(),
    lerp:new lerp(),
    clamp:new clamp(),
    saturate:new saturate(),
    sign:new sign(),
    step:new step(),
    frac:new frac(),
    floor:new floor(),
    round:new round(),
    ceil:new ceil(),
    smoothstep:new smoothstep(),
    e:new e(),
    pi:new pi(),
    sinc:new sinc(),
    squarewave:new squarewave()
};