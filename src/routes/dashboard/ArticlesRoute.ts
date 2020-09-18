import axios from "axios";
import {Article} from "../../model/content/Article.js"
import {Route} from "./Route.js";
import express, {Router, Request, Response} from "express";

export class ArticlesRoute extends Route {

    private router: Router = express.Router();

    constructor(){
        super("ArticlesRouter");
        this.getArticles();
        this.getArticle();
    }

    public async getArticles(): Promise<void> {
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                const url: string = 'http://10.9.110.111:9421/api/v01/content/articles';
                const response = await axios.get(url);
                const articles:[Article] = response.data.content;
                res.render("articles", { articles});
            } catch(e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }

    public async getArticle(): Promise<void> {
        this.router.get("/:slug", async (req: Request, res: Response) => {
            try {
                const url: string = 'http://10.9.110.111:9421/api/v01/content/articles/' + req.params.slug;
                const response = await axios.get(url);
                const article = response.data.content;
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