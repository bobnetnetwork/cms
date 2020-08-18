import {IModelService} from "../IModelService.js";
import {LogService} from "../../tool/LogService.js";
import {Logger} from "log4js";
import {Page, PageModel, PageType} from "../../../model/content/Page.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {PageResultMessage} from "../../../messages/model/content/PageResultMessage.js";
import {ResultMessage, ResultMessageType} from "../../../messages/ResultMessage.js";
import {ModelRequiredDataException} from "../../../exception/model/ModelRequiredDataException.js";
import {ModelNotFoundException} from "../../../exception/model/ModelNotFoundException.js";
import {ModelExistsException} from "../../../exception/model/ModelExistsException.js";
import {SlugifyService} from "../../tool/SlugifyService";
import {promises} from "dns";

export class PageService implements IModelService {

    private log: Logger = new LogService().getLogger("PageService");

    public async findAll(callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; page?: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Page.js").Page>; }): void; }): Promise<void> {
        PageModel.find({}, (err: Error, pages: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                const result = new PageResultMessage(pages,"Successful, Page Found!");
                callback(result.getMessage());
            }
        });
    }

    public async findBySlug(Slug: string, callback: (arg0: { error?: Error; message: string; success: boolean; page?: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Page.js").Page>; }) => void): Promise<void> {
        PageModel.findOne({slug: Slug}, (err: Error, page: import("@hasezoey/typegoose").InstanceType<import("../../../model/content/Page.js").Page>) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(!page) {
                    const err1 = new ModelNotFoundException("Page");
                    const result = new ErrorResultMessage(err1, err1.message.toString());
                    callback(result.getMessage());
                } else {
                    const result = new PageResultMessage(page, "Successful, Page Found!");
                    callback(result.getMessage());
                }
            }
        });
    }

    private async isUnique(data: PageType, callback: (arg0: boolean) => void): Promise<void> {
        if(typeof data.slug !== "undefined") {
            PageModel.findOne({slug: data.slug}, (err: Error, page: any) => {
                if(err) {
                    this.log.error(err.message);
                    this.log.debug(err.stack);
                    callback(false);
                } else if(!page) {
                    callback(true);
                } else {
                    callback (false);
                }
            });
        }
    }

    private static async isContainAllRequiredData(data: PageType, callback: (arg0: boolean) => void): Promise<void> {
        let result: boolean;
        result = (typeof data.title !== "undefined" && typeof data.content !== "undefined");
        callback(result);
    }

    private static createPage(data: PageType) {
        const page = new PageModel();
        const slugify = new SlugifyService();

        page.title = data.title;
        page.headline = data.headline;
        page.content = data.content;
        page.featuredImage = data.featuredImage;
        page.author = data.author;

        if(typeof data.title !== "undefined") {
            page.slug = slugify.createSlug(data.title);
        }

        if(!data.addedAt){
            page.addedAt = new Date();
        } else {
            page.addedAt = data.addedAt;
        }

        return page;
    }

    public async create(data: PageType, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; page?: import("@hasezoey/typegoose").InstanceType<Page>; }): void; }): Promise<void> {
        await this.isUnique(data, (result: boolean) => {
            if(result) {
                PageService.isContainAllRequiredData(data, (rst: any) => {
                    if(rst) {
                        const newPage = PageService.createPage(data);

                        newPage.save((err: Error) => {
                            if(err) {
                                const rstPage1 = new ErrorResultMessage(err, err.message.toString());
                                callback(rstPage1.getMessage());
                            } else {
                                const rstPage2 = new PageResultMessage(newPage, "Page creations Successful!");
                                callback(rstPage2.getMessage());
                            }
                        });
                    } else {
                        const err1 = new ModelRequiredDataException();
                        const rs1 = new ErrorResultMessage(err1, err1.message.toString());
                        callback(rs1.getMessage());
                    }
                });
            } else {
                const err2 = new ModelExistsException("Page");
                const rs2 = new ErrorResultMessage(err2, err2.message.toString());
                callback(rs2.getMessage());
            }
        });
    }

    public async update(data: PageType, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; page?: import("@hasezoey/typegoose").InstanceType<Page>; }): void; }): Promise<void> {
        PageModel.findOne({slug: data.slug}, (err: Error, page: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(typeof data.title !== "undefined") {
                    page.title = data.title;
                }
                if(typeof data.headline !== "undefined") {
                    page.headline = data.headline;
                }
                if(typeof data.content !== "undefined") {
                    page.content = data.content;
                }
                if(typeof data.featuredImage !== "undefined") {
                    page.featuredImage = data.featuredImage;
                }
                if(typeof data.author !== "undefined") {
                    page.author = data.author;
                }
                if(typeof data.slug !== "undefined") {
                    page.slug = data.slug;
                }

                page.save((err1: Error, updatePage: any) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new PageResultMessage(updatePage, "Page Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

    public async deleteBySlug(Slug: string, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; }): void; }): promises<void> {
        PageModel.findOne({slug: Slug}, (err: Error, page: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                page.delete((err1: Error) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ResultMessage("Page Delete Successful!", true);
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}
