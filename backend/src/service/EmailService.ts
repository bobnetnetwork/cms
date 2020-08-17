import nodemailer, {SentMessageInfo} from "nodemailer";
import {LogService} from "./tool/LogService.js";
import dotenv from "dotenv";
import {EmailMessage} from "../model/EmailMessage";
import {Logger} from "log4js";

export class EmailService {
    private log: Logger = new LogService().getLogger("EmailService");

    private readonly HOST: string;
    private readonly PORT: number;
    private readonly SECURE: boolean;
    private readonly USER: string;
    private readonly PWD: string;

    private transporter: import("nodemailer/lib/mailer");
    private info: SentMessageInfo;
    private _emailMessage: EmailMessage = new EmailMessage();

    constructor() {
        if (process.env.NODE_ENV !== "production") {
            dotenv.config();
        }

        if(process.env.MAIL_SERVER_HOST){
            this.HOST = process.env.MAIL_SERVER_HOST;
        } else {
            this.log.error("The MAIL_SERVER_HOST environment is required!");
            process.exit(1);
        }

        if(process.env.MAIL_SERVER_PORT){
            this.PORT = parseInt(process.env.MAIL_SERVER_PORT, 10);
        } else {
            this.log.error("The MAIL_SERVER_PORT environment is required!");
            process.exit(1);
        }

        if(process.env.MAIL_SERVER_SECURE){
            this.SECURE = (process.env.MAIL_SERVER_SECURE === "true");
        } else {
            this.log.error("The MAIL_SERVER_SECURE environment is required!");
            process.exit(1);
        }

        if(process.env.MAIL_SERVER_USER){
            this.USER = process.env.MAIL_SERVER_USER;
        } else {
            this.log.error("The MAIL_SERVER_USER environment is required!");
            process.exit(1);
        }

        if(process.env.MAIL_SERVER_PWD){
            this.PWD = process.env.MAIL_SERVER_PWD;
        } else {
            this.log.error("The MAIL_SERVER_PWD environment is required!");
            process.exit(1);
        }

        this.transporter = nodemailer.createTransport({
            auth: {
                pass: this.PWD,
                user: this.USER,
            },
            host: this.HOST,
            port: this.PORT,
            secure: this.SECURE,
        });
    }

    public async send(): Promise<void> {
        try{
            this.info = await this.transporter.sendMail(this._emailMessage.generateEmailMessage());

            if(this.info){
                this.log.info("Message sent: %s", this.info.messageId);
            } else {
                this.log.info("Message sent");
            }

        } catch (e) {
            this.log.error(e.message);
            this.log.debug(e.stack);
        }
    }

    get emailMessage(): EmailMessage {
        return this._emailMessage;
    }

    set emailMessage(value: EmailMessage) {
        this._emailMessage = value;
    }
}
