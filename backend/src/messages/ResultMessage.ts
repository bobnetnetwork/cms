import {BaseMessage} from "./BaseMessage.js";

export class ResultMessage extends BaseMessage{
    protected readonly success: boolean;

    constructor(message: string, success: boolean) {
        super(message)
        this.success = success;
    }

    public getMessage(): ResultMessageType {
        return {
            "message": this.message,
            "success": this.success,
        };
    }
}

export type ResultMessageType = {
    "message": string,
    "success": boolean,
};
