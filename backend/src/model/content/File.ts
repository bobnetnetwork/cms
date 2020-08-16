import typegoose from "typegoose";
const { prop, Typegoose } = typegoose;

export class File extends Typegoose {

    @prop()
    fileName?: string;

    @prop()
    url?: string;

    @prop()
    slug?: string;

    @prop()
    mimeType?: string;

    @prop()
    addedAt?: Date;
}

export const FileModel =new File().getModelForClass(File);
