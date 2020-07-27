/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as UserService from "../entity/user/users.service";
// @ts-ignore
import { User } from "./entity/user/user.interface";
// @ts-ignore
import { Users } from "./entity/user/users.interface";

/**
 * Router Definition
 */

export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET users/

// @ts-ignore
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: Users = await UserService.findAll();

        res.status(200).send(users);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// GET users/:id

// @ts-ignore
usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const user: User = await UserService.find(id);

        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/

// @ts-ignore
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.item;

        await UserService.create(user);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT users/

// @ts-ignore
usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.item;

        await UserService.update(user);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE users/:id

// @ts-ignore
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});