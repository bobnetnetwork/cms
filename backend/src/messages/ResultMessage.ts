export class ResultMessage {
    protected readonly message: string;
    protected readonly success: boolean;

    constructor(message: string, success: boolean) {
        this.message = message;
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
