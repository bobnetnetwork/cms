import mongoose from "mongoose";
import dotenv from "dotenv";
import {LogService} from "./tool/LogService.js";
import {Logger} from "log4js";
import {EnvironmentRequiredException} from "../exception/environment/EnvironmentRequiredException.js";

export class DBService {
    private readonly USER: string;
    private readonly PWD: string;
    private readonly TYPE: string;
    private readonly PORT: number;
    private readonly ADDRESS: string;
    private readonly DATABASE: string;

    private log: Logger = new LogService().getLogger("dbService");

    private connection: mongoose.Connection | undefined;
    private readonly dbUri: string;

    constructor() {
         if (process.env.NODE_ENV !== "production") {
             dotenv.config();
         }

         if(process.env.DB_SERVER_USER) {
             this.USER = process.env.DB_SERVER_USER;
         } else {
             const err = new EnvironmentRequiredException("DB_SERVER_USER");
             this.log.error(err.message.toString());
             this.log.debug(err.stack);
             process.exit(1);
         }

         if(process.env.DB_SERVER_PWD) {
             this.PWD = process.env.DB_SERVER_PWD;
         } else {
             const err = new EnvironmentRequiredException("DB_SERVER_PWD");
             this.log.error(err.message.toString());
             this.log.debug(err.stack);
             process.exit(1);
         }

         if(process.env.DB_SERVER_TYPE) {
             this.TYPE = process.env.DB_SERVER_TYPE;
         } else {
             const err = new EnvironmentRequiredException("DB_SERVER_TYPE");
             this.log.error(err.message.toString());
             this.log.debug(err.stack);
             process.exit(1);
         }

         if(process.env.DB_SERVER_PORT) {
             this.PORT = parseInt(process.env.DB_SERVER_PORT, 10);
         } else {
             const err = new EnvironmentRequiredException("DB_SERVER_PORT");
             this.log.error(err.message.toString());
             this.log.debug(err.stack);
             process.exit(1);
         }

         if(process.env.DB_SERVER_ADDRESS) {
             this.ADDRESS = process.env.DB_SERVER_ADDRESS;
         } else {
             const err = new EnvironmentRequiredException("DB_SERVER_ADDRESS");
             this.log.error(err.message.toString());
             this.log.debug(err.stack);
             process.exit(1);
         }

         if(process.env.DB_SERVER_DATABASE) {
             this.DATABASE = process.env.DB_SERVER_DATABASE;
         } else {
             const err = new EnvironmentRequiredException("DB_SERVER_DATABASE");
             this.log.error(err.message.toString());
             this.log.debug(err.stack);
             process.exit(1);
         }

         this.dbUri = this.getDBUri();
    }

    public connectToDB(): void {
        try {
            mongoose.connect(this.dbUri, {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
            this.connection = mongoose.connection;
            this.connection.once("open", async () => {
                this.log.info("Connected to database");
            });
            this.connection.on("error", () => {
                this.log.error("Error connecting to database");
            });
        } catch (e) {
            this.log.error(e.message);
            this.log.debug(e.stack);
            process.exit(1);
        }
    }

    public disconnect(): void {
        if (!this.connection) {
            return;
        }
        mongoose.disconnect();
    }

    private getDBUri(): string{
        return "mongodb://" + this.USER + ":" + this.PWD + "@" + this.ADDRESS + ":" + this.PORT + "/" + this.DATABASE;
    }
}
