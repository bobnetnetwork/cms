import crypto from "crypto";
import jwt from "jsonwebtoken";
import typegoose, {Ref} from 'typegoose';
import {Role} from "./Role";
import mongoose from "mongoose";
const { prop, Typegoose } = typegoose;
const {Types} = mongoose;

export class User extends Typegoose {

    @prop()
    firstName?: string;

    @prop()
    lastName?: string;

    @prop()
    userName?: string;

    @prop()
    email?: string;

    @prop()
    pwd?: string;

    @prop()
    hash?: string;

    @prop()
    salt: string = "";

    @prop()
    accountExpired?: boolean;

    @prop()
    accountLocked?: boolean;

    @prop()
    credentialsExpired?: boolean;

    @prop()
    enabled?: boolean;

    @prop()
    registeredAt?: Date;

    @prop()
    roles?: Ref<Role>;

    setPassword(password: crypto.BinaryLike) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }

    validatePassword(password: crypto.BinaryLike) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    }

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: Types.ObjectId,
            exp: parseInt(String(expirationDate.getTime() / 1000), 10),
        }, 'secret');
    }

    toAuthJSON() {
        return {
            _id: Types.ObjectId,
            email: this.email,
            token: this.generateJWT(),
        };
    }
}



export const UserModel = new User().getModelForClass(User);
