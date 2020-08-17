import passportGoogleOAuth, {Profile, VerifyFunction} from "passport-google-oauth";
import express, {Router} from "express";
import {LogService} from "../../service/tool/LogService.js";
import {Logger} from "log4js";
import passport from "passport";
import {UserModel} from "../../model/user/User.js";

const GoogleStrategy = passportGoogleOAuth.OAuthStrategy;

export class GoogleOAuthRouter {

    private googleOAuthRouter: Router = express.Router();

    private log: Logger = new LogService().getLogger("GoogleAuthRouter");

    constructor() {
        this.config();
    }

    public getGoogleOAuthRouter(): Router {
        return this.googleOAuthRouter;
    }

    private config(): void {
        const options = {
            consumerKey: "GOOGLE_CONSUMER_KEY",
            consumerSecret: "GOOGLE_CONSUMER_SECRET",
            callbackURL: "http://www.example.com/auth/google/callback",
        }

        passport.use(new GoogleStrategy(options,
            async (token: string, tokenSecret: string, profile: Profile, done: VerifyFunction) => {
                await UserModel.findOrCreate({ googleId: profile.id});
            }
        ));
    }

    private auth(): void {
        this.googleOAuthRouter.get("/", passport.authenticate("google", { scope: 'https://www.google.com/m8/feeds' }));
    }

    private callback(): void {
        const options = {
            successRedirect: "/",
            failureRedirect: "/login",
        }
        this.googleOAuthRouter.get("/callback", passport.authenticate("google", options));
    }

}