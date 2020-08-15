import slugify from'slugify'
import {SlugifyConfig} from "../config/SlugifyConfig.js";

export class SlugifyService {
    private readonly conf: string | { replacement?: string; remove?: RegExp; lower?: boolean; strict?: boolean; locale?: string; };
    private cfg: SlugifyConfig;

    constructor() {
        this.cfg = new SlugifyConfig();
        this.conf = {
            replacement: this.cfg.slugifyReplacement,  // replace spaces with replacement character, defaults to `-`
            remove: this.cfg.slugifyRemove, // remove characters that match regex, defaults to `undefined`
            lower: this.cfg.slugifyLower,      // convert to lower case, defaults to `false`
            strict: this.cfg.slugifyStrict,     // strip special characters except replacement, defaults to `false`
            locale: this.cfg.slugifyLocale,      // language code of the locale to use
        }
    }

    public createSlug(text: string) {
        return slugify(text, this.conf);
    }
}