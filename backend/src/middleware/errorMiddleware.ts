import HttpException from "../common/HttpException";
import {NextFunction, Request, Response} from "express";
import {LogService} from "../service/LogService.js";

const log = new LogService().getLogger("errorMiddleware");

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
) => {
    const status = error.statusCode || 500;
    const message =
        error.message || "It's not you. It's us. We are having some problems.";
    log.error(error.message);
    log.debug(error.stack);

    response.status(status).send(message);
};
