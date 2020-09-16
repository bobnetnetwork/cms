import {CategoryService} from "../../../service/model/content/CategoryService.js";
import {ContentRouter} from "./ContentRouter.js";

export class CategoryRouter extends ContentRouter {
    protected service: CategoryService = new CategoryService();

    constructor() {
        super("CategoryService");
    }
}