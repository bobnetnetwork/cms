import {ResultMessage} from "./ResultMessage.js";
import {InstanceType} from "typegoose";

export class UserResultMessage extends ResultMessage {
    protected readonly user: InstanceType<import("../model/user/User.js").User>;

    constructor(message: string, user: InstanceType<import("../model/user/User.js").User>) {
        super(message, true);
        this.user = user;
    }

    public getMessage(): UserResultMessageType {
        return {
            "message": this.message,
            "success": this.success,
            "user": this.user,
        };
    }
}

export type UserResultMessageType = {
    "message": string,
    "success": boolean,
    "user": InstanceType<import("../model/user/User.js").User>,
}
