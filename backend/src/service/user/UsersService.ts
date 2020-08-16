/**
 * Data Model Interfaces
 */
import {UserModel} from "../../model/user/User.js";
import {LogService} from "../LogService.js";

export class UsersService {

    private log = new LogService().getLogger("usersService");

    constructor() {
        //
    }

    /**
     * Service Methods
     */
    public async findAll(callback: any) {
        return UserModel.find({}, (err: any, users: any) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": err.message,
                    "error": err,
                }
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, User Found!",
                    "user": users,
                }
                callback(result);
            }
        });
    }

    public async findByUserName (userName: string, callback: any) {
        let result;
        UserModel.findOne({userName}, (err, user) => {
            if (err) {
                result = {
                    "success": false,
                    "message": err.message,
                    "error": err,
                }
                callback(result);
            } else {
                if (!user) {
                    result = {
                        "success": false,
                        "message": "User Not found in database!",
                        "error": new Error("User Not found in database!"),
                    }
                    callback(result);
                } else {
                    result = {
                        "success": true,
                        "user": user,
                    }
                    callback(result);
                }
            }
        });
    }

    private async isUnique(userName: string, email: string, callback: any) {
        UserModel.findOne({$or: [{userName}, {email}]}, (err: { message: any; }, user: any) => {
            if(err){
                this.log.error(err.message);
                callback(false);
            } else if(!user){
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    private static async isContainAllRequiredData(data: { userName: any; pwd: any; email: any; }, callback: any) {
        let result: boolean;
        result = (data.userName && data.pwd && data.email);
        callback(result);
    }

    public createUser(data: { email: any; userName: any; pwd: any; registeredAt: any; firstName: any; lastName: any; roles: any; accountExpired: any; accountLocked: any; credentialsExpired: any; enabled: any; }) {
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

    public async create(data: any, callback: any) {
        await this.isUnique(data.userName, data.email, (result: any) => {
            if (result) {
                UsersService.isContainAllRequiredData(data, (rst: any) => {
                    if(rst){
                        const newUser = this.createUser(data);

                        newUser.save((err: any) => {
                            if (err) {
                                const rstUser1 = {
                                    "success": false,
                                    "message": err.message,
                                    "error": err,
                                }
                                callback(rstUser1);
                            } else {
                                const rstUser2 = {
                                    "success": true,
                                    "message": "User Register Succesful!",
                                    "user": newUser,
                                }
                                callback(rstUser2);
                            }
                        });
                    } else {
                        const rs2 = {
                            "success": false,
                            "message": "Not contains all required data!",
                            "error": new Error("Not contains all required data!"),
                        }
                        callback(rs2);
                    }
                })
            } else {
                const rs = {
                    "success": false,
                    "message": "User is already exists!",
                    "error": new Error("User is already exists!"),
                }
                callback(rs);
            }
        })
    }

    public async update (data: any, callback: any) {
        UserModel.findOne({
            userName: data.userName
        }, (err: any, user: { firstName: any; lastName: any; roles: any; email: any; pwd: any; accountExpired: any; accountLocked: any; credentialsExpired: any; enabled: any; save: (arg0: (err1: any, updatedUser: any) => void) => void; }) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": err.message,
                    "error": err,
                }
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

                user.save((err1: any, updatedUser: any) => {
                    if (err1) {
                        const result = {
                            "success": false,
                            "message": err1.message,
                            "error": err1,
                        }
                        callback(result);
                    } else {
                        const result = {
                            "success": true,
                            "message": "User Update Succesful!",
                            "user": updatedUser,
                        }
                        callback(result);
                    }
                });
            }
        });
    }

    public async deleteByUserName(UserName: string, callback: any) {
        UserModel.findOne({
            userName: UserName
        }, (err: any, user: { delete: (arg0: (err1: any) => void) => void; }) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": err.message,
                    "error": err,
                }
                callback(result);
            } else {
                user.delete((err1: any) => {
                    if (err1) {
                        const result = {
                            "success": false,
                            "message": err1.message,
                            "error": err1,
                        }
                        callback(result);
                    } else {
                        const result = {
                            "success": false,
                            "message": "User Delete Successful!",
                        }
                        callback(result);
                    }
                });
            }
        });
    }
}
