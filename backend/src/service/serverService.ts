import * as HTTPS from "https";
import * as HTTP from "http";
import * as fs from "fs";
import dotenv from "dotenv";
import * as database from "./dbService.js"
import os from "os";
import {LogService} from "../service/logService.js";

const log = new LogService().getLogger("serverService");

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10);

export const startServer = (app) => {
    if (process.env.HTTPS_ENABLED === "true") {
        const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
        const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

        const credentials = {key: privateKey, cert: certificate};

        const httpsServer = HTTPS.createServer(credentials, app);
        httpsServer.listen(PORT);
        showConnectionAddresses("https");
    } else {
        const httpServer = HTTP.createServer(app);
        httpServer.listen(PORT);
        showConnectionAddresses("http");
    }
    log.info("pid is " + process.pid);
    connectToDB();
}

function connectToDB() {
    database.connectToDB()
}

function closeDBConnections() {
    database.disconnect();
}

export const shutDown = (msg) => {
    log.info(msg);
    log.info("Closing DB connection(s).")
    closeDBConnections();
    log.info("Closing http(s) server.")
    process.exit(0);
}

function showConnectionAddresses(serverType) {
    const networkInterfaces = os.networkInterfaces();
    log.info("Server started at:");
    log.info(serverType + "://localhost:" + PORT);
    log.info(serverType + "://" + os.hostname() + ":" + PORT);

    for (const name of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                log.info(serverType + "://" + net.address + ":" + PORT);
            }
        }
    }
}