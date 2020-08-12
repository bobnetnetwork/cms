/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import * as ArticleService from "../service/content/articlesService.js";
import {LogService} from "../service/LogService.js";

/**
 * Router Definition
 */

export const articlesRouter = express.Router();

const log = new LogService().getLogger("articlesRouter");

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
        log.error(e.message);
    }
});

// GET articles/:slug

articlesRouter.get("/:slug", async (req: Request, res: Response) => {
    try {
        await ArticleService.findBySlug(req.params.slug, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST articles/

articlesRouter.post("/", async (req: Request, res: Response) => {
    try {
        await ArticleService.create(req.body, (result) => {
            res.status(201).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
        log.error(e.message);
    }
});

// PUT articles/
/*
articlesRouter.put("/", async (req: Request, res: Response) => {
    try {
        await ArticleService.update(req.body, (result) => {
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
        await ArticleService.deleteBySlug(req.params.slug, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
        log.error(e.message);
    }
});*/