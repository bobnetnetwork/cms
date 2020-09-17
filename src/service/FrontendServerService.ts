import { ServerService } from './ServerService.js';
import {Express} from "express";

export class FrontendServerService extends ServerService {

    constructor(app: Express) {
        super("FrontendServerService", app);
    }

    public openConnections(): void {

    }

    public closeConnections(): void {

    }

    public setRouters(): void {

    }

}