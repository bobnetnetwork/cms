import {ResultMessage} from "./ResultMessage.js";

export class ErrorResultMessage extends ResultMessage {
    protected readonly error: Error;

    constructor(error: Error, message: string) {
        super(message, false);
        this.error = error;
    }

    public getMessage(): ErrorResultMessageType {
        return {
            "error": this.error,
            "message": this.message,
            "success": this.success,
        };
    }
}

export type ErrorResultMessageType = {
    "error": Error,
    "message": string,
    "success": boolean,
}
