import slugify from'slugify'
import {Config} from "../config/config.js";

export class SlugifyService {
    private readonly conf;

    constructor() {
        this.conf = {
            replacement: Config.slugifyReplacement,  // replace spaces with replacement character, defaults to `-`
            remove: Config.slugifyRemove, // remove characters that match regex, defaults to `undefined`
            lower: Config.slugifyLower,      // convert to lower case, defaults to `false`
            strict: Config.slugifyStrict,     // strip special characters except replacement, defaults to `false`
            locale: Config.slugifyLocale,      // language code of the locale to use
        }
    }

    public createSlug(text) {
        return slugify(text, this.conf);
    }
}