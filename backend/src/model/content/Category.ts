import typegoose, {Ref} from "@hasezoey/typegoose";
import {Article} from "./Article.js";
const { prop, Typegoose } = typegoose;

export class Category extends Typegoose {

    @prop()
    public name?: string;

    @prop()
    public description?: string;

    @prop()
    public featuredImage?: string;

    @prop()
    public slug?: string;

    @prop()
    public addedAt?: Date;

    @prop()
    public parent?: Category;

    @prop()
    public articles?: Ref<Article>;
}

export const CategoryModel = new Category().getModelForClass(Category);
