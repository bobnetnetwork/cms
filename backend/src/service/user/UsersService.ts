/**
 * Data Model Interfaces
 */
import {UserModel} from "../../model/user/User.js";
import {LogService} from "../LogService.js";
import {Logger} from "log4js";
import {Role} from "../../model/user/Role.js";
import {Ref} from "typegoose";
import {ErrorResultMessage} from "../../messages/ErrorResultMessage.js";
import {UserResultMessage} from "../../messages/UserResultMessage.js";
import {ResultMessage, ResultMessageType} from "../../messages/ResultMessage.js";

export class UsersService {

    private log: Logger = new LogService().getLogger("usersService");

    /**
     * Service Methods
     */
    public async findAll(callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void> {
        UserModel.find({}, (err: Error, users: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(result);
            } else {
                const result = new UserResultMessage("Successful, User Found!", users).getMessage();
                callback(result);
            }
        });
    }

    public async findByUserName (userName: string, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void> {
        UserModel.findOne({userName}, (err: Error, user) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(result);
            } else {
                if (!user) {
                    const err1 = new Error("User Not found in database!");
                    const result = new ErrorResultMessage(err1, err1.message.toString()).getMessage();
                    callback(result);
                } else {
                    const result = new UserResultMessage("Successful, User Found!", user).getMessage();
                    callback(result);
                }
            }
        });
    }

    private async isUnique(userName: string, email: string, callback: { (result: any): void; (arg0: boolean): void; }): Promise<void> {
        UserModel.findOne({$or: [{userName}, {email}]}, (err: Error, user: any) => {
            if(err){
                this.log.error(err.message);
                this.log.debug(err.stack);
                callback(false);
            } else if(!user){
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    private static async isContainAllRequiredData(data: { userName: string; email: string; pwd?: string; }, callback: { (rst: any): void; (arg0: boolean): void; }): Promise<void> {
        let result: boolean;
        result = (typeof data.userName !== "undefined" && typeof data.pwd !== "undefined" && typeof data.email !== "undefined");
        callback(result);
    }

    public createUser(data: any){
        const user = new UserModel();
        user.email = data.email;
        user.userName = data.userName;
        user.pwd = data.pwd;
        user.setPassword(data.pwd);

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

    public async create(data: { userName: string; email: string; pwd?: string; }, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void>{
        await this.isUnique(data.userName, data.email, (result: boolean) => {
            if (result) {
                UsersService.isContainAllRequiredData(data, (rst: boolean) => {
                    if(rst){
                        const newUser = this.createUser(data);

                        newUser.save((err: Error) => {
                            if (err) {
                                const rstUser1 = new ErrorResultMessage(err, err.message.toString()).getMessage();
                                callback(rstUser1);
                            } else {
                                const rstUser2 = new UserResultMessage("User Register Successful!", newUser).getMessage();
                                callback(rstUser2);
                            }
                        });
                    } else {
                        const err2 = new Error("Not contains all required data!");
                        const rs2 = new ErrorResultMessage(err2, err2.message.toString()).getMessage();
                        callback(rs2);
                    }
                });
            } else {
                const err = new Error("User is already exists!");
                const rs = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(rs);
            }
        });
    }

    public async update(data: { userName: string; firstName: string; lastName: string; roles: Ref<Role>; email: string; pwd: string; accountExpired: boolean; accountLocked: boolean; credentialsExpired: boolean; enabled: boolean; }, callback: { (result: any): void; (arg0: ResultMessageType): void; }): Promise<void>{
        UserModel.findOne({
            userName: data.userName,
        }, (err: Error, user: any) => {
            if (err) {
                const result = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(result);
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
                        const result = new ErrorResultMessage(err1, err1.message.toString()).getMessage();
                        callback(result);
                    } else {
                        const result = new UserResultMessage("User Update Successful!", updatedUser).getMessage();
                        callback(result);
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
                const result = new ErrorResultMessage(err, err.message.toString()).getMessage();
                callback(result);
            } else {
                user.delete((err1: Error) => {
                    if (err1) {
                        const result = new ErrorResultMessage(err1, err1.message.toString()).getMessage();
                        callback(result);
                    } else {
                        const result = new ResultMessage("User Delete Successful!", true).getMessage();
                        callback(result);
                    }
                });
            }
        });
    }
}
