/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response, Router} from "express";
import {ArticlesService} from "../service/content/ArticlesService.js";
import {LogService} from "../service/LogService.js";
import {Logger} from "log4js";

export class ArticlesRouter {

    /**
     * Router Definition
     */

    private articlesRouter: Router = express.Router();

    private log: Logger = new LogService().getLogger("articlesRouter");

    private articlesService: ArticlesService = new ArticlesService();

    constructor() {
        this.getArticles();
        this.getArticle();
        this.createArticle();
    }

    public getArticleRouter(): Router{
        return this.articlesRouter;
    }

    /**
     * Controller Definitions
     */

    // GET articles/
    private getArticles(): void {
            this.articlesRouter.get("/", async (req: Request, res: Response) => {
                try {
                    await this.articlesService.findAll((result: any) => {
                        if(result.error) {
                            this.log.error(result.error.message);
                            this.log.debug(result.error.stack);
                            res.status(404).json(result);
                        } else {
                            res.status(200).json(result);
                        }
                    });
                } catch (e) {
                    res.status(404).send(e.message);
                    this.log.error(e.message);
                    this.log.debug(e.stack);
                }
            });
    }

    // GET articles/:slug
    private getArticle(): void {
        this.articlesRouter.get("/:slug", async (req: Request, res: Response) => {
            try {
                await this.articlesService.findBySlug(req.params.slug, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(404).json(result);
                    } else {
                        res.status(200).json(result);
                    }
                });
            } catch (e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }

    // POST articles/
    private createArticle(): void {
        this.articlesRouter.post("/", async (req: Request, res: Response) => {
            try {
                await this.articlesService.create(req.body, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("Article (" + req.body.title + ") creation is Successful!");
                        res.status(200).json(result);
                    }
                });
            } catch (e) {
                res.status(500).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }
}
