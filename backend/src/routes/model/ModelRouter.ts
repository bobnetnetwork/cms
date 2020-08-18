import {Logger} from "log4js";
import express, {Router, Request, Response} from "express";
import {IModelService} from "../../service/model/IModelService.js";
import {LogService} from "../../service/tool/LogService.js";

export abstract class ModelRouter {
    protected router: Router = express.Router();
    protected log: Logger
    protected abstract service: IModelService;

    protected constructor(loggerCategory: string) {
        this.log = new LogService().getLogger(loggerCategory);
        this.getAll();
        this.create();
        this.update();
    }

    public getRouter(): Router {
        return this.router;
    }

    protected getAll(): void {
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

    protected create(): void {
        this.router.post("/", async (req: Request, res: Response) => {
            try {
                await this.service.create(req.body, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        const type = req.body.type;
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
    };

    protected update(): void {
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
    };

    protected abstract delete(): void;

    protected abstract get(): void;
}
