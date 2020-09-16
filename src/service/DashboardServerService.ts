import { ServerService } from './ServerService.js';
import express, {Express} from "express";
import {DashboardRouter} from "../routes/dashboard/DashboardRouter.js";
import mustacheExpress from "mustache-express";
import path from 'path';
import fetch from "node-fetch";
import http from "http";

export class DashboardServerService extends ServerService {

    constructor(app: Express) {
        super("DashboardServerService", app);

        this.app.engine('mustache', mustacheExpress());
        this.app.set('views', path.resolve()+ '\\src\\views');
        this.app.use(express.static('public'));
        this.app.set('view engine', 'mustache');

        this.app.get('/', function (req, res) {
            
            res.render('index', { name : 'Luk'});
        });



        this.app.get('/valami', function(req, res) {
            res.render('valami', {valami: 'valamik'});
        });

        

        this.app.get('/cikkek', function(req, ress) {
            var options = {
                host: '10.9.110.111',
                port:'9421',
                path: '/api/v01/content/articles'
            }

            var request = http.request(options, function (res) {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                res.on('end', function() {
                    console.log(data);

                    var valami = JSON.parse(data);

                    var title = valami.content[0].title;
                    console.log(valami.content[0].title);

                    ress.render('cikkek', {title: title});
                });
            });

            request.on('error', function (e) {
                console.log(e.message);
            });
            request.end();
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