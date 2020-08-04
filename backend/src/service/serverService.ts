import * as HTTPS from "https";
import * as HTTP from "http";
import * as Logger from "../service/logService.js";
import * as fs from "fs";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const PORT: number = parseInt(process.env.APP_PORT as string);

export const startServer = (app) => {
    if (JSON.parse(process.env.HTTPS_ENABLED)) {
        const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
        const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

        const credentials = {key: privateKey, cert: certificate};

        const httpsServer = HTTPS.createServer(credentials, app);
        httpsServer.listen(PORT);
        Logger.info("Server started at https://localhost:" + PORT);
    } else {
        const httpServer = HTTP.createServer(app);
        httpServer.listen(PORT);
        Logger.info("Server started at http://localhost:" + PORT);
    }
}

export const shutDown = () => {
    process.exit();
}
