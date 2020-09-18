export class ModelNotFoundException extends Error {

    constructor() {
        super("Content not found in database!");
    }
}
