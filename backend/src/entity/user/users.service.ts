/**
 * Data Model Interfaces
 */

import * as database from "../../service/dbService.js";
import * as Logger from "../../service/logService.js";
import {User} from "./user.js";

database.connectToDB();

/**
 * Service Methods
 */

export const findAll = async (callback) => {
    return User.find({}, (err, users) => {
        if (err) {
            const result = {
                "success": false,
                "message": "Authentication failed or User not found.",
                "error": err,
            }
            Logger.error(err);
            callback(result);
        } else {
            const result = {
                "success": true,
                "message": "Successful, User Found!",
                "user": users,
            }
            Logger.info("Successful, User Found!");
            callback(result);
        }
    });
};

export const findById = async (Id, callback) => {
    return User.findOne({
        id: Id
    }, (err, user) => {
        if(err) {
            const result = {
                "success": false,
                "message": "Authentication failed or User not found.",
                "error": err,
            }
            Logger.error(err);
            callback(result);
        } else {
            if(!user) {
                const result = {
                    "success": false,
                    "message": "User Not found in database!",
                    "error": err,
                }
                Logger.error(err);
                callback(result);
            } else {
                const result = {
                    "success": true,
                    "message": "Successful, User Found!",
                    "user": user,
                }
                Logger.info("Successful, User Found!");
                callback(result);
            }
        }
    })
}

export const create = async (data, callback) => {
    const newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        pwd: data.pwd,
        id: data.id,
        accountExpired: data.accountExpired,
        accountLocked: data.accountLocked,
        credentialsExpired: data.credentialsExpired,
        enabled: data.enabled,
        registeredAt: data.registeredAt,
        roles: data.roles,
    });

    newUser.save( (err) => {
       if(err) {
           const result = {
               "success": false,
               "message": "Authentication failed or User creation failed.",
               "error": err,
           }
           Logger.error(err);
           callback(result);
       } else {
           const result = {
               "success": true,
               "message": "User Register Succesful!",
               "user": newUser,
           }
           Logger.info("User Register Succesful!");
           callback(result);
       }
    });
}

export const update = async (data, callback) => {
    User.findOne({
        userName: data.userName
    }, (err, user) => {
        if(err){
            const result = {
                "success": false,
                "message": "User Update Error!",
                "error": err,
            }
            Logger.error(err);
            callback(result);
        } else {
            if(data.firstName !== undefined) user.firstName = data.firstName;
            // mindet megnézni
            user.save( (err1, updatedUser) => {
                if(err1){
                    const result = {
                        "success": false,
                        "message": "User Update Error!",
                        "error": err1,
                    }
                    Logger.error(err1);
                    callback(result);
                } else {
                    const result = {
                        "success": true,
                        "message": "User Update Succesful!",
                        "user": updatedUser,
                    }
                    Logger.info("User Update Succesful!");
                    callback(result);
                }
            });
        }
    });
}

export const deleteById = async (Id, callback) => {
    User.findOne({
        id: Id
    }, (err, user) => {
        if(err) {
            const result = {
                "success": false,
                "message": "User notfound!",
                "error": err,
            }
            Logger.error(err);
            callback(result);
        } else {
            user.delete( (err1) => {
                if(err1) {
                    const result = {
                        "success": false,
                        "message": "User Delete Failed!",
                        "error": err,
                    }
                    Logger.error(err);
                    callback(result);
                } else {
                    const result = {
                        "success": false,
                        "message": "User Delete Succesful!",
                    }
                    Logger.info("User Delete Succesful!");
                    callback(result);
                }
            });
        }
    });
}
