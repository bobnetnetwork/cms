import * as HTTPS from "https";
import * as HTTP from "http";
import * as fs from "fs";
import dotenv from "dotenv";
import * as database from "./dbService.js"
import os from "os";
import {LogService} from "./LogService";

export class ServerService {

    private log = new LogService().getLogger("serverService");
    private PORT: number = parseInt(process.env.APP_PORT as string, 10);

    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            dotenv.config();
        }
    }

    public startServer(app) {
        if (process.env.HTTPS_ENABLED === "true") {
            const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
            const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

            const credentials = {key: privateKey, cert: certificate};

            const httpsServer = HTTPS.createServer(credentials, app);
            httpsServer.listen(this.PORT);
            this.showConnectionAddresses("https");
        } else {
            const httpServer = HTTP.createServer(app);
            httpServer.listen(this.PORT);
            this.showConnectionAddresses("http");
        }
        this.log.info("pid is " + process.pid);
        this.connectToDB();
    }

    public shutDown(msg) {
        this.log.info(msg);
        this.log.info("Closing DB connection(s).")
        this.closeDBConnections();
        this.log.info("Closing http(s) server.")
        process.exit(0);
    }

    private connectToDB() {
        database.connectToDB()
    }

    private closeDBConnections() {
        database.disconnect();
    }

    private showConnectionAddresses(serverType) {
        const networkInterfaces = os.networkInterfaces();
        this.log.info("Server started at:");
        this.log.info(serverType + "://localhost:" + this.PORT);
        this.log.info(serverType + "://" + os.hostname() + ":" + this.PORT);

        for (const name of Object.keys(networkInterfaces)) {
            for (const net of networkInterfaces[name]) {
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    this.log.info(serverType + "://" + net.address + ":" + this.PORT);
                }
            }
        }
    }
}
