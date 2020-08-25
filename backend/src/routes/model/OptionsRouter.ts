import express, {Request, Response, Router} from "express";
import {LogService} from "../../service/tool/LogService.js";
import {Logger} from "log4js";
import {OptionsService} from "../../service/model/OptionsService.js";

export class OptionsRouter {

    private router: Router = express.Router();
    private log: Logger = new LogService().getLogger("OptionsRouter");
    private service: OptionsService = new OptionsService();

    constructor() {
        this.getAll();
        this.get();
        this.create();
        this.update();
        this.delete();
    }

    public getRouter(): Router {
        return this.router;
    }

    private getAll(): void {
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                await this.service.findAll( (result: any) => {
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

    private get(): void {
        this.router.get("/:name", async (req: Request, res: Response) => {
            try {
                await this.service.findByName(req.params.name, (result: any) => {
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

    private create(): void {
        this.router.post("/", async (req: Request, res: Response) => {
            try {
                await this.service.create(req.body, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("Creation is Successful!");
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

    private update(): void {
        this.router.put("/", async (req: Request, res: Response) => {
            try {
                await this.service.update(req.body, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("Update successful!");
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

    private delete(): void {
        this.router.delete("/:name", async (req: Request, res: Response) => {
            try {
                await this.service.deleteByName(req.params.name, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("Content deleted!");
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
}