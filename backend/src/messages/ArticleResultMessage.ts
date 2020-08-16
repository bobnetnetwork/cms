import {ResultMessage} from "./ResultMessage.js";

export class ArticleResultMessage extends ResultMessage {
    protected readonly article: any;

    constructor(article: any, message: string) {
        super(message, true);
        this.article = article;
    }

    public getMessage() {
        return {
            "article": this.article,
            "message": this.message,
            "success": this.success,
        }
    }
}