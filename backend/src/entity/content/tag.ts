import { Schema, model } from "mongoose";

const tagSchema = new Schema({
    title: String,
    slug: String,
    addedAt: Date,
    id: Number,
    articles: Object
});

export const Tag = new model("Tag", tagSchema);
