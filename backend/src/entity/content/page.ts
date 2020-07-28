import { Schema, model } from "mongoose";

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

export const Page = new model("Page", pageSchema);
