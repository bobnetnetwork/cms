import {NextFunction, Request, Response} from "express";
import {UsersService} from "../../../service/model/user/UsersService.js";
import {auth} from "./auth.js";
import passport from "passport";
import {ModelRouter} from "../ModelRouter.js";

export class UsersRouter extends ModelRouter {
    protected service: UsersService = new UsersService();

    constructor() {
        super("UsersRouter");
        this.get();
        this.delete();
        this.login();
    }

    // GET users/:username
    protected get(): void {
        this.router.get("/:username", async (req: Request, res: Response) => {
            try {
                await this.service.findByUserName(req.params.username, (result: any) => {
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

    // DELETE users/:username
    protected delete(): void {
        this.router.delete("/:username", async (req: Request, res: Response) => {
            try {
                await this.service.deleteByUserName(req.params.username, (result: any) => {
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
                this.log.error(e.message);
                this.log.debug(e.stack);
                res.status(500).send(e.message);
            }
        });
    }

    // POST login route (optional, everyone has access)
    private login(): void {
        this.router.post("/login", auth.optional, (req: Request, res: Response, next: NextFunction) => {
            const { body: { user } } = req;

            if(!user.email) {
                return res.status(422).json({
                    errors: {
                        email: "is required",
                    },
                });
            }

            if(!user.password) {
                return res.status(422).json({
                    errors: {
                        password: "is required",
                    },
                });
            }

            return passport.authenticate("local", { session: false }, (err: any, passportUser) => {
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
