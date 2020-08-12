/**
 * Required External Modules and Interfaces
 */

import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {UsersService} from "../service/user/UsersService.js";
import {auth} from "./auth.js";
import passport from "passport";
import {LogService} from "../service/LogService.js";

export class UsersRouter {
    private Users = mongoose.model("Users");

    /**
     * Router Definition
     */

    private usersRouter = express.Router();
    private log = new LogService().getLogger("usersRouter");

    private userService = new UsersService();

    public getUsersRouter(){
        return this.usersRouter;
    }

    constructor() {
        this.getUsers();
        this.getUser();
        this.createUser();
        this.updateUser();
        this.deleteUser();
        this.login();
        this.getCurrent();
    }

    /**
     * Controller Definitions
     */

    // GET users/
    public getUsers() {
        this.usersRouter.get("/", async (req: Request, res: Response) => {
            await this.Users.findById(52)
                .then((user) => {
                    if(!user) {
                        res.status(400);
                    }
                    try {
                        this.userService.findAll((result) => {
                            res.status(200).json(result);
                        });
                    } catch (e) {
                        res.status(404).send(e.message);
                    }
                });
        });
    }

    // GET users/:username
    public getUser() {
        this.usersRouter.get("/:username", async (req: Request, res: Response) => {
            try {
                await this.userService.findByUserName(req.params.username, (result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(404).send(e.message);
            }
        });
    }

    // POST users/
    public createUser() {
        this.usersRouter.post("/", async (req: Request, res: Response) => {
            try {
                await this.userService.create(req.body, (result) => {
                    res.status(201).json(result);
                });
            } catch (e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
            }
        });
    }

    // PUT users/
    public updateUser(){
        this.usersRouter.put("/", async (req: Request, res: Response) => {
            try {
                await this.userService.update(req.body, (result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e.message);
                this.log.error(e.message);
            }
        });
    }

    // DELETE users/:id
    public deleteUser(){
        this.usersRouter.delete("/:id", async (req: Request, res: Response) => {
            try {
                await this.userService.deleteById(req.params.id, (result) => {
                    res.status(200).json(result);
                });
            } catch (e) {
                res.status(500).send(e.message);
                this.log.error(e.message);
            }
        });
    }

    // POST login route (optional, everyone has access)
    public login(){
        this.usersRouter.post('/login', auth.optional, (req, res, next) => {
            const { body: { user } } = req;

            if(!user.email) {
                return res.status(422).json({
                    errors: {
                        email: 'is required',
                    },
                });
            }

            if(!user.password) {
                return res.status(422).json({
                    errors: {
                        password: 'is required',
                    },
                });
            }

            return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
                if(err) {
                    return next(err);
                }

                if(passportUser) {
                    const user = passportUser;
                    user.token = passportUser.generateJWT();

                    return res.json({ user: user.toAuthJSON() });
                }

                return res.sendStatus(400);
            })(req, res, next);
        });
    }

    // GET current route (required, only authenticated users have access)
    public getCurrent(){
        this.usersRouter.get('/current', auth.required, (req, res, next) => {
            // const { payload: { id } } = req;

            /*return this.Users.findById(id).then((user) => {
                     if(!user) {
                         return res.sendStatus(400);
                     }
                     return res.json({ user: user.toAuthJSON() });
                 });*/
        });
    }
}