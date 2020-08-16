import mongoose from "mongoose";
import dotenv from "dotenv";
import {LogService} from "./LogService.js";

export class DBService {
    private readonly USER: string;
    private readonly PWD: string;
    private readonly TYPE: string;
    private readonly PORT: number;
    private readonly ADDRESS: string;
    private readonly DATABASE: string;

    private log = new LogService().getLogger("dbService");

    private connection: mongoose.Connection | undefined;
    private readonly dbUri: string;

    constructor() {
         if (process.env.NODE_ENV !== 'production') {
             dotenv.config();
         }

         if(process.env.DB_SERVER_USER) {
             this.USER = process.env.DB_SERVER_USER;
         } else {
             this.log.error("The DB_SERVER_USER environment is required!");
             process.exit(1);
         }

         if(process.env.DB_SERVER_PWD) {
             this.PWD = process.env.DB_SERVER_PWD;
         } else {
             this.log.error("The DB_SERVER_PWD environment is required!");
             process.exit(1);
         }

         if(process.env.DB_SERVER_TYPE) {
             this.TYPE = process.env.DB_SERVER_TYPE;
         } else {
             this.log.error("The DB_SERVER_TYPE environment is required!");
             process.exit(1);
         }

         if(process.env.DB_SERVER_PORT) {
             this.PORT = parseInt(process.env.DB_SERVER_PORT as string, 10);
         } else {
             this.log.error("The DB_SERVER_PORT environment is required!");
             process.exit(1);
         }

         if(process.env.DB_SERVER_ADDRESS) {
             this.ADDRESS = process.env.DB_SERVER_ADDRESS;
         } else {
             this.log.error("The DB_SERVER_ADDRESS environment is required!");
             process.exit(1);
         }

         if(process.env.DB_SERVER_DATABASE) {
             this.DATABASE = process.env.DB_SERVER_DATABASE;
         } else {
             this.log.error("The DB_SERVER_DATABASE environment is required!");
             process.exit(1);
         }

         this.dbUri = this.getDBUri();
    }

    private getDBUri(){
        return "mongodb://" + this.USER + ":" + this.PWD + "@" + this.ADDRESS + ":" + this.PORT + "/" + this.DATABASE;
    }

    public connectToDB() {
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

    public disconnect() {
        if (!this.connection) {
            return;
        }
        mongoose.disconnect();
    }
}
