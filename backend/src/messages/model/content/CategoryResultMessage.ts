import {ResultMessage} from "../../ResultMessage.js";
import {InstanceType} from "@hasezoey/typegoose";

export class CategoryResultMessage extends ResultMessage {
    protected readonly category: InstanceType<import("../../../model/content/Category.js").Category>;

    constructor(category: InstanceType<import("../../../model/content/Category.js").Category>, message: string) {
        super(message, true);
        this.category = category;
    }

    public getMessage(): CategoryMessageType {
        return {
            "category": this.category,
            "message": this.message,
            "success": this.success,
        };
    }
}

export type CategoryMessageType = {
    "category": InstanceType<import("../../../model/content/Category.js").Category>,
    "message": string,
    "success": boolean,
}