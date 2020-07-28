import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: String,
    id: Number,
});

export const Role = new model("Role", roleSchema);
