import passportGoogleOAuth, {Profile, VerifyFunction} from "passport-google-oauth";
import {Router} from "express";
import {LogService} from "../../../service/tool/LogService";
import {Logger} from "log4js";
import passport from "passport";
import {UserModel} from "../../../model/user/User";

const GoogleStrategy = passportGoogleOAuth.OAuth2Strategy;

export class GoogleOAuth2Router {

    private googleOAuth2Router: Router = Router();

    private log: Logger = new LogService().getLogger("GoogleAuthRouter");

    constructor() {
        this.config();
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
            async (token: string, tokenSecret: string, profile: Profile, done: VerifyFunction) => {
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