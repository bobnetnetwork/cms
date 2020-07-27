import {Schema, Model} from 'mongoose';

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

export const User = new Model('User', userSchema);