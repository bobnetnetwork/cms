// @ts-ignore
import { Schema, Model } from "mongoose";

module.exports = Model("Tag", new Schema({
    title: String,
    slug: String,
    addedAt: Date,
    id: Number,
    articles: Object
}));
