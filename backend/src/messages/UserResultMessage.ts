import {ResultMessage} from "./ResultMessage.js";

export class UserResultMessage extends ResultMessage {
    protected readonly user: import("typegoose").InstanceType<import("../model/user/User.js").User>;

    constructor(message: string, user: import("typegoose").InstanceType<import("../model/user/User.js").User>) {
        super(message, true);
        this.user = user;
    }

    public getMessage(): UserResultMessageType {
        return {
            "message": this.message,
            "success": this.success,
            "user": this.user,
        }
    }
}

export type UserResultMessageType = {
    "message": string,
    "success": boolean,
    "user": import("typegoose").InstanceType<import("../model/user/User.js").User>,
}
