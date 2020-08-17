import {ResultMessage} from "./ResultMessage.js";

export class ArticleResultMessage extends ResultMessage {
    protected readonly article: import("typegoose").InstanceType<import("../model/content/Article.js").Article>;

    constructor(article: import("typegoose").InstanceType<import("../model/content/Article.js").Article>, message: string) {
        super(message, true);
        this.article = article;
    }

    public getMessage(): ArticleResultMessageType {
        return {
            "article": this.article,
            "message": this.message,
            "success": this.success,
        };
    }
}

export type ArticleResultMessageType = {
    "article": import("typegoose").InstanceType<import("../model/content/Article.js").Article>,
    "message": string,
    "success": boolean,
}
