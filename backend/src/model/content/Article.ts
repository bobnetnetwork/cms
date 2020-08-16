import typegoose, {Ref} from "typegoose";
import {Category} from "./Category";
import {Tag} from "./Tag";
import {User} from "../user/User";
const { prop, Typegoose } = typegoose;


export class Article extends Typegoose {

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

    @prop()
    tags?: Ref<Tag>;

    @prop()
    categories?: Ref<Category>;
}

export const ArticleModel = new Article().getModelForClass(Article);
