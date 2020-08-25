import {Logger} from "log4js";
import {LogService} from "../tool/LogService.js";
import {Option, OptionModel, OptionType} from "../../model/Option.js";
import {InstanceType} from "@hasezoey/typegoose";
import {ErrorResultMessage} from "../../messages/exception/ErrorResultMessage.js";
import {ModelRequiredDataException} from "../../exception/model/ModelRequiredDataException.js";
import {ModelExistsException} from "../../exception/model/ModelExistsException.js";
import {ContentResultMessage} from "../../messages/model/content/ContentResultMessage.js";
import {ModelNotFoundException} from "../../exception/model/ModelNotFoundException.js";
import {ResultMessage, ResultMessageType} from "../../messages/ResultMessage.js";

export class OptionsService {
    private log: Logger = new LogService().getLogger("OptionService");

    private model = OptionModel;

    public async findAll(callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.find({}, (err: Error, options: InstanceType<Option>[]) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                const result = new ContentResultMessage(options, "Successful Option Found!");
                callback(result.getMessage());
            }
        });
    }

    public async findByName(name: string, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({name}, (err: Error, option: InstanceType<Option>) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else if (!option) {
                const err1 = new ModelNotFoundException();
                const result = new ErrorResultMessage(err1, err1.message.toString());
                callback(result.getMessage());
            } else {
                const result = new ContentResultMessage(option, "Successful Option Found!");
                callback(result.getMessage());
            }
        });
    }

    public async deleteByName(Name: string, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({name: Name}, (err: Error, option: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                option.delete((err1: Error) => {
                    if (err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ResultMessage("Delete Successful!", true);
                        callback(result.getMessage());
                    }
                })
            }
        });
    }

    public async create(data: OptionType, callback: (result: ResultMessageType) => void): Promise<void> {
        await this.isUnique(data, (result: boolean) => {
            if (result) {
                this.isContainAllRequiredData(data, (rst: any) => {
                    if(rst) {
                        const newOption = this.createOption(data);

                        newOption.save((err: Error) => {
                            if(err) {
                                const res = new ErrorResultMessage(err, err.message.toString());
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

    public async update(data: OptionType, callback: (result: ResultMessageType) => void): Promise<void> {
        this.model.findOne({name: data.name}, (err: Error, option: any) => {
            if(err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if(typeof data.value !== "undefined") {
                    option.value = data.value;
                }

                option.save((err1: Error, updateOption: InstanceType<Option>) => {
                    if(err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ContentResultMessage(updateOption,"Option Update Successful!");
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

    private async isUnique(data: OptionType, callback: (result: boolean) => void): Promise<void> {
        this.model.findOne({name: data.name}, (err: Error, option: InstanceType<Option>) => {
            if (err) {
                this.log.error(err.message);
                this.log.debug(err.stack);
                callback(false);
            } else if (!option) {
                callback(true)
            } else {
                callback(false);
            }
        });
    }

    private async isContainAllRequiredData(data: OptionType, callback: (result: boolean) => void): Promise<void> {
        let result: boolean;
        result = (typeof data.name !== "undefined" && typeof data.value !== "undefined");
        callback(result);
    }

    private createOption(data: OptionType): InstanceType<Option> {
        const option = new OptionModel();

        option.name = data.name;
        option.value = data.value;

        return option;
    }
}
