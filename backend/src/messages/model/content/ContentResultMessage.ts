import {ResultMessage} from "../../ResultMessage.js";
import {InstanceType} from "@hasezoey/typegoose";

export class ContentResultMessage extends ResultMessage {
    private readonly content: InstanceType<any> | InstanceType<any>[];

    constructor(content: InstanceType<any> | InstanceType<any>[], message: string) {
        super(message, true);
        this.content = content;
    }

    public getMessage(): ContentResultMessageType {
        return {
            "content": this.content,
            "message": this.message,
            "success": this.success,
        }
    }
}

export type ContentResultMessageType = {
    "content": InstanceType<any> | InstanceType<any>[],
    "message": string,
    "success": boolean,
}
