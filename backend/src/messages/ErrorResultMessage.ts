import {ResultMessage} from "./ResultMessage.js";

export class ErrorResultMessage extends ResultMessage {
    protected readonly error: Error;

    constructor(error: Error, message: string, success: boolean) {
        super(message, success);
        this.error = error;
    }

    public getMessage() {
        return {
            "error": this.error,
            "message": this.message,
            "success": this.success,
        };
    }
}