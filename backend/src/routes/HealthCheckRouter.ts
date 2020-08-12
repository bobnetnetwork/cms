/**
 * Required External Modules and Interfaces
 */
import express, {NextFunction, Request, Response} from "express";
import os from "os";
import {LogService} from "../service/LogService.js";

export class HealthCheckRouter {
    /**
     * Router Definition
     */
    private healthCheckRouter = express.Router();

    private log = new LogService().getLogger("healthCheckRouter");

    public getHealthCheckRouter(){
        return this.healthCheckRouter;
    }

    constructor() {
        this.healthCheckGet();
    }

    /**
     * Controller Definitions
     */
    public healthCheckGet(){
        this.healthCheckRouter.get("/", async (req: Request, res: Response, _next: NextFunction) => {
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
            const healthCheck = {
                process: processData,
                os: osData,
                message: "OK",
                timestamp: Date.now(),
            };
            try {
                res.status(200).json(healthCheck);
            } catch (e) {
                this.log.error(e.message);
                healthCheck.message = e;
                res.status(503).json(healthCheck);
            }
        })
    }
}
