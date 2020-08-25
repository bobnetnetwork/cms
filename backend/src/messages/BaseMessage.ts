export class BaseMessage {
    protected message: string;

    constructor(message: string) {
        this.message = message;
    }

    public getMessage(): BaseMessageType {
        return {
            "message": this.message,
        };
    }
}

export type BaseMessageType = {
    "message": string,
}