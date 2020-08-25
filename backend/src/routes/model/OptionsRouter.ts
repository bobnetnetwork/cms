import express, {Request, Response, Router} from "express";
import {LogService} from "../../service/tool/LogService.js";
import {Logger} from "log4js";
import {OptionsService} from "../../service/model/OptionsService.js";
import { ModelRouter } from "./ModelRouter.js";

export class OptionsRouter extends ModelRouter {

    protected router: Router = express.Router();
    protected log: Logger;
    protected service: OptionsService = new OptionsService();

    constructor() {
        super("OptionsRouter");
        this.log = new LogService().getLogger("OptionsRouter");
        this.get();
        this.delete();
    }

    protected get(): void {
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

    protected delete(): void {
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