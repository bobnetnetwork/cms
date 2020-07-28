import { Schema, model } from "mongoose";

const articleSchema = new Schema({
    title: String,
    headline: String,
    content: String,
    featuredImage: String,
    author: Object,
    slug: String,
    addedAt: Date,
    id: Number,
    tags: Object,
    categories: Object,
});

export const Article = new model("Article", articleSchema);
