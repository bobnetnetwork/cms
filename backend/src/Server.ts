/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import {UsersRouter} from "./routes/model/user/UsersRouter.js";
import {ArticlesRouter} from "./routes/model/content/ArticlesRouter.js";
import {HealthCheckRouter} from "./routes/tool/HealthCheckRouter.js";
import {FilesRouter} from "./routes/model/content/FilesRouter.js";
import {ErrorMiddleware} from "./middleware/ErrorMiddleware.js";
import {NotFoundHandler} from "./middleware/NotFoundMiddleware.js";
import {ServerService} from "./service/ServerService.js";
import express, {Express} from "express";
import session from "express-session";
import "./config/passport.js";
import {LogService} from "./service/tool/LogService.js";
import {Logger} from "log4js";
import {LocalAuthRouter} from "./routes/auth/LocalAuthRouter.js";
import {FacebookAuthRouter} from "./routes/auth/FacebookAuthRouter.js";
import {TwitterAuthRouter} from "./routes/auth/TwitterAuthRouter.js";
import {GoogleOAuthRouter} from "./routes/auth/GoogleOAuthRouter.js";
import {GoogleOAuth2Router} from "./routes/auth/GoogleOAuth2Router.js";
import {RootRouter} from "./routes/RootRouter.js";

class Server {
    private log: Logger = new LogService().getLogger("server");

    private app: Express = express();

    private API_URL = "/api/v01";
    private HEALTH_CHECK: string = this.API_URL + "/health-check";
    private USERS: string = this.API_URL + "/users";
    private ARTICLES: string = this.API_URL + "/content/articles";
    private FILES: string = this.API_URL + "/files";
    private AUTH: string = this.API_URL + "/auth";
    private LOCAL_AUTH: string = this.AUTH + "/local";
    private FACEBOOK_AUTH: string = this.AUTH + "/facebook";
    private TWITTER_AUTH: string = this.AUTH + "/twitter";
    private GOOGLE_OAUTH: string = this.AUTH + "/google/oauth";
    private GOOGLE_OAUTH2: string = this.AUTH + "/google/oauth2";

    private server: ServerService = new ServerService();

    constructor() {
        this.init();
    }

    public start(): void {
       this.server.startServer(this.app);
    }

    public shutDown(message: string): void {
        this.server.shutDown(message);
    }

    private init(): void {
        this.log.info("Starting Application...");
        this.log.info("App version: " + process.env.npm_package_version);
        this.log.info(process.env.npm_package_description);
        this.log.info("Home page: " + process.env.npm_package_homepage);
        this.log.info("Issues Management: " + process.env.npm_package_bugs_url);

        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());

        this.setRouters();

        const sessionOptions = {
            cookie: { maxAge: 60000 },
            resave: false,
            saveUninitialized: false,
            secret: "passport-tutorial",
        };

        this.app.use(session(sessionOptions));

        this.app.use(new ErrorMiddleware().getHandler());
        this.app.use(new NotFoundHandler().getHandler());

        this.app.use(fileUpload({
            createParentPath: true,
        }));
    }

    private setRouters(): void {
        // Root path
        this.app.use(this.API_URL, new RootRouter().getRootRouter());

        // HealthCheck
        this.app.use(this.HEALTH_CHECK, new HealthCheckRouter().getHealthCheckRouter());

        // Models
        this.app.use(this.USERS, new UsersRouter().getRouter());
        this.app.use(this.ARTICLES, new ArticlesRouter().getRouter());
        this.app.use(this.FILES, new FilesRouter().getFileRouter());

        // Auth
        this.app.use(this.LOCAL_AUTH, new LocalAuthRouter().getLocalAuthRouter());
        this.app.use(this.FACEBOOK_AUTH, new FacebookAuthRouter().getFacebookAuthRouter());
        this.app.use(this.TWITTER_AUTH, new TwitterAuthRouter().getTwitterAuthRouter());
        this.app.use(this.GOOGLE_OAUTH, new GoogleOAuthRouter().getGoogleOAuthRouter());
        this.app.use(this.GOOGLE_OAUTH2, new GoogleOAuth2Router().getGoogleOAuth2Router());
    }
}

const appServer = new Server();

appServer.start();


process.on("SIGTERM", () => {
    appServer.shutDown("SIGTERM signal received.");
});

process.on("SIGINT", () => {
    appServer.shutDown("SIGINT signal received.");
});

process.on("SIGQUIT", () => {
    appServer.shutDown("SIGQUIT signal received.");
});
