import antlr4, { Lexer, Parser } from "antlr4/index";
import odeGrammarLexer from "../grammar/antlrOutput/odeGrammarLexer.js";
import odeGrammarParser from "../grammar/antlrOutput/odeGrammarParser.js";
import ErrorListener from "../compiler/errorListener";
import Visitor from "../compiler/visitor";
import ErrorMessage from "../compiler/error";
import { CompilerError } from "../compiler/compilerError";
import { compileExpression, ExpCompilerContext } from "../compiler/expressionCompiler";
import { Expression } from "../compiler/expression";
import { handleErrors, ui } from "../ui";
import {  plotExpression, Test } from "./test";

export function compileTextExpression(text:string):Expression{
    let errors:ErrorMessage[] = [];

    var chars = new antlr4.InputStream(text);
    var lexer = new odeGrammarLexer.odeGrammarLexer(chars);
    (lexer as unknown as Lexer).removeErrorListeners();
    var listener = new ErrorListener(errors);
    (lexer as unknown as Lexer).addErrorListener(listener);
    //@ts-ignore
    lexer.strictMode = false;
    var tokens = new antlr4.CommonTokenStream(lexer as unknown as Lexer);
    var parser = new odeGrammarParser.odeGrammarParser(tokens);
    
    (parser as unknown as Parser).removeErrorListeners();
    (parser as unknown as Parser).addErrorListener(listener);
    var visitor = new Visitor();
    (parser as unknown as Parser).buildParseTrees = true;
    var tree = parser.expression(0);
    if(errors.length>0){
        throw new CompilerError(errors);
    }
    let expDef = visitor.startExpression(tree, listener);
    if(errors.length>0){
        throw new CompilerError(errors);
    }
    let context = new ExpCompilerContext();
    context.indicies = {"t":0};
    context.errors = errors;
    let expression = compileExpression(expDef,context).simplify();
    if(errors.length>0){
        throw new CompilerError(errors);
    }
    return expression;
}

export function testExpression(){
    ui.clearErrors();
    ui.clearLog();
    Test.initPlot();
    //let text:string = $("#text-input").val() as string;
    let text:string = ui.getText();
    let parameters = ui.getParameters();
    let t0 = parameters.t0;
    let t1 = t0 + parameters.time;
    let dt = parameters.step;
    try{
        let expression:Expression = compileTextExpression(text);
        ui.addLogMessage(`Function expression: ${expression.print()}`);
        plotExpression(t0,t1,dt,expression,"expression");
        ui.openTab("results");
    }catch(e){
        handleErrors(e);
        ui.openTab("main");
        ui.openTab("errors-tab");
    }
}


export function testSymbolicDerivative(){
    ui.clearErrors();
    ui.clearLog();
    Test.initPlot();
    //let text:string = $("#text-input").val() as string;
    let text:string = ui.getText();
    let parameters = ui.getParameters();
    let t0 = parameters.t0;
    let t1 = t0 + parameters.time;
    let dt = parameters.step;
    try{
        let expression:Expression = compileTextExpression(text);
        let derivative:Expression = expression.differentiate("t",0.001).simplify();
        ui.addLogMessage(`Derivative expression: ${derivative.print()}`);
        plotExpression(t0,t1,dt,expression,"expression");
        plotExpression(t0,t1,dt,derivative,"derivative");
        ui.openTab("results");
    }catch(e){
        handleErrors(e);
        ui.openTab("main");
        ui.openTab("errors-tab");
    }
}