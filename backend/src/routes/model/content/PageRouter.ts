import {PageService} from "../../../service/model/content/PageService.js";
import {ContentRouter} from "./ContentRouter.js";

export class PageRouter extends ContentRouter {
    protected service: PageService = new PageService();

    constructor() {
        super("PageRouter");
    }
}
