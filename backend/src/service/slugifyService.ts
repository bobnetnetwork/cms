import slugify from'slugify'
import {Config} from "../config/config.js";

const conf = {
    replacement: Config.slugifyReplacement,  // replace spaces with replacement character, defaults to `-`
    remove: Config.slugifyRemove, // remove characters that match regex, defaults to `undefined`
    lower: Config.slugifyLower,      // convert to lower case, defaults to `false`
    strict: Config.slugifyStrict,     // strip special characters except replacement, defaults to `false`
    locale: Config.slugifyLocale,      // language code of the locale to use
}

export const createSlug = (text) => {
    return slugify(text, conf);
}