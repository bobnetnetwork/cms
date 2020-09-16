import { ServerService } from './ServerService.js';
import {DBService} from "./DBService.js";
import {Express} from "express";
import {UsersRouter} from "../routes/backend/model/user/UsersRouter.js";
import {ArticlesRouter} from "../routes/backend/model/content/ArticlesRouter.js";
import {HealthCheckRouter} from "../routes/backend/tool/HealthCheckRouter.js";
import {FilesRouter} from "../routes/backend/model/content/FilesRouter.js";
import {LocalAuthRouter} from "../routes/backend/auth/LocalAuthRouter.js";
import {FacebookAuthRouter} from "../routes/backend/auth/FacebookAuthRouter.js";
import {TwitterAuthRouter} from "../routes/backend/auth/TwitterAuthRouter.js";
import {GoogleOAuthRouter} from "../routes/backend/auth/GoogleOAuthRouter.js";
import {GoogleOAuth2Router} from "../routes/backend/auth/GoogleOAuth2Router.js";
import {RootRouter} from "../routes/backend/RootRouter.js";
import {CategoryRouter} from "../routes/backend/model/content/CategoryRouter.js";
import {PageRouter} from "../routes/backend/model/content/PageRouter.js";
import {FileRouter} from "../routes/backend/model/content/FileRouter.js";
import {TagRouter} from "../routes/backend/model/content/TagRouter.js";
import {RoleRouter} from "../routes/backend/model/user/RoleRouter.js";
import {OptionsRouter} from "../routes/backend/model/OptionsRouter.js";
import {BackendRoutesEnum} from "../messages/enums/BackendRoutesEnum.js";

export class BackendServerService extends ServerService {

    private database: DBService = new DBService();

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
        this.app.use(BackendRoutesEnum.API_URL, new RootRouter().getRootRouter());

        // HealthCheck
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.HEALTH_CHECK, new HealthCheckRouter().getHealthCheckRouter());

        // Models
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.USERS, new UsersRouter().getRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.ROLE, new RoleRouter().getRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.CONTENT + BackendRoutesEnum.ARTICLES, new ArticlesRouter().getRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.CONTENT + BackendRoutesEnum.FILES, new FilesRouter().getFileRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.CONTENT + BackendRoutesEnum.CATEGORY, new CategoryRouter().getRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.CONTENT + BackendRoutesEnum.PAGE, new PageRouter().getRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.CONTENT + BackendRoutesEnum.FILE, new FileRouter().getRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.CONTENT + BackendRoutesEnum.TAG, new TagRouter().getRouter());

        // Auth
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.AUTH + BackendRoutesEnum.LOCAL_AUTH, new LocalAuthRouter().getLocalAuthRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.AUTH + BackendRoutesEnum.FACEBOOK_AUTH, new FacebookAuthRouter().getFacebookAuthRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.AUTH + BackendRoutesEnum.TWITTER_AUTH, new TwitterAuthRouter().getTwitterAuthRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.AUTH + BackendRoutesEnum.GOOGLE_OAUTH, new GoogleOAuthRouter().getGoogleOAuthRouter());
        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.AUTH + BackendRoutesEnum.GOOGLE_OAUTH2, new GoogleOAuth2Router().getGoogleOAuth2Router());

        this.app.use(BackendRoutesEnum.API_URL + BackendRoutesEnum.OPTIONS, new OptionsRouter().getRouter());
    }

    
}