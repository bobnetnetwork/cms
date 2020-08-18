import {ResultMessage} from "../../ResultMessage.js";
import {InstanceType} from "@hasezoey/typegoose";

export class PageResultMessage extends ResultMessage {
    protected readonly page: InstanceType<import("../../../model/content/Page.js").Page>;

    constructor( page: InstanceType<import("../../../model/content/Page.js").Page>, message: string) {
        super(message, true);
        this.page = page;
    }

    public getMessage(): PageResultMessageType {
        return {
            "message": this.message,
            "page": this.page,
            "success": this.success,
        }
    }
}

export type PageResultMessageType = {
    "message": string,
    "page": InstanceType<import("../../../model/content/Page.js").Page>,
    "success": boolean,
}
