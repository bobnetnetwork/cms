import typegoose, {Ref} from "@hasezoey/typegoose";
import {User} from "./User.js";
const { prop, Typegoose } = typegoose;

export class Role extends Typegoose {

    @prop()
    public name?: string;

    @prop()
    public slug?: string;

    @prop()
    public users?: Ref<User>;
}

export type RoleType = {
    name?: string,
    slug?: string,
    users?: Ref<User>,
}

export const RoleModel = new Role().getModelForClass(Role);
