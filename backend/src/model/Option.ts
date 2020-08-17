import typegoose from "typegoose";
const { prop, Typegoose } = typegoose;

export class Option extends Typegoose {

    @prop()
    public name?: string;

    @prop()
    public value?: string;
}

export const OptionModel = new Option().getModelForClass(Option);
