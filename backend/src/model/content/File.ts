import typegoose from "typegoose";
const { prop, Typegoose } = typegoose;

export class File extends Typegoose {

    @prop()
    public fileName?: string;

    @prop()
    public url?: string;

    @prop()
    public slug?: string;

    @prop()
    public mimeType?: string;

    @prop()
    public addedAt?: Date;
}

export const FileModel =new File().getModelForClass(File);
