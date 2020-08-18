import {Article, ArticleModel, ArticleType} from "../../../model/content/Article.js";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {ResultMessageType} from "../../../messages/ResultMessage.js";
import {ContentService} from "./ContentService.js";
import {InstanceType} from "@hasezoey/typegoose";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";

export class ArticlesService extends ContentService{

    constructor() {
        super("ArticlesService", ArticleModel);
    }

    protected async isUnique (data: ArticleType, callback: (result: boolean) => void) {
        this.model.findOne({slug: data.slug}, (err: Error, article: InstanceType<Article>) => {
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

    protected async isContainAllRequiredData (data: ArticleType, callback: (result: boolean) => void) {
        let result: boolean;
        result = (typeof data.title !== "undefined" && typeof data.content !== "undefined");
        callback(result);
    }

    protected createContent(data: ArticleType) {
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

    public async update(data: ArticleType, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({
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

                article.save((err1: Error, updateArticle: InstanceType<Article>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updateArticle, "Article Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}

