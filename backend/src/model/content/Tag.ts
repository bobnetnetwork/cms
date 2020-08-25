import typegoose, {Ref} from "@hasezoey/typegoose";
import {Article} from "./Article.js";
const { prop, Typegoose } = typegoose;

export class Tag extends Typegoose {

    @prop()
    public title?: string;

    @prop()
    public slug?: string;

    @prop()
    public addedAt?: Date;

    @prop()
    public articles?: Ref<Article>;
}

export type TagType = {
    title?: string,
    slug?: string,
    addedAt?: Date,
    articles?: Ref<Article>,
}

export const TagModel = new Tag().getModelForClass(Tag);
