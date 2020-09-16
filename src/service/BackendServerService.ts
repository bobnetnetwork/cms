import { ServerService } from './ServerService.js';
import {DBService} from "./DBService.js";
import {Express} from "express";
import {UsersRouter} from "../routes/model/user/UsersRouter.js";
import {ArticlesRouter} from "../routes/model/content/ArticlesRouter.js";
import {HealthCheckRouter} from "../routes/tool/HealthCheckRouter.js";
import {FilesRouter} from "../routes/model/content/FilesRouter.js";
import {LocalAuthRouter} from "../routes/auth/LocalAuthRouter.js";
import {FacebookAuthRouter} from "../routes/auth/FacebookAuthRouter.js";
import {TwitterAuthRouter} from "../routes/auth/TwitterAuthRouter.js";
import {GoogleOAuthRouter} from "../routes/auth/GoogleOAuthRouter.js";
import {GoogleOAuth2Router} from "../routes/auth/GoogleOAuth2Router.js";
import {RootRouter} from "../routes/RootRouter.js";
import {CategoryRouter} from "../routes/model/content/CategoryRouter.js";
import {PageRouter} from "../routes/model/content/PageRouter.js";
import {FileRouter} from "../routes/model/content/FileRouter.js";
import {TagRouter} from "../routes/model/content/TagRouter.js";
import {RoleRouter} from "../routes/model/user/RoleRouter.js";
import {OptionsRouter} from "../routes/model/OptionsRouter.js";

export class BackendServerService extends ServerService {

    private database: DBService = new DBService();

    private API_URL = "/api/v01";
    private HEALTH_CHECK: string = this.API_URL + "/health-check";
    private USERS: string = this.API_URL + "/users";
    private ROLE: string = this.API_URL + "/roles";
    private CONTENT: string = this.API_URL + "/content";
    private ARTICLES: string = this.CONTENT + "/articles";
    private FILES: string = this.CONTENT + "/files";
    private CATEGORY: string = this.CONTENT + "/category";
    private PAGE: string = this.CONTENT + "/page";
    private FILE: string = this.CONTENT + "/file";
    private TAG: string = this.CONTENT + "/tag";
    private AUTH: string = this.API_URL + "/auth";
    private LOCAL_AUTH: string = this.AUTH + "/local";
    private FACEBOOK_AUTH: string = this.AUTH + "/facebook";
    private TWITTER_AUTH: string = this.AUTH + "/twitter";
    private GOOGLE_OAUTH: string = this.AUTH + "/google/oauth";
    private GOOGLE_OAUTH2: string = this.AUTH + "/google/oauth2";
    private OPTIONS: string = this.API_URL + "/options";

    constructor(app: Express) {
        super("BackendServerService", app);
    }

    private connectToDB(): void {
        this.database.connectToDB();
    }

    private closeDBConnections(): void {
        this.log.info("Closing DB connection(s).");
        this.database.disconnect();
    }

    protected openConnections(): void {
        this.connectToDB();
    }

    protected closeConnections(): void {
        this.closeDBConnections();
    }

    public setRouters(): void {
        // Root path
        this.app.use(this.API_URL, new RootRouter().getRootRouter());

        // HealthCheck
        this.app.use(this.HEALTH_CHECK, new HealthCheckRouter().getHealthCheckRouter());

        // Models
        this.app.use(this.USERS, new UsersRouter().getRouter());
        this.app.use(this.ROLE, new RoleRouter().getRouter());
        this.app.use(this.ARTICLES, new ArticlesRouter().getRouter());
        this.app.use(this.FILES, new FilesRouter().getFileRouter());
        this.app.use(this.CATEGORY, new CategoryRouter().getRouter());
        this.app.use(this.PAGE, new PageRouter().getRouter());
        this.app.use(this.FILE, new FileRouter().getRouter());
        this.app.use(this.TAG, new TagRouter().getRouter());

        // Auth
        this.app.use(this.LOCAL_AUTH, new LocalAuthRouter().getLocalAuthRouter());
        this.app.use(this.FACEBOOK_AUTH, new FacebookAuthRouter().getFacebookAuthRouter());
        this.app.use(this.TWITTER_AUTH, new TwitterAuthRouter().getTwitterAuthRouter());
        this.app.use(this.GOOGLE_OAUTH, new GoogleOAuthRouter().getGoogleOAuthRouter());
        this.app.use(this.GOOGLE_OAUTH2, new GoogleOAuth2Router().getGoogleOAuth2Router());

        this.app.use(this.OPTIONS, new OptionsRouter().getRouter());
    }

    
}