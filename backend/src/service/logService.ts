import log4js from "log4js";
import {Config} from "../config/config.js";

log4js.configure("./config/loggerConfig.json");

export const getLogger = (category?: string) => {
    return log4js.getLogger(category);
}