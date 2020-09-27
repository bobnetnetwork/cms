import {Category, CategoryModel, CategoryType} from "../../../model/content/Category.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ResultMessageType} from "../../../messages/ResultMessage.js";
import {ContentService} from "./ContentService.js";
import {InstanceType} from "@hasezoey/typegoose";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";

export class CategoryService extends ContentService {

    constructor() {
        super("CategoryService", CategoryModel);
    }

    protected async isContainAllRequiredData(data: CategoryType, callback: (result: boolean) => void): Promise<void> {
        let result: boolean;
        result = (typeof data.name !== "undefined");
        callback(result);
    }

    protected createContent(data: CategoryType): InstanceType<any> {
        const category = new CategoryModel();
        const slugify = new SlugifyService();

        category.name = data.name;

        if(typeof data.name !== "undefined"){
            category.slug = slugify.createSlug(data.name);
        }

        if(data.description) {
            category.description = data.description;
        }

        if(data.featuredImage) {
            category.featuredImage = data.featuredImage;
        }

        if(data.addedAt) {
            category.addedAt = data.addedAt;
        } else {
            category.addedAt = new Date();
        }

        if(data.parent) {
            category.parent = data.parent;
        }

        if(data.articles) {
            category.articles = data.articles;
        }

        return category;
    }

    public async update(data: CategoryType, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({slug: data.slug}, (err: Error, category: InstanceType<Category>) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                const slugify = new SlugifyService();

                if(typeof data.name !== "undefined") {
                    category.name = data.name;
                }

                if(typeof data.slug !== "undefined") {
                    category.slug = data.slug;
                } else if(typeof data.name !== "undefined") {
                        category.slug = slugify.createSlug(data.name);
                }

                if(typeof data.description !== "undefined") {
                    category.description = data.description;
                }

                if(typeof data.featuredImage !== "undefined") {
                    category.featuredImage = data.featuredImage;
                }

                if(typeof data.addedAt !== "undefined") {
                    category.addedAt = data.addedAt;
                }

                if(typeof data.parent !== "undefined") {
                    category.parent = data.parent;
                }

                if(typeof data.articles !== "undefined") {
                    category.articles = data.articles;
                }

                category.save((err1: Error, updateCategory: InstanceType<Category>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updateCategory, "Category Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}