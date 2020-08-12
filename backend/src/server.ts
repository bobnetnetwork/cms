/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import {usersRouter} from "./routes/users.router.js";
import {articlesRouter} from "./routes/articles.router.js";
import {healthCheckRouter} from "./routes/healthCheck.router.js";
import {errorHandler} from "./middleware/error.middleware.js";
import {notFoundHandler} from "./middleware/notFound.middleware.js";
import * as server from "./service/serverService.js";
import express, {Request, Response} from "express";
import session from "express-session";
import "./config/passport.js";
import * as Logger from "./service/logService.js";

Logger.info("Starting Application...");
Logger.info("App version: " + process.env.npm_package_version);

/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */
const router = express.Router();

const API_URL = "/api/v01";
const HEALTH_CHECK = API_URL + "/health-check";
const USERS = API_URL + "/users";
const ARTICLES = API_URL + "/content/articles";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(API_URL, router);
app.use(HEALTH_CHECK, healthCheckRouter);
app.use(USERS, usersRouter);
app.use(ARTICLES, articlesRouter);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(errorHandler);
app.use(notFoundHandler);

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to CMS_DEV server by BobNET Network!"
    });
})

server.startServer(app);

process.on('SIGTERM', () => {
    server.shutDown("SIGTERM signal received.");
});

process.on('SIGINT', () =>{
    server.shutDown("SIGINT signal received.");
});

process.on('SIGQUIT', () => {
    server.shutDown("SIGQUIT signal received.");
});