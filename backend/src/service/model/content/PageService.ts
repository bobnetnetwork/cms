import {Page, PageModel, PageType} from "../../../model/content/Page.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ContentService} from "./ContentService.js";
import {InstanceType} from "@hasezoey/typegoose";
import {ResultMessageType} from "../../../messages/ResultMessage.js";
import {Article} from "../../../model/content/Article";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";

export class PageService extends ContentService {

    constructor() {
        super("PageService", PageModel);
    }

    protected async isContainAllRequiredData(data: PageType, callback: (result: boolean) => void): Promise<void> {
        let result: boolean;
        result = (typeof data.title !== "undefined" && typeof data.content !== "undefined");
        callback(result);
    }

    protected createContent(data: PageType): InstanceType<any> {
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

    public async update(data: PageType, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({slug: data.slug}, (err: Error, page: InstanceType<Page>) => {
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

                page.save((err1: Error, updatePage: InstanceType<Article>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updatePage, "Page Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}
