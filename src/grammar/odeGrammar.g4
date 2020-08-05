grammar odeGrammar;

ode: odeStatement*;

odeStatement: equation|initialCondition|constantStatement|macroStatement|loop;

hybrid:	statement* ;

number		: value=(FLOAT|INT);
statement:equation|initialCondition|constantStatement|macroStatement|loop|event;

varIdentifier: ID (LSQR index = expression RSQR)* ;
loopBody:LCRL (equation|initialCondition|constantStatement|loop)* RCRL;	
macroStatement:MACRO name=ID LPAREN macroArguments RPAREN exp=expression SEMICOLON;
macroArguments: ID (COMMA ID)* |;
loop:FOR LPAREN index = ID IN LSQR lbound = INT COLON rbound = INT RSQR (COMMA LSQR lbound = INT COLON rbound = INT)* loopBody COMMA loopBody (RSQR|RPAREN) RPAREN;
/*conditionStatement: IF LPAREN condition = boolExpression RPAREN ifBody = conditionBody (ELSE elseBody = conditionBody)? ;
conditionBody: LCRL (equation|setter)*  RCRL;*/
equation: (label=ID COLON)? left=expression E right = expression  SEMICOLON;
setter: SET variable = varIdentifier E right = expression;
initialCondition: variable = varIdentifier ZEROSQR E exp = expression  SEMICOLON #algebraicCondition
    | variable = varIdentifier T0 E exp = expression SEMICOLON #differentialCondition
    ;
constantStatement: CONSTANT constant=varIdentifier E exp = expression SEMICOLON;

event: TERMINAL? name = ID LCRL (equation|setter)* RCRL FROM transition = stateTransition  (COMMA transition = stateTransition)*;

stateTransition: prevState = ID ON LPAREN condition = boolExpression RPAREN;

unaryOperator: op=(PLUS | MINUS);

boolExpression: LPAREN boolExpression RPAREN #BracketBoolExpression
    | <assoc=right> op = NOT boolExpression #BoolBinaryOperator
    | leftexp = expression op = (L|LE|G|GE) rightexp = expression #BoolBinaryOperator
    | leftexp = expression op = (E|NE) rightexp = expression #BoolBinaryOperator
    | left = boolExpression op = AND right = boolExpression #BoolBinaryOperator
    | left = boolExpression op = OR right = boolExpression #BoolBinaryOperator
    ;

expression: LPAREN expression RPAREN #BracketExpression
	| DER LPAREN id=varIdentifier RPAREN #FunctionDerivative
	| func=ID LPAREN functionArguments RPAREN	#FunctionExpression
	| left=expression op=CARET right=expression #BinaryOperatorExpression
	| op=unaryOperator expression	#UnaryOperatorExpression
	| left=expression op=(DIVISION|ASTERISK) right=expression #BinaryOperatorExpression
	| left=expression op=(PLUS|MINUS) right=expression	#BinaryOperatorExpression
	| id=varIdentifier APOSTROPHE #DerivativeExpression 
	| id=varIdentifier #VariableExpression
	| value=number	#ConstantExpression
	| '#' id=ID LPAREN (exp=expression)* RPAREN #MacroExpression
	| SUM LSQR index = ID E lbound=expression COMMA rbound=expression RSQR LCRL summationExp=expression RCRL #SummationExpression
	| LCRL condition=boolExpression RCRL QUESTIONMARK LCRL first=expression RCRL COLON LCRL second=expression RCRL #TernaryOperatorExpression
	;

functionArguments: expression (COMMA expression)* | ;


fragment LOWERCASE  : [a-z] ;
fragment UPPERCASE  : [A-Z] ;
fragment DIGIT: [0-9] ;

T0 : '(t0)';
ZEROSQR: '[0]';
SET: 'set';
ON: 'on';
FROM: 'from';
DER : 'der';
TERMINAL:'terminal';
SUM: 'sum';
MACRO: 'macro';
FOR: 'for';
IN: 'in';
IF: 'if';
ELSE: 'else';
LOCAL: 'local';
CONSTANT: 'constant';

FLOAT: (DIGIT+ DOT DIGIT*) ([Ee][+-]? DIGIT+)?
	   |DOT DIGIT+ ([Ee][+-]? DIGIT+)?
		|DIGIT+ ([Ee] [+-]? DIGIT+)?
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
OR                  : '||'|'or' ;
AND                 : '&&'|'and' ;
NOT                 : '!'|'not' ;
SEMICOLON			: ';' ;
COLON				: ':' ;
LSQR			    : '[' ;
RSQR			    : ']' ;
LCRL			    : '{' ;
RCRL			    : '}' ;
APOSTROPHE			:'\'' ;
QUESTIONMARK		: '?' ;


STRING	: '"' .*? '"'|'\'' .*? '\'';
NEWLINE	: ('\r'? '\n' | '\r')+ -> skip;
WHITESPACE : (' ' | '\t')+ -> skip ;
COMMENT 
	:	( '//' ~[\r\n]* ('\r'? '\n' | 'r')
		| '/*' .*? '*/'
		) -> skip
	;