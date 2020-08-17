import passportGoogleOAuth, {Profile} from "passport-google-oauth";
import express, {Router} from "express";
import passport from "passport";
import {UserModel} from "../../model/user/User.js";

const GoogleStrategy = passportGoogleOAuth.OAuth2Strategy;

export class GoogleOAuth2Router {

    private googleOAuth2Router: Router = express.Router();

    constructor() {
        this.config();
        this.auth();
        this.callback();
    }

    public getGoogleOAuth2Router(): Router {
        return this.googleOAuth2Router;
    }

    private config(): void {
        const options = {
            clientID: "GOOGLE_CLIENT_ID",
            clientSecret: "GOOGLE_CLIENT_SECRET",
            callbackURL: "http://www.example.com/auth/google/callback"
        }

        passport.use(new GoogleStrategy(options,
            async (token: string, tokenSecret: string, profile: Profile) => {
                await UserModel.findOrCreate({ googleId: profile.id});
            }
        ));
    }

    private auth(): void {
        this.googleOAuth2Router.get("/", passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login'] }));
    }

    private callback(): void {
        const options = {
            successRedirect: "/",
            failureRedirect: "/login",
        }
        this.googleOAuth2Router.get("/callback", passport.authenticate("google", options));
    }

}