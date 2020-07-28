import pkg from "mongoose";

const { Schema, model } = pkg;

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

export const Category = model("Category", categorySchema);
