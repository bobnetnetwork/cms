import slugify from "slugify";
import fs from "fs";

export class SlugifyService {
    private readonly conf: string | { };

    constructor() {
        this.conf = JSON.parse(fs.readFileSync("./config/SlugifyConfig.json", "utf-8"));
    }

    public createSlug(text: string): string {
        return slugify(text, this.conf);
    }
}
