/**
 * Data Model Interfaces
 */
import {UserModel} from "../../model/user/User.js";
import {LogService} from "../LogService.js";
import {Logger} from "log4js";
import {Role} from "../../model/user/Role";
import {Ref} from "typegoose";

export class UsersService {

    private log: Logger = new LogService().getLogger("usersService");

    /**
     * Service Methods
     */
    public async findAll(callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; user?: any; }): void; }): Promise<void> {
        UserModel.find({}, (err: Error, users: any) => {
            if (err) {
                const result = {
                    "error": err,
                    "message": err.message.toString(),
                    "success": false,
                };
                callback(result);
            } else {
                const result = {
                    "message": "Successful, User Found!",
                    "success": true,
                    "user": users,
                };
                callback(result);
            }
        });
    }

    public async findByUserName (userName: string, callback: { (result: any): void; (arg0: { error?: Error; message?: string; success: boolean; user?: import("typegoose").InstanceType<import("../../model/user/User.js").User>; }): void; }): Promise<void> {
        UserModel.findOne({userName}, (err: Error, user) => {
            if (err) {
                const result = {
                    "error": err,
                    "message": err.message.toString(),
                    "success": false,
                };
                callback(result);
            } else {
                if (!user) {
                    const result = {
                        "error": new Error("User Not found in database!"),
                        "message": "User Not found in database!",
                        "success": false,
                    };
                    callback(result);
                } else {
                    const result = {
                        "success": true,
                        "user": user,
                    };
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
        result = (data.userName !== undefined && data.pwd !== undefined && data.email !== undefined);
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

    public async create(data: { userName: string; email: string; pwd?: string; }, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; user?: import("typegoose").InstanceType<import("../../model/user/User.js").User>; }): void; }): Promise<void>{
        await this.isUnique(data.userName, data.email, (result: any) => {
            if (result) {
                UsersService.isContainAllRequiredData(data, (rst: any) => {
                    if(rst){
                        const newUser = this.createUser(data);

                        newUser.save((err: Error) => {
                            if (err) {
                                const rstUser1 = {
                                    "error": err,
                                    "message": err.message.toString(),
                                    "success": false,
                                };
                                callback(rstUser1);
                            } else {
                                const rstUser2 = {
                                    "message": "User Register Successful!",
                                    "success": true,
                                    "user": newUser,
                                };
                                callback(rstUser2);
                            }
                        });
                    } else {
                        const rs2 = {
                            "error": new Error("Not contains all required data!"),
                            "message": "Not contains all required data!",
                            "success": false,
                        };
                        callback(rs2);
                    }
                });
            } else {
                const rs = {
                    "error": new Error("User is already exists!"),
                    "message": "User is already exists!",
                    "success": false,
                };
                callback(rs);
            }
        })
    }

    public async update(data: { userName: string; firstName: string; lastName: string; roles: Ref<Role>; email: string; pwd: string; accountExpired: boolean; accountLocked: boolean; credentialsExpired: boolean; enabled: boolean; }, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; user?: any; }): void; }): Promise<void>{
        UserModel.findOne({
            userName: data.userName,
        }, (err: Error, user: any) => {
            if (err) {
                const result = {
                    "error": err,
                    "message": err.message.toString(),
                    "success": false,
                };
                callback(result);
            } else {
                if (data.firstName !== undefined) user.firstName = data.firstName;
                if (data.lastName !== undefined) user.lastName = data.lastName;
                if (data.roles !== undefined) user.roles = data.roles;
                if (data.email !== undefined) user.email = data.email;
                if (data.pwd !== undefined) user.pwd = data.pwd;
                if (data.accountExpired !== undefined) user.accountExpired = data.accountExpired;
                if (data.accountLocked !== undefined) user.accountLocked = data.accountLocked;
                if (data.credentialsExpired !== undefined) user.credentialsExpired = data.credentialsExpired;
                if (data.enabled !== undefined) user.enabled = data.enabled;

                user.save((err1: Error, updatedUser: any) => {
                    if (err1) {
                        const result = {
                            "error": err1,
                            "message": err1.message.toString(),
                            "success": false,
                        };
                        callback(result);
                    } else {
                        const result = {
                            "message": "User Update Successful!",
                            "success": true,
                            "user": updatedUser,
                        };
                        callback(result);
                    }
                });
            }
        });
    }

    public async deleteByUserName(UserName: string, callback: { (result: any): void; (arg0: { error?: Error; message: string; success: boolean; }): void; }): Promise<void> {
        UserModel.findOne({
            userName: UserName,
        }, (err: Error, user: any) => {
            if (err) {
                const result = {
                    "error": err,
                    "message": err.message.toString(),
                    "success": false,
                };
                callback(result);
            } else {
                user.delete((err1: Error) => {
                    if (err1) {
                        const result = {
                            "error": err1,
                            "message": err1.message.toString(),
                            "success": false,
                        };
                        callback(result);
                    } else {
                        const result = {
                            "message": "User Delete Successful!",
                            "success": false,
                        };
                        callback(result);
                    }
                });
            }
        });
    }
}
