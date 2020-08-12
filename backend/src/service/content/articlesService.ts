/**
 * Data Model Interfaces
 */
import {Article} from "../../model/content/article.js";
import {createSlug} from "../slugifyService.js";
import {LogService} from "../LogService.js";

const log = new LogService().getLogger("articlesServices");

/**
 * Service Methods
 */
export const findAll = async (callback) => {
    return Article.find({}, (err, articles) => {
        if (err) {
            const result = {
                "success": false,
                "message": "Authentication failed or Article not found.",
                "error": err,
            }
            log.error(err);
            callback(result);
        } else {
            const result = {
                "success": true,
                "message": "Successful, Article Found!",
                "article": articles,
            }
            log.info("Successful, Article Found!");
            callback(result);
        }
    });
};

export const findBySlug = async (Slug, callback) => {
    return Article.findOne({
        slug: Slug
    }, (err, article) => {
        if(err) {
            const result = {
                "success": false,
                "message": "Authentication failed or Article not found.",
                "error": err,
            }
            log.error(err);
            callback(result);
        } else {
            if (!article) {
                const result = {
                    "success": false,
                    "message": "Article Not found in database!",
                    "error": err,
                }
                log.error(err);
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, Article Found!",
                    "article": article,
                }
                log.info("Successful, Article Found!");
                callback(result);
            }
        }
    });
};

const isUnique = async (data, callback) => {
    Article.findOne({"slug": data.slug}, (err, user) => {
        if(err){
            log.debug(err.message);
            callback(false);
        } else if(!user){
            callback(true);
        } else {
            callback(false);
        }
    });
}

const isContainAllRequiredData = async (data, callback) => {
    let result: boolean;
    result = (data.title && data.content);
    callback(result);
}

function createArticle (data) {
    const article = new Article();

    article.title = data.title;
    article.headline = data.headline;
    article.connect = data.connect;
    article.featuredImage = data.featuredImage;
    article.author = data.author;
    article.slug = createSlug(data.title);

    if(!data.addedAt){
        article.addedAt = Date.now();
    } else {
        article.addedAt = data.addedAt;
    }

    article.tags = data.tags;
    article.categories = data.categories;

    return article;
}

export const create = async (data, callback) => {
    await  isUnique(data, (result) => {
        if(result) {
            isContainAllRequiredData(data, (rst) => {
                if(rst) {
                    const newArticle = createArticle(data);

                    newArticle.save((err) => {
                        if (err) {
                            const rstArticle1 = {
                                "success": false,
                                "message": "Authentication failed or Article creation failed.",
                                "error": err,
                            }
                            log.error(err);
                            callback(rstArticle1);
                        } else {
                            const rstArticle2 = {
                                "success": true,
                                "message": "Article creation Succesful!",
                                "article": newArticle,
                            }
                            log.info("Article creation Succesful!");
                            callback(rstArticle2);
                        }
                    });
                } else {
                    const rs2 = {
                        "success": false,
                        "message": "Not contains all required data!",
                    }
                    log.info("Not contains all required data!");
                    callback(rs2);
                }
            });
        } else {
            const rs = {
                "success": false,
                "message": "Article is already exists!",
            }
            log.info("Article is already exists!");
            callback(rs);
        }
    });
};