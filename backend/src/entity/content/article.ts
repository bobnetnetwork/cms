import pkg from "mongoose";

const {Schema, model} = pkg;

const articleSchema = new Schema({
    title: String,
    headline: String,
    content: String,
    featuredImage: String,
    author: Object,
    slug: String,
    addedAt: Date,
    tags: Object,
    categories: Object,
});

export const Article = model("Article", articleSchema);
