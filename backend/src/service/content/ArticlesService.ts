/**
 * Data Model Interfaces
 */
import {ArticleModel} from "../../model/content/Article.js";
import {SlugifyService} from "../SlugifyService.js";
import {LogService} from "../LogService.js";
import {ErrorResultMessage} from "../../messages/ErrorResultMessage.js";
import {ArticleResultMessage} from "../../messages/ArticleResultMessage.js";

export class ArticlesService {
    private log = new LogService().getLogger("articlesServices");

    /**
     * Service Methods
     */
    public async findAll(callback: any) {
        return ArticleModel.find({}, (err: Error, articles: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(result);
            } else {
                const result = new ArticleResultMessage(articles, "Successful, Article Found!").getMessage();
                callback(result);
            }
        });
    }

    public async findBySlug(slug: string, callback: any) {
        return ArticleModel.findOne({slug}, (err: Error, article: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(result);
            } else {
                if (!article) {
                    const err1 = new Error("Article Not found in database!");
                    const result = new ErrorResultMessage(err1, err1.message.toString()).getMessage();
                    callback(result);
                } else {
                    const result = new ArticleResultMessage(article, "Successful, Article Found!").getMessage();
                    callback(result);
                }
            }
        });
    }

    private async isUnique (slug: string, callback: any) {
        ArticleModel.findOne({slug}, (err: Error, article: any) => {
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
                                const rstArticle1 = new ErrorResultMessage(err, err.message.toString()).getMessage();
                                callback(rstArticle1);
                            } else {
                                const rstArticle2 = new ArticleResultMessage(newArticle, "Article creation Successful!").getMessage();
                                callback(rstArticle2);
                            }
                        });
                    } else {
                        const err1 = new Error("Not contains all required data!");
                        const rs2 = new ErrorResultMessage(err1, err1.message.toString()).getMessage();
                        callback(rs2);
                    }
                });
            } else {
                const err2 = new Error("Article is already exists!");
                const rs = new ErrorResultMessage(err2, err2.message.toString()).getMessage();
                callback(rs);
            }
        });
    }
}