// @ts-ignore
import { Schema, Model } from "mongoose";

module.exports = Model("Category", new Schema({
    name: String,
    description: String,
    featuredImage: String,
    slug: String,
    addedAt: Date,
    id: Number,
    parent: Object,
    articles: Object
}));
