import typegoose, {Ref} from "typegoose";
import {User} from "../user/User";
const { prop, Typegoose } = typegoose;

export class Page extends Typegoose {

    @prop()
    title?: string;

    @prop()
    headline?: string;

    @prop()
    content?: string;

    @prop()
    featuredImage?: string;

    @prop()
    author?: Ref<User>;

    @prop()
    slug?: string;

    @prop()
    addedAt?: Date;
}

export const PageModel = new Page().getModelForClass(Page);
