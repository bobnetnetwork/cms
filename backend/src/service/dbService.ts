
import * as Mongoose from "mongoose";
// @ts-ignore
import * as Config from "../config/config";
let connection;
const dbUri = 'mongodb://' + Config.dbServerUser + ":" + Config.dbServerPwd + '@' + Config.dbServerAddress + ":" + Config.dbServerPort + '/' + Config.dbServerDataBase;
const dbUriWithoutDB = 'mongodb://' + Config.dbServerUser + ":" + Config.dbServerPwd + '@' + Config.dbServerAddress + ":" + Config.dbServerPort

export const connectToDB = () => {
    Mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    connection = Mongoose.connection;
    connection.once("open", async () => {
        console.log("Connected to database");
    });
    connection.on("error", () => {
        console.log("Error connecting to database");
    });
}

export const findAll = (collection) => {
    Mongoose.connect(dbUriWithoutDB, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, (err, db) => {
        if (err) throw err;
        const dbo = db.db(Config.dbServerDataBase);
        dbo.collection(collection).find({}).toArray((err1, result) => {
            if (err1) throw err1;
            console.log(result);
            db.close();
            return result;
        });
    });
}

export const find = (collection, queryArray) => {
    Mongoose.connect(dbUriWithoutDB, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, (err, db) => {
        if (err) throw err;
        const dbo = db.db(Config.dbServerDataBase);
        dbo.collection(collection).find(queryArray).toArray((err1, result) => {
            if (err1) throw err1;
            console.log(result);
            db.close();
            return result;
        });
    });
}

export const disconnect = () => {
    if (!connection) {
        return;
    }
    Mongoose.disconnect();
};