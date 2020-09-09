import odeGrammarLexer from "../grammar/antlrOutput/odeGrammarLexer.js";
import odeGrammarVisitor from "../grammar/antlrOutput/odeGrammarVisitor.js";
import odeGrammarParser from "../grammar/antlrOutput/odeGrammarParser.js";
import {
    ExpressionNode,
    BoolExpressionNode,
    SystemDefinition,
    MacroStatementNode,
    ConstantStatementNode,
    StatementNode,
    VarIdentifierNode,
    BoolNegationNode,
    StateNode,
    SetterNode,
    InitialConditionNode,
    LoopStatementNode,
    MacroExpressionNode,
    ConstantNode,
    SumExpressionNode,
    FunctionNode,
    DerivativeNode,
    DivisionNode,
    MultiplicationNode,
    AdditionNode,
    SubtractionNode,
    NegationNode,
    BoolLNode,
    BoolLENode,
    BoolGNode,
    BoolGENode,
    BoolENode,
    BoolNENode,
    BoolAndNode,
    EquationNode,
    Bounds,
    TernaryOperatorNode,
    TransitionNode,
    TextPosition,
    BoolOrNode,
    BoolConstantNode
} from "./astNode";
import ErrorListener from "./errorListener";
import { ParseTreeVisitor } from "antlr4/tree/Tree";
import { BoolConstant } from "./expression";



