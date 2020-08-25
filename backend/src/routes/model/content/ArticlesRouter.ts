import {ArticlesService} from "../../../service/model/content/ArticlesService.js";
import {ContentRouter} from "./ContentRouter.js";

export class ArticlesRouter extends ContentRouter {
    protected service: ArticlesService = new ArticlesService();

    constructor() {
        super("ArticlesRouter");
    }

}
