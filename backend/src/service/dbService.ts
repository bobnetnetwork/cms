import mongoose from "mongoose";
import dotenv from "dotenv";
import {LogService} from "../service/logService.js";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const USER: string = process.env.DB_SERVER_USER;
const PWD: string = process.env.DB_SERVER_PWD
const TYPE: string = process.env.DB_SERVER_TYPE;
const PORT: number = parseInt(process.env.DB_SERVER_PORT as string, 10);
const ADDRESS: string = process.env.DB_SERVER_ADDRESS;
const DATABASE: string = process.env.DB_SERVER_DATABASE;

const log = new LogService().getLogger("dbService");

let connection;
const dbUri = "mongodb://" + USER + ":" + PWD + "@" + ADDRESS + ":" + PORT + "/" + DATABASE;

export const connectToDB = () => {
    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    connection = mongoose.connection;
    connection.once("open", async () => {
        log.info("Connected to database");
    });
    connection.on("error", () => {
        log.error("Error connecting to database");
    });
}

export const disconnect = () => {
    if (!connection) {
        return;
    }
    mongoose.disconnect();
};
