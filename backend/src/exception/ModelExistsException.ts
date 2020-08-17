export class ModelExistsException extends Error {
    constructor(modelName: string) {
        super(modelName + " is already exists!");
    }
}