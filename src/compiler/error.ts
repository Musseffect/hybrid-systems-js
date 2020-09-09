import { TextPosition } from "./astNode";

export default class ErrorMessage{
    textPos:TextPosition;
    message:string;
    constructor(textPos:TextPosition,message:string){
      this.textPos = textPos;
      this.message = message;
    }
    print(){
      if(this.textPos.line!=-1)
        return `${this.message} at line:${this.textPos.line}, position:${this.textPos.column}`;
      return this.message;
    }
  }