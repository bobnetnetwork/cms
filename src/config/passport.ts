import passport from "passport";
import {UserModel} from "../model/user/User.js";
import passportLocal from "passport-local";

const {Strategy} = passportLocal;

passport.use(new Strategy({
    passwordField: "user[password]",
    usernameField: "user[email]",
}, (email: string, password: string, done: any) => {
    UserModel.findOne({ email },  (err: Error, user: any) => {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { "email or password": "is invalid" } });
        } else {
            return done(null, user);
        }
    });
}));
