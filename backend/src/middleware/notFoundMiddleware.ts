import {Request, Response} from "express";
import {LogService} from "../service/LogService.js";

const log = new LogService().getLogger("notFoundMiddleware");

export const notFoundHandler = (
    request: Request,
    response: Response,
) => {

    const message = "Resource not found";
    log.error(message);

    response.status(404).send(message);
};
