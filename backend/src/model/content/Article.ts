import typegoose, {Ref} from "@hasezoey/typegoose";
import {Category} from "./Category.js";
import {Tag} from "./Tag.js";
import {User} from "../user/User.js";
const { prop, Typegoose } = typegoose;


export class Article extends Typegoose {

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

    @prop()
    public tags?: Ref<Tag>;

    @prop()
    public categories?: Ref<Category>;

    @prop()
    public status?: string;
}

export type ArticleType = {
    title?: string,
    headline?: string,
    content?: string,
    featuredImage?: string,
    author?: Ref<User>,
    slug?: string,
    addedAt?: Date,
    tags?: Ref<Tag>,
    categories?: Ref<Category>,
    status?: string,
}

export const ArticleModel = new Article().getModelForClass(Article);
