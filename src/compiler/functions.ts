import {ExpressionNode, FunctionNode, NegationNode, ConstantNode, DivisionNode, MultiplicationNode, SubtractionNode, AdditionNode} from "./expressionNodes";
export interface FunctionDerivative{
    (args:ExpressionNode[]):ExpressionNode;
}


export abstract class FunctionDef{
    name:string;
    argCount:number;
    derivatives:Array<(args: ExpressionNode[])=>ExpressionNode>;
    constructor(name:string,argCount:number,derivatives:FunctionDerivative[]){
        this.name = name;
        this.argCount = argCount;
        this.derivatives = derivatives;
    }
    abstract exec(args:number[]):number;
    getDerivative(index:number, args:ExpressionNode[]):ExpressionNode{
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
    static der(args:ExpressionNode[]){
        return new FunctionNode("cos",args);
    }
}
class cos extends FunctionDef{
    constructor(){
        super("cos",1, [cos.der]);
    }
    exec(args:number[]){
        return Math.sin(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new NegationNode(new FunctionNode("cos",args));
    }
}
class sinc extends FunctionDef{
    constructor(){
        super("sinc",1,[sinc.der]);
    }
    exec(args:number[]){
        if(args[0]<0.0001)
            return 1.0-args[0]*args[0]/6.0*(1.-args[0]*args[0]/20);//truncated maclaurin series 
        return Math.sin(args[0])/args[0];
    }
    static der(args:ExpressionNode[]){
        return new DivisionNode(
            new SubtractionNode(new FunctionNode("cos",args),new FunctionNode("sinc",args)),
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
    static der(args:ExpressionNode[]){
        return new FunctionNode("pow",[
            new FunctionNode("cos", args),
            new ConstantNode(2)]);
    }
};
class cot extends FunctionDef{
    constructor(){
        super("cot",1,[cot.der]);
    }
    exec(args:number[]){
        return Math.cos(args[0])/Math.sin(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new NegationNode(
            new FunctionNode("pow",[
                new FunctionNode("sin",args),
                new ConstantNode(2)])
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
    static der(args:ExpressionNode[]){
        return new DivisionNode(new ConstantNode(1.0),
        new FunctionNode("sqrt",
        [
            new SubtractionNode(
                new ConstantNode(1),
                new MultiplicationNode(args[0],args[0]))
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
    static der(args:ExpressionNode[]){
        return new NegationNode(
            new DivisionNode(new ConstantNode(1.0),
        new FunctionNode("sqrt",
        [
            new SubtractionNode(
                new ConstantNode(1),
                new MultiplicationNode(args[0],args[0]))
        ])));
    }};
class atan extends FunctionDef{
    constructor(){
        super("atan",1,[atan.der]);
    }
    exec(args:number[]){
        return Math.atan(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new DivisionNode(new ConstantNode(1.0),
            new AdditionNode(
                new ConstantNode(1),
                new MultiplicationNode(args[0],args[0])
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
    static der(args:ExpressionNode[]){
        return new NegationNode(new DivisionNode(new ConstantNode(1.0),
            new AdditionNode(
                new ConstantNode(1),
                new MultiplicationNode(args[0],args[0])
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
    static der(args:ExpressionNode[]){
        return new FunctionNode("cosh",args);
    }};
class cosh extends FunctionDef{
    constructor(){
        super("cosh",1,[cosh.der]);
    }
    exec(args:number[]){
        return Math.cosh(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new FunctionNode("sinh",args);
    }};
class tanh extends FunctionDef{
    constructor(){
        super("tanh",1,[tanh.der]);
    }
    exec(args:number[]){
        return Math.tanh(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new FunctionNode("pow",[
            new FunctionNode("cosh",args)
            ,new ConstantNode(-2)
        ]);
    }};
class coth extends FunctionDef{
    constructor(){
        super("coth",1,[coth.der]);
    }
    exec(args:number[]){
        return 1.0/Math.tanh(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new NegationNode(new FunctionNode("pow",[
            new FunctionNode("sinh",args)
            ,new ConstantNode(-2)
        ]));
    }};
class asinh extends FunctionDef{
    constructor(){
        super("asinh",1,[asinh.der]);
    }
    exec(args:number[]){
        return Math.asinh(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new DivisionNode(new ConstantNode(1),
            new FunctionNode("sqrt",[new AdditionNode(
                new MultiplicationNode(args[0],args[0]),
                new ConstantNode(1)
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
    static der(args:ExpressionNode[]){
        return new DivisionNode(new ConstantNode(1),
            new FunctionNode("sqrt",[new SubtractionNode(
                new MultiplicationNode(args[0],args[0]),
                new ConstantNode(1)
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
    static der(args:ExpressionNode[]){
        return new DivisionNode(
            new ConstantNode(1),
            new SubtractionNode(
                new ConstantNode(1),
                new MultiplicationNode(args[0],args[0])
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
    static der(args:ExpressionNode[]){
        return new DivisionNode(
            new ConstantNode(1),
            new SubtractionNode(
                new ConstantNode(1),
                new MultiplicationNode(args[0],args[0])
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
    static der(args:ExpressionNode[]){
        return new MultiplicationNode(new ConstantNode(2.0 / Math.sqrt(Math.PI)), new FunctionNode("exp", [new NegationNode(new MultiplicationNode(args[0], args[0]))]));
    }
};
class exp extends FunctionDef{
    constructor(){
        super("exp",1,[exp.der]);
    }
    exec(args:number[]){
        return Math.exp(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new FunctionNode("exp", args);
    }
};
class pow extends FunctionDef{
    constructor(){
        super("pow",2,[pow.derX,pow.derY]);
    }
    exec(args:number[]){
        return Math.pow(args[0], args[1]);
    }
    static derX(args:ExpressionNode[]){
        return new MultiplicationNode(args[1], new FunctionNode("pow", [
            args[0],new SubtractionNode(args[1], new ConstantNode(1))
        ]));
    }
    static derY(args:ExpressionNode[]){
        return new MultiplicationNode(new FunctionNode("ln", [args[0]]), new FunctionNode("pow", args));
    }
};
class ln extends FunctionDef{
    constructor(){
        super("ln",1,[ln.der]);
    }
    exec(args:number[]){
        return Math.log(args[0]);
    }
    static der(args:ExpressionNode[]){return new DivisionNode(new ConstantNode(1.0), args[0]); 
    }
};
class log extends FunctionDef{
    constructor(){
        super("log",2,[log.derX,log.derY]);
    }
    exec(args:number[]){
        return Math.log(args[1])/Math.log(args[0]);
    }
    static derX(args:ExpressionNode[]){
        return new DivisionNode(
            new FunctionNode("ln",[args[1]]),
            new MultiplicationNode(
                new FunctionNode("pow",[
                    new FunctionNode("ln",[args[0]]),
                    new ConstantNode(2)]),
                    args[0])
        );
    }
    static derY(args:ExpressionNode[]){
        return new DivisionNode(
            new ConstantNode(1),
            new MultiplicationNode(args[1],new FunctionNode("ln",[args[0]]))
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
    static der(args:ExpressionNode[]){
        return new DivisionNode(
            new ConstantNode(1.0/Math.log(10)),
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
    static der(args:ExpressionNode[]){return new DivisionNode(new ConstantNode(0.5),new FunctionNode("sqrt",args));
    }
};
class abs extends FunctionDef{
    constructor(){
        super("abs",1,[abs.der]);
    }
    exec(args:number[]){
        return Math.abs(args[0]);
    }
    static der(args:ExpressionNode[]){
        return new FunctionNode("step",args);
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
    /*static der(args:ExpressionNode[]){
        let x = args[0];
        return new 
        x = Math.max(Math.min(1,x),0);
        return new ConstantNode(6*x*(1-x));
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
    sign:new sign(),
    step:new step(),
    frac:new frac(),
    smoothstep:new smoothstep(),
    e:new e(),
    pi:new pi()
};