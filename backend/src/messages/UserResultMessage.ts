import {ResultMessage} from "./ResultMessage.js";

export class UserResultMessage extends ResultMessage {
    protected readonly user: any;

    constructor(message: string, user: any) {
        super(message, true);
        this.user = user;
    }

    public getMessage() {
        return {
            "message": this.message,
            "success": this.success,
            "user": this.user,
        }
    }
}
