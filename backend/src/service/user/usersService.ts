/**
 * Data Model Interfaces
 */
import {Users} from "../../model/user/users.js";
import {LogService} from "../LogService.js";

export class UsersService {

    private log = new LogService().getLogger("usersService");

    constructor() {
        //
    }

    /**
     * Service Methods
     */
    public async findAll(callback) {
        return Users.find({}, (err, users) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": "Authentication failed or User not found.",
                    "error": err,
                }
                this.log.error(err);
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, User Found!",
                    "user": users,
                }
                this.log.info("Successful, User Found!");
                callback(result);
            }
        });
    }

    public async findByUserName (UserName, callback) {
        return Users.findOne({
            userName: UserName
        }, (err, user) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": "Authentication failed or User not found.",
                    "error": err,
                }
                this.log.error(err);
                callback(result);
            } else {
                if (!user) {
                    const result = {
                        "success": false,
                        "message": "User Not found in database!",
                        "error": err,
                    }
                    this.log.error(err);
                    callback(result);
                } else {
                    const result = {
                        "success": true,
                        "message": "Successful, User Found!",
                        "user": user,
                    }
                    this.log.info("Successful, User Found!");
                    callback(result);
                }
            }
        })
    }

    private async isUnique(data, callback) {
        Users.findOne({"userName": data.userName}, {"email": data.email}, (err, user) => {
            if(err){
                this.log.debug(err.message);
                callback(false);
            } else if(!user){
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    private static async isContainAllRequiredData(data, callback) {
        let result: boolean;
        result = (data.userName && data.pwd && data.email);
        callback(result);
    }

    public createUser(data) {
        const user = new Users();
        user.email = data.email;
        user.userName = data.userName;
        user.pwd = data.pwd;
        user.setPassword(data.pwd);

        if(!data.registeredAt){
            user.registeredAt = Date.now();
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

    public async create(data, callback) {
        await this.isUnique(data, (result) => {
            if (result) {
                UsersService.isContainAllRequiredData(data, (rst) => {
                    if(rst){
                        const newUser = this.createUser(data);

                        newUser.save((err) => {
                            if (err) {
                                const rstUser1 = {
                                    "success": false,
                                    "message": "Authentication failed or User creation failed.",
                                    "error": err,
                                }
                                this.log.error(err);
                                callback(rstUser1);
                            } else {
                                const rstUser2 = {
                                    "success": true,
                                    "message": "User Register Succesful!",
                                    "user": newUser,
                                }
                                this.log.info("User Register Succesful!");
                                callback(rstUser2);
                            }
                        });
                    } else {
                        const rs2 = {
                            "success": false,
                            "message": "Not contains all required data!",
                        }
                        this.log.info("Not contains all required data!");
                        callback(rs2);
                    }
                })
            } else {
                const rs = {
                    "success": false,
                    "message": "User is already exists!",
                }
                this.log.info("User is already exists!");
                callback(rs);
            }
        })
    }

    public async update (data, callback) {
        Users.findOne({
            userName: data.userName
        }, (err, user) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": "User Update Error!",
                    "error": err,
                }
                this.log.error(err);
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

                user.save((err1, updatedUser) => {
                    if (err1) {
                        const result = {
                            "success": false,
                            "message": "User Update Error!",
                            "error": err1,
                        }
                        this.log.error(err1);
                        callback(result);
                    } else {
                        const result = {
                            "success": true,
                            "message": "User Update Succesful!",
                            "user": updatedUser,
                        }
                        this.log.info("User Update Succesful!");
                        callback(result);
                    }
                });
            }
        });
    }

    public async deleteById(Id, callback) {
        Users.findOne({
            id: Id
        }, (err, user) => {
            if (err) {
                const result = {
                    "success": false,
                    "message": "User notfound!",
                    "error": err,
                }
                this.log.error(err);
                callback(result);
            } else {
                user.delete((err1) => {
                    if (err1) {
                        const result = {
                            "success": false,
                            "message": "User Delete Failed!",
                            "error": err,
                        }
                        this.log.error(err);
                        callback(result);
                    } else {
                        const result = {
                            "success": false,
                            "message": "User Delete Succesful!",
                        }
                        this.log.info("User Delete Succesful!");
                        callback(result);
                    }
                });
            }
        });
    }
}