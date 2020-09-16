import * as HTTP from "http";

export interface ServerService {

    startServer(app: HTTP.RequestListener): void;
    shutDown(msg: string): void;
}
