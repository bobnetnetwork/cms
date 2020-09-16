import { ServerService } from './ServerService.js';
import {Express} from "express";

export class DashboardServerService extends ServerService {

    constructor(app: Express) {
        super("DashboardServerService", app);
    }

    public openConnections(): void {

    }

    public closeConnections(): void {

    }

    public setRouters(): void {
        
    }

}