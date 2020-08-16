import typegoose, {Ref} from "typegoose";
import {Article} from "./Article";
const { prop, Typegoose } = typegoose;

export class Tag extends Typegoose {

    @prop()
    title?: string;

    @prop()
    slug?: string;

    @prop()
    addedAt?: Date;

    @prop()
    articles?: Ref<Article>;
}

export const TagModel = new Tag().getModelForClass(Tag);
