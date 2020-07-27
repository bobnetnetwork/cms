/**
 * Data Model Interfaces
 */

import { User } from "./user.interface";
import { Users } from "./users.interface";

/**
 * In-Memory Store
 */

const users: Users = {
    1: {
        id: 1,
        name: "Burger",
        price: 5.99,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 2.99,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 1.99,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Users> => {
    return users;
};

export const find = async (id: number): Promise<User> => {
    const record: User = users[id];

    if (record) {
        return record;
    }

    throw new Error("No record found");
};

export const create = async (newUser: User): Promise<void> => {
    const id = new Date().valueOf();
    users[id] = {
        ...newUser,
        id
    };
};

export const update = async (updatedUser: User): Promise<void> => {
    if (users[updatedUser.id]) {
        users[updatedUser.id] = updatedUser;
        return;
    }

    throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
    const record: User = users[id];

    if (record) {
        delete users[id];
        return;
    }

    throw new Error("No record found to delete");
};