/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import {UsersRouter} from "./routes/UsersRouter.js";
import {ArticlesRouter} from "./routes/ArticlesRouter.js";
import {HealthCheckRouter} from "./routes/HealthCheckRouter.js";
import {FilesRouter} from "./routes/FilesRouter.js";
import {errorHandler} from "./middleware/errorMiddleware.js";
import {notFoundHandler} from "./middleware/notFoundMiddleware.js";
import {ServerService} from "./service/ServerService.js";
import express, {Request, Response} from "express";
import session from "express-session";
import "./config/passport.js";
import {LogService} from "./service/LogService.js";

class Server {
    private log = new LogService().getLogger("server");

    private app = express();
    private router = express.Router();

    private API_URL = "/api/v01";
    private HEALTH_CHECK = this.API_URL + "/health-check";
    private USERS = this.API_URL + "/users";
    private ARTICLES = this.API_URL + "/content/articles";
    private FILES = this.API_URL + "/files";

    private server = new ServerService();

    constructor() {
        this.init();
    }

    private init() {
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
            secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false
        };

        this.app.use(session(sessionOptions));

        this.app.use(errorHandler);
        this.app.use(notFoundHandler);

        this.app.use(fileUpload({
            createParentPath: true
        }));

        this.getRootPath();
    }

    public start() {
       this.server.startServer(this.app);
    }

    private getRootPath() {
        this.router.get('/', async (req: Request, res: Response) => {
            res.status(200).json({
                message: "Welcome to CMS_DEV server by BobNET Network!"
            });
        })
    }

    public shutDown(message: string) {
        this.server.shutDown(message);
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