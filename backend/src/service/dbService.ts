import mongoose from "mongoose";
import { Config } from "../config/config.js";
import * as Logger from "../service/logService.js";

let connection;
const dbUri = "mongodb://" + Config.dbServerUser + ":" + Config.dbServerPwd + "@" + Config.dbServerAddress + ":" + Config.dbServerPort + "/" + Config.dbServerDataBase;

export const connectToDB = () => {
    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    connection = mongoose.connection;
    connection.once("open", async () => {
        Logger.info("Connected to database");
    });
    connection.on("error", () => {
        Logger.error("Error connecting to database");
    });
}

export const disconnect = () => {
    if (!connection) {
        return;
    }
    mongoose.disconnect();
};
