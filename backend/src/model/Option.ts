import typegoose from "typegoose";
const { prop, Typegoose } = typegoose;

export class Option extends Typegoose {

    @prop()
    name?: string;

    @prop()
    value?: string;
}

export const OptionModel = new Option().getModelForClass(Option);
