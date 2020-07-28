import { Schema, model } from "mongoose";

const optionsSchema = new Schema({
    name: String,
    value: String,
});

export const Options = new model("Options", optionsSchema);
