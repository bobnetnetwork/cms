import pkg from "mongoose";

const { Schema, model } = pkg;

const optionsSchema = new Schema({
    name: String,
    value: String,
});

export const Options = new model("Options", optionsSchema);
