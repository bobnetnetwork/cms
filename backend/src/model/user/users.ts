import pkg from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const {Schema, model} = pkg;

const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    pwd: String,
    hash: String,
    salt: String,
    accountExpired: Boolean,
    accountLocked: Boolean,
    credentialsExpired: Boolean,
    enabled: Boolean,
    registeredAt: Date,
    roles: Object,
});

UsersSchema.methods.setPassword = function(password: crypto.BinaryLike) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password: crypto.BinaryLike) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(String(expirationDate.getTime() / 1000), 10),
    }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

export const Users = model("Users", UsersSchema);
