import typegoose, {Ref} from 'typegoose';
const { prop, Typegoose } = typegoose;

export class Role extends Typegoose {

    @prop()
    name?: string;
}

export const RoleModel = new Role().getModelForClass(Role);
