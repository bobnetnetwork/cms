import {ContentRouter} from "./ContentRouter.js";
import {TagService} from "../../../service/model/content/TagService.js";

export class TagRouter extends ContentRouter {
    protected service: TagService = new TagService();

    constructor() {
        super("TagRouter");
    }
}