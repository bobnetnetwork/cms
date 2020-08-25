import {ResultMessage} from "../../ResultMessage.js";
import {InstanceType} from "@hasezoey/typegoose";
import {User} from "../../../model/user/User";

export class UserResultMessage extends ResultMessage {
    protected readonly user: InstanceType<User> | InstanceType<User>[];

    constructor(message: string, user: InstanceType<User> | InstanceType<User>[]) {
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
    "user": InstanceType<User> | InstanceType<User>[],
}
