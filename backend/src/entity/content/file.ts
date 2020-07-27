// @ts-ignore
import { Schema, Model } from "mongoose";

module.exports = Model('File', new Schema({
    fileName: String,
    url: String,
    slug: String,
    mimeType: String,
    addedAt: Date,
    id: Number
}));