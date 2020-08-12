import nodemailer from "nodemailer";
import textVersionJs from "textversionjs";
import {LogService} from "./LogService.js";
import dotenv from "dotenv";

export class EmailService {

    private log = new LogService().getLogger("EmailService");

    private readonly host;
    private readonly port;
    private readonly secure;
    private readonly userName;
    private readonly pwd;

    private sender;
    private receivers;
    private cc;
    private bcc;

    private subject;
    private text;
    private html;
    private amp;
    private attachments;

    private transporter;
    private message;

    private info;

    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            dotenv.config();
        }
        this.host = process.env.MAIL_SERVER_HOST;
        this.port = parseInt(process.env.MAIL_SERVER_PORT as string, 10);
        this.secure = (process.env.MAIL_SERVER_SECURE === "true");
        this.userName = process.env.MAIL_SERVER_USER;
        this.pwd = process.env.MAIL_SERVER_PW;
        this.generateTransporter();
    }

    public async sendMail() {
        this.generateMessage();

        try{
            this.info = await this.transporter.sendMail(this.message);

            this.log.info("Message sent: %s", this.info.messageId);
        } catch (e) {
            this.log.error(e.message);
            this.log.debug(e.stack);
        }
    }

    private generateTransporter() {
        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: {
                user: this.userName,
                pass: this.pwd
            }
        });
    }

    private generateMessage() {
        this.message = {
            from: this.sender,
            to: this.receivers,
            cc: this.cc,
            bcc: this.bcc,
            subject: this.subject,
            text: this.text,
            html: this.html,
            amp: this.amp,
            attachments: this.attachments
        }
    }

    public setSender(sender) {
        this.sender = sender;
    }

    public setReceivers(receivers) {
        this.receivers = receivers;
    }

    public setCc(cc) {
        this.cc = cc;
    }

    public setBcc(bcc) {
        this.bcc = bcc;
    }

    public setSubject(subject) {
        this.subject = subject;
    }

    public setText(text) {
        this.text = text;
    }

    public setHtml(html) {
        this.html = html;
    }

    public setAmp(amp) {
        this.amp = amp;
    }

    public setAttachments(attachments) {
        this.attachments = attachments;
    }

    public generateTextFromHtml(html?) {
        if(!html) {
            this.text = textVersionJs.htmlToPlainText(this.html);
        } else {
            this.html = html;
            this.text = textVersionJs.htmlToPlainText(html);
        }
    }
}