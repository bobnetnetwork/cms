
import mongoose from "mongoose";
// @ts-ignore
import * as Config from "../config/config";
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
        console.log("Connected to database");
    });
    connection.on("error", () => {
        console.log("Error connecting to database");
    });
}

export const disconnect = () => {
    if (!connection) {
        return;
    }
    mongoose.disconnect();
};