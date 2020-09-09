import { ExpressionNode } from "./astNode";



export abstract class CompilerContext{
    previous:CompilerContext;
    index:number;
    constructor(previous:CompilerContext){
        this.previous = previous;
    }
}
export class LoopContext extends CompilerContext{
    iterator:string;
    constructor(previous:CompilerContext,iterator:string){
        super(previous);
        this.iterator = iterator;
    }
}
export class MacroContext extends CompilerContext{
    args:Record<string,ExpressionNode>;
    constructor(previous:CompilerContext,args:Record<string,ExpressionNode>){
        super(previous);
        this.args = args;
    }
}