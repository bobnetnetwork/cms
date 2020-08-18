import {IModelService} from "../IModelService.js";
import {Logger} from "log4js";
import {LogService} from "../../tool/LogService.js";
import {Model} from "mongoose";
import {ErrorResultMessage} from "../../../messages/exception/ErrorResultMessage.js";
import {ResultMessage, ResultMessageType} from "../../../messages/ResultMessage.js";
import {InstanceType} from "@hasezoey/typegoose";
import {PageType} from "../../../model/content/Page.js";
import {ModelRequiredDataException} from "../../../exception/model/ModelRequiredDataException.js";
import {ModelExistsException} from "../../../exception/model/ModelExistsException.js";
import {ContentResultMessage} from "../../../messages/model/content/ContentResultMessage.js";
import {ModelNotFoundException} from "../../../exception/model/ModelNotFoundException.js";

export abstract class ContentService implements IModelService {

    protected log: Logger;

    protected model: Model<InstanceType<any>>;

    protected constructor(serviceName: string, model: Model<InstanceType<any>>) {
        this.log = new LogService().getLogger(serviceName);
        this.model = model;
    }

    public async findAll(callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.find({}, (err: Error, contents: InstanceType<any>[]) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } {
                const result = new ContentResultMessage(contents, "Successful, Content Found!");
                callback(result.getMessage());
            }
        });
    }

    public async findBySlug(slug: string, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({slug}, (err: Error, content: InstanceType<any>) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(!content) {
                    const err1 = new ModelNotFoundException();
                    const result = new ErrorResultMessage(err1, err1.message.toString());
                    callback(result.getMessage());
                } else {
                    const result = new ContentResultMessage(content, "Successful, Content Found!");
                    callback(result.getMessage());
                }
            }
        });
    }

    public async deleteBySlug(Slug: string, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({slug: Slug}, (err: Error, content: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                content.delete((err1: Error) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ResultMessage("Delete Successful!", true);
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

    public async create(data: PageType, callback: (result: ResultMessageType) => void): Promise<void> {
        await this.isUnique(data, (result: boolean) => {
            if(result) {
                this.isContainAllRequiredData(data, (rst: any) => {
                    if(rst) {
                        const newContent = this.createContent(data);

                        newContent.save((err: Error) => {
                            if(err) {
                                const res = new ErrorResultMessage(err, err.message.toString());
                                callback(res.getMessage());
                            } else {
                                const res = new ContentResultMessage(newContent, "Creation Successful!");
                                callback(res.getMessage());
                            }
                        });
                    } else {
                        const err = new ModelRequiredDataException();
                        const res = new ErrorResultMessage(err, err.message.toString());
                        callback(res.getMessage());
                    }
                });
            } else {
                const err = new ModelExistsException();
                const res = new ErrorResultMessage(err, err.message.toString());
                callback(res.getMessage());
            }
        });
    }

    protected abstract async isUnique(data: any, callback: (result: boolean) => void): Promise<void>;

    protected abstract async isContainAllRequiredData(data: any, callback: (result: boolean) => void): Promise<void>;

    protected abstract createContent(data: any): InstanceType<any>;

    public abstract update(data: any, callback: (result: ResultMessageType) => void): Promise<void>;
}
