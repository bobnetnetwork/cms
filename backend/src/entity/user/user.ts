import pkg from "mongoose";

const {Schema, model} = pkg;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    pwd: String,
    id: Number,
    accountExpired: Boolean,
    accountLocked: Boolean,
    credentialsExpired: Boolean,
    enabled: Boolean,
    registeredAt: Date,
    roles: Object,
});

export const User = model("User", userSchema);
