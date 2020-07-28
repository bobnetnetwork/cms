/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import * as UserService from "../service/user/users.service.js";
import * as Logger from "../service/logService.js";

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


// GET users/:username

usersRouter.get("/:username", async (req: Request, res: Response) => {
    try {
        await UserService.findByUserName(req.params.username, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/

usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        await UserService.create(req.body, (result) => {
            res.status(201).json(result);
        });
    } catch (e) {
        res.status(404).send(e.message);
        Logger.error(e.message);
    }
});

// PUT users/

usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        await UserService.update(req.body, (result) => {
            res.status(200).json(result);
        });
    } catch (e) {
        res.status(500).send(e.message);
        Logger.error(e.message);
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
        Logger.error(e.message);
    }
});
