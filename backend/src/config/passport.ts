import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email: any, password: any, done) => {
    Users.findOne({ email })
        .then((user: { validatePassword: (arg0: any) => any; }) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }

            return done(null, user);
        }).catch(done);
}));