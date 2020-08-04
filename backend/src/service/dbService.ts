import mongoose from "mongoose";
import * as Logger from "../service/logService.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const USER: string = process.env.DB_SERVER_USER;
const PWD: string = process.env.DB_SERVER_PWD
const TYPE: string = process.env.DB_SERVER_TYPE;
const PORT: number = parseInt(process.env.DB_SERVER_PORT as string);
const ADDRESS: string = process.env.DB_SERVER_ADDRESS;
const DATABASE: string = process.env.DB_SERVER_DATABASE;

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
