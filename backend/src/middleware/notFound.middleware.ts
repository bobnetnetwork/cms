import {NextFunction, Request, Response} from "express";
import * as Logger from "../service/logService.js";

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const message = "Resource not found";
    Logger.error(message);

    response.status(404).send(message);
};
