export class ModelRequiredDataException extends Error {
    constructor() {
        super("Not contains all required data!");
    }
}
