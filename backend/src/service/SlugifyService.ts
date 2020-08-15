import slugify from'slugify'
import fs from "fs";

export class SlugifyService {
    private readonly conf: string | { replacement?: string; remove?: RegExp; lower?: boolean; strict?: boolean; locale?: string; };

    constructor() {
        this.conf = JSON.parse(fs.readFileSync("./config/SlugifyConfig.json", "utf-8"));
    }

    public createSlug(text: string) {
        return slugify(text, this.conf);
    }
}