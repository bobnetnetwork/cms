import crypto from "crypto";
import jwt from "jsonwebtoken";
import typegoose, {Ref} from "typegoose";
import {Role} from "./Role";
import mongoose from "mongoose";
const { prop, Typegoose } = typegoose;
const {Types} = mongoose;

export class User extends Typegoose {

    @prop()
    public firstName?: string;

    @prop()
    public lastName?: string;

    @prop()
    public userName?: string;

    @prop()
    public email?: string;

    @prop()
    public pwd?: string;

    @prop()
    public hash?: string;

    @prop()
    public salt: string = "";

    @prop()
    public accountExpired?: boolean;

    @prop()
    public accountLocked?: boolean;

    @prop()
    public credentialsExpired?: boolean;

    @prop()
    public enabled?: boolean;

    @prop()
    public registeredAt?: Date;

    @prop()
    public roles?: Ref<Role>;

    public setPassword(password: crypto.BinaryLike) {
        this.salt = crypto.randomBytes(16).toString("hex");
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    }

    public validatePassword(password: crypto.BinaryLike) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
        return this.hash === hash;
    }

    public generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: Types.ObjectId,
            exp: parseInt(String(expirationDate.getTime() / 1000), 10),
        }, "secret");
    }

    public toAuthJSON() {
        return {
            _id: Types.ObjectId,
            email: this.email,
            token: this.generateJWT(),
        };
    }
}

export const UserModel = new User().getModelForClass(User);
