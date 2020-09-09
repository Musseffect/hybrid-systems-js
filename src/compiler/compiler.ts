import { BoolExpressionNode, MacroStatementNode, NodeType, StatementNode, LoopStatementNode, EquationNode, InitialConditionNode, VarIdentifierNode, ExpressionNode, ConstantNode, ConstantStatementNode, SumExpressionNode, DerivativeNode, MacroExpressionNode, AdditionNode, MultiplicationNode, FunctionNode, SubtractionNode, DivisionNode, NegationNode, BoolAndNode, BoolOrNode, BoolNegationNode, BoolGNode, BoolGENode, BoolLNode, BoolConstantNode, BoolLENode, BoolNENode, BoolENode, TernaryOperatorNode, ASTNode, TextPosition } from "./astNode";
import Visitor from "./visitor";
import antlr4, { Lexer, Parser } from "antlr4/index";
import odeGrammarLexer from "../grammar/antlrOutput/odeGrammarLexer.js";
import odeGrammarParser from "../grammar/antlrOutput/odeGrammarParser.js";
import ErrorListener from "./errorListener";
import ErrorMessage from "./error";
import { Expression, Division} from "./expression";
import { CustomEDAESystem } from "../dae/customEDAESystem";
import {CustomIDAESystem} from "../dae/customIDAESystem";
import {vector} from "../math/vector";
import { ExpCompilerContext, compileExpression, hasDerivative } from "./expressionCompiler";
import { CompilerContext, MacroContext, LoopContext } from "./compilerContext";
import { CompilerError } from "./compilerError";


class VariableEntry{
    name:string;
    initialValue:number;
    isAlgebraic:boolean;
    constructor(name:string,isAlgebraic:boolean,initialValue:number = 0){
        this.name = name;
        this.initialValue = initialValue;
        this.isAlgebraic = isAlgebraic;
    }
}
class EquationEntry{
    expression:ExpressionNode;
    isAlgebraic:boolean;
    readonly texPox:TextPosition;
    constructor(expression:ExpressionNode,isAlgebraic:boolean,texPos:TextPosition){
        this.expression = expression;
        this.isAlgebraic = isAlgebraic;
        this.texPox = texPos;
    }
}


export class DAECompiler{
    constants:Record<string,number>;
    variables:Record<string,VariableEntry>;
    macros:Record<string,MacroStatementNode>;
    equations:Record<string,EquationEntry>;
    errors:ErrorMessage[];
    context: CompilerContext|null;
    epsilon:number = 0.001;
    isExplicit:boolean;
    constructor(){        
        this.errors = [];
        this.equations = {};
        this.context = null;
        this.macros = {};
        this.variables = {};
        this.constants = {};
    }
    compileExplicit(text:string):{system:CustomEDAESystem,x0:vector,x:string[],z:string[]}{

        this.isExplicit = true;

        var chars = new antlr4.InputStream(text);
        var lexer = new odeGrammarLexer.odeGrammarLexer(chars);
        (lexer as unknown as Lexer).removeErrorListeners();
        var listener = new ErrorListener(this.errors);
        (lexer as unknown as Lexer).addErrorListener(listener);
        //@ts-ignore
        lexer.strictMode = false;
        var tokens = new antlr4.CommonTokenStream(lexer as unknown as Lexer);
        var parser = new odeGrammarParser.odeGrammarParser(tokens);
        
        (parser as unknown as Parser).removeErrorListeners();
        (parser as unknown as Parser).addErrorListener(listener);
        var visitor = new Visitor();
        (parser as unknown as Parser).buildParseTrees = true;
        var tree = parser.dae();
        //@ts-ignore
        //console.log(tree.toStringTree(parser.ruleNames));
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let daeSystemDef = visitor.startDAE(tree, listener);
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        daeSystemDef.statements.forEach(function(item){
            this.compileStatement(item);
        },this);
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let x:string[] = [];
        let z:string[] = [];
        let x0:number[] = [];
        Object.entries(this.variables).forEach(function([key, variable]){
            if(variable.isAlgebraic)
                z.push(key);
            else{
                x.push(key);
                x0.push(variable.initialValue);
            }
        });
        //prepare variable indicies
        let algContext:ExpCompilerContext = {indicies:{},errors:this.errors};
        let difContext:ExpCompilerContext = {indicies:{},errors:this.errors};
        x.forEach(function(item,index){
            algContext.indicies[item] = index;
            difContext.indicies[item] = index;
        });
        z.forEach(function(item,index){
            difContext.indicies[item] = index + x.length;
        });
        algContext.indicies["t"] = x.length;
        difContext.indicies["t"] = x.length + z.length;
        
        let f:Expression[] = [];
        let g:Expression[] = [];
        let self = this;
        Object.entries(this.variables).forEach(function([key, variable]){
            if(!self.equations.hasOwnProperty(key))
            {
                self.errors.push(new ErrorMessage(TextPosition.invalid(),`Missing equation for variable "${key}"`));
                return;
            }
            let equation = self.equations[key];
            if(variable.isAlgebraic!=equation.isAlgebraic){
                self.errors.push(new ErrorMessage(equation.texPox,`Non compatible types of variable and equation "${key}"`));
                return;
            }
            if(variable.isAlgebraic){
                g.push(compileExpression(equation.expression,algContext).simplify());
            }else{
                f.push(compileExpression(equation.expression,difContext).simplify());
            }
        });
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let dfdx:Expression[][] = [];
        let dfdz:Expression[][] = [];
        let dgdx:Expression[][] = [];
        f.forEach(function(item){
            let dxRow:Expression[] = [];
            x.forEach(function(_x){
                dxRow.push(item.differentiate(_x, this.epsilon).simplify());
            },this);
            dfdx.push(dxRow);
            let dzRow:Expression[] = [];
            z.forEach(function(_z){
                dzRow.push(item.differentiate(_z, this.epsilon).simplify());
            },this);
            dfdz.push(dzRow);
        },this);
        g.forEach(function(item){
            let dxRow:Expression[] = [];
            x.forEach(function(_x){
                dxRow.push(item.differentiate(_x, this.epsilon).simplify());
            },this);
            dgdx.push(dxRow);
        },this);

        return {system:new CustomEDAESystem(f,g,dfdx,dfdz,dgdx),x0:new vector(x0),x:x,z:z};
    }
    compileImplicit(text:string):{system:CustomIDAESystem,x0:vector,x:string[],z0:vector,z:string[]}{
        this.isExplicit = false;

        var chars = new antlr4.InputStream(text);
        var lexer = new odeGrammarLexer.odeGrammarLexer(chars);
        (lexer as unknown as Lexer).removeErrorListeners();
        var listener = new ErrorListener(this.errors);
        (lexer as unknown as Lexer).addErrorListener(listener);
        //@ts-ignore
        lexer.strictMode = false;
        var tokens = new antlr4.CommonTokenStream(lexer as unknown as Lexer);
        var parser = new odeGrammarParser.odeGrammarParser(tokens);
        
        (parser as unknown as Parser).removeErrorListeners();
        (parser as unknown as Parser).addErrorListener(listener);
        var visitor = new Visitor();
        (parser as unknown as Parser).buildParseTrees = true;
        var tree = parser.dae();
        //@ts-ignore
        //console.log(tree.toStringTree(parser.ruleNames));
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let daeSystemDef = visitor.startDAE(tree, listener);
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        daeSystemDef.statements.forEach(function(item){
            this.compileStatement(item);
        },this);

        let x:string[] = [];
        let z:string[] = [];
        let x0:number[] = [];
        let z0:number[] = [];
        Object.entries(this.variables).forEach(function([key, variable]){
            if(variable.isAlgebraic){
                z.push(key);
                z0.push(variable.initialValue);
            }
            else{
                x.push(key);
                x0.push(variable.initialValue);
            }
        });

        //prepare variable indicies
        //x,z,t
        let algContext:ExpCompilerContext = {indicies:{},errors:this.errors};
        //x,dx,z,t
        let difContext:ExpCompilerContext = {indicies:{},errors:this.errors};
        x.forEach(function(item,index){
            algContext.indicies[item] = index;
            difContext.indicies[item] = index;
            difContext.indicies[item+"'"] = index + x.length;
        });
        z.forEach(function(item,index){
            algContext.indicies[item] = index + x.length;
            difContext.indicies[item] = index + 2*x.length;
        });
        algContext.indicies["t"] = x.length + z.length;
        difContext.indicies["t"] = 2*x.length + z.length;

        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let algEquations:string[] = [];
        let difEquations:string[] = [];
        Object.entries(this.equations).forEach(function([key,value]){
            if(value.isAlgebraic)
                algEquations.push(key);
            else
                difEquations.push(key);
        });
        if(difEquations.length!=x.length){
            this.errors.push(new ErrorMessage(TextPosition.invalid(),`Number of dif. equations: ${difEquations.length}, dif. variables: ${x.length}`));
        }
        if(algEquations.length!=z.length){
            this.errors.push(new ErrorMessage(TextPosition.invalid(),`Number of alg. equations: ${algEquations.length}, alg. variables: ${z.length}`));
        }

        let f:Expression[] = [];
        let g:Expression[] = [];
        let self = this;

        algEquations.forEach(function(label){
            let equation = self.equations[label];
            g.push(compileExpression(equation.expression, algContext).simplify());
        },this);

        difEquations.forEach(function(label){
            let equation = self.equations[label];
            f.push(compileExpression(equation.expression, difContext).simplify());
        },this);

        if(algContext.errors.length>0||difContext.errors.length>0){
            throw new CompilerError(algContext.errors.concat(difContext.errors));
        }

        let dfdx:Expression[][] = [];
        let dfddx:Expression[][] = [];
        let dfdz:Expression[][] = [];
        let dgdx:Expression[][] = [];
        let dgdz:Expression[][] = [];
        f.forEach(function(item){
            let dxRow:Expression[] = [];
            let ddxRow:Expression[] = [];
            x.forEach(function(_x){
                dxRow.push(item.differentiate(_x, this.epsilon).simplify());
                ddxRow.push(item.differentiate(_x + "'", this.epsilon).simplify());
            },this);
            dfdx.push(dxRow);
            dfddx.push(ddxRow);
            let dzRow:Expression[] = [];
            z.forEach(function(_z){
                dzRow.push(item.differentiate(_z, this.epsilon).simplify());
            },this);
            dfdz.push(dzRow);
        },this);
        g.forEach(function(item){
            let dxRow:Expression[] = [];
            x.forEach(function(_x){
                dxRow.push(item.differentiate(_x, this.epsilon).simplify());
            },this);
            dgdx.push(dxRow);
            let dzRow:Expression[] = [];
            z.forEach(function(_z){
                dzRow.push(item.differentiate(_z, this.epsilon).simplify());
            },this);
            dgdz.push(dzRow);
        },this)

        return {system:new CustomIDAESystem(f,g,dfdx,dfddx,dfdz,dgdx,dgdz),x0:new vector(x0),x:x,z0:new vector(z0),z:z};
    }
    protected getSymbolName(node:VarIdentifierNode):string{
        let result = node.id;
        let self = this;
        node.indicies.forEach(function(item,index){
           let indexValue = (compileExpression(self.expandExpression(item.clone()),{indicies:{},errors:self.errors})).eval({});
            if(Number.isInteger(indexValue)){
                result+=`[${indexValue}]`;
                return;
            }else{
                self.errors.push(new ErrorMessage(node.textPos,`Expression for ${index} index value of variable "${node.id}" is not constant`));
            }
        });
        return result;
    }
    protected expandBoolExpression(node:ExpressionNode):BoolExpressionNode{
        switch(node.type){
            case NodeType._And:{
                let and = node as BoolAndNode;
                and.left = this.expandBoolExpression(and.left);
                and.right = this.expandBoolExpression(and.right);
                return and;
            }
            case NodeType._Or:{
                let or = node as BoolOrNode;
                or.left = this.expandBoolExpression(or.left);
                or.right = this.expandBoolExpression(or.right);
                return or;
            }
            case NodeType._Not:{
                let not = node as BoolNegationNode;
                not.inner = this.expandExpression(not.inner);
                return not;
            }
            case NodeType._Greater:{
                let g = node as BoolGNode;
                g.left = this.expandExpression(g.left);
                g.right = this.expandExpression(g.right);
                return g;
            }
            case NodeType._GreaterEqual:{
                let ge = node as BoolGENode;
                ge.left = this.expandExpression(ge.left);
                ge.right = this.expandExpression(ge.right);
                return ge;
            }
            case NodeType._Less:{
                let l = node as BoolLNode;
                l.left = this.expandExpression(l.left);
                l.right = this.expandExpression(l.right);
                return l;
            }
            case NodeType._LessEqual:{
                let le = node as BoolLENode;
                le.left = this.expandExpression(le.left);
                le.right = this.expandExpression(le.right);
                return le;
            }
            case NodeType._Equal:{
                let e = node as BoolENode;
                e.left = this.expandExpression(e.left);
                e.right = this.expandExpression(e.right);
                return e;
            }
            case NodeType._NotEqual:{
                let ne = node as BoolNENode;
                ne.left = this.expandExpression(ne.left);
                ne.right = this.expandExpression(ne.right);
                return ne;
            }
            case NodeType._BoolConstant:{
                return node;
            }
            default:
                this.errors.push(new ErrorMessage(node.textPos,"Unexpected boolean expression type at expandBoolExpression()"));
                return new BoolConstantNode(false);
        }
    }
    protected expandExpression(node:ExpressionNode):ExpressionNode{
        switch(node.type){   
            case NodeType._Addition:{
                    let add = node as AdditionNode;
                    add.left = this.expandExpression(add.left);
                    add.right = this.expandExpression(add.right);
                    return add;
                }
            case NodeType._Subtraction:{
                    let sub = node as SubtractionNode;
                    sub.left = this.expandExpression(sub.left);
                    sub.right = this.expandExpression(sub.right);
                    return sub;
                }
            case NodeType._Multiplication:{
                    let mult = node as MultiplicationNode;
                    mult.left = this.expandExpression(mult.left);
                    mult.right = this.expandExpression(mult.right);
                    return mult;
                } 
            case NodeType._Division:{
                    let div = node as DivisionNode;
                    div.left = this.expandExpression(div.left);
                    div.right = this.expandExpression(div.right);
                    return div;
                }
            case NodeType._Negation:{
                    let neg = node as NegationNode;
                    neg.inner = this.expandExpression(neg.inner);
                    return neg;
                }
            case NodeType._Derivative:{
                    let der = node as DerivativeNode;
                    let id = this.expandExpression(der.id);
                    if(id instanceof VarIdentifierNode && id.id != "t"){
                        if(this.variables.hasOwnProperty(id.id)){
                            this.variables[id.id].isAlgebraic = false;
                        }else{
                            this.variables[id.id] = new VariableEntry(id.id,false);
                        }
                        der.id = id;
                        return der;
                    }
                    this.errors.push(new ErrorMessage(node.textPos,`Incorrect symbol in derivative`));
                    return new ConstantNode(0);
                }
            case NodeType._Function:{
                    let fun = node as FunctionNode;
                    for(let i=0;i<fun.args.length;i++){
                        fun.args[i] = this.expandExpression(fun.args[i]);
                    }
                    return fun;
                }
            case NodeType._VarIdentifier:{
                    let _var = node as VarIdentifierNode;
                    if(_var.indicies.length==0){
                        let _context = this.context;
                        while(_context!=null){
                            if(_context instanceof LoopContext){
                                if(_context.iterator == _var.id){
                                    return new ConstantNode(_context.index);
                                }
                            }else if(_context instanceof MacroContext){
                                if(_context.args.hasOwnProperty(_var.id)){
                                    return this.expandExpression(_context.args[_var.id].clone());
                                }
                            }
                            _context = _context.previous;
                        }
                    }
                    _var.id = this.getSymbolName(_var);
                    _var.indicies = [];
                    if(this.constants.hasOwnProperty(_var.id)){
                        return new ConstantNode(this.constants[_var.id]);
                    }
                    if(_var.id!="t"){
                        if(!this.variables.hasOwnProperty(_var.id)){
                            this.variables[_var.id] = new VariableEntry(_var.id,true);
                        }
                    }
                    return _var;
                }
            case NodeType._Constant:{
                    return node;
                }
            case NodeType._Summation:{
                    let summation = node as SumExpressionNode;
                    if(summation.bounds.l>summation.bounds.r){
                        this.errors.push(new ErrorMessage(node.textPos,`Left bound of summation is bigger then right bound`));
                        return new ConstantNode(0);
                    }
                    let sum:ExpressionNode[] = [];
                    let _context = new LoopContext(this.context,summation.iterator);
                    this.context = _context;
                    for(let i=summation.bounds.l;i<=summation.bounds.r;i++){
                        _context.index = i;
                        sum.push(this.expandExpression(summation.expression.clone()));
                    }
                    //return this.expandExpression(summation.expression);
                    this.context = this.context.previous;
                    let result:ExpressionNode = sum[0];
                    if(sum.length==1)
                        return result;
                    for(let i = 1;i<sum.length;i++){
                        result = new AdditionNode(result, sum[i]);
                    }
                    return result;
                }
            case NodeType._Macro:{
                    let macro = node as MacroExpressionNode;
                    let macroName = this.getSymbolName(macro.id);
                    let macroDef = this.macros[macroName];
                    if(macroDef==undefined){
                        this.errors.push(new ErrorMessage(node.textPos,`Undefined macro "${macroName}"`));
                        return new ConstantNode(0);
                    }
                    if(macroDef.args.length != macro.args.length){
                        this.errors.push(new ErrorMessage(node.textPos,`Invalid number of arguments in macro "${macroName}"`));
                        return new ConstantNode(0);
                    }
                    let args:Record<string,ExpressionNode> = {};
                    macro.args.forEach(function(item,index){
                        args[macroDef.args[index]] = item.clone();
                    })
                    this.context = new MacroContext(this.context,args);
                    let result = this.expandExpression(macroDef.expression.clone());
                    this.context = this.context.previous;
                    return result;
                }
            case NodeType._Ternary:{
                    let ter = node as TernaryOperatorNode;
                    ter.condition = this.expandBoolExpression(ter.condition);
                    ter.true = this.expandExpression(ter.true);
                    ter.false = this.expandExpression(ter.false);
                    return ter;
                }
            default:
                this.errors.push(new ErrorMessage(node.textPos,"Unexpected expression type at validateExpression()"));
                return new ConstantNode(0);
        }
    }
    protected compileConstant(node:ConstantStatementNode){
        let constant = this.getSymbolName(node.id);
        if(constant == "t"){
            this.errors.push(new ErrorMessage(node.textPos,'Invalid use of time variable'));
        }else if(this.variables.hasOwnProperty(constant)){
            this.errors.push(new ErrorMessage(node.textPos,`Redefenition of variable "${constant}"`));
        }else if(this.constants.hasOwnProperty(constant)){
            this.errors.push(new ErrorMessage(node.textPos,`Redefenition of constant "${constant}"`));
        }else{
            try{
                this.constants[constant] = (compileExpression(this.expandExpression(node.expression.clone()),{indicies:{},errors:this.errors})).eval({});
            }catch(error){
                this.errors.push(new ErrorMessage(node.textPos,error));
            }
        }
    }
    protected compileInitialCondition(node:InitialConditionNode){
        let variable = this.getSymbolName(node.id);
        let value:number = 0;
        if(variable == "t"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of time variable`));
            return;
        }
        if(this.constants.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of constant "${variable}"`));
            return;
        }
        try{
            value = (compileExpression(this.expandExpression(node.expression.clone()), {indicies:{},errors:this.errors})).eval({});
        }catch(error){
            this.errors.push(new ErrorMessage(node.textPos,`Can't evaluate initial condition for variable "${variable}"`));
            this.errors.push(new ErrorMessage(node.textPos,error));
            return;
        }
        if(this.variables.hasOwnProperty(variable)){
            this.variables[variable].initialValue = value;
        }else{
            this.variables[variable] = new VariableEntry(variable,true,value);
        }
    }
    protected compileAlgEquation(node:EquationNode){
        let variable = this.getSymbolName(node.left as VarIdentifierNode);
        if(this.equations.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Multiple equations for variable "${variable}"`));
            return;
        }
        if(variable == "t"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of time variable`));
            return;
        }
        if(this.constants.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of constant "${variable}"`));
            return
        }
        if(!this.variables.hasOwnProperty(variable)){
            this.variables[variable] = new VariableEntry(variable,true);
        }
        let equation = this.expandExpression(node.right.clone());
        //right side shouldn't have any derivatives
        if(hasDerivative(equation)){
            this.errors.push(new ErrorMessage(node.textPos,`Right hand side expression for variable "${variable}" contains derivatives`));
            return;
        }
        this.equations[variable] = new EquationEntry(equation,true,node.textPos);
    }
    protected compileDifEquation(node:EquationNode){
        let variable = this.getSymbolName((node.left as DerivativeNode).id);
        if(this.equations.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Multiple equations for variable "${variable}"`));
            return;
        }
        if(variable == "t"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of constant "${variable}"`));
            return;
        }
        if(this.constants.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Redefenition of constant "${variable}"`));
            return;
        }
        if(this.variables.hasOwnProperty(variable)){
            this.variables[variable].isAlgebraic = false;
        }else{
            this.variables[variable] = new VariableEntry(variable,false);
        }
        let equation = this.expandExpression(node.right.clone());
        if(hasDerivative(equation)){
            this.errors.push(new ErrorMessage(node.textPos,`Right hand side expression for variable "${variable}" contains derivatives`));
            return;
        }
        this.equations[variable] = new EquationEntry(equation,false,node.textPos);
    }
    protected compileExplicitEquation(node:EquationNode){
        if(node.left instanceof VarIdentifierNode){
            this.compileAlgEquation(node);
        }else if(node.left instanceof DerivativeNode){
            this.compileDifEquation(node);
        }else{
            this.errors.push(new ErrorMessage(node.textPos,`Equation should be in explicit form`));
        }
    }
    protected compileImplicitEquation(node:EquationNode){
        let label = (node.label!=null?this.getSymbolName(node.label):(Object.keys(this.equations).length+1));
        let equation:ExpressionNode = new SubtractionNode(node.left,node.right);
        equation = this.expandExpression(equation.clone());//TODO add variables to variablesTable and remove validate
        this.equations[label] = new EquationEntry(equation,!hasDerivative(equation),node.textPos);
    }
    protected compileLoop(node:LoopStatementNode){
        let _context = new LoopContext(this.context,node.iterator);
        this.context = _context;
        let statements = node.statements;
        let self = this;
        node.bounds.forEach(function(bounds){
            if(bounds.l>bounds.r){
                self.errors.push(new ErrorMessage(node.textPos,`Left bound value "${bounds.l}" is higher then right bound value "${bounds.r}"`));
                return;
            }
            for(let i = bounds.l;i<=bounds.r;i++){
                _context.index = i;
                statements.forEach(function(statement){
                    self.compileStatement(statement);
                });
            }
        });
        this.context = this.context.previous;
    }
    protected compileMacro(node:MacroStatementNode){
        let macroName = this.getSymbolName(node.id);
        if(this.macros.hasOwnProperty(macroName)){
            this.errors.push(new ErrorMessage(node.textPos,`Redefenition of macro "${macroName}"`));
            return;
        }
        this.macros[macroName] = node;
    }
    protected compileStatement(node:StatementNode):void{
        switch(node.type){
            case NodeType._ConstantStatement:{
                    this.compileConstant(node as ConstantStatementNode);
                    break;
                }
            case NodeType._InitialCondition:{
                    this.compileInitialCondition(node as InitialConditionNode);
                    break;
                }
            case NodeType._Equation:{
                    if(this.isExplicit)
                        this.compileExplicitEquation(node as EquationNode);
                    else
                        this.compileImplicitEquation(node as EquationNode);
                    break;
                }
            case NodeType._Loop:{
                    this.compileLoop(node as LoopStatementNode);
                    break;
                }
            case NodeType._MacroDefinition:{
                    this.compileMacro(node as MacroStatementNode);
                    break;
                }
            default:
                this.errors.push(new ErrorMessage(node.textPos,`Unexpected statement type at compileStatement()`));
        }
    }
}