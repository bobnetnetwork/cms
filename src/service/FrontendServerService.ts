import { ServerService } from './ServerService.js';
import express, {Express} from "express";
import path from 'path';
import mustacheExpress from "mustache-express";


export class FrontendServerService extends ServerService {

    constructor(app: Express) {
        super("FrontendServerService", app);
        this.app.engine('mustache', mustacheExpress());
        this.app.set('views', path.resolve()+ '\\src\\views\\frontend');
        this.app.use(express.static(path.resolve()+ '\\node_modules\\startbootstrap-modern-business'));
        this.app.set('view engine', 'mustache');
    }

    public openConnections(): void {

    }

    public closeConnections(): void {

    }

    public setRouters(): void {
        
    }

}