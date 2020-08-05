import { functionDictionary,FunctionDef } from "./functions";

export const NodeType = {
    _Constant:0,
    _Function:1,
    _Subtraction:2,
    _Multiplication:3,
    _Division:4,
    _Negation:5
};

export abstract class ExpressionNode{
    type:number;
    constructor(type:number){
        this.type = type;
    }
    abstract clone():ExpressionNode;
    abstract execute(variableValues:number[]):number;
}
export class ConstantNode extends ExpressionNode{
    value:number;
    constructor(value:number){
        super(NodeType._Constant);
        this.value = value;
    }
    clone():ExpressionNode{
        return new ConstantNode(this.value);
    }
    execute(variableValues:number[]):number{
        return this.value;
    }
}
export class NegationNode extends ExpressionNode{
    inner:ExpressionNode;
    constructor(inner:ExpressionNode){
        super(NodeType._Negation);
        this.inner = inner;
    }
    clone(){
        return new NegationNode(this.inner.clone());
    }
    execute(variableValues:number[]):number{
        return -this.inner.execute(variableValues);
    }
}
abstract class BinaryNode extends ExpressionNode{
    left:ExpressionNode;
    right:ExpressionNode;
    constructor(type:number,left:ExpressionNode,right:ExpressionNode){
        super(type);
        this.left = left;
        this.right = right;
    }
}
export class MultiplicationNode extends BinaryNode{
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Multiplication,left,right)
    }
    clone(){
        return new MultiplicationNode(this.left.clone(),this.right.clone());
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)*this.right.execute(variableValues);
    }
}
export class AdditionNode extends BinaryNode{
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Multiplication, left, right)
    }
    clone(){
        return new AdditionNode(this.left.clone(),this.right.clone());
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)+this.right.execute(variableValues);
    }
}
export class SubtractionNode extends BinaryNode{
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Multiplication, left, right)
    }
    clone(){
        return new SubtractionNode(this.left.clone(),this.right.clone());
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)-this.right.execute(variableValues);
    }
}
export class DivisionNode extends BinaryNode{
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Multiplication, left, right)
    }
    clone(){
        return new DivisionNode(this.left.clone(),this.right.clone());
    }
    execute(variableValues:number[]):number{
        return this.left.execute(variableValues)/this.right.execute(variableValues);
    }
}
export class FunctionNode extends ExpressionNode{
    functionName:string;
    function:FunctionDef;
    args:Array<ExpressionNode>;
    constructor(functionName:string,args:Array<ExpressionNode>){
        super(NodeType._Function);
        this.functionName = functionName;
        this.function = functionDictionary[functionName];
        this.args = args;
        if(this.function ===undefined)
            throw `Unknown function \"${functionName}`;
        if(this.function.argCount!=args.length)
            throw `Incorrect number of arguments in function \"${functionName}: ${args.length}, ${this.function.argCount} expected`;
    }
    clone():ExpressionNode{
        return new FunctionNode(this.functionName,this.args.map(function(item:ExpressionNode){
            return item.clone();
        }
        ));
    }
	execute(variableValues:number[]):number{
		let args = this.args.map((item)=>{
                return item.execute(variableValues);
            }
		);
		return this.function.exec(args);
	}
}