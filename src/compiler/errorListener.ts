
import antlr4 from "antlr4/error/";
import path from "path";
import Error from "./error";
import { Token, Recognizer } from "antlr4";

export default class ErrorListener extends antlr4.ErrorListener {
    errors:Error[];
    constructor(errors:Error[]){
      super();
      this.errors = errors;
    }
    syntaxError(recognizer: Recognizer, offendingSymbol: Token, line: number, column: number, msg: string, e: any): void {
      this.errors.push(new Error(line, column, msg))
    }
    add(line:number,column:number,msg:string){
      this.errors.push(new Error(line,column,msg));
    }
  }