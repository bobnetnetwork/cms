import typegoose from "@hasezoey/typegoose";
const { prop, Typegoose } = typegoose;

export class Role extends Typegoose {

    @prop()
    public name?: string;
}

export const RoleModel = new Role().getModelForClass(Role);
