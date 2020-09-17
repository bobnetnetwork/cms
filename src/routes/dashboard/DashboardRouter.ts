import express, {NextFunction, Request, Response, Router} from "express";
import Mustache from "mustache";
import { readFileSync, writeFileSync } from 'fs';
import { Hash } from "crypto";

export class DashboardRouter {

    private dashboardRouter: Router = express.Router();

    constructor() {
        this.dashboardGet();
    }

    public getDashboardRouter(): Router{
        return this.dashboardRouter;
    }

    private dashboardGet(): void {
        const template = readFileSync('template.mustache', 'utf-8');
        const name = 'Luke';
        const result = Mustache.render(template, name);
        writeFileSync('my-template.html', result, 'utf-8');

    }

}