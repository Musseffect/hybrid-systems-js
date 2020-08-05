import odeGrammarLexer from "../grammar/antlrOutput/odeGrammarLexer.js";
import odeGrammarVisitor from "../grammar/antlrOutput/odeGrammarVisitor.js";
import odeGrammarParser from "../grammar/antlrOutput/odeGrammarParser.js";
import {
    ExpressionNode,
    BoolExpressionNode
} from "./astNode.js";
import { ErrorListener } from "antlr4/error";

class VariableEntry{
    name:string;
    initialValue:number|null;
}
class EquationEntry{
    expression:ExpressionNode;
    isExplicit:boolean;
    isAlgebraic:boolean;
}
class Event{
    incidentStates:string[];
    expression:BoolExpressionNode;
}
class State{
    constants:Record<string,number>;
    equations:Record<string,EquationEntry>;
    setters:Record<string,ExpressionNode>;
    events:Event[];
}

class Visitor extends odeGrammarVisitor.odeGrammarVisitor{
    constants:Record<string,number>;
    variables:Record<string,VariableEntry>;
    states:Record<string,State>;
    errorListener:ErrorListener;
    startOde(ctx:any, errorListener:ErrorListener){
        this.states["init"] = {
            constants:{},
            equations:{},
            setters:{},
            events:[]
        }
        this.errorListener = errorListener;
        this.variables = {
        };
        this.visitOde(ctx);



        
    }
    startHybrid(ctx:any, errorListener:ErrorListener){

    }
    visitOde(ctx:any){

    }


}

export default Visitor;