/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import {UsersRouter} from "./routes/model/user/UsersRouter.js";
import {ArticlesRouter} from "./routes/model/content/ArticlesRouter.js";
import {HealthCheckRouter} from "./routes/model/tool/HealthCheckRouter.js";
import {FilesRouter} from "./routes/model/content/FilesRouter.js";
import {ErrorMiddleware} from "./middleware/ErrorMiddleware.js";
import {NotFoundHandler} from "./middleware/NotFoundMiddleware.js";
import {ServerService} from "./service/ServerService.js";
import express, {Express, Request, Response, Router} from "express";
import session from "express-session";
import "./config/passport.js";
import {LogService} from "./service/tool/LogService.js";
import {Logger} from "log4js";

class Server {
    private log: Logger = new LogService().getLogger("server");

    private app: Express = express();
    private router: Router = express.Router();

    private API_URL = "/api/v01";
    private HEALTH_CHECK: string = this.API_URL + "/health-check";
    private USERS: string = this.API_URL + "/users";
    private ARTICLES: string = this.API_URL + "/content/articles";
    private FILES: string = this.API_URL + "/files";

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

    private getRootPath(): void {
        this.router.get("/", async (req: Request, res: Response) => {
            res.status(200).json({
                message: "Welcome to CMS_DEV server by BobNET Network!",
            });
        });
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
        this.app.use(this.API_URL, this.router);
        this.app.use(this.HEALTH_CHECK, new HealthCheckRouter().getHealthCheckRouter());
        this.app.use(this.USERS, new UsersRouter().getUsersRouter());
        this.app.use(this.ARTICLES, new ArticlesRouter().getArticleRouter());
        this.app.use(this.FILES, new FilesRouter().getFileRouter());

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

        this.getRootPath();
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
