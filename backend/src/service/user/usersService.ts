/**
 * Data Model Interfaces
 */
import * as Logger from "../logService.js";
import {Users} from "../../model/user/users.js";

const log = Logger.getLogger("usersService");

/**
 * Service Methods
 */
export const findAll = async (callback) => {
    return Users.find({}, (err, users) => {
        if (err) {
            const result = {
                "success": false,
                "message": "Authentication failed or User not found.",
                "error": err,
            }
            log.error(err);
            callback(result);
        } else {
            const result = {
                "success": true,
                "message": "Successful, User Found!",
                "user": users,
            }
            log.info("Successful, User Found!");
            callback(result);
        }
    });
};

export const findByUserName = async (UserName, callback) => {
    return Users.findOne({
        userName: UserName
    }, (err, user) => {
        if (err) {
            const result = {
                "success": false,
                "message": "Authentication failed or User not found.",
                "error": err,
            }
            log.error(err);
            callback(result);
        } else {
            if (!user) {
                const result = {
                    "success": false,
                    "message": "User Not found in database!",
                    "error": err,
                }
                log.error(err);
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, User Found!",
                    "user": user,
                }
                log.info("Successful, User Found!");
                callback(result);
            }
        }
    })
}

const isUnique = async (data, callback) => {
    Users.findOne({"userName": data.userName}, {"email": data.email}, (err, user) => {
        if(err){
            log.debug(err.message);
            callback(false);
        } else if(!user){
            callback(true);
        } else {
            callback(false);
        }
    });
}

const isContainAllRequiredData = async (data, callback) => {
    let result: boolean;
    result = (data.userName && data.pwd && data.email);
    callback(result);
}

function createUser(data) {
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

export const create = async (data, callback) => {
    await isUnique(data, (result) => {
        if (result) {
            isContainAllRequiredData(data, (rst) => {
                if(rst){
                    const newUser = createUser(data);

                    newUser.save((err) => {
                        if (err) {
                            const rstUser1 = {
                                "success": false,
                                "message": "Authentication failed or User creation failed.",
                                "error": err,
                            }
                            log.error(err);
                            callback(rstUser1);
                        } else {
                            const rstUser2 = {
                                "success": true,
                                "message": "User Register Succesful!",
                                "user": newUser,
                            }
                            log.info("User Register Succesful!");
                            callback(rstUser2);
                        }
                    });
                } else {
                    const rs2 = {
                        "success": false,
                        "message": "Not contains all required data!",
                    }
                    log.info("Not contains all required data!");
                    callback(rs2);
                }
            })
        } else {
            const rs = {
                "success": false,
                "message": "User is already exists!",
            }
            log.info("User is already exists!");
            callback(rs);
        }
    })
}

export const update = async (data, callback) => {
    Users.findOne({
        userName: data.userName
    }, (err, user) => {
        if (err) {
            const result = {
                "success": false,
                "message": "User Update Error!",
                "error": err,
            }
            log.error(err);
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
                    log.error(err1);
                    callback(result);
                } else {
                    const result = {
                        "success": true,
                        "message": "User Update Succesful!",
                        "user": updatedUser,
                    }
                    log.info("User Update Succesful!");
                    callback(result);
                }
            });
        }
    });
}

export const deleteById = async (Id, callback) => {
    Users.findOne({
        id: Id
    }, (err, user) => {
        if (err) {
            const result = {
                "success": false,
                "message": "User notfound!",
                "error": err,
            }
            log.error(err);
            callback(result);
        } else {
            user.delete((err1) => {
                if (err1) {
                    const result = {
                        "success": false,
                        "message": "User Delete Failed!",
                        "error": err,
                    }
                    log.error(err);
                    callback(result);
                } else {
                    const result = {
                        "success": false,
                        "message": "User Delete Succesful!",
                    }
                    log.info("User Delete Succesful!");
                    callback(result);
                }
            });
        }
    });
}
