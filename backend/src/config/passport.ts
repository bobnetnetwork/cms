import passport from "passport";
import {UserModel} from "../model/user/User";

import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email: string, password: string, done: any) => {
    UserModel.findOne({ email },  (err, user) => {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        } else {
            return done(null, user);
        }
    })
}));