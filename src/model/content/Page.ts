import typegoose, {Ref} from "@hasezoey/typegoose";
import {User} from "../user/User.js";
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

export type PageType = {
    title?: string,
    headline?: string,
    content?: string,
    featuredImage?: string,
    author?: Ref<User>,
    slug?: string,
    addedAt?: Date,
}

export const PageModel = new Page().getModelForClass(Page);
