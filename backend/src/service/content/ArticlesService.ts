/**
 * Data Model Interfaces
 */
import {ArticleModel} from "../../model/content/Article.js";
import {SlugifyService} from "../SlugifyService.js";
import {LogService} from "../LogService.js";

export class ArticlesService {
    private log = new LogService().getLogger("articlesServices");

    /**
     * Service Methods
     */
    public async findAll(callback: any) {
        return ArticleModel.find({}, (err: any, articles: any) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": err.message,
                    "error": err,
                }
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, Article Found!",
                    "article": articles,
                }
                callback(result);
            }
        });
    }

    public async findBySlug(slug: string, callback: any) {
        return ArticleModel.findOne({slug}, (err: any, article: any) => {
            if(err) {
                const result = {
                    "success": false,
                    "message": err.message,
                    "error": err,
                }
                callback(result);
            } else {
                if (!article) {
                    const result = {
                        "success": false,
                        "message": "Article Not found in database!",
                        "error": new Error("Article Not found in database!"),
                    }
                    callback(result);
                } else {
                    const result = {
                        "success": true,
                        "message": "Successful, Article Found!",
                        "article": article,
                    }
                    callback(result);
                }
            }
        });
    }

    private async isUnique (slug: string, callback: any) {
        ArticleModel.findOne({slug}, (err: any, article: any) => {
            if(err){
                this.log.error(err.message);
                this.log.debug(err.stack);
                callback(false);
            } else if(!article){
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    private static async isContainAllRequiredData (data: any, callback: any) {
        let result: boolean;
        result = (data.title && data.content);
        callback(result);
    }

    private static createArticle(data: any) {
        const article = new ArticleModel();
        const slugify = new SlugifyService();

        article.title = data.title;
        article.headline = data.headline;
        article.content = data.content;
        article.featuredImage = data.featuredImage;
        article.author = data.author;
        article.slug = slugify.createSlug(data.title);

        if(!data.addedAt){
            article.addedAt = new Date();
        } else {
            article.addedAt = data.addedAt;
        }

        article.tags = data.tags;
        article.categories = data.categories;

        return article;
    }

    public async create(data: any, callback: any) {
        await this.isUnique(data, (result: any) => {
            if(result) {
                ArticlesService.isContainAllRequiredData(data, (rst: any) => {
                    if(rst) {
                        const newArticle = ArticlesService.createArticle(data);

                        newArticle.save((err: any) => {
                            if (err) {
                                const rstArticle1 = {
                                    "success": false,
                                    "message": err.message,
                                    "error": err,
                                }
                                callback(rstArticle1);
                            } else {
                                const rstArticle2 = {
                                    "success": true,
                                    "message": "Article creation Successful!",
                                    "article": newArticle,
                                }
                                callback(rstArticle2);
                            }
                        });
                    } else {
                        const rs2 = {
                            "success": false,
                            "message": "Not contains all required data!",
                            "error": new Error("Not contains all required data!"),
                        }
                        callback(rs2);
                    }
                });
            } else {
                const rs = {
                    "success": false,
                    "message": "Article is already exists!",
                    "error": new Error("Article is already exists!"),
                }
                callback(rs);
            }
        });
    }
}