// Generated from e:\projects\SolversJS\src\grammar\odeGrammar.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by odeGrammarParser.

function odeGrammarVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

odeGrammarVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
odeGrammarVisitor.prototype.constructor = odeGrammarVisitor;

// Visit a parse tree produced by odeGrammarParser#dae.
odeGrammarVisitor.prototype.visitDae = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#daeStatement.
odeGrammarVisitor.prototype.visitDaeStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#hybrid.
odeGrammarVisitor.prototype.visitHybrid = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#number.
odeGrammarVisitor.prototype.visitNumber = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#hybridStatement.
odeGrammarVisitor.prototype.visitHybridStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#index.
odeGrammarVisitor.prototype.visitIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#varIdentifier.
odeGrammarVisitor.prototype.visitVarIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#loopStatement.
odeGrammarVisitor.prototype.visitLoopStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#loopBody.
odeGrammarVisitor.prototype.visitLoopBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#macroStatement.
odeGrammarVisitor.prototype.visitMacroStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#macroArguments.
odeGrammarVisitor.prototype.visitMacroArguments = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#loopBounds.
odeGrammarVisitor.prototype.visitLoopBounds = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#loop.
odeGrammarVisitor.prototype.visitLoop = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#equation.
odeGrammarVisitor.prototype.visitEquation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#setter.
odeGrammarVisitor.prototype.visitSetter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#initialCondition.
odeGrammarVisitor.prototype.visitInitialCondition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#constantStatement.
odeGrammarVisitor.prototype.visitConstantStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#stateStatement.
odeGrammarVisitor.prototype.visitStateStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#stateDef.
odeGrammarVisitor.prototype.visitStateDef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#stateTransition.
odeGrammarVisitor.prototype.visitStateTransition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#BoolConstant.
odeGrammarVisitor.prototype.visitBoolConstant = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#BoolUnaryOperator.
odeGrammarVisitor.prototype.visitBoolUnaryOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#BracketBoolExpression.
odeGrammarVisitor.prototype.visitBracketBoolExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#BBoolBinaryOperator.
odeGrammarVisitor.prototype.visitBBoolBinaryOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#EBoolBinaryOperator.
odeGrammarVisitor.prototype.visitEBoolBinaryOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#BracketExpression.
odeGrammarVisitor.prototype.visitBracketExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#MacroExpression.
odeGrammarVisitor.prototype.visitMacroExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#BinaryOperatorExpression.
odeGrammarVisitor.prototype.visitBinaryOperatorExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#FunctionExpression.
odeGrammarVisitor.prototype.visitFunctionExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#UnaryOperatorExpression.
odeGrammarVisitor.prototype.visitUnaryOperatorExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#ConstantExpression.
odeGrammarVisitor.prototype.visitConstantExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#SummationExpression.
odeGrammarVisitor.prototype.visitSummationExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#FunctionDerivative.
odeGrammarVisitor.prototype.visitFunctionDerivative = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#VariableExpression.
odeGrammarVisitor.prototype.visitVariableExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#TernaryOperatorExpression.
odeGrammarVisitor.prototype.visitTernaryOperatorExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by odeGrammarParser#functionArguments.
odeGrammarVisitor.prototype.visitFunctionArguments = function(ctx) {
  return this.visitChildren(ctx);
};



exports.odeGrammarVisitor = odeGrammarVisitor;