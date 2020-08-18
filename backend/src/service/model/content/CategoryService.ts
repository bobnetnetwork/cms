import {IModelService} from "../IModelService.js";
import {LogService} from "../../tool/LogService.js";
import {Logger} from "log4js";
import {CategoryModel, CategoryType} from "../../../model/content/Category.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {CategoryResultMessage} from "../../../messages/model/content/CategoryResultMessage.js";
import {ModelNotFoundException} from "../../../exception/model/ModelNotFoundException.js";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ModelExistsException} from "../../../exception/model/ModelExistsException.js";
import {ModelRequiredDataException} from "../../../exception/model/ModelRequiredDataException.js";
import {ResultMessage} from "../../../messages/ResultMessage.js";

export class CategoryService implements IModelService {

    private log: Logger = new LogService().getLogger("CategoryService");

    public async findAll(callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; category?: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Category.js").Category>; }): void; }): Promise<void> {
        CategoryModel.find({}, (err: Error, categories: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } {
                const result = new CategoryResultMessage(categories, "Successful, Category Found!");
                callback(result.getMessage());
            }
        });
    }

    public async findBySlug(slug: string, callback: (arg0: { error?: Error; message: string; success: boolean; category?: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Category.js").Category>; }) => void): Promise<void> {
        CategoryModel.findOne({slug}, (err: Error, category: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Category.js").Category>) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(!category) {
                    const err1 = new ModelNotFoundException("Category");
                    const result = new ErrorResultMessage(err1, err1.message.toString());
                    callback(result.getMessage());
                } else {
                    const result = new CategoryResultMessage(category, "Successful, Category Found!");
                    callback(result.getMessage());
                }
            }
        });
    }

    private async isUnique(data: CategoryType, callback: (arg0: boolean) => void): Promise<void> {
        if(typeof data.slug !== "undefined") {
            CategoryModel.findOne({slug: data.slug}, (err: Error, category: any) => {
                if(err) {
                    this.log.error(err.message);
                    this.log.debug(err.stack);
                    callback(false);
                } else if(!category) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
        }
    }

    private static async isContainAllRequiredData(data: CategoryType, callback: (arg0: boolean) => void): Promise<void> {
        let result: boolean;
        result = (typeof data.name !== "undefined" && typeof data.slug !== "undefined");
        callback(result);
    }

    private static createCategory(data: CategoryType) {
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

    public async create(data: CategoryType, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; category?: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Category.js").Category>; }): void; }): Promise<void> {
        await this.isUnique(data, (result: boolean) => {
            if(result) {
                CategoryService.isContainAllRequiredData(data, (rst: boolean) => {
                    if(rst) {
                        const newCategory = CategoryService.createCategory(data);

                        newCategory.save((err: Error) => {
                            if(err) {
                                const rstCategory1 = new ErrorResultMessage(err, err.message);
                                callback(rstCategory1.getMessage());
                            } else {
                                const rstCategory2 = new CategoryResultMessage(newCategory, "Category created!");
                                callback(rstCategory2.getMessage());
                            }
                        });
                    } else {
                        const err2 = new ModelRequiredDataException();
                        const rs2 = new ErrorResultMessage(err2, err2.message);
                        callback(rs2.getMessage());
                    }
                })
            } else {
                const err = new ModelExistsException("Category");
                const rs = new ErrorResultMessage(err, err.message.toString());
                callback(rs.getMessage());
            }
        });
    }

    public async update(data: CategoryType, callback: any): Promise<void> {
        CategoryModel.findOne({slug: data.slug}, (err: Error, category: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Category.js").Category>) => {
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

                category.save((err1: Error, updateCategory: any) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new CategoryResultMessage(updateCategory, "Category Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

    public async deleteBySlug(Slug: string, callback: (arg0: { error?: Error; message: string; success: boolean; }) => void): Promise<void> {
        CategoryModel.findOne({slug: Slug}, (err: Error, category: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                category.delete((err1: Error) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ResultMessage("Category Delete Successful!", true);
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}