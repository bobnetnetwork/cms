import {ContentService} from "./ContentService.js";
import {Tag, TagModel, TagType} from "../../../model/content/Tag.js";
import {InstanceType} from "@hasezoey/typegoose";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ResultMessageType} from "../../../messages/ResultMessage.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";

export class TagService extends ContentService {

    constructor() {
        super("TagService", TagModel);
    }

    protected async isContainAllRequiredData(data: TagType, callback: (result: boolean) => void) {
        let result: boolean;
        result = (typeof data.title !== "undefined");
        callback(result);
    }

    protected createContent(data: TagType): InstanceType<Tag> {
        const tag = new TagModel();
        const slugify = new SlugifyService();

        tag.title = data.title;

        if(typeof data.title !== "undefined") {
            tag.slug = slugify.createSlug(data.title);
        }

        if(!data.addedAt){
            tag.addedAt = new Date();
        } else {
            tag.addedAt = data.addedAt;
        }

        return tag;
    }

    public async update(data:TagType, callback:(result: ResultMessageType) => void) {
        this.model.findOne({slug: data.slug}, (err: Error, tag: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(typeof data.title !== "undefined") {
                    tag.title = data.title;
                }

                if(typeof data.articles !== "undefined") {
                    tag.articles = data.articles;
                }

                tag.save((err1: Error, updateTag: InstanceType<Tag>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updateTag, "Tag Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

}