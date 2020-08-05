
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
    _ConditionBody:13,
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
    _Event:28,
    _Macro:29
};

abstract class ASTNode{
    type:number;
    constructor(type:number){
        this.type = type;
    }

}
export class HybridSystemDefinition{

}
export class DaeSystemDefinition{
    macroStatements:MacroStatementNode;
    constantStatements:ConstantStatementNode;
    statements:StatementNode;
    constructor(macroStatements:MacroStatementNode,constantStatements:ConstantStatementNode,statements:StatementNode){
        this.macroStatements = macroStatements;
        this.constantStatements=constantStatements;
        this.statements=statements;
    }
}
abstract class StatementNode extends ASTNode{

}
class EquationNode extends StatementNode{
    label:string|null;
    left:ExpressionNode;
    right:ExpressionNode;
}
class MacroStatementNode extends StatementNode{
    name:string;
    arguments:string[];
    expression:ExpressionNode;
}
class EventNode extends StatementNode{
    name:string;
    condition:BoolExpressionNode;
    equations:EquationNode;
    setters:SetterNode;
    prevStates:string[];
}
class InitialCodnitionNode extends StatementNode{
    isDifferential:boolean;
    identifier:VarIdentifierNode;
    expression:ExpressionNode;
}
class ConstantStatementNode extends StatementNode{
    isLocal:boolean;
    identifier:VarIdentifierNode;
    expression:ExpressionNode;
    constructor(){
        super(NodeType._ConstantStatement);
    }
}
class SetterNode extends ASTNode{
    variable:VarIdentifierNode;
    expression:ExpressionNode;
    constructor(){
        super(NodeType._Setter);
    }
}
class LoopStatementNode extends StatementNode{}
export abstract class BoolExpressionNode extends ASTNode{
    
}
class BoolNegationNode extends ASTNode{

}
class BoolLNode extends ASTNode{

}
class BoolLENode extends ASTNode{}
class BoolGNode extends ASTNode{}
class BoolGENode extends ASTNode{}
class BoolENode extends ASTNode{}
class BoolNENode extends ASTNode{}
class BoolAndNode extends ASTNode{}
class BoolOrNode extends ASTNode{}
class ConditionStatementNode extends StatementNode{
    condition:BoolExpressionNode;
    if:ConditionBodyNode;
    else:ConditionBodyNode|null;
    constructor(){
        super(NodeType._ConditionBody);
    }
}
class ConditionBodyNode extends ASTNode{
    equations:EquationNode;
    setters:SetterNode;
}
export abstract class ExpressionNode extends ASTNode{

}
export class SumExpressionNode extends ExpressionNode{

}
class MacroExpressionNode extends ExpressionNode{
    identifier:string;
    arguments:ExpressionNode[];
}
class VarIdentifierNode extends ExpressionNode{

}
class ConstantNode extends ExpressionNode{

}
class DerivativeNode extends ExpressionNode{
    identifier:VarIdentifierNode;
}
class FunctionNode extends ExpressionNode{
    name:string;
    args:ExpressionNode[];
    constructor(name:string,args:ExpressionNode[]){
        super(NodeType._Macro);
        this.name = name;
        this.args = args;
    }
}




















