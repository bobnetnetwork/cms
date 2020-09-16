import { ServerService } from './ServerService.js';
import express, {Express} from "express";
import {DashboardRouter} from "../routes/dashboard/DashboardRouter.js";
import mustacheExpress from "mustache-express";
import path from 'path';
import fetch from "node-fetch";
import http from "http";
import axios from "axios";
import {Article} from "../model/content/Article.js"
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
            const url: string = 'http://10.9.110.111:9421/api/v01/content/articles';

            try {
                const response = await axios.get(url);
                var cikkek:[Article] = response.data.content;

                res.render('cikkek', { articles: cikkek});


            } catch (exception) {
                process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
            }
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