import { EDAEHybridSystem } from "../dae/edaeHybridSystem";
import { SystemDefinition, BoolExpressionNode, MacroStatementNode, NodeType, StatementNode, LoopStatementNode, EquationNode, InitialConditionNode, VarIdentifierNode, ExpressionNode, ConstantNode, ConstantStatementNode, SumExpressionNode, DerivativeNode, MacroExpressionNode, AdditionNode, MultiplicationNode, FunctionNode, SubtractionNode, DivisionNode, NegationNode, BoolAndNode, BoolOrNode, BoolNegationNode, BoolGNode, BoolGENode, BoolLNode, BoolConstantNode, BoolLENode, BoolNENode, BoolENode, TernaryOperatorNode, StateNode, SetterNode, TextPosition } from "./astNode";
import { IDAEHybridSystem } from "../dae/idaeHybridSystem";
import ErrorMessage from "./error";
import { Expression} from "./expression";

import ErrorListener from "./errorListener";
import Visitor from "./visitor";
import antlr4, { Lexer, Parser } from "antlr4/index";
import odeGrammarLexer from "../grammar/antlrOutput/odeGrammarLexer.js";
import odeGrammarParser from "../grammar/antlrOutput/odeGrammarParser.js";
import { CompilerContext, LoopContext, MacroContext } from "./compilerContext";
import { compileExpression, hasDerivative, compileBoolExpression, ExpCompilerContext } from "./expressionCompiler";
import { CustomEDAEHybridState } from "../dae/customEDAEHybridState";
import {vector} from "../math/vector";
import { CustomHybridStateLink } from "../dae/customHybridStateLink";
import { CustomIDAEHybridState } from "../dae/customIDAEHybridState";
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
    constructor(expression:ExpressionNode,isAlgebraic:boolean){
        this.expression = expression;
        this.isAlgebraic = isAlgebraic;
    }
}
class Transition{
    incidentStates:string[];
    condition:BoolExpressionNode;
    constructor(incidentStates:string[],condition:BoolExpressionNode){
        this.incidentStates = incidentStates;
        this.condition = condition;
    }
}
class State{
    equations:Record<string,EquationEntry>;
    setters:Record<string,ExpressionNode>;
    transitions:Transition[];
    isTerminal:boolean;
    constructor(){
        this.equations = {};
        this.setters = {};
        this.transitions = [];
        this.isTerminal = false;
    }
}

export class HybridSystemCompiler{
    protected constants:Record<string,number>;
    protected states:Record<string,State>;
    protected variables:Record<string,VariableEntry>;
    protected macros:Record<string,MacroStatementNode>;
    protected context:CompilerContext;
    protected errors:ErrorMessage[];
    protected currentState:string;
    protected isExplicit:boolean;
    protected epsilon:number;
    protected boolExpEpsilon:number = 1e-8;
    constructor(boolExpEpsilon:number){
        this.constants = {};
        this.states = {initial:new State()};
        this.variables = {};
        this.context = null;
        this.errors = [];
        this.currentState = "initial";
        this.macros = {};
        this.epsilon = 1e-3;
        this.boolExpEpsilon = boolExpEpsilon;
    }
    public compileExplicit(text:string):{system:EDAEHybridSystem,x0:vector,x:string[],z:string[]}{
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
        var tree = parser.hybrid();
        //@ts-ignore
        //console.log(tree.toStringTree(parser.ruleNames));

        //check for parser/lexer errors
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let daeSystemDef = visitor.startHybrid(tree, listener);
        //for debug purposes
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let self = this;
        daeSystemDef.statements.forEach(function(item){
            self.compileStatement(item);
        });
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        //set variable indicies
        let x:string[] = [];
        let z:string[] = [];
        let x0:number[] = [];
        Object.entries(this.variables).forEach(function([key, variable]){
            if(variable.isAlgebraic){
                z.push(key);
            }
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
        //compile initial state
        let initialState = this.states["initial"];
        let states:CustomEDAEHybridState[] = [];
        {
            let f:Expression[] = [];
            let g:Expression[] = [];
            Object.entries(this.variables).forEach(function([key, variable]){
                if(!initialState.equations.hasOwnProperty(key))
                {
                    self.errors.push(new ErrorMessage(TextPosition.invalid(),`Missing equation for variable "${key}" in initial state`));
                    return;
                }
                let equation = initialState.equations[key];
                if(variable.isAlgebraic!=equation.isAlgebraic){
                    self.errors.push(new ErrorMessage(TextPosition.invalid(),`Non compatible types of variable and equation "${key}" in initial state`));
                    return;
                }
                if(variable.isAlgebraic){
                    g.push(compileExpression(equation.expression,algContext).simplify());
                }else{
                    f.push(compileExpression(equation.expression,difContext).simplify());
                }
            });
            let dfdx:Expression[][] = [];
            let dfdz:Expression[][] = [];
            let dgdx:Expression[][] = [];
            let dgdt:Expression[] = [];
            f.forEach(function(item){
                let dxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                });
                dfdx.push(dxRow);
                let dzRow:Expression[] = [];
                z.forEach(function(_z){
                    dzRow.push(item.differentiate(_z, self.epsilon).simplify());
                });
                dfdz.push(dzRow);
            });
            g.forEach(function(item){
                let dxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                });
                dgdx.push(dxRow);
                dgdt.push(item.differentiate("t",self.epsilon))
            });
            states.push(new CustomEDAEHybridState("initial",[],false).init(f,g,dfdx,dfdz,dgdx,dgdt));
        }
        //compile states
        let stateIndicies:Record<string,number> = {initial:0};
        Object.entries(this.states).forEach(function([key,state]){
            //skip initial state
            if(key=="initial")
                return;
            
            let f:Expression[] = [];
            let g:Expression[] = [];
            //check equations
            Object.entries(self.variables).forEach(function([key, variable]){
                if(!state.equations.hasOwnProperty(key))
                {
                    if(!initialState.equations.hasOwnProperty(key))
                    {
                        //Already have "missing equation" error for initial state
                        return;
                    }
                    //copy equations from initial state
                    if(variable.isAlgebraic){
                        g.push(states[0]._g[g.length]);
                    }else{
                        f.push(states[0]._f[f.length]);
                    }
                    return;
                }
                let equation = state.equations[key];
                if(variable.isAlgebraic!=equation.isAlgebraic){
                    self.errors.push(new ErrorMessage(TextPosition.invalid(),`Non compatible types of variable and equation "${key}" in state "${key}"`));
                    return;
                }
                if(variable.isAlgebraic){
                    g.push(compileExpression(equation.expression,algContext).simplify());
                }else{
                    f.push(compileExpression(equation.expression,difContext).simplify());
                }
            });
            //compile derivatives
            let dfdx:Expression[][] = [];
            let dfdz:Expression[][] = [];
            let dgdx:Expression[][] = [];
            let dgdt:Expression[] = [];
            f.forEach(function(item){
                let dxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                });
                dfdx.push(dxRow);
                let dzRow:Expression[] = [];
                z.forEach(function(_z){
                    dzRow.push(item.differentiate(_z, self.epsilon).simplify());
                });
                dfdz.push(dzRow);
            });
            g.forEach(function(item){
                let dxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                });
                dgdx.push(dxRow);
                dgdt.push(item.differentiate("t",self.epsilon))
            });
            stateIndicies[key] = states.length;
            states.push(new CustomEDAEHybridState(key,[],state.isTerminal).init(f,g,dfdx,dfdz,dgdx,dgdt));
        });
        //compile transitions
        Object.entries(this.states).forEach(function([key,state]){
            if(key=="initial")
                return;
            //compile setters
            let setters:{index:number,expression:Expression}[] = [];
            Object.entries(state.setters).forEach(function([key, setter]){
                if(self.variables[key].isAlgebraic){
                    return;
                }
                let variableIndex = algContext.indicies[key];
                setters.push({index:variableIndex,expression:compileExpression(setter,difContext).simplify()});
            });
            let newStateIndex = stateIndicies[key];
            state.transitions.forEach(function(transition){
                let p = compileBoolExpression(transition.condition,difContext).simplify().convertToExpression(self.boolExpEpsilon);
                let dpdt = p.differentiate("t",self.epsilon).simplify();
                let dpdx:Expression[] = [];
                let dpdz:Expression[] = [];
                Object.entries(self.variables).forEach(function([key, variable]){
                    if(variable.isAlgebraic){
                        dpdz.push(p.differentiate(key,self.epsilon).simplify());
                    }
                    else{
                        dpdx.push(p.differentiate(key,self.epsilon).simplify());
                    }
                });
                transition.incidentStates.forEach(function(incidentState){
                    if(!self.states.hasOwnProperty(incidentState)){
                        self.errors.push(new ErrorMessage(TextPosition.invalid(),`Unknown incident state "${incidentState}" in transition rule for state "${key}"`));
                        return;
                    }
                    states[stateIndicies[incidentState]].pushLink(new CustomHybridStateLink(newStateIndex,
                        setters,p,dpdx,dpdz,dpdt));
                })
            });
        });
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        return {system:new EDAEHybridSystem(states),x0:new vector(x0),x:x,z:z};
        //return {system:,x0:,x:,z:};
    }
    compileImplicit(text:string):{system:IDAEHybridSystem,x0:vector,x:string[],z0:vector,z:string[]}{
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
        var tree = parser.hybrid();
        //@ts-ignore
        //console.log(tree.toStringTree(parser.ruleNames));

        //check for parser/lexer errors
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let daeSystemDef = visitor.startHybrid(tree, listener);
        //for debug purposes
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        let self = this;
        daeSystemDef.statements.forEach(function(item){
            self.compileStatement(item);
        });

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

        let initialState = this.states["initial"];
        let equationIndicies:Record<string,number> = {};
        //compile initial state
        let states:CustomIDAEHybridState[] = [];
        {
            let f:Expression[] = [];
            let g:Expression[] = [];
            Object.entries(initialState.equations).forEach(function([key, equation]){
                if(equation.isAlgebraic){
                    equationIndicies[key] = g.length;
                    g.push(compileExpression(equation.expression,algContext).simplify());
                }else{
                    equationIndicies[key] = f.length;
                    f.push(compileExpression(equation.expression,difContext).simplify());
                }
            });
            if(f.length!=x.length){
                this.errors.push(new ErrorMessage(TextPosition.invalid(),`Number of dif. equations: ${f.length}, dif. variables: ${x.length} in state "initial"`));
            }
            if(g.length!=z.length){
                this.errors.push(new ErrorMessage(TextPosition.invalid(),`Number of alg. equations: ${g.length}, alg. variables: ${z.length} in state "initial"`));
            }

            //check for equations number;
            
            let dfdx:Expression[][] = [];
            let dfddx:Expression[][] = [];
            let dfdz:Expression[][] = [];
            let dgdx:Expression[][] = [];
            let dgdz:Expression[][] = [];
            let dgdt:Expression[] = [];
            f.forEach(function(item){
                let dxRow:Expression[] = [];
                let ddxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                    ddxRow.push(item.differentiate(_x + "'", self.epsilon).simplify());
                });
                dfdx.push(dxRow);
                dfddx.push(ddxRow);
                let dzRow:Expression[] = [];
                z.forEach(function(_z){
                    dzRow.push(item.differentiate(_z, self.epsilon).simplify());
                });
                dfdz.push(dzRow);
            });
            g.forEach(function(item){
                let dxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                });
                dgdx.push(dxRow);
                let dzRow:Expression[] = [];
                z.forEach(function(_z){
                    dzRow.push(item.differentiate(_z, self.epsilon).simplify());
                });
                dgdz.push(dzRow);
                dgdt.push(item.differentiate("t",self.epsilon))
            });
            states.push(new CustomIDAEHybridState("initial",[],false).init(f,g,dfdx,dfddx,dfdz,dgdx,dgdz,dgdt));
        }
        //compile states
        let stateIndicies:Record<string,number> = {initial:0};
        Object.entries(this.states).forEach(function([key,state]){
            //skip initial state
            if(key=="initial")
                return;
            let f:Expression[] = [];
            let g:Expression[] = [];
            //check equations
            Object.entries(initialState.equations).forEach(function([equationKey, equation]){
                if(!state.equations.hasOwnProperty(equationKey))
                {
                    //copy equations from initial state
                    if(equation.isAlgebraic){
                        g.push(states[0]._g[equationIndicies[equationKey]]);
                    }else{
                        f.push(states[0]._f[equationIndicies[equationKey]]);
                    }
                    return;
                }
                let stateEquation = state.equations[equationKey];
                if(stateEquation.isAlgebraic){
                    g.push(compileExpression(equation.expression,algContext).simplify());
                }else{
                    f.push(compileExpression(equation.expression,difContext).simplify());
                }
            });
            Object.keys(state.equations).forEach(function(equationKey){
                if(!initialState.equations.hasOwnProperty(equationKey)){
                    self.errors.push(new ErrorMessage(TextPosition.invalid(),`State "${key}" contains excess equation "${equationKey}"`));
                }
            })
            if(Object.keys(initialState.equations).length!=states[0]._f.length+states[0]._g.length)
                this.errors.push(new ErrorMessage(TextPosition.invalid(),`State ${f.length}, dif. variables: ${x.length}`));
            if(f.length!=x.length){
                this.errors.push(new ErrorMessage(TextPosition.invalid(),`Number of dif. equations: ${f.length}, dif. variables: ${x.length} in state "${key}"`));
            }
            if(g.length!=z.length){
                this.errors.push(new ErrorMessage(TextPosition.invalid(),`Number of alg. equations: ${g.length}, alg. variables: ${z.length} in state "${key}"`));
            }
            let dfdx:Expression[][] = [];
            let dfddx:Expression[][] = [];
            let dfdz:Expression[][] = [];
            let dgdx:Expression[][] = [];
            let dgdz:Expression[][] = [];
            let dgdt:Expression[] = [];

            f.forEach(function(item){
                let dxRow:Expression[] = [];
                let ddxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                    ddxRow.push(item.differentiate(_x + "'", self.epsilon).simplify());
                });
                dfdx.push(dxRow);
                dfddx.push(ddxRow);
                let dzRow:Expression[] = [];
                z.forEach(function(_z){
                    dzRow.push(item.differentiate(_z, self.epsilon).simplify());
                });
                dfdz.push(dzRow);
            });
            g.forEach(function(item){
                let dxRow:Expression[] = [];
                x.forEach(function(_x){
                    dxRow.push(item.differentiate(_x, self.epsilon).simplify());
                });
                dgdx.push(dxRow);
                let dzRow:Expression[] = [];
                z.forEach(function(_z){
                    dzRow.push(item.differentiate(_z, self.epsilon).simplify());
                });
                dgdz.push(dzRow);
                dgdt.push(item.differentiate("t",self.epsilon))
            });
            stateIndicies[key] = states.length;
            states.push(new CustomIDAEHybridState("initial",[],state.isTerminal).init(f,g,dfdx,dfddx,dfdz,dgdx,dgdz,dgdt));
        });
        //compile transitions
        Object.entries(this.states).forEach(function([key,state]){
            if(key=="initial")
                return;
                //compile setters
            let setters:{index:number,expression:Expression}[] = [];
            Object.entries(state.setters).forEach(function([key, setter]){
                if(self.variables[key].isAlgebraic){
                    return;
                }
                let variableIndex = algContext.indicies[key];
                setters.push({index:variableIndex,expression:compileExpression(setter,difContext).simplify()});
            });
            let newStateIndex = stateIndicies[key];
            state.transitions.forEach(function(transition){
                let p = compileBoolExpression(transition.condition,difContext).simplify().convertToExpression(self.boolExpEpsilon);
                let dpdt = p.differentiate("t",self.epsilon).simplify();
                let dpdx:Expression[] = [];
                let dpdz:Expression[] = [];
                Object.entries(self.variables).forEach(function([key, variable]){
                    if(variable.isAlgebraic){
                        dpdz.push(p.differentiate(key,self.epsilon).simplify());
                    }
                    else{
                        dpdx.push(p.differentiate(key,self.epsilon).simplify());
                    }
                });
                transition.incidentStates.forEach(function(incidentState){
                    if(!self.states.hasOwnProperty(incidentState)){
                        self.errors.push(new ErrorMessage(TextPosition.invalid(),`Unknown incident state "${incidentState}" in transition rule for state "${key}"`));
                        return;
                    }
                    states[stateIndicies[incidentState]].pushLink(new CustomHybridStateLink(newStateIndex,
                        setters,p,dpdx,dpdz,dpdt));
                })
            });
        });
        if(this.errors.length>0){
            throw new CompilerError(this.errors);
        }
        return {system:new IDAEHybridSystem(states),x0:new vector(x0),z0:new vector(z0),x:x,z:z};
    }
    protected expandBoolExpression(node:BoolExpressionNode):BoolExpressionNode{
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
        //throw new Error("Not implemented");
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
                _var.id = this.getSymbolString(_var);
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
                    let macroName = this.getSymbolString(macro.id);
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
    protected getSymbolString(symbol:VarIdentifierNode){//DONE
        let result = symbol.id;
        let self = this;
        symbol.indicies.forEach(function(item,index){
           let indexValue = (compileExpression(self.expandExpression(item.clone()),{indicies:{},errors:self.errors})).eval({});
            if(Number.isInteger(indexValue)){
                result+=`[${indexValue}]`;
                return;
            }else{
                self.errors.push(new ErrorMessage(symbol.textPos,`Expression for ${index} index value of symbol "${symbol.id}" is not constant`));
            }
        });
        return result;
    }
    protected compileLoop(node:LoopStatementNode){//DONE
        let _context = new LoopContext(this.context,node.iterator);
        this.context = _context;
        let statements = node.statements;
        let self = this;
        node.bounds.forEach(function(bounds){
            if(bounds.l>bounds.r){
                self.errors.push(new ErrorMessage(node.textPos,`Left bound value "${bounds.l}" is higher then right bound value "${bounds.r}"`));
                return;
            }
            for(let i = bounds.l;i<bounds.r;i++){
                _context.index = i;
                statements.forEach(function(statement){
                    self.compileStatement(statement);
                });
            }
        });
        this.context = this.context.previous;
    };
    protected compileInitialCondition(node:InitialConditionNode){//DONE
        let variable = this.getSymbolString(node.id);
        if(this.currentState!="initial"){
            this.errors.push(new ErrorMessage(node.textPos,`Definition of initial condition for variable "${variable}" not in the global scope`));
            return;
        }
        if(variable == "t"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of time variable`));
            return;
        }
        if(this.constants.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of constant "${variable}"`));
            return;
        }
        let value:number = 0;
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
    protected compileMacroDefinition(node:MacroStatementNode){//DONE
        if(this.currentState!="initial"){
            this.errors.push(new ErrorMessage(node.textPos,`Definition of macro "${node.id}" not in the global scope`));
            return;
        }
        let macroName = this.getSymbolString(node.id);
        if(this.macros.hasOwnProperty(macroName)){
            this.errors.push(new ErrorMessage(node.textPos,`Redefenition of macro "${macroName}"`));
            return;
        }
        this.macros[macroName] = node;
    }
    protected compileConstantStatement(node:ConstantStatementNode){//DONE
        let constant = this.getSymbolString(node.id);
        if(this.currentState!="initial"){
            this.errors.push(new ErrorMessage(node.textPos,`Definition of constant "${constant}" not in the global scope`));
            return;
        }
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
    protected compileAlgEquation(node:EquationNode){
        //throw new Error("Not implemented");
        let currentState = this.states[this.currentState];
        let variable = this.getSymbolString(node.left as VarIdentifierNode);
        if(currentState.equations.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Multiple equations for variable "${variable}" in state "${this.currentState}"`));
            return;
        }
        if(variable == "t"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of time variable in state "${this.currentState}"`));
            return;
        }
        if(this.constants.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of constant "${variable}" in state "${this.currentState}"`));
            return
        }
        if(!this.variables.hasOwnProperty(variable)){
            this.variables[variable] = new VariableEntry(variable,true);
        }
        let equation = this.expandExpression(node.right.clone());
        if(hasDerivative(equation)){
            this.errors.push(new ErrorMessage(node.textPos,`Right hand side expression for variable "${variable}" in state "${this.currentState}" contains derivatives`));
            return;
        }
        currentState.equations[variable] = new EquationEntry(equation,true);
    }
    protected compileDifEquation(node:EquationNode){
        //throw new Error("Not implemented");
        let currentState = this.states[this.currentState];
        let variable = this.getSymbolString((node.left as DerivativeNode).id);
        if(currentState.equations.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Multiple equations for variable "${variable}" in state "${this.currentState}"`));
            return;
        }
        if(variable == "t"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of time variable in state "${this.currentState}"`));
            return;
        }
        if(this.constants.hasOwnProperty(variable)){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid use of constant "${variable}" in state "${this.currentState}"`));
            return
        }
        if(this.variables.hasOwnProperty(variable)){
            this.variables[variable].isAlgebraic = false;
        }else{
            this.variables[variable] = new VariableEntry(variable,false);
        }
        let equation = this.expandExpression(node.right.clone());
        if(hasDerivative(equation)){
            this.errors.push(new ErrorMessage(node.textPos,`Right hand side expression for variable "${variable}" in state "${this.currentState}" contains derivatives`));
            return;
        }
        currentState.equations[variable] = new EquationEntry(equation,false);
    }
    protected compileExplicitEquation(node:EquationNode){//DONE?
        //throw new Error("Not implemented");
        if(node.left instanceof VarIdentifierNode){
            this.compileAlgEquation(node);
        }else if(node.left instanceof DerivativeNode){
            this.compileDifEquation(node);
        }else{
            this.errors.push(new ErrorMessage(node.textPos,"Equation should be in explicit form"));
        }
    }
    protected compileImplicitEquation(node:EquationNode){//DONE?
        //throw new Error("Not implemented");
        let currentState = this.states[this.currentState];

        let label = (node.label!=null?this.getSymbolString(node.label):(Object.keys(currentState.equations).length+1));
        if(currentState.equations.hasOwnProperty(label)){
            this.errors.push(new ErrorMessage(node.textPos,`Redeclaration of equation "${label}"`));
        }else{
            let equation:ExpressionNode = new SubtractionNode(node.left,node.right);
            equation = this.expandExpression(equation.clone());//TODO add variables to variablesTable and remove validate
            currentState.equations[label] = new EquationEntry(equation,!hasDerivative(equation));
        }
    }
    protected compileState(node:StateNode){//DONE
        if(this.currentState!="initial"){
            this.errors.push(new ErrorMessage(node.textPos,`Invalid state definition`));
            return;
        }
        if(this.states.hasOwnProperty(node.id)){
            this.errors.push(new ErrorMessage(node.textPos,`Redeclaration of state "${node.id}"`))
            return;
        }
        this.currentState = node.id;
        let state = new State();
        state.isTerminal = node.isTerminal;
        let self = this;
        this.states[node.id] = state;
        node.statements.forEach(function(item){
            self.compileStatement(item);
        });
        node.stateTransitions.forEach(function(item){
            state.transitions.push(new Transition(item.prevStates,self.expandBoolExpression(item.condition)));
        });
        this.currentState = "initial";
    }
    protected compileSetter(node:SetterNode){//DONE
        if(this.currentState=="initial"){
            this.errors.push(new ErrorMessage(node.textPos,`Setter definition shouldn't exist in initial state.`));
            return;
        }
        let setters = this.states[this.currentState].setters;
        let id = this.getSymbolString(node.id);
        if(setters.hasOwnProperty(id)){
            this.errors.push(new ErrorMessage(node.textPos,`Setter redefenition for variable "${id} in state "${this.currentState}""`))
        }
        setters[id] = this.expandExpression(node.expression.clone());
    }
    protected compileStatement(statement:StatementNode){//DONE
        switch(statement.type){
            case NodeType._InitialCondition:{
                this.compileInitialCondition(statement as InitialConditionNode);
                break;
            }
            case NodeType._MacroDefinition:{
                this.compileMacroDefinition(statement as MacroStatementNode);
                break;
            }
            case NodeType._ConstantStatement:{
                this.compileConstantStatement(statement as ConstantStatementNode);
                break;
            }
            case NodeType._Equation:{
                if(this.isExplicit)
                    this.compileExplicitEquation(statement as EquationNode);
                else
                    this.compileImplicitEquation(statement as EquationNode);
                break;
            }
            case NodeType._State:{
                this.compileState(statement as StateNode);
                break;
            }
            case NodeType._Setter:{
                this.compileSetter(statement as SetterNode);
                break;
            }
            case NodeType._Loop:{
                this.compileLoop(statement as LoopStatementNode);
                break;
            }
            default:
                this.errors.push(new ErrorMessage(statement.textPos,`Unexpected statement type at compileStatement()`));
        }
    }
}