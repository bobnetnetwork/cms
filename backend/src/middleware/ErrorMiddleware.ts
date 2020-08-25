import {HttpException} from "../common/HttpException";
import {Request, Response} from "express";
import {LogService} from "../service/tool/LogService.js";
import {Logger} from "log4js";

export class ErrorMiddleware {
    private log: Logger = new LogService().getLogger("errorMiddleware");

    private readonly handler: any;

    constructor() {
        this.handler = (
            error: HttpException,
            request: Request,
            response: Response,
        ) => {
            const status = error.statusCode || 500;
            const message =
                error.message || "It's not you. It's us. We are having some problems.";
            this.log.error(error.message);
            this.log.debug(error.stack);

            response.status(status).send(message);
        };
    }

    public getHandler(): any {
        return this.handler;
    }
}
