import pkg from "mongoose";

const { Schema, model } = pkg;

const roleSchema = new Schema({
    name: String,
    id: Number,
});

export const Role = model("Role", roleSchema);
