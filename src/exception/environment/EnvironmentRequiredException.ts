export class EnvironmentRequiredException extends Error {
    constructor(environment: string) {
        super("The " + environment + " environment is required!");
    }
}