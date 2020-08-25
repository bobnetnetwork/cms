import {Request, Response} from "express";
import {LogService} from "../service/tool/LogService.js";
import {Logger} from "log4js";

export class NotFoundHandler {
    private log: Logger = new LogService().getLogger("notFoundMiddleware");

    private readonly handler: any;

    constructor() {
        this.handler = (
            request: Request,
            response: Response,
    ) => {

            const message = "Resource not found";
            this.log.error(message);

            response.status(404).send(message);
        };
    }

    public getHandler(): any {
        return this.handler;
    }
}
