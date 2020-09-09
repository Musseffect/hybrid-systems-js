import { functionDictionary,FunctionDef } from "./functions";

export const NodeType = {
    _Constant:0,
    _Function:1,
    _Variable:2,
    _Ternary:3,
    _Division:4,
    _Multiplication:5,
    _Negation:6,
    _Subtraction:7,
    _Addition:8
};

export abstract class Expression{
    type:number;
    constructor(type:number){
        this.type = type;
    }
    abstract clone():Expression;
	abstract differentiate(variable:string,epsilon:number):Expression;
    abstract eval(variableMap:Record<string,number>):number;
    abstract execute(variableValues:number[]):number;
	abstract simplify():Expression;
	abstract print():string;
}
export class Constant extends Expression{
    value:number;
    constructor(value:number){
        super(NodeType._Constant);
        this.value = value;
    }
    clone():Expression{
        return new Constant(this.value);
    }
	differentiate(variable:string, epsilon:number):Expression{
		return new Constant(0.0);
	}
    eval(variableMap:Record<string,number>):number{
        return this.value;
    }
    execute(variableValues:number[]):number{
        return this.value;
    }
    simplify():Expression{
        return this.clone();
	}
	print():string{
		return this.value.toString();
	}
}
export class Negation extends Expression{
    inner:Expression;
    constructor(inner:Expression){
        super(NodeType._Negation);
        this.inner = inner;
    }
    clone(){
        return new Negation(this.inner.clone());
    }
	differentiate(variable:string, epsilon:number){
		return new Negation(this.inner.differentiate(variable,epsilon));
	}
    eval(variableMap:Record<string,number>):number{
        return -this.inner.eval(variableMap);
    }
    execute(variableValues:number[]):number{
        return -this.inner.execute(variableValues);
    }
	simplify(){
		let node = this.inner.simplify();
		if(node instanceof Constant)
			return new Constant(-node.value);
		if(node instanceof Negation){
			return node.inner;
		}
		return new Negation(node);
	}
	print():string{
		let arg = this.inner.print();
		return "-"+(this.inner.type>=this.type?"("+arg+")":arg);
	}
}
abstract class BinaryOp extends Expression{
    left:Expression;
    right:Expression;
    constructor(type:number,left:Expression,right:Expression){
        super(type);
        this.left = left;
        this.right = right;
    }
}
export class Multiplication extends BinaryOp{
    constructor(left:Expression,right:Expression){
        super(NodeType._Multiplication,left,right)
    }
    clone(){
        return new Multiplication(this.left.clone(),this.right.clone());
    }
	differentiate(variable:string, epsilon:number){
		return new Addition(
				new Multiplication(
					this.left.differentiate(variable, epsilon),
					this.right.clone()
				),
				new Multiplication(
					this.left.clone(),
					this.right.differentiate(variable, epsilon)
				)
			);
	}
    eval(variableMap:Record<string,number>):number{
        return this.left.eval(variableMap)*this.right.eval(variableMap);
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)*this.right.execute(variableValues);
    }
	simplify(){
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant){
			if(r instanceof Constant){
				return new Constant(l.value * r.value);
			}
			if(Math.abs(l.value)==0.0)
				return l;
			if(l.value == 1)
				return r;
			if(l.value == -1)
				return new Negation(r);
		}else if(r instanceof Constant){
			if(Math.abs(r.value)==0.0)
				return r;
			if(r.value == 1)
				return l;
			if(r.value == -1)
				return new Negation(l);
		}
		return new Multiplication(l,r);
	}
	print():string{
		let l = this.left.print();
		let r = this.right.print();
		return (this.left.type>this.type?"("+l+")":l)+"*"+(this.right.type>this.type?"("+r+")":r);
	}
}
export class Addition extends BinaryOp{
    constructor(left:Expression,right:Expression){
        super(NodeType._Addition, left, right)
    }
    clone(){
        return new Addition(this.left.clone(),this.right.clone());
    }
	differentiate(variable:string, epsilon:number){
		return new Addition(
			this.left.differentiate(variable,epsilon),
			this.right.differentiate(variable,epsilon)
			);
	}
    eval(variableMap:Record<string,number>):number{
        return this.left.eval(variableMap)+this.right.eval(variableMap);
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)+this.right.execute(variableValues);
    }
	simplify(){
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant){
			if(r instanceof Constant){
				return new Constant(l.value + r.value);
			}
			if(Math.abs(l.value)==0)
				return r;
		}else if(r instanceof Constant){
			if(Math.abs(r.value)==0.0)
				return l;
		}
		return new Addition(l,r);
	}
	print():string{
		let l = this.left.print();
		let r = this.right.print();
		return (this.left.type>this.type?"("+l+")":l)+"+"+(this.right.type>this.type?"("+r+")":r);
	}
}
export class Subtraction extends BinaryOp{
    constructor(left:Expression,right:Expression){
        super(NodeType._Subtraction, left, right)
    }
    clone(){
        return new Subtraction(this.left.clone(),this.right.clone());
    }
	differentiate(variable:string, epsilon:number){
		return new Subtraction(
			this.left.differentiate(variable,epsilon),
			this.right.differentiate(variable,epsilon)
			);
	}
    eval(variableMap:Record<string,number>):number{
        return this.left.eval(variableMap)-this.right.eval(variableMap);
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)-this.right.execute(variableValues);
    }
	simplify(){
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant){
			if(r instanceof Constant){
				return new Constant(l.value - r.value);
			}
			if(Math.abs(l.value)==0)
				return new Negation(r);
		}else if(r instanceof Constant){
			if(Math.abs(r.value)==0)
				return l;
		}
		return new Subtraction(l,r);
	}
	print():string{
		let l = this.left.print();
		let r = this.right.print();
		return (this.left.type>this.type?"("+l+")":l)+"-"+(this.right.type>=this.type?"("+r+")":r);
	}
}
export class Division extends BinaryOp{
    constructor(left:Expression,right:Expression){
        super(NodeType._Division, left, right)
    }
    clone(){
        return new Division(this.left.clone(),this.right.clone());
    }
	differentiate(variable:string, epsilon:number){
		return new Subtraction(
			new Division(
				this.left.differentiate(variable,epsilon),
				this.right.clone(),
			),
			new Multiplication(
				this.right.differentiate(variable,epsilon),
				new Division(
					this.left.clone(),
					new Function("pow",[
						this.right.clone(),new Constant(2)]
					)
				)
			)
		);
	}
    eval(variableMap:Record<string,number>):number{
        return this.left.eval(variableMap)/this.right.eval(variableMap);
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)/this.right.execute(variableValues);
    }
	simplify(){
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant){
			if(Math.abs(l.value)==0.0)
				return l;
			if(r instanceof Constant){
				return new Constant(l.value / r.value);
			}
		}else if(r instanceof Constant){
			if(r.value == 1)
				return l;
			if(r.value == -1)
				return new Negation(l);
		}
		return new Division(l,r);
	}
	print():string{
		let l = this.left.print();
		let r = this.right.print();
		return (this.left.type>=this.type?"("+l+")":l)+"/"+(this.right.type>=this.type?"("+r+")":r);
	}
}
export class Function extends Expression{
    functionName:string;
    function:FunctionDef;
    args:Array<Expression>;
    constructor(functionName:string,args:Array<Expression>){
        super(NodeType._Function);
        this.functionName = functionName;
        this.function = functionDictionary[functionName];
        this.args = args;
        if(this.function ===undefined)
            throw `Unknown function \"${functionName}`;
        if(this.function.argCount!=args.length)
            throw `Incorrect number of arguments in function \"${functionName}: ${args.length}, ${this.function.argCount} expected`;
    }
    clone():Expression{
        return new Function(this.functionName,this.args.map(function(item:Expression){
            return item.clone();
        }
        ));
    }
	differentiate(variable:string,epsilon:number):Expression{
		if(this.args.length==0)
			return new Constant(0.0);
		if (this.args.length == 1){
			return new Multiplication(
					this.args[0].differentiate(variable, epsilon),
					this.getDerivative(0,epsilon)
			);
		}
		let root = new Addition(null,null);
		let current:Addition = root;
		for (let i = 0; i < this.args.length - 1; i++){
			current.left = new Multiplication
			(
				this.args[i].differentiate(variable,epsilon),
				this.getDerivative(i,epsilon)
			);
			if (i < this.args.length - 2){
				current.right = new Addition(null,null);
				current = current.right as Addition;
			}
		}
		current.right = new Multiplication
		(
			this.args[this.args.length - 1].differentiate(variable,epsilon),
			this.getDerivative(this.args.length - 1,epsilon)
		);
		return root;
	}
	eval(variableMap:Record<string,number>):number{
		let args = this.args.map((item)=>{
                return item.eval(variableMap);
            }
		);
		return this.function.exec(args);
	}
	execute(variableValues:number[]):number{
		let args = this.args.map((item)=>{
                return item.execute(variableValues);
            }
		);
		return this.function.exec(args);
	}
	getDerivative(index:number, epsilon:number):Expression{
		if(this.function.derivatives===null){//use backward difference{
			let argumentsBackward = this.args.slice();
			argumentsBackward[index] = new Subtraction(argumentsBackward[index],new Constant(epsilon));
			return new Division(new Subtraction(
				new Function(this.functionName, this.args),
				new Function(this.functionName, argumentsBackward),
				),new Constant(epsilon));
		}
		return this.function.derivatives[index](this.args);
	}
	simplify():Expression{
		let constantArgs = true;
		let args = this.args.map((item)=>{
				let _item = item.simplify();
				constantArgs = constantArgs && (item instanceof Constant);
				return _item;
			}
		);
		if(constantArgs){
			let constArgs = args.map((item:Constant)=>{return item.value;});
			return new Constant(this.function.exec(constArgs));
		}
		this.args = args;
		return this;
	}
	print():string{
		let args = this.args.map((item)=>item.print());
		let result = this.function.name+"(";
		this.args.forEach((item,index)=>{
			result+=(index>0?", ":"")+item.print();
		})
		return result + ")";
	}
}
export class Variable extends Expression{
    index:number;
    name:string;
	constructor(index:number,name:string){
		super(NodeType._Variable);
        this.index = index;
		this.name = name;
    }
	clone():Expression{
		return new Variable(this.index,this.name);
	}
	differentiate(variable:string, epsilon:number){
		if(variable == this.name)
			return new Constant(1.0);
		return new Constant(0.0);
    }
	eval(variableMap:Record<string,number>):number{
		return variableMap[this.name];
	}
    execute(variableValues:number[]):number{
        return variableValues[this.index];
    }
	simplify(){
		return this.clone();
	}
	print():string{
		return this.name;
	}
}
export class TernaryOperator extends Expression{
	condition:BoolExpression;
	t:Expression;
	f:Expression;
	constructor(condition:BoolExpression,t:Expression,f:Expression){
        super(NodeType._Ternary);
        this.condition = condition;
		this.t = t;
		this.f = f;
	}
	clone():Expression{
		return new TernaryOperator(this.condition.clone(),this.t.clone(),this.f.clone());
	}
	differentiate(variable:string, epsilon:number){
        return new TernaryOperator(this.condition.clone(),
        this.t.differentiate(variable,epsilon),
        this.f.differentiate(variable,epsilon));
	}
	eval(variableMap:Record<string,number>):number{
        if(this.condition.eval(variableMap)){
            return this.t.eval(variableMap);
        }
        return this.f.eval(variableMap);
	}
    execute(variableValues:number[]):number{
        if(this.condition.execute(variableValues)){
            return this.t.execute(variableValues);
        }
        return this.f.execute(variableValues);
    }
	simplify(){
        let condition = this.condition.simplify();
        if(condition instanceof BoolConstant){
            let constant = condition as BoolConstant;
            if(constant.value)
                return this.t.simplify();
            return this.f.simplify();
        }
        return new TernaryOperator(condition,this.t.simplify(),this.f.simplify());
	}
	print():string{
		return `{${this.condition.print()}?${this.t.print()}:${this.f.print()}}`;
	}
}

export abstract class BoolExpression{
    abstract clone():BoolExpression;
	abstract eval(variableMap:Record<string,number>):boolean;
    abstract execute(variableValues:number[]):boolean;
	abstract simplify():BoolExpression;
	abstract convertToExpression(epsilon:number):Expression;
	abstract print():string;
}
abstract class BoolBinaryOp extends BoolExpression{
	left:BoolExpression;
	right:BoolExpression;
	constructor(left:BoolExpression,right:BoolExpression){
		super();
		this.left = left;
		this.right = right;
	}
}
abstract class BoolBinaryExpOp extends BoolExpression{
	left:Expression;
	right:Expression;
	constructor(left:Expression,right:Expression){
		super();
		this.left = left;
		this.right = right;
	}
}
export class And extends BoolBinaryOp{
	clone(){
		return new And(this.left.clone(),this.right.clone());
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)&&this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)&&this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		if(l instanceof BoolConstant){
			if(l.value == false)
				return l;
			return this.right.simplify();
		}
		let r = this.right.simplify();
		if(r instanceof BoolConstant){
			if(r.value == false){
				return r;
			}
			return l;
		}
		return new And(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Function("min",
		[this.left.convertToExpression(epsilon),this.right.convertToExpression(epsilon)]);
	}
	print():string{
		return `(${this.left.print()}) and (${this.right.print()})`;
	}
}
export class Or extends BoolBinaryOp{
	clone(){
		return new Or(this.left.clone(),this.right.clone());
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)||this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)||this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		if(l instanceof BoolConstant){
			if(l.value == true)
				return l;
			return this.right.simplify();
		}
		let r = this.right.simplify();
		if(r instanceof BoolConstant){
			if(r.value == true){
				return r;
			}
			return l;
		}
		return new Or(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Function("max",
		[this.left.convertToExpression(epsilon),this.right.convertToExpression(epsilon)]);
	}
	print():string{
		return `(${this.left.print()}) or (${this.right.print()})`;
	}
}
export class Equal extends BoolBinaryExpOp{
	clone(){
		return new Equal(this.left,this.right);
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)==this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)==this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant && r instanceof Constant){
			return new BoolConstant(l.value==r.value);
		}
		return new Equal(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Subtraction(new Constant(epsilon*epsilon),
		new Function("pow",[new Subtraction(this.left.clone(),this.right.clone()),new Constant(2)]));
	}
	print():string{
		return `${this.left.print()} = ${this.right.print()}`;
	}
}
export class NotEqual extends BoolBinaryExpOp{
	clone(){
		return new NotEqual(this.left,this.right);
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)!=this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)!=this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant && r instanceof Constant){
			return new BoolConstant(l.value!=r.value);
		}
		return new NotEqual(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Addition(new Constant(-epsilon*epsilon),
		new Function("pow",[new Subtraction(this.left.clone(),this.right.clone()),new Constant(2)]));
	}
	print():string{
		return `${this.left.print()} != ${this.right.print()}`;
	}
}
export class Greater extends BoolBinaryExpOp{
	clone(){
		return new Greater(this.left,this.right);
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)>this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)>this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant && r instanceof Constant){
			return new BoolConstant(l.value>r.value);
		}
		return new Greater(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Subtraction(this.left.clone(),this.right.clone());
	}
	print():string{
		return `${this.left.print()}>${this.right.print()}`;
	}
}
export class GEqual extends BoolBinaryExpOp{
	clone(){
		return new GEqual(this.left,this.right);
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)>=this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)>=this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant && r instanceof Constant){
			return new BoolConstant(l.value>=r.value);
		}
		return new GEqual(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Addition(new Subtraction(this.left.clone(),this.right.clone()),new Constant(epsilon));
	}
	print():string{
		return `${this.left.print()} >= ${this.right.print()}`;
	}
}
export class Less extends BoolBinaryExpOp{
	clone(){
		return new Less(this.left,this.right);
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)<this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)<this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant && r instanceof Constant){
			return new BoolConstant(l.value<r.value);
		}
		return new Less(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Subtraction(this.right.clone(),this.left.clone());
	}
	print():string{
		return `${this.left.print()} < ${this.right.print()}`;
	}
}
export class LEqual extends BoolBinaryExpOp{
	clone(){
		return new LEqual(this.left,this.right);
	}
	eval(variableMap:Record<string,number>):boolean{
		return this.left.eval(variableMap)<=this.right.eval(variableMap);
	}
	execute(variableMap:number[]):boolean{
		return this.left.execute(variableMap)<=this.right.execute(variableMap);
	}
	simplify():BoolExpression{
		let l = this.left.simplify();
		let r = this.right.simplify();
		if(l instanceof Constant && r instanceof Constant){
			return new BoolConstant(l.value<=r.value);
		}
		return new LEqual(l,r);
	}
	convertToExpression(epsilon:number):Expression{
		return new Addition(new Subtraction(this.right.clone(),this.left.clone()),new Constant(epsilon));
	}
	print():string{
		return `${this.left.print()} <= ${this.right.print()}`;
	}
}
export class BoolNot extends BoolExpression{
	inner:BoolExpression;
	constructor(inner:BoolExpression){
		super();
		this.inner = inner;
	}
	clone(){
		return new BoolNot(this.inner.clone());
	}
    execute(variableValues:number[]):boolean{
        return !this.inner.execute(variableValues);
    }
    eval(variableMap:Record<string,number>):boolean{
        return !this.inner.eval(variableMap);
	}
	simplify():BoolExpression{
		let i = this.inner.simplify();
		if(i instanceof BoolConstant){
			return new BoolConstant(!i.value);
		}
		return new BoolNot(i);
	}
	convertToExpression(epsilon:number):Expression{
		return new Constant(-this.inner.convertToExpression(epsilon));
	}
	print():string{
		return `!(${this.inner.print()})`;
	}
}
export class BoolConstant extends BoolExpression{
    value:boolean;
    constructor(value:boolean){
        super();
        this.value = value;
    }
    clone():BoolExpression{
        return new BoolConstant(this.value);
    }
    eval(variableMap:Record<string,number>):boolean{
        return this.value;
    }
    execute(variableValues:number[]):boolean{
        return this.value;
    }
    simplify():BoolExpression{
        return this.clone()
	}
	convertToExpression():Expression{
		return new Constant(this.value?1:-1);
	}
	print():string{
		return this.value?"true":"false";
	}
}