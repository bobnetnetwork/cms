import {ContentService} from "./ContentService.js";
import {FileModel, FileType} from "../../../model/content/File.js";
import {InstanceType} from "@hasezoey/typegoose";
import {SlugifyService} from "../../tool/SlugifyService.js";
import {ResultMessageType} from "../../../messages/ResultMessage.js";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";

export class FileService extends ContentService {

    constructor() {
        super("FileService", FileModel);
    }

    protected async isContainAllRequiredData(data: FileType, callback: (result: boolean) => void) {
        let result: boolean;
        result = (typeof data.fileName !== "undefined" && typeof data.url !== "undefined");
        callback(result);
    }

    protected createContent(data: FileType): InstanceType<FileType> {
        const file = new FileModel();
        const slugify = new SlugifyService();

        file.fileName = data.fileName;
        file.url = data.url;
        file.mimeType = data.mimeType;

        if(typeof data.fileName !== "undefined") {
            file.slug = slugify.createSlug(data.fileName);
        }

        if(!data.addedAt){
            file.addedAt = new Date();
        } else {
            file.addedAt = data.addedAt;
        }

        return file;
    }

    public async update(data: FileType, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({slug: data.slug}, (err: Error, file: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(typeof data.fileName !== "undefined") {
                    file.fileName = data.fileName;
                }

                if(typeof data.url !== "undefined") {
                    file.url = data.url;
                }

                if(typeof data.mimeType !== "undefined") {
                    file.mimeType = data.mimeType;
                }

                if(typeof data.slug !== "undefined") {
                    file.slug = data.slug
                }

                file.save((err1: Error, updateFile: InstanceType<File>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updateFile, "File Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}