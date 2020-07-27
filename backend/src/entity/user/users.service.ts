/**
 * Data Model Interfaces
 */

import * as database from "../../service/dbService";
import * as Logger from "../../service/logService";
import {User} from './user';

database.connectToDB();

/**
 * Service Methods
 */

export const findAll = async (callback) => {
    return User.find({}, (err, users) => {
        if (err) {
            const result = {
                'success': false,
                'message': 'Authentication failed or User not found.',
                'error': err
            }
            Logger.error(err);
            callback(result);
        } else {
            const result = {
                'success': true,
                'message': 'Successful, User Found!',
                'user': users
            }
            Logger.info("Successful, User Found!");
            callback(result);
        }
    });
};
