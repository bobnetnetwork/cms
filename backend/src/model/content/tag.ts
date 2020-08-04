import pkg from "mongoose";

const {Schema, model} = pkg;

const tagSchema = new Schema({
    title: String,
    slug: String,
    addedAt: Date,
    id: Number,
    articles: Object
});

export const Tag = model("Tag", tagSchema);
