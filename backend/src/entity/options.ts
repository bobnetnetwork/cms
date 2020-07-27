// @ts-ignore
import { Schema, Model } from "mongoose";

module.exports = Model("Options", new Schema({
    name: String,
    value: String
}));
