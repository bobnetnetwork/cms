import { ServerService } from './ServerService.js';
import express, {Express} from "express";
import mustacheExpress from "mustache-express";
import path from 'path';
import {ArticlesRoute} from "../routes/dashboard/ArticlesRoute.js";
import {DashboardRoutesEnum} from "../messages/enums/DashboardRoutesEnum.js";

export class DashboardServerService extends ServerService {

    constructor(app: Express) {
        super("DashboardServerService", app);
        this.app.engine('mustache', mustacheExpress());
        this.app.set('views', path.resolve()+ '\\src\\views\\dashboard');
        this.app.use(express.static(path.resolve()+ '\\node_modules\\admin-lte'));
        this.app.set('view engine', 'mustache');
        this.setRouters();
    }

    public openConnections(): void {

    }

    public closeConnections(): void {

    }

    public setRouters(): void {
        this.app.use(DashboardRoutesEnum.ARTICLES,  new ArticlesRoute().getRouter());
        /*this.app.use(DashboardRoutesEnum.CATEGORIES);
        this.app.use(DashboardRoutesEnum.TAGS);
        this.app.use(DashboardRoutesEnum.PAGES);
        this.app.use(DashboardRoutesEnum.MEDIA);
        this.app.use(DashboardRoutesEnum.USERS);
        this.app.use(DashboardRoutesEnum.ROLES);
        this.app.use(DashboardRoutesEnum.SETTINGS);*/
    }

}