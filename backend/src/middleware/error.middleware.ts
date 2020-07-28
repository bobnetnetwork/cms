import HttpException from "../common/http-exception";
import {NextFunction, Request, Response} from "express";
import * as Logger from "../service/logService.js";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || 500;
    const message =
        error.message || "It's not you. It's us. We are having some problems.";
    Logger.error(error.message);

    response.status(status).send(message);
};
