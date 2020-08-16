import typegoose, {Ref} from "typegoose";
import {Category} from "./Category";
import {Tag} from "./Tag";
import {User} from "../user/User";
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
}

export const ArticleModel = new Article().getModelForClass(Article);
