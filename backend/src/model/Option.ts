import typegoose from "@hasezoey/typegoose";
const { prop, Typegoose } = typegoose;

export class Option extends Typegoose {

    @prop()
    public name?: string;

    @prop()
    public value?: string;
}

export type OptionType = {
    name?: string,
    value?: string,
}

export const OptionModel = new Option().getModelForClass(Option);
