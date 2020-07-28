/**
 * Data Model Interfaces
 */

import * as database from "../dbService.js";
import * as Logger from "../logService.js";
import {Article} from "../../entity/content/article.js";

database.connectToDB();

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
            Logger.error(err);
            callback(result);
        } else {
            const result = {
                "success": true,
                "message": "Successful, Article Found!",
                "article": articles,
            }
            Logger.info("Successful, Article Found!");
            callback(result);
        }
    });
};