export class SlugifyConfig {

    private _slugifyReplacement: string = "-";
    private _slugifyRemove = undefined;
    private _slugifyLower: boolean = true;
    private _slugifyStrict: boolean = false;
    private _slugifyLocale: string = "vi";

    get slugifyReplacement(): string {
        return this._slugifyReplacement;
    }

    get slugifyRemove(): any {
        return this._slugifyRemove;
    }

    get slugifyLower(): boolean {
        return this._slugifyLower;
    }

    get slugifyStrict(): boolean {
        return this._slugifyStrict;
    }

    get slugifyLocale(): string {
        return this._slugifyLocale;
    }
}
