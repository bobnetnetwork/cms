/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item } from "./item.interface";
import { Items } from "./items.interface";

/**
 * Router Definition
 */

export const postsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET posts/

// @ts-ignore
postsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Items = await ItemService.findAll();

        res.status(200).send(items);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// GET posts/:id

// @ts-ignore
postsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await ItemService.find(id);

        res.status(200).send(item);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST posts/

// @ts-ignore
postsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: Item = req.body.item;

        await ItemService.create(item);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT posts/

// @ts-ignore
postsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const item: Item = req.body.item;

        await ItemService.update(item);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE posts/:id

// @ts-ignore
postsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ItemService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});