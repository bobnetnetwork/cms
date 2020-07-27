/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as UserService from "../entity/user/users.service";

/**
 * Router Definition
 */

export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET users/

usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        await UserService.findAll((result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// GET users/:id

usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        await UserService.findById(id, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/

usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        await UserService.create(req.body.data, (result) => {
            res.status(201).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT users/

usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        await UserService.update(req.body.data, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE users/:id

usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await UserService.deleteById(req.params.id, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});