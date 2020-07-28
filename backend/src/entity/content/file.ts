import pkg from "mongoose";

const {Schema, model} = pkg;

const fileSchema = new Schema({
    fileName: String,
    url: String,
    slug: String,
    mimeType: String,
    addedAt: Date,
    id: Number
});

export const File = model("File", fileSchema);