class Visitor extends odeGrammarVisitor.odeGrammarVisitor{
    errorListener:ErrorListener;
    statements:StatementNode[];
    constructor(){
        super();
        this.statements = [];
    }
    startDAE(ctx:any, errorListener:ErrorListener):SystemDefinition{
        this.errorListener = errorListener;
        this.visitDae(ctx);
        return new SystemDefinition(this.statements);
    }
    startHybrid(ctx:any, errorListener:ErrorListener):SystemDefinition{
        this.errorListener = errorListener;
        this.visitHybrid(ctx);
        return new SystemDefinition(this.statements);
    }
    startExpression(ctx:any, errorListener:ErrorListener):ExpressionNode{
        this.errorListener = errorListener;
        return this.visitExpression(ctx);
    }
    visitMacroStatement(ctx:any):MacroStatementNode{
        let args:string[] = [];
        if(ctx.macroArguments!+undefined){
            let macroArgs = ctx.macroArguments();
            if(macroArgs!=undefined){
                macroArgs.ID().forEach(function(item:any){
                    args.push(item.getText());
                });
            }
        }
        return new MacroStatementNode(this.visitVarIdentifier(ctx.id),args,this.visitExpression(ctx.exp))
            .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
   /* visitDaeStatement(ctx:any):StatementNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx) as StatementNode;
    }*/
    visitDaeStatement(ctx:any):StatementNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx.children[0]) as StatementNode;
    }
    visitDae(ctx:any):void{
        ctx.daeStatement().forEach(function(item:any){
            this.statements.push((this as unknown as ParseTreeVisitor).visit(item));
        },this);
    }
    visitStateStatement(ctx:any):StatementNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx.children[0]) as StatementNode;
    }
    visitBoolExpression(ctx:any):BoolExpressionNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx) as BoolExpressionNode;
    }
    visitExpression(ctx:any):ExpressionNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx) as ExpressionNode;
    }
    visitHybridStatement(ctx:any):StatementNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx.children[0]) as StatementNode;
    }
    visitLoopStatement(ctx:any):StatementNode{
        return (this as unknown as ParseTreeVisitor).visit(ctx.children[0]) as StatementNode;
    }
    visitHybrid(ctx:any){
        ctx.hybridStatement().forEach(function(item:any){
            this.statements.push(this.visitHybridStatement(item));
        },this);
    }
    visitIndex(ctx:any){
        return this.visitExpression(ctx.exp);
    }
    visitVarIdentifier(ctx:any):VarIdentifierNode{
        let id = ctx.id.text;
        let indicies:ExpressionNode[];
        indicies = ctx.index!=undefined?ctx.index().map(function(item:any){
            return this.visitIndex(item);
        },this):[];
        return new VarIdentifierNode(id,indicies)
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitEBoolBinaryOperator(ctx:any):BoolExpressionNode{
        let op:BoolExpressionNode = null;
        switch(ctx.op.type){
            case odeGrammarParser.odeGrammarParser.L:
                op = new BoolLNode(
                    this.visitExpression(ctx.leftexp),
                    this.visitExpression(ctx.rightexp));
                    break;
            case odeGrammarParser.odeGrammarParser.LE:
                op =  new BoolLENode(
                    this.visitExpression(ctx.leftexp),
                    this.visitExpression(ctx.rightexp));
                    break;
            case odeGrammarParser.odeGrammarParser.G:
                op =  new BoolGNode(
                     this.visitExpression(ctx.leftexp),
                     this.visitExpression(ctx.rightexp));
                     break;
            case odeGrammarParser.odeGrammarParser.GE:
                op = new BoolGENode(
                     this.visitExpression(ctx.leftexp),
                     this.visitExpression(ctx.rightexp));
                     break;
            case odeGrammarParser.odeGrammarParser.E:
                op = new BoolENode(
                     this.visitExpression(ctx.leftexp),
                     this.visitExpression(ctx.rightexp));
                     break;
            case odeGrammarParser.odeGrammarParser.NE:  
                op = new BoolNENode(
                     this.visitExpression(ctx.leftexp),
                     this.visitExpression(ctx.rightexp));
                     break;
            default:
                this.errorListener.add(new TextPosition(ctx.op.line,ctx.op.column,ctx.start.start,ctx.stop.stop),"Unknown binary operator");
                return null;
        }
        return op.setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitBBoolBinaryOperator(ctx:any):BoolExpressionNode{
        let op:BoolExpressionNode = null;
        switch(ctx.op.type){
            case odeGrammarParser.odeGrammarParser.AND:
                op = new BoolAndNode(
                     this.visitBoolExpression(ctx.left),
                     this.visitBoolExpression(ctx.right));
                     break;
            case odeGrammarParser.odeGrammarParser.OR:
                op = new BoolOrNode(
                     this.visitBoolExpression(ctx.left),
                     this.visitBoolExpression(ctx.right));
                     break;
            default:
                this.errorListener.add(new TextPosition(ctx.op.line,ctx.op.column,ctx.start.start,ctx.stop.stop),"Unknown binary operator");
                return null;
        } 
        return op.setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitBracketBoolExpression(ctx:any):BoolExpressionNode{
        return this.visitBoolExpression(ctx.boolExpression()) as BoolExpressionNode;
    }
    visitBoolUnaryOperator(ctx:any):BoolExpressionNode{
        return new BoolNegationNode(this.visitBoolExpression(ctx.boolExpression()) as BoolExpressionNode)
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitBracketExpression(ctx:any):ExpressionNode{
        return this.visitExpression(ctx.expression());
    }
    visitStateTransition(ctx:any):TransitionNode{
        let prevStates:string[] = [];
        ctx.ID().forEach(function(item:any){
            prevStates.push(item.getText());
        })
        return new TransitionNode(prevStates,this.visitBoolExpression(ctx.condition))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitStateDef(ctx:any):StateNode{
        let statements:StatementNode[] = [];
        let self = this;
        if(ctx.stateStatement!=undefined)
            ctx.stateStatement().forEach(function(item:any){
                statements.push(self.visitStateStatement(item));
            });
        let transitions:TransitionNode[] = [];
        ctx.stateTransition().forEach(function(item:any){
            transitions.push(self.visitStateTransition(item));
        })
        return new StateNode(ctx.name.text,ctx.TERMINAL!=undefined,transitions,statements)
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitSetter(ctx:any):SetterNode{
        return new SetterNode(this.visitVarIdentifier(ctx.variable),this.visitExpression(ctx.exp))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitEquation(ctx:any):EquationNode{
        return new EquationNode(ctx.label==undefined?null:this.visitVarIdentifier(ctx.label), this.visitExpression(ctx.left), this.visitExpression(ctx.right))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitInitialCondition(ctx:any):InitialConditionNode{
        return new InitialConditionNode(this.visitVarIdentifier(ctx.variable),this.visitExpression(ctx.exp))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitNumber(ctx:any):ConstantNode{
        return new ConstantNode(parseFloat(ctx.getText()))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitConstantStatement(ctx:any):ConstantStatementNode{
        return new ConstantStatementNode(this.visitVarIdentifier(ctx.constant),this.visitExpression(ctx.exp))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitLoopBounds(ctx:any):Bounds{
        return new Bounds(parseInt(ctx.lbound.text),parseInt(ctx.rbound.text));
    }
    visitLoop(ctx:any):LoopStatementNode{
        let bounds:Bounds[] = [];
        let statements:StatementNode[] = [];
        ctx.loopBounds().forEach(function(item:any){
            bounds.push(this.visitLoopBounds(item));
        },this);
        if(ctx.loopBody().loopStatement!=undefined)
            ctx.loopBody().loopStatement().forEach(function(item:any){
                statements.push(this.visitLoopStatement(item));
            },this);
        return new LoopStatementNode(ctx.iterator.text,bounds,statements)
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitMacroExpression(ctx:any):MacroExpressionNode{
        let args:ExpressionNode[];
        args = ctx.expression!=undefined?ctx.expression().map(function(item:any){
            return this.visitExpression(item);
        },this):[];
        return new MacroExpressionNode(this.visitVarIdentifier(ctx.id),args)
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitConstantExpression(ctx:any):ConstantNode{
        return this.visitNumber(ctx.value);
    }
    visitSummationExpression(ctx:any):SumExpressionNode{
        return new SumExpressionNode(ctx.iterator.text,
            this.visitLoopBounds(ctx.bounds),
            this.visitExpression(ctx.summationExp))
            .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitTernaryOperatorExpression(ctx:any){
        return new TernaryOperatorNode(this.visitBoolExpression(ctx.condition),this.visitExpression(ctx.first),this.visitExpression(ctx.second))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitBoolConstant(ctx:any){
        return new BoolConstantNode(ctx.value.text=="true")
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    /*visitDerivativeExpression(ctx:any){
        return new DerivativeNode(this.visitVarIdentifier(ctx.id));
    }*/
    visitVariableExpression(ctx:any){
        let ident = this.visitVarIdentifier(ctx.id);
        if(ctx.der!=undefined)
            return new DerivativeNode(ident)
            .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
        return this.visitVarIdentifier(ctx.id);
    }
    visitUnaryOperatorExpression(ctx:any){
        switch(ctx.op.type){
            case odeGrammarParser.odeGrammarParser.PLUS:
                return this.visitExpression(ctx.expression());
            case odeGrammarParser.odeGrammarParser.MINUS:
                return new NegationNode(this.visitExpression(ctx.expression()))
                .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
            default:
                this.errorListener.add(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop),"Unknown unary operator");
                return null;
        }
    }
    visitBinaryOperatorExpression(ctx:any):ExpressionNode{
        let op:ExpressionNode;
        switch(ctx.op.type){
            case odeGrammarParser.odeGrammarParser.DIVISION:
                op = new DivisionNode(
                    this.visitExpression(ctx.left),
                    this.visitExpression(ctx.right));
                    break;
            case odeGrammarParser.odeGrammarParser.ASTERISK:
                op = new MultiplicationNode(
                    this.visitExpression(ctx.left),
                    this.visitExpression(ctx.right));
                    break;
            case odeGrammarParser.odeGrammarParser.PLUS:
                op = new AdditionNode(
                    this.visitExpression(ctx.left),
                    this.visitExpression(ctx.right));
                    break;
            case odeGrammarParser.odeGrammarParser.MINUS:
                op = new SubtractionNode(
                    this.visitExpression(ctx.left),
                    this.visitExpression(ctx.right));
                    break;
            case odeGrammarParser.odeGrammarParser.CARET:
                op = new FunctionNode(
                    "pow",
                    [this.visitExpression(ctx.left),this.visitExpression(ctx.right)]);
                    break;
            default:
                    this.errorListener.add(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop),"Unknown binary operator");
                    return null;
        }
        return op
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitFunctionDerivative(ctx:any){
        return new DerivativeNode(this.visitVarIdentifier(ctx.id))
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitFunctionExpression(ctx:any){
        var args = this.visitFunctionArguments(ctx.functionArguments());
        return new FunctionNode(ctx.func.text,args)
        .setTextPos(new TextPosition(ctx.start.line,ctx.start.column,ctx.start.start,ctx.stop.stop));
    }
    visitFunctionArguments(ctx:any):ExpressionNode[]{
        var args:ExpressionNode[] = [];
        if(ctx.expression!=undefined)
            ctx.expression().forEach(function(item:any){
                args.push(this.visit(item));
            },this);
        return args;
    }

}

export default Visitor;