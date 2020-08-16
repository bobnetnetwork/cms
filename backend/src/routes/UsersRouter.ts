/**
 * Required External Modules and Interfaces
 */

import express, {NextFunction, Request, Response} from "express";
import {UsersService} from "../service/user/UsersService.js";
import {auth} from "./auth.js";
import passport from "passport";
import {LogService} from "../service/LogService.js";

export class UsersRouter {

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
    }

    /**
     * Controller Definitions
     */

    // GET users/
    private getUsers() {
        this.usersRouter.get("/", async (req: Request, res: Response) => {
            try {
                await this.userService.findAll((result: any) => {
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

    // GET users/:username
    private getUser() {
        this.usersRouter.get("/:username", async (req: Request, res: Response) => {
            try {
                await this.userService.findByUserName(req.params.username, (result: any) => {
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

    // POST users/
    private createUser() {
        this.usersRouter.post("/", async (req: Request, res: Response) => {
            try {
                await this.userService.create(req.body, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("User (" + req.body.userName + ") creation is Successful!");
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

    // PUT users/
    private updateUser(){
        this.usersRouter.put("/", async (req: Request, res: Response) => {
            try {
                await this.userService.update(req.body, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("User (" + req.body.userName + ") updated!")
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

    // DELETE users/:username
    private deleteUser(){
        this.usersRouter.delete("/:username", async (req: Request, res: Response) => {
            try {
                await this.userService.deleteByUserName(req.params.username, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("User (" + req.body.userName + ") deleted!");
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

    // POST login route (optional, everyone has access)
    private login(){
        this.usersRouter.post('/login', auth.optional, (req: Request, res:Response, next: NextFunction) => {
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

            return passport.authenticate('local', { session: false }, (err: any, passportUser) => {
                if(err) {
                    this.log.error(err.message);
                    this.log.debug(err.stack);
                    return next(err);
                }

                if(passportUser) {
                    const ppUser = passportUser;
                    ppUser.token = passportUser.generateJWT();

                    return res.json({ user: ppUser.toAuthJSON() });
                }

                return res.sendStatus(400);
            })(req, res, next);
        });
    }
}