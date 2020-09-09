//TODO
export const NodeType = {
    _Equation:2,
    _MacroDefinition:3,
    _Constant:4,
    _InitialCondition:5,
    _VarIdentifier:6,
    _Loop:7,
    _Condition:8,
    _Function:9,
    _ConstantStatement:10,
    _Setter:11,
    _Derivative:12,
    _Addition:13,
    _Subtraction:14,
    _Multiplication:15,
    _Division:16,
    _Negation:17,
    _Summation:18,
    _Less:19,
    _LessEqual:20,
    _Greater:21,
    _GreaterEqual:22,
    _Equal:23,
    _NotEqual:24,
    _And:25,
    _Or:26,
    _Not:27,
    _State:28,
    _Macro:29,
    _Transition:30,
    _BoolConstant:31,
    _Ternary:32
};

export class TextPosition{
    readonly line:number;
    readonly column:number;
    readonly start:number;
    readonly stop:number;
    constructor(line:number,column:number,start:number,stop:number){
        this.line = line;
        this.column = column;
        this.start = start;
        this.stop = stop;
    }
    static invalid():TextPosition{
        return new TextPosition(-1,-1,-1,-1);
    }
}

export abstract class ASTNode{
    type:number;
    textPos:TextPosition;
    constructor(type:number){
        this.type = type;
        this.textPos = TextPosition.invalid();
    }
    setTextPos(textPos:TextPosition){
        this.textPos = textPos;
        return this;
    }
}
export class SystemDefinition{
    statements:StatementNode[];
    constructor(statements:StatementNode[]){
        this.statements=statements;
    }
}
export abstract class StatementNode extends ASTNode{
    constructor(type:number){
        super(type);
    }
}
export class EquationNode extends StatementNode{
    label:VarIdentifierNode|null;
    left:ExpressionNode;
    right:ExpressionNode;
    constructor(label:VarIdentifierNode|null,left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Equation);
        this.label = label;
        this.left = left;
        this.right = right;
    }
}
export class MacroStatementNode extends StatementNode{
    id:VarIdentifierNode;
    args:string[];
    expression:ExpressionNode;
    constructor(id:VarIdentifierNode,args:string[],expression:ExpressionNode){
        super(NodeType._MacroDefinition);
        this.id = id;
        this.args = args;
        this.expression = expression;
    }
}
export class TransitionNode extends ASTNode{
    prevStates:string[];
    condition:BoolExpressionNode;
    constructor(prevStates:string[],condition:BoolExpressionNode){
        super(NodeType._Transition);
        this.prevStates = prevStates;
        this.condition = condition;
    }
}
export class StateNode extends StatementNode{
    id:string;
    isTerminal:boolean;
    stateTransitions:TransitionNode[];
    statements:StatementNode[];
    constructor(id:string,isTerminal:boolean,stateTransitions:TransitionNode[],statements:StatementNode[]){
        super(NodeType._State);
        this.id = id;
        this.isTerminal = isTerminal;
        this.stateTransitions = stateTransitions;
        this.statements = statements;
    }
}
export class InitialConditionNode extends StatementNode{
    id:VarIdentifierNode;
    expression:ExpressionNode;
    constructor(id:VarIdentifierNode,expression:ExpressionNode){
        super(NodeType._InitialCondition);
        this.id = id;
        this.expression = expression;
    }
}
export class ConstantStatementNode extends StatementNode{
    /*isLocal:boolean;*/
    id:VarIdentifierNode;
    expression:ExpressionNode;
    constructor(id:VarIdentifierNode,expression:ExpressionNode){
        super(NodeType._ConstantStatement);
        this.id = id;
        this.expression = expression;
    }
}
export class SetterNode extends ASTNode{
    id:VarIdentifierNode;
    expression:ExpressionNode;
    constructor(id:VarIdentifierNode,expression:ExpressionNode){
        super(NodeType._Setter);
        this.id = id;
        this.expression = expression;
    }
}
export class Bounds{
    l:number;
    r:number;
    constructor(l:number,r:number){
        this.l = l;
        this.r = r;
    }
}
export class LoopStatementNode extends StatementNode{
    iterator:string;
    bounds:Bounds[];
    statements:StatementNode[];
    constructor(iterator:string,bounds:Bounds[],statements:StatementNode[]){
        super(NodeType._Loop);
        this.iterator = iterator;
        this.bounds = bounds;
        this.statements = statements;
    };
}
export abstract class BoolExpressionNode extends ASTNode{
    constructor(type:number){
        super(type);
    }
    abstract clone():BoolExpressionNode;
}
export class BoolNegationNode extends BoolExpressionNode{
    inner:BoolExpressionNode;
    constructor(inner:BoolExpressionNode){
        super(NodeType._Negation);
        this.inner = inner;
    }
    clone(){
        return new BoolNegationNode(this.inner.clone());
    }
}
export class BoolLNode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._Less);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolLNode(this.left.clone(),this.right.clone());
    }
}
export class BoolLENode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._LessEqual);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolLENode(this.left.clone(),this.right.clone());
    }
}
export class BoolGNode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._Greater);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolGNode(this.left.clone(),this.right.clone());
    }
}
export class BoolGENode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._GreaterEqual);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolGENode(this.left.clone(),this.right.clone());
    }
}
export class BoolENode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._Equal);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolENode(this.left.clone(),this.right.clone());
    }
}
export class BoolNENode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._NotEqual);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolNENode(this.left.clone(),this.right.clone());
    }
}
export class BoolAndNode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._And);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolAndNode(this.left.clone(),this.right.clone());
    }
}
export class BoolOrNode extends BoolExpressionNode{
    left:BoolExpressionNode;
    right:BoolExpressionNode;
    constructor(left:BoolExpressionNode,right:BoolExpressionNode){
        super(NodeType._Or);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new BoolOrNode(this.left.clone(),this.right.clone());
    }
}
export class BoolConstantNode extends BoolExpressionNode{
    value:boolean;
    constructor(value:boolean){
        super(NodeType._BoolConstant);
        this.value = value;
    }
    clone(){
        return new BoolConstantNode(this.value);
    }
}
export abstract class ExpressionNode extends ASTNode{
    constructor(type:number){
        super(type);
    }
    abstract clone():ExpressionNode
}
export class SumExpressionNode extends ExpressionNode{
    iterator:string;
    bounds:Bounds;
    expression:ExpressionNode;
    constructor(iterator:string,bounds:Bounds,expression:ExpressionNode){
        super(NodeType._Summation);
        this.iterator = iterator;
        this.bounds = bounds;
        this.expression = expression;
    }
    clone():ExpressionNode{
        return new SumExpressionNode(this.iterator,new Bounds(this.bounds.l,this.bounds.r),this.expression.clone());
    }
}
export class MacroExpressionNode extends ExpressionNode{
    id:VarIdentifierNode;
    args:ExpressionNode[];
    constructor(id:VarIdentifierNode,args:ExpressionNode[]){
        super(NodeType._Macro);
        this.id = id;
        this.args = args;
    }
    clone(){
        return new MacroExpressionNode(this.id,this.args.map(function(item){return item.clone()}));
    }
}
export class VarIdentifierNode extends ExpressionNode{
    id:string;
    indicies:ExpressionNode[];
    constructor(id:string,indicies:ExpressionNode[]){
        super(NodeType._VarIdentifier);
        this.id = id;
        this.indicies = indicies;
    }
    clone(){
        return new VarIdentifierNode(this.id,this.indicies.map(function(item){return item.clone()}));
    }
}
export class ConstantNode extends ExpressionNode{
    value:number;
    constructor(value:number){
        super(NodeType._Constant);
        this.value = value;
    }
    clone(){
        return new ConstantNode(this.value);
    }
}
export class DerivativeNode extends ExpressionNode{
    id:VarIdentifierNode;
    constructor(id:VarIdentifierNode){
        super(NodeType._Derivative);
        this.id = id;
    }
    clone(){
        return new DerivativeNode(this.id.clone());
    }
}
export class FunctionNode extends ExpressionNode{
    name:string;
    args:ExpressionNode[];
    constructor(name:string,args:ExpressionNode[]){
        super(NodeType._Function);
        this.name = name;
        this.args = args;
    }
    clone(){
        return new FunctionNode(this.name,this.args.map(function(item){return item.clone()}));
    }
}
export class AdditionNode extends ExpressionNode{
    left:ExpressionNode;
    right:ExpressionNode;
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Addition);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new AdditionNode(this.left.clone(),this.right.clone());
    }
}
export class MultiplicationNode extends ExpressionNode{
    left:ExpressionNode;
    right:ExpressionNode;
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Multiplication);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new MultiplicationNode(this.left.clone(),this.right.clone());
    }
}
export class SubtractionNode extends ExpressionNode{
    left:ExpressionNode;
    right:ExpressionNode;
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Subtraction);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new SubtractionNode(this.left.clone(),this.right.clone());
    }
}
export class DivisionNode extends ExpressionNode{
    left:ExpressionNode;
    right:ExpressionNode;
    constructor(left:ExpressionNode,right:ExpressionNode){
        super(NodeType._Division);
        this.left = left;
        this.right = right;
    }
    clone(){
        return new DivisionNode(this.left.clone(),this.right.clone());
    }
}
export class TernaryOperatorNode extends ExpressionNode{
    condition:BoolExpressionNode;
    true:ExpressionNode;
    false:ExpressionNode;
    constructor(cond:BoolExpressionNode,tr:ExpressionNode,fls:ExpressionNode){
        super(NodeType._Ternary);
        this.condition = cond;
        this.true = tr;
        this.false = fls;
    }
    clone(){
        return new TernaryOperatorNode(this.condition.clone(),this.true.clone(),this.false.clone());
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
    }}

/*class ConditionalStatementNode extends StatementNode{
    condition:BoolExpressionNode;
    if:ConditionalBodyNode;
    else:ConditionalBodyNode|null;
    constructor(){
        super(NodeType._ConditionBody);
    }
}
class ConditionalBodyNode extends ASTNode{
    equations:EquationNode;
    setters:SetterNode;
}*/


















