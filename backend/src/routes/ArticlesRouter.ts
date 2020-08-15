/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import {ArticlesService} from "../service/content/ArticlesService.js";
import {LogService} from "../service/LogService.js";

export class ArticlesRouter {

    /**
     * Router Definition
     */

    private articlesRouter = express.Router();

    private log = new LogService().getLogger("articlesRouter");

    private articlesService = new ArticlesService();

    public getArticleRouter(){
        return this.articlesRouter;
    }

    constructor() {
        this.getArticles();
        this.getArticle();
        this.createArticle();
    }

    /**
     * Controller Definitions
     */

    // GET articles/
    private getArticles() {
            this.articlesRouter.get("/", async (req: Request, res: Response) => {
                try {
                    await this.articlesService.findAll((result) => {
                        res.status(200).json(result);
                    });
                } catch (e) {
                    res.status(404).send(e.message);
                    this.log.error(e.message);
                    this.log.debug(e.stack);
                }
            });
    }

    // GET articles/:slug
    private getArticle() {
        this.articlesRouter.get("/:slug", async (req: Request, res: Response) => {
            try {
                await this.articlesService.findBySlug(req.params.slug, (result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }

    // POST articles/
    private createArticle() {
        this.articlesRouter.post("/", async (req: Request, res: Response) => {
            try {
                await this.articlesService.create(req.body, (result) => {
                    res.status(201).json(result);
                });
            } catch (e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }
// PUT articles/
/*
articlesRouter.put("/", async (req: Request, res: Response) => {
    try {
        await articlesService.update(req.body, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
        log.error(e.message);
    }
});*/

// DELETE articles/:slug
/*
articlesRouter.delete("/:slug", async (req: Request, res: Response) => {
    try {
        await articlesService.deleteBySlug(req.params.slug, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
        log.error(e.message);
    }
});*/
}
