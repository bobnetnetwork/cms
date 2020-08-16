import typegoose, {Ref} from "typegoose";
import {User} from "../user/User";
const { prop, Typegoose } = typegoose;

export class Page extends Typegoose {

    @prop()
    public title?: string;

    @prop()
    public headline?: string;

    @prop()
    public content?: string;

    @prop()
    public featuredImage?: string;

    @prop()
    public author?: Ref<User>;

    @prop()
    public slug?: string;

    @prop()
    public addedAt?: Date;
}

export const PageModel = new Page().getModelForClass(Page);
