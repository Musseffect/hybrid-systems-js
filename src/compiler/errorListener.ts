import antlr4 from "antlr4/error/";
import path from "path";
import ErrorMessage from "./error";
import { Token, Recognizer } from "antlr4";
import { TextPosition } from "./astNode";

export default class ErrorListener extends antlr4.ErrorListener {
    errors:ErrorMessage[];
    constructor(errors:ErrorMessage[]){
      super();
      this.errors = errors;
    }
    syntaxError(recognizer: Recognizer, offendingSymbol: Token, line: number, column: number, msg: string, e: any): void {
      this.errors.push(new ErrorMessage(new TextPosition(line,column,offendingSymbol.start,offendingSymbol.stop), msg))
    }
    add(textPos:TextPosition,msg:string){
      this.errors.push(new ErrorMessage(textPos,msg));
    }
  }