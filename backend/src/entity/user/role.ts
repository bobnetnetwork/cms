// @ts-ignore
import { Schema, Model } from "mongoose";

module.exports = Model("Role", new Schema({
    name: String,
    id: Number
}));
