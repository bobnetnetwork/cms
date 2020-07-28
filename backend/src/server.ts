/**
 * Required External Modules
 */

import cors from "cors";
import helmet from "helmet";
import {usersRouter} from "./router/users.router.js";
import {errorHandler} from "./middleware/error.middleware.js";
import {notFoundHandler} from "./middleware/notFound.middleware.js";
import * as server from "./service/serverService.js";
import express, {Request, Response} from "express";

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

app.use(errorHandler);
app.use(notFoundHandler);

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to CMS_DEV server by BobNET Network!"
    });
})

server.startServer(app);
