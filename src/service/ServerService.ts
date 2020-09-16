import * as HTTPS from "https";
import * as HTTP from "http";
import * as fs from "fs";
import {LogService} from "./tool/LogService.js";
import {Logger} from "log4js";
import dotenv from "dotenv";
import {EnvironmentRequiredException} from "../exception/environment/EnvironmentRequiredException.js";
import os from "os";
import {Express} from "express";

export abstract class ServerService {

    protected log!: Logger;
    protected readonly PORT!: number;
    protected app!: Express;

    constructor(className: string, app: Express) {
        this.log = new LogService().getLogger(className);
        this.app = app;
        if (process.env.NODE_ENV !== "production") {
            dotenv.config();
        }

        if(process.env.APP_PORT) {
            this.PORT = parseInt(process.env.APP_PORT, 10);
        } else {
            const err = new EnvironmentRequiredException("APP_PORT");
            this.log.error(err.message.toString());
            this.log.debug(err.stack);
            process.exit(1);
        }
    }

    protected showConnectionAddresses(serverType: string): void {
        const networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]> = os.networkInterfaces();
        this.log.info("Server started at:");
        this.log.info(serverType + "://localhost:" + this.PORT);
        this.log.info(serverType + "://" + os.hostname() + ":" + this.PORT);

        for(const [key, value] of Object.entries(networkInterfaces)) {
           if(value) {
               for(const net of value) {
                   // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                   if (net.family === "IPv4" && !net.internal) {
                       this.log.info(serverType + "://" + net.address + ":" + this.PORT);
                   }
               }
           }
        }
    }

    public startServer(): void {
        try {
            if (process.env.HTTPS_ENABLED === "true") {
                const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
                const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

                const credentials = {key: privateKey, cert: certificate};

                const httpsServer = HTTPS.createServer(credentials, this.app);
                httpsServer.listen(this.PORT);
                this.showConnectionAddresses("https");
            } else {
                const httpServer = HTTP.createServer(this.app);
                httpServer.listen(this.PORT);
                this.showConnectionAddresses("http");
            }
            this.log.info("pid is " + process.pid);
            this.openConnections();
        } catch (e) {
            this.log.error(e.message);
            this.log.debug(e.stack);
        }
    }

    public shutDown(msg: string): void {
        this.log.info(msg);
        this.closeConnections();
        this.log.info("Closing http(s) server.");
        process.exit(0);
    }

    protected abstract openConnections(): void;
    protected abstract closeConnections(): void;
    public abstract setRouters(): void;
}
