import ErrorMessage from "./error";


export class CompilerError extends Error {
    messages: ErrorMessage[];
    constructor(messages: ErrorMessage[]) {
        super();
        this.messages = messages;
    }
}
