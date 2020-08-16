/**
 * Required External Modules and Interfaces
 */
import express, {NextFunction, Request, Response, Router} from "express";
import os from "os";
import {LogService} from "../service/LogService.js";
import {Logger} from "log4js";

export class HealthCheckRouter {
    /**
     * Router Definition
     */
    private healthCheckRouter: Router = express.Router();

    private log: Logger = new LogService().getLogger("healthCheckRouter");

    constructor() {
        this.healthCheckGet();
    }

    public getHealthCheckRouter(): Router{
        return this.healthCheckRouter;
    }

    /**
     * Controller Definitions
     */
    private healthCheckGet(): void{
        this.healthCheckRouter.get("/", async (req: Request, res: Response, _next: NextFunction) => {
            const processData = {
                memoryUsage: process.memoryUsage(),
                resourceUsage: process.resourceUsage(),
                uptime: process.uptime(),
            }
            const osData = {
                arch: os.arch(),
                cpus: os.cpus(),
                freeMem: os.freemem(),
                hostname: os.hostname(),
                loadavg: os.loadavg(),
                networkInterfaces: os.networkInterfaces(),
                platform: os.platform(),
                totalmem: os.totalmem(),
                uptime: os.uptime(),
                version: os.version(),
            }
            const healthCheck = {
                message: "OK",
                os: osData,
                process: processData,
                timestamp: Date.now(),
            };
            try {
                res.status(200).json(healthCheck);
            } catch (e) {
                this.log.error(e.message);
                this.log.debug(e.stack);
                healthCheck.message = e;
                res.status(503).json(healthCheck);
            }
        });
    }
}
