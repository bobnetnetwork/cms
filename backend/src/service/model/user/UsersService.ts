/**
 * Data Model Interfaces
 */
import {UserModel, UserType} from "../../../model/user/User.js";
import {LogService} from "../../tool/LogService.js";
import {Logger} from "log4js";
import {ErrorResultMessage} from "../../../messages/ErrorResultMessage.js";
import {UserResultMessage} from "../../../messages/UserResultMessage.js";
import {ResultMessage, ResultMessageType} from "../../../messages/ResultMessage.js";
import {ModelRequiredDataException} from "../../../exception/model/ModelRequiredDataException.js";
import {ModelNotFoundException} from "../../../exception/model/ModelNotFoundException.js";
import {ModelExistsException} from "../../../exception/model/ModelExistsException.js";
import {IModelService} from "../IModelService.js";

export class UsersService implements IModelService{

    private log: Logger = new LogService().getLogger("usersService");

    /**
     * Service Methods
     */
    public async findAll(callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void> {
        UserModel.find({}, (err: Error, users: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                const result = new UserResultMessage("Successful, User Found!", users);
                callback(result.getMessage());
            }
        });
    }

    public async findByUserName (userName: string, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void> {
        UserModel.findOne({userName}, (err: Error, user: import("@hasezoey/typegoose").InstanceType<import("../../../model/user/User.js").User>) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if (!user) {
                    const err1 = new ModelNotFoundException("User");
                    const result = new ErrorResultMessage(err1, err1.message.toString());
                    callback(result.getMessage());
                } else {
                    const result = new UserResultMessage("Successful, User Found!", user);
                    callback(result.getMessage());
                }
            }
        });
    }

    private async isUnique(data: UserType, callback: { (result: any): void; (arg0: boolean): void; }): Promise<void> {
        if(typeof data.userName !== "undefined" && typeof data.email !== "undefined") {
            UserModel.findOne({$or: [{userName: data.userName}, {email: data.email}]}, (err: Error, user: any) => {
                if (err) {
                    this.log.error(err.message);
                    this.log.debug(err.stack);
                    callback(false);
                } else if (!user) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
        }
    }

    private static async isContainAllRequiredData(data: UserType, callback: { (rst: any): void; (arg0: boolean): void; }): Promise<void> {
        let result: boolean;
        result = (typeof data.userName !== "undefined" && typeof data.pwd !== "undefined" && typeof data.email !== "undefined");
        callback(result);
    }

    public createUser(data: UserType){
        const user = new UserModel();
        user.email = data.email;
        user.userName = data.userName;
        user.pwd = data.pwd;

        if(data.pwd){
            user.setPassword(data.pwd);
        }

        if(!data.registeredAt){
            user.registeredAt = new Date();
        } else {
            user.registeredAt = data.registeredAt;
        }
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.roles = data.roles;

        if(!data.accountExpired) {
            user.accountExpired = false;
        } else {
            user.accountExpired = data.accountExpired;
        }

        if(!data.accountLocked){
            user.accountLocked = false;
        } else {
            user.accountLocked = data.accountLocked;
        }

        if(!data.credentialsExpired){
            user.credentialsExpired = false;
        } else {
            user.credentialsExpired = data.credentialsExpired;
        }

        if(!data.enabled) {
            user.enabled = true;
        } else {
            user.enabled = data.enabled;
        }

        return user;
    }

    public async create(data: UserType, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void>{
        await this.isUnique(data, (result: boolean) => {
            if (result) {
                UsersService.isContainAllRequiredData(data, (rst: boolean) => {
                    if(rst){
                        const newUser = this.createUser(data);

                        newUser.save((err: Error) => {
                            if (err) {
                                const rstUser1 = new ErrorResultMessage(err, err.message.toString());
                                callback(rstUser1.getMessage());
                            } else {
                                const rstUser2 = new UserResultMessage("User Register Successful!", newUser);
                                callback(rstUser2.getMessage());
                            }
                        });
                    } else {
                        const err2 = new ModelRequiredDataException();
                        const rs2 = new ErrorResultMessage(err2, err2.message.toString());
                        callback(rs2.getMessage());
                    }
                });
            } else {
                const err = new ModelExistsException("User");
                const rs = new ErrorResultMessage(err, err.message.toString());
                callback(rs.getMessage());
            }
        });
    }

    public async update(data: UserType, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void>{
        UserModel.findOne({
            userName: data.userName,
        }, (err: Error, user: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                if (typeof data.firstName !== "undefined") {
                    user.firstName = data.firstName;
                }
                if (typeof data.lastName !== "undefined") {
                    user.lastName = data.lastName;
                }
                if (typeof data.roles !== "undefined") {
                    user.roles = data.roles;
                }
                if (typeof data.email !== "undefined") {
                    user.email = data.email;
                }
                if (typeof data.pwd !== "undefined") {
                    user.pwd = data.pwd;
                }
                if (typeof data.accountExpired !== "undefined") {
                    user.accountExpired = data.accountExpired;
                }
                if (typeof data.accountLocked !== "undefined") {
                    user.accountLocked = data.accountLocked;
                }
                if (typeof data.credentialsExpired !== "undefined") {
                    user.credentialsExpired = data.credentialsExpired;
                }
                if (typeof data.enabled !== "undefined") {
                    user.enabled = data.enabled;
                }

                user.save((err1: Error, updatedUser: any) => {
                    if (err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new UserResultMessage("User Update Successful!", updatedUser);
                        callback(result.getMessage());
                    }
                });
            }
        });
    }

    public async deleteByUserName(UserName: string, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void> {
        UserModel.findOne({
            userName: UserName,
        }, (err: Error, user: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString());
                callback(result.getMessage());
            } else {
                user.delete((err1: Error) => {
                    if (err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString());
                        callback(result.getMessage());
                    } else {
                        const result = new ResultMessage("User Delete Successful!", true);
                        callback(result.getMessage());
                    }
                });
            }
        });
    }
}
