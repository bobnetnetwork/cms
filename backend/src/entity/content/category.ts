import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: String,
    description: String,
    featuredImage: String,
    slug: String,
    addedAt: Date,
    id: Number,
    parent: Object,
    articles: Object,
});

export const Category = new model("Category", categorySchema);
