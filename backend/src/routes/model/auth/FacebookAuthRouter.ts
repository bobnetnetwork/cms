import express, {Router} from "express";
import {LogService} from "../../../service/tool/LogService.js";
import {Logger} from "log4js";
import passport from "passport";
import passportFacebook, {Profile} from "passport-facebook";
import {UserModel} from "../../../model/user/User.js";

const FacebookStrategy = passportFacebook.Strategy;

export class FacebookAuthRouter {

    private facebookAuthRouter: Router = express.Router();

    private log: Logger = new LogService().getLogger("FacebookAuthRouter");

    constructor() {
        this.configure();
        this.auth();
        this.callback();
    }

    public getFacebookAuthRouter(): Router {
        return this.facebookAuthRouter;
    }

    private configure(): void {
        const options = {
            clientID: "FACEBOOK_APP_ID",
            clientSecret: "FACEBOOK_APP_SECRET",
            callbackUrl: "http://www.example.com/auth/facebook/callback",
        };
        passport.use(new FacebookStrategy({
                clientID: "FACEBOOK_APP_ID",
                clientSecret: "FACEBOOK_APP_SECRET",
                callbackURL: "http://www.example.com/auth/facebook/callback"
            },
            async (accessToken, refreshToken, profile, done) => {
                await UserModel.findOrCreate({facebookdId: profile.id});
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