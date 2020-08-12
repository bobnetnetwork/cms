import {NextFunction, Request, Response} from "express";
import {LogService} from "../service/logService.js";

const log = new LogService().getLogger("notFoundMiddleware");

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const message = "Resource not found";
    log.error(message);

    response.status(404).send(message);
};
