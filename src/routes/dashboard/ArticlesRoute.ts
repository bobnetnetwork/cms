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
        this.postArticle();
    }

    public async getArticles(): Promise<void> {
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                const url: string = 'http://localhost:9421/api/v01/content/articles';
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
                const url: string = 'http://localhost:9421/api/v01/content/articles/' + req.params.slug;
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

    public async postArticle(): Promise<void> {
        this.router.post("/:slug", async (req: Request, res: Response) => {
            const url: string = 'http://localhost:9421/api/v01/content/articles/';
            const response = await axios.get(url);
            const article = response.data.content;
            article.title = req.body.title;
            console.log(req.body);
            try{
                const updateResponse = await axios.put(url, article);
                console.log(updateResponse);
                res.redirect("/articles/" + req.params.slug);
            } catch(e) {
                console.log(e);
            }

        });
    }

    public getRouter(){
        return this.router;
    }
}