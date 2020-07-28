import pkg from "mongoose";

const { Schema, model } = pkg;

const pageSchema = new Schema({
    title: String,
    headline: String,
    content: String,
    featuredImage: String,
    author: Object,
    slug: String,
    addedAt: Date,
    id: Number
});

export const Page = model("Page", pageSchema);
