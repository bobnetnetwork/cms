import mongoose from "mongoose";
import dotenv from "dotenv";
import {LogService} from "./LogService.js";

export class DBService {
    private USER: string = process.env.DB_SERVER_USER;
    private PWD: string = process.env.DB_SERVER_PWD
    private TYPE: string = process.env.DB_SERVER_TYPE;
    private PORT: number = parseInt(process.env.DB_SERVER_PORT as string, 10);
    private ADDRESS: string = process.env.DB_SERVER_ADDRESS;
    private DATABASE: string = process.env.DB_SERVER_DATABASE;

    private log = new LogService().getLogger("dbService");

    private connection;
    private readonly dbUri;

    constructor() {
         if (process.env.NODE_ENV !== 'production') {
             dotenv.config();
         }
         this.dbUri = "mongodb://" + this.USER + ":" + this.PWD + "@" + this.ADDRESS + ":" + this.PORT + "/" + this.DATABASE;
    }

    public connectToDB() {
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
    }

    public disconnect() {
        if (!this.connection) {
            return;
        }
        mongoose.disconnect();
    }
}
