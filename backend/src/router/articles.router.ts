/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import * as ArticleService from "../service/content/articles.service.js";
import * as Logger from "../service/logService.js";

/**
 * Router Definition
 */

export const articlesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET articles/

articlesRouter.get("/", async (req: Request, res: Response) => {
    try {
        await ArticleService.findAll((result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
        Logger.error(e.message);
    }
});