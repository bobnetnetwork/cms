export class ModelExistsException extends Error {
    constructor() {
        super("The content is already exists!");
    }
}
