/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { usersRouter } from './router/users.router';
import { postsRouter } from './router/posts.router';
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";
import * as server from './service/serverService';
import express, {Request, Response} from 'express';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

// https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-models-data-service/

const app = express();

/**
 *  App Configuration
 */
const router = express.Router();

const apiUrl = '/api/v01'

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiUrl, router);
app.use(apiUrl + '/users', usersRouter);
app.use(apiUrl + 'content/posts', postsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to CMS_DEV server by BobNET Network!'
    });
})





server.startServer(app);
