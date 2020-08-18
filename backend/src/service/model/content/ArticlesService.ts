/**
 * Data Model Interfaces
 */
import {ArticleModel, ArticleType} from "../../../model/content/Article.js";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {LogService} from "../../tool/LogService.js";
import {ErrorResultMessage} from "../../../messages/ErrorResultMessage.js";
import {ArticleResultMessage} from "../../../messages/ArticleResultMessage.js";
import {Logger} from "log4js";
import {ResultMessage, ResultMessageType} from "../../../messages/ResultMessage.js";
import {ModelNotFoundException} from "../../../exception/model/ModelNotFoundException.js";
import {ModelRequiredDataException} from "../../../exception/model/ModelRequiredDataException.js";
import {ModelExistsException} from "../../../exception/model/ModelExistsException.js";
import {IModelService} from "../IModelService.js";

export class ArticlesService implements IModelService{
    private log: Logger = new LogService().getLogger("articlesServices");

    /**
     * Service Methods
     */
    public async findAll(callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void> {
        ArticleModel.find({}, (err: Error, articles: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                const result = new ArticleResultMessage(articles, "Successful, Article Found!");
                callback(result.getMessage());
            }
        });
    }

    public async findBySlug(slug: string, callback: { (result: any): void; (arg0: ResultMessageType): void; }) {
        return ArticleModel.findOne({slug}, (err: Error, article: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if (!article) {
                    const err1 = new ModelNotFoundException("Article");
                    const result = new ErrorResultMessage(err1, err1.message.toString());
                    callback(result.getMessage());
                } else {
                    const result = new ArticleResultMessage(article, "Successful, Article Found!");
                    callback(result.getMessage());
                }
            }
        });
    }

    private async isUnique (data: ArticleType, callback: { (result: any): void; (arg0: boolean): void; }) {
        ArticleModel.findOne({slug: data.slug}, (err: Error, article: any) => {
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

    private static async isContainAllRequiredData (data: ArticleType, callback: { (rst: any): void; (arg0: boolean): void; }) {
        let result: boolean;
        result = (typeof data.title !== "undefined" && typeof data.content !== "undefined");
        callback(result);
    }

    private static createArticle(data: ArticleType) {
        const article = new ArticleModel();
        const slugify = new SlugifyService();

        article.title = data.title;
        article.headline = data.headline;
        article.content = data.content;
        article.featuredImage = data.featuredImage;
        article.author = data.author;

        if(typeof data.title !== "undefined") {
            article.slug = slugify.createSlug(data.title);
        }

        if(!data.addedAt){
            article.addedAt = new Date();
        } else {
            article.addedAt = data.addedAt;
        }

        article.tags = data.tags;
        article.categories = data.categories;

        return article;
    }

    public async create(data: ArticleType, callback: { (result: any): void; (arg0: ResultMessageType): void; }) {
        await this.isUnique(data, (result: boolean) => {
            if(result) {
                ArticlesService.isContainAllRequiredData(data, (rst: any) => {
                    if(rst) {
                        const newArticle = ArticlesService.createArticle(data);

                        newArticle.save((err: any) => {
                            if (err) {
                                const rstArticle1 = new ErrorResultMessage(err, err.message.toString());
                                callback(rstArticle1.getMessage());
                            } else {
                                const rstArticle2 = new ArticleResultMessage(newArticle, "Article creation Successful!");
                                callback(rstArticle2.getMessage());
                            }
                        });
                    } else {
                        const err1 = new ModelRequiredDataException();
                        const rs2 = new ErrorResultMessage(err1, err1.message.toString());
                        callback(rs2.getMessage());
                    }
                });
            } else {
                const err2 = new ModelExistsException("Article");
                const rs = new ErrorResultMessage(err2, err2.message.toString());
                callback(rs.getMessage());
            }
        });
    }

    public async update(data: any, callback: any): Promise<void> {
        ArticleModel.findOne({
            slug: data.slug,
        }, (err: Error, article: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(typeof data.title !== "undefined") {
                    article.title = data.title;
                }
                if(typeof data.headline !== "undefined") {
                    article.headline = data.headline;
                }
                if(typeof data.content !== "undefined") {
                    article.content = data.content;
                }
                if(typeof data.featuredImage !== "undefined") {
                    article.featuredImage = data.featuredImage;
                }
                if(typeof data.author !== "undefined") {
                    article.author = data.author;
                }
                if(typeof data.slug !== "undefined") {
                    article.slug = data.slug;
                }
                if(typeof data.tags !== "undefined") {
                    article.tags = data.tags;
                }
                if(typeof data.categories !== "undefined") {
                    article.categories = data.categories;
                }

                article.save((err1: Error, updateArticle: any) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ArticleResultMessage(updateArticle, "Article Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

    public async deleteBySlug(Slug: string, callback: ((arg0: { error?: Error; message: string; success: boolean; }) => void)): Promise<void> {
        ArticleModel.findOne({
            slug: Slug,
        }, (err: Error, article: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                article.delete((err1: Error) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ResultMessage("Article Delete Successful!", true);
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}
