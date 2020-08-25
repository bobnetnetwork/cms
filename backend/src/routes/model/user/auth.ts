import jwt from "express-jwt";

const getTokenFromHeaders = (req: any) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(" ")[0] === "Token") {
        return authorization.split(" ")[1];
    }
    return null;
};

export const auth = {
    optional: jwt({
        algorithms: ["RS256"],
        credentialsRequired: false,
        getToken: getTokenFromHeaders,
        secret: "secret",
        userProperty: "payload",
    }),
    required: jwt({
        algorithms: ["RS256"],
        getToken: getTokenFromHeaders,
        secret: "secret",
        userProperty: "payload",
    }),
};
