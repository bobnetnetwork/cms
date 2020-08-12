/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import {usersRouter} from "./routes/users.router.js";
import {articlesRouter} from "./routes/articles.router.js";
import {errorHandler} from "./middleware/error.middleware.js";
import {notFoundHandler} from "./middleware/notFound.middleware.js";
import * as server from "./service/serverService.js";
import * as Logger from "./service/logService.js";
import express, {Request, Response} from "express";
import session from "express-session";
import "./config/passport.js";

/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */
const router = express.Router();

const apiUrl = "/api/v01";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiUrl, router);
app.use(apiUrl + "/users", usersRouter);
app.use(apiUrl + "/content/articles", articlesRouter);
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