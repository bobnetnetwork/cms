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
        this.app.use(express.static(path.resolve()+ '\\src\\views\\dashboard\\assets'));
        this.app.set('view engine', 'mustache');

        this.app.get('/', function (req, res) {
            res.render('index', { name : 'Luk'});
        });

        this.app.get('/valami', function(req, res) {
            res.render('valami', {valami: 'valamik'});
        });

        
        this.app.get(DashboardRoutesEnum.ARTICLES, async function(req, res) {
                const articlesRoute = new ArticlesRoute("articles");
                articlesRoute.getRoute(req, res);
        });
    }

    public openConnections(): void {

    }

    public closeConnections(): void {

    }

    public setRouters(): void {
        //this.app.use("/valami", new DashboardRouter().getDashboardRouter());
    }

}