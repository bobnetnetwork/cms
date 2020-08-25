import express, {Router} from "express";
import passport from "passport";
import passportFacebook, {Profile} from "passport-facebook";
import {UserModel} from "../../model/user/User.js";

const FacebookStrategy = passportFacebook.Strategy;

export class FacebookAuthRouter {

    private facebookAuthRouter: Router = express.Router();

    constructor() {
        this.configure();
        this.auth();
        this.callback();
    }

    public getFacebookAuthRouter(): Router {
        return this.facebookAuthRouter;
    }

    private configure(): void {
        passport.use(new FacebookStrategy({
                clientID: "FACEBOOK_APP_ID",
                clientSecret: "FACEBOOK_APP_SECRET",
                callbackURL: "http://www.example.com/auth/facebook/callback"
            },
            async (accessToken:string, refreshToken:string, profile: Profile) => {
                await UserModel.findOrCreate({facebookId: profile.id});
            }
        ));
    }

    private auth(): void {
        this.facebookAuthRouter.get("/", passport.authenticate("facebook"));
    }

    private callback(): void {
        const options = {
            successRedirect: "/",
            failureRedirect: "/login",
        }
        this.facebookAuthRouter.get("/callback", passport.authenticate("facebook", options));
    }

}