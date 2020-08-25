import {ContentService} from "../content/ContentService.js";
import {Role, RoleModel, RoleType} from "../../../model/user/Role.js";
import {InstanceType} from "@hasezoey/typegoose";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ResultMessageType} from "../../../messages/ResultMessage.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";

export class RoleService extends ContentService {

    constructor() {
        super("RoleService", RoleModel);
    }

    protected async isContainAllRequiredData(data: RoleType, callback: (result: boolean) => void): Promise<void> {
        let result: boolean;
        result = (typeof data.name !== "undefined");
        callback(result);
    }

    protected createContent(data: RoleType): InstanceType<Role> {
        const role = new RoleModel();
        const slugify = new SlugifyService();

        role.name = data.name;

        if(typeof data.name !== "undefined") {
            role.slug = slugify.createSlug(data.name);
        }

        return role;
    }

    public async update(data: RoleType, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({slug: data.slug}, (err: Error, role: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(typeof data.name !== "undefined") {
                    role.name = name;
                }

                if(typeof data.users !== "undefined") {
                    role.users = data.users;
                }

                role.save((err1: Error, updateRole: InstanceType<Role>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updateRole, "Role Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}
