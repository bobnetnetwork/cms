/**
 * Required External Modules and Interfaces
 */
import express, {NextFunction, Request, Response} from "express";
import * as Logger from "../service/logService.js";
import os from "os";

/**
 * Router Definition
 */
export const healthcheckRouter = express.Router();

/**
 * Controller Definitions
 */

// GET healthcheck/
// todo: auth.required
healthcheckRouter.get("/", async (req: Request, res: Response, _next: NextFunction) => {
    // todo: add further things to check (e.g. connecting to database)
    const processData = {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        resourceUsage: process.resourceUsage()
    }
    const osData = {
        loadavg: os.loadavg(),
        freeMem: os.freemem(),
        totalmem: os.totalmem(),
        uptime: os.uptime(),
        arch: os.arch(),
        cpus: os.cpus(),
        platform: os.platform(),
        hostname: os.hostname(),
        version: os.version(),
        networkInterfaces: os.networkInterfaces()
    }
    const healthcheck = {
        process: processData,
        os: osData,
        message: "OK",
        timestamp: Date.now(),
    };
    try {
        res.status(200).json(healthcheck);
    } catch (e) {
        Logger.error(e.message);
        healthcheck.message = e;
        res.status(503).json(healthcheck);
    }
});
