export class HttpException extends Error {
    public statusCode: number;
    public message: string;
    public error: string | null;

    constructor(statusCode: number, message: string, error?: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
