import typegoose, {Ref} from "typegoose";
import {Article} from "./Article";
const { prop, Typegoose } = typegoose;

export class Category extends Typegoose {

    @prop()
    name?: string;

    @prop()
    description?: string;

    @prop()
    featuredImage?: string;

    @prop()
    slug?: string;

    @prop()
    addedAt?: Date;

    @prop()
    parent?: Category;

    @prop()
    articles?: Ref<Article>;
}

export const CategoryModel = new Category().getModelForClass(Category);
