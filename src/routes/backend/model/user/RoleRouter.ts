import {ContentRouter} from "../content/ContentRouter.js";
import {RoleService} from "../../../service/model/user/RoleService.js";

export class RoleRouter extends ContentRouter {
    protected service: RoleService = new RoleService();

    constructor() {
        super("RoleRouter");
    }
}
