import nodemailer from "nodemailer";
import {LogService} from "./LogService.js";
import dotenv from "dotenv";
import {EmailMessage} from "../model/EmailMessage";

export class EmailService {
    private log = new LogService().getLogger("EmailService");

    private readonly HOST;
    private readonly PORT;
    private readonly SECURE;
    private readonly USER;
    private readonly PWD;

    private transporter;
    private info;
    private _emailMessage = new EmailMessage();

    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            dotenv.config();
        }
        this.HOST = process.env.MAIL_SERVER_HOST;
        this.PORT = parseInt(process.env.MAIL_SERVER_PORT as string, 10);
        this.SECURE = (process.env.MAIL_SERVER_SECURE === "true");
        this.USER = process.env.MAIL_SERVER_USER;
        this.PWD = process.env.MAIL_SERVER_PWD;
        this.generateTransporter();
    }

    public async send() {
        try{
            this.info = await this.transporter.sendMail(this._emailMessage.generateEmailMessage());

            this.log.info("Message sent: %s", this.info.messageId);
        } catch (e) {
            this.log.error(e.message);
            this.log.debug(e.stack);
        }
    }

    private generateTransporter() {
        this.transporter = nodemailer.createTransport({
            host: this.HOST,
            port: this.PORT,
            secure: this.SECURE,
            auth: {
                user: this.USER,
                pass: this.PWD
            },
        });
    }

    get emailMessage(): EmailMessage {
        return this._emailMessage;
    }

    set emailMessage(value: EmailMessage) {
        this._emailMessage = value;
    }
}