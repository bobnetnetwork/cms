/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import {ErrorMiddleware} from "./middleware/ErrorMiddleware.js";
import {NotFoundHandler} from "./middleware/NotFoundMiddleware.js";
import {ServerService} from "./service/ServerService.js";
import {FrontendServerService} from "./service/FrontendServerService.js";
import {BackendServerService} from "./service/BackendServerService.js";
import {DashboardServerService} from "./service/DashboardServerService.js";
import express, {Express} from "express";
import session from "express-session";
import "./config/passport.js";
import {LogService} from "./service/tool/LogService.js";
import {Logger} from "log4js";
import dotenv from "dotenv";
import {EnvironmentRequiredException} from "./exception/environment/EnvironmentRequiredException.js";


class Server {
    private log: Logger = new LogService().getLogger("Server");

    private app: Express = express();

    

    private serverType!: string;

    private server!: ServerService;

    constructor() {
        if (process.env.NODE_ENV !== "production") {
            dotenv.config();
        }

        if(process.env.APP_TYPE) {
            this.serverType = process.env.APP_TYPE;
        } else {
            const err = new EnvironmentRequiredException("APP_PORT");
            this.log.error(err.message.toString());
            this.log.debug(err.stack);
            process.exit(1);
        }

        

        this.init();
    }

    public start(): void {
       this.server.startServer();
    }

    public shutDown(message: string): void {
        this.server.shutDown(message);
    }

    private init(): void {
        switch(this.serverType){
            case "backend":
                this.initBackend();
                break;
            case "frontend":
                this.initFrontend();
                break;
            case "dashboard":
                this.initDashboard();
                break;
            default:
                this.log.error("Nem megfelelő szervertípús!"); // TODO: átírni
        }
        
    }

    private initBackend() {
        this.server = new BackendServerService(this.app);
        this.log.info("Starting Application...");
        this.log.info("App version: " + process.env.npm_package_version);
        this.log.info(process.env.npm_package_description);
        this.log.info("Home page: " + process.env.npm_package_homepage);
        this.log.info("Issues Management: " + process.env.npm_package_bugs_url);

        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());

        this.server.setRouters();

        const sessionOptions = {
            cookie: { maxAge: 60000 },
            resave: false,
            saveUninitialized: false,
            secret: "passport-tutorial",
        };

        this.app.use(session(sessionOptions));

        //this.app.use(new ErrorMiddleware().getHandler());
        //this.app.use(new NotFoundHandler().getHandler());

        this.app.use(fileUpload({
            createParentPath: true,
        }));
    }

    private initFrontend() {
        this.server = new FrontendServerService(this.app);
    }

    private initDashboard() {
        this.server = new DashboardServerService(this.app);
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
