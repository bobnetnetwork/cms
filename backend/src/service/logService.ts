import pkg from "log4js";
const {getLogger} = pkg;
import { Config } from "../config/config.js";

const logger = getLogger();
logger.level = Config.logLevel;

export const trace = (msg) => {
    logger.trace(msg);
}

export const debug = (msg) => {
    logger.debug(msg);
}

export const info = (msg) => {
    logger.info(msg);
}

export const warn = (msg) => {
    logger.warn(msg);
}

export const error = (msg) => {
    logger.error(msg);
}

export const fatal = (msg) => {
    logger.fatal(msg);
}
