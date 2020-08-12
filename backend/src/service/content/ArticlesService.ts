/**
 * Data Model Interfaces
 */
import {Article} from "../../model/content/article.js";
import {SlugifyService} from "../SlugifyService.js";
import {LogService} from "../LogService.js";

export class ArticlesService {
    private log = new LogService().getLogger("articlesServices");

    /**
     * Service Methods
     */
    public async findAll(callback) {
        return Article.find({}, (err, articles) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": "Authentication failed or Article not found.",
                    "error": err,
                }
                this.log.error(err);
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, Article Found!",
                    "article": articles,
                }
                this.log.info("Successful, Article Found!");
                callback(result);
            }
        });
    }

    public async findBySlug(Slug, callback) {
        return Article.findOne({
            slug: Slug
        }, (err, article) => {
            if(err) {
                const result = {
                    "success": false,
                    "message": "Authentication failed or Article not found.",
                    "error": err,
                }
                this.log.error(err);
                callback(result);
            } else {
                if (!article) {
                    const result = {
                        "success": false,
                        "message": "Article Not found in database!",
                        "error": err,
                    }
                    this.log.error(err);
                    callback(result);
                } else {
                    const result = {
                        "success": true,
                        "message": "Successful, Article Found!",
                        "article": article,
                    }
                    this.log.info("Successful, Article Found!");
                    callback(result);
                }
            }
        });
    }

    private async isUnique (data, callback) {
        Article.findOne({"slug": data.slug}, (err, user) => {
            if(err){
                this.log.debug(err.message);
                callback(false);
            } else if(!user){
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    private static async isContainAllRequiredData (data, callback) {
        let result: boolean;
        result = (data.title && data.content);
        callback(result);
    }

    private static createArticle(data) {
        const article = new Article();
        const slugify = new SlugifyService();

        article.title = data.title;
        article.headline = data.headline;
        article.connect = data.connect;
        article.featuredImage = data.featuredImage;
        article.author = data.author;
        article.slug = slugify.createSlug(data.title);

        if(!data.addedAt){
            article.addedAt = Date.now();
        } else {
            article.addedAt = data.addedAt;
        }

        article.tags = data.tags;
        article.categories = data.categories;

        return article;
    }

    public async create(data, callback) {
        await  this.isUnique(data, (result) => {
            if(result) {
                ArticlesService.isContainAllRequiredData(data, (rst) => {
                    if(rst) {
                        const newArticle = ArticlesService.createArticle(data);

                        newArticle.save((err) => {
                            if (err) {
                                const rstArticle1 = {
                                    "success": false,
                                    "message": "Authentication failed or Article creation failed.",
                                    "error": err,
                                }
                                this.log.error(err);
                                callback(rstArticle1);
                            } else {
                                const rstArticle2 = {
                                    "success": true,
                                    "message": "Article creation Succesful!",
                                    "article": newArticle,
                                }
                                this.log.info("Article creation Succesful!");
                                callback(rstArticle2);
                            }
                        });
                    } else {
                        const rs2 = {
                            "success": false,
                            "message": "Not contains all required data!",
                        }
                        this.log.info("Not contains all required data!");
                        callback(rs2);
                    }
                });
            } else {
                const rs = {
                    "success": false,
                    "message": "Article is already exists!",
                }
                this.log.info("Article is already exists!");
                callback(rs);
            }
        });
    }
}