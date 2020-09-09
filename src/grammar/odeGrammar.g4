grammar odeGrammar;

dae: daeStatement*;

daeStatement: equation|initialCondition|constantStatement|macroStatement|loop;

hybrid:	hybridStatement* ;

number		: value=(FLOAT|INT);
hybridStatement:equation|initialCondition|constantStatement|macroStatement|loop|stateDef;

index: LSQR exp = expression RSQR;

varIdentifier: id = ID (index)* ;
loopStatement: equation|initialCondition|macroStatement|constantStatement|setter|loop;
loopBody:LCRL (loopStatement)* RCRL;	
macroStatement:MACRO id=varIdentifier (LPAREN macroArguments RPAREN)? exp=expression SEMICOLON;
macroArguments: ID (COMMA ID)* |;
loopBounds: lbound = INT COLON rbound = INT;
loop:FOR LPAREN iterator = ID IN LSQR loopBounds+ RSQR RPAREN loopBody;
/*conditionStatement: IF LPAREN condition = boolExpression RPAREN ifBody = conditionBody (ELSE elseBody = conditionBody)? ;
conditionBody: LCRL (equation|setter)*  RCRL;*/
equation: (label=varIdentifier COLON)? left=expression E right = expression  SEMICOLON;
setter: SET variable = varIdentifier E exp = expression SEMICOLON;
initialCondition: variable = varIdentifier T0 E exp = expression SEMICOLON;
constantStatement: CONSTANT constant=varIdentifier E exp = expression SEMICOLON;

stateStatement: (equation|setter|loop|macroStatement|constantStatement);

stateDef: TERMINAL? STATE name = ID LCRL (stateStatement)* RCRL FROM stateTransition  (COMMA stateTransition)* SEMICOLON;

stateTransition: ID (COMMA ID)* ON LPAREN condition = boolExpression RPAREN;

boolExpression: LPAREN boolExpression RPAREN #BracketBoolExpression
    | <assoc=right> op = NOT boolExpression #BoolUnaryOperator
    | leftexp = expression op = (L|LE|G|GE) rightexp = expression #EBoolBinaryOperator
    | leftexp = expression op = (E|NE) rightexp = expression #EBoolBinaryOperator
    | left = boolExpression op = AND right = boolExpression #BBoolBinaryOperator
    | left = boolExpression op = OR right = boolExpression #BBoolBinaryOperator
	| value = (TRUE|FALSE) #BoolConstant
    ;

expression: LPAREN expression RPAREN #BracketExpression
	| DER LPAREN id=varIdentifier RPAREN #FunctionDerivative
	| func=ID LPAREN functionArguments RPAREN	#FunctionExpression
	| <assoc=right> left=expression op=CARET right=expression #BinaryOperatorExpression
	| op=(PLUS | MINUS) expression	#UnaryOperatorExpression
	| left=expression op=(DIVISION|ASTERISK) right=expression #BinaryOperatorExpression
	| left=expression op=(PLUS|MINUS) right=expression	#BinaryOperatorExpression
	| id=varIdentifier (der = APOSTROPHE)? #VariableExpression 
	| value=number	#ConstantExpression
	| '#' id=varIdentifier (LPAREN (expression)* RPAREN)? #MacroExpression
	| SUM LPAREN  iterator = ID IN LSQR bounds=loopBounds RSQR RPAREN LCRL  summationExp=expression RCRL #SummationExpression
	| LCRL condition=boolExpression QUESTIONMARK first=expression COLON second=expression RCRL #TernaryOperatorExpression
	;

functionArguments: expression (COMMA expression)* | ;


fragment LOWERCASE  : [a-z] ;
fragment UPPERCASE  : [A-Z] ;
fragment DIGIT: [0-9] ;

T0 : '(t0)';
SET: 'set';
ON: 'on';
FROM: 'from';
DER : 'der';
TERMINAL:'terminal';
TRUE: 'true';
FALSE: 'false';
SUM: 'sum';
MACRO: 'macro';
STATE: 'state';
FOR: 'for';
IN: 'in';
IF: 'if';
ELSE: 'else';
LOCAL: 'local';
CONSTANT: 'constant';
OR                  : '||'| 'or' ;
AND                 : '&&'| 'and' ;
NOT                 : '!'| 'not' ;
LSQR			    : '[' ;
RSQR			    : ']' ;

FLOAT: (DIGIT+ DOT DIGIT*) ([Ee][+-]? DIGIT+)?
	   |DOT DIGIT+ ([Ee][+-]? DIGIT+)?
		|DIGIT+ ([Ee] [+-]? DIGIT+)
		;
INT: DIGIT+ ; 
ID: [_]*(LOWERCASE|UPPERCASE)[A-Za-z0-9_]*;

PLUS               : '+' ;
MINUS              : '-' ;
ASTERISK           : '*' ;
DIVISION           : '/' ;
LPAREN             : '(' ;
RPAREN				: ')';
DOT					: '.';
COMMA				: ',' ;
CARET				: '^' ;
L                   : '<' ;
G                   : '>' ;
LE                  : '<=' ;
GE                  : '>=' ;
NE                  : '!=' ;
E                   : '=' ;
SEMICOLON			: ';' ;
COLON				: ':' ;
LCRL			    : '{' ;
RCRL			    : '}' ;
APOSTROPHE			: '\'' ;
QUESTIONMARK		: '?' ;


NEWLINE	: ('\r'? '\n' | '\r')+ -> skip;
WHITESPACE : (' ' | '\t')+ -> skip ;
COMMENT 
	:	( '//' ~[\r\n]* ('\r'? '\n' | 'r')
		| '/*' .*? '*/'
		) -> skip
	;