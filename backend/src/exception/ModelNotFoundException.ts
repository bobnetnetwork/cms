export class ModelNotFoundException extends Error {

    constructor(modelName: string) {
        super(modelName + " not found in database!");
    }
}
