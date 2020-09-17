import axios from "axios";
import {Article} from "../../model/content/Article.js"
import {Route} from "./Route.js";
import express, {Router, Request, Response} from "express";

export class ArticlesRoute extends Route {

    private view: string;
    private router: Router = express.Router();

    constructor(view: string){
        super("ArticlesRouter");
        this.view = view;
        this.getArticle();
    }

    public async getRoute(req: any, res: any): Promise<void> {
        const url: string = 'http://10.9.110.111:9421/api/v01/content/articles';

            try {
                const response = await axios.get(url);
                let articles:[Article] = response.data.content;
                res.render(this.view, { articles});
            } catch (exception) {
                this.log.error(`ERROR received from ${url}: ${exception}\n`);
            }
    }

    public async getArticle(): Promise<void> {


        this.router.get("/:slug", async (req: Request, res: Response) => {
            try {
                const url: string = 'http://10.9.110.111:9421/api/v01/content/articles/' + req.params.slug;
                console.log(url);
                const response = await axios.get(url);
                let article = response.data.content;
                res.render('article', {article});
            } catch (e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }

    public getRouter(){
        return this.router;
    }
}