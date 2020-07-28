import { Schema, model } from "mongoose";

const fileSchema = new Schema({
    fileName: String,
    url: String,
    slug: String,
    mimeType: String,
    addedAt: Date,
    id: Number
});

export const File = new model("File", fileSchema);
