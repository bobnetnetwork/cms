import textVersionJs from "textversionjs";

import {
    Address,
    AmpAttachment, Attachment,
    AttachmentLike, Envelope,
    Headers,
    IcalAttachment,
    ListHeaders, TextEncoding,
} from "nodemailer/lib/mailer";
import {Readable} from "stream";
import MimeNode from "nodemailer/lib/mime-node";

export class EmailMessage {
    private _sender?: string | Address;
    private _receivers?: string | Address | string[] | Address[];
    private _cc?: string | Address | string[] | Address[];
    private _bcc?: string | Address | string[] | Address[];
    private _replyTo?: string | Address;
    private _inReplyTo?: string | Address;
    private _references?: string | string[];
    private _envelope?: Envelope | MimeNode.Envelope;

    private _subject?: string;
    private _text?: string | Buffer | Readable | AttachmentLike;
    private _html?: string | Buffer | Readable | AttachmentLike;
    private _amp?: string | Buffer | Readable | AmpAttachment;
    private _attachDataUrls?: boolean;
    private _watchHtml?: string | Buffer | Readable | AttachmentLike;
    private _attachments?: Attachment[];

    private _icalEvent?: string | Buffer | Readable | IcalAttachment;
    private _alternatives?: Attachment[];
    private _encoding?: string;
    private _raw?: string | Buffer | Readable | AttachmentLike;
    private _textEncoding?: TextEncoding;

    private _priority?: "high"|"normal"|"low";
    private _headers?: Headers;
    private _messageId?: string;
    private _date?: Date | string;
    private _list?: ListHeaders;

    private _disableFileAccess?: boolean;
    private _disableUrlAccess?: boolean;

    public generateEmailMessage() {
        return {
            sender:this._sender,
            receivers:this._receivers,
            cc:this._cc,
            bcc:this._bcc,
            replyTo:this._replyTo,
            inReplyTo:this._inReplyTo,
            references:this._references,
            envelope:this._envelope,

            subject:this._subject,
            text:this._text,
            html:this._html,
            amp:this._amp,
            attachDataUrls:this._attachDataUrls,
            watchHtml:this._watchHtml,
            attachments:this._attachments,

            icalEvent:this._icalEvent,
            alternatives:this._alternatives,
            encoding:this._encoding,
            raw:this._raw,
            textEncoding:this._textEncoding,

            priority:this._priority,
            headers:this._headers,
            messageId:this._messageId,
            date:this._date,
            list:this._list,

            disableFileAccess:this._disableFileAccess,
            disableUrlAccess:this._disableUrlAccess,
        };
    }

   public generateTextFromHtml(html?: string): void {
        if(!html) {
            if (typeof this._html === "string") {
                this._text = textVersionJs(this._html);
            }
        } else {
            this._html = html;
            this._text = textVersionJs(html);
        }
    }

    get sender(): string | Address | undefined {
        return this._sender;
    }

    set sender(value: string | Address | undefined) {
        this._sender = value;
    }

    get receivers(): string | Address | string[] | Address[] | undefined {
        return this._receivers;
    }

    set receivers(value: string | Address | string[] | Address[] | undefined) {
        this._receivers = value;
    }

    get cc(): string | Address | string[] | Address[] | undefined {
        return this._cc;
    }

    set cc(value: string | Address | string[] | Address[] | undefined) {
        this._cc = value;
    }

    get bcc(): string | Address | string[] | Address[] | undefined {
        return this._bcc;
    }

    set bcc(value: string | Address | string[] | Address[] | undefined) {
        this._bcc = value;
    }

    get replyTo(): string | Address | undefined {
        return this._replyTo;
    }

    set replyTo(value: string | Address | undefined) {
        this._replyTo = value;
    }

    get inReplyTo(): string | Address | undefined {
        return this._inReplyTo;
    }

    set inReplyTo(value: string | Address | undefined) {
        this._inReplyTo = value;
    }

    get references(): string | string[] | undefined {
        return this._references;
    }

    set references(value: string | string[] | undefined) {
        this._references = value;
    }

    get envelope(): Envelope | MimeNode.Envelope | undefined {
        return this._envelope;
    }

    set envelope(value: Envelope | MimeNode.Envelope | undefined) {
        this._envelope = value;
    }

    get subject(): string | undefined {
        return this._subject;
    }

    set subject(value: string | undefined) {
        this._subject = value;
    }

    get text(): string | Buffer | Readable | AttachmentLike | undefined {
        return this._text;
    }

    set text(value: string | Buffer | Readable | AttachmentLike | undefined) {
        this._text = value;
    }

    get html(): string | Buffer | Readable | AttachmentLike | undefined {
        return this._html;
    }

    set html(value: string | Buffer | Readable | AttachmentLike | undefined) {
        this._html = value;
    }

    get amp(): string | Buffer | Readable | AmpAttachment | undefined {
        return this._amp;
    }

    set amp(value: string | Buffer | Readable | AmpAttachment | undefined) {
        this._amp = value;
    }

    get attachDataUrls(): boolean | undefined {
        return this._attachDataUrls;
    }

    set attachDataUrls(value: boolean | undefined) {
        this._attachDataUrls = value;
    }

    get watchHtml(): string | Buffer | Readable | AttachmentLike | undefined {
        return this._watchHtml;
    }

    set watchHtml(value: string | AttachmentLike | Buffer | Readable | undefined) {
        this._watchHtml = value;
    }

    get attachments(): Attachment[] | undefined {
        return this._attachments;
    }

    set attachments(value: Attachment[] | undefined) {
        this._attachments = value;
    }

    get icalEvent(): string | Buffer | Readable | IcalAttachment | undefined {
        return this._icalEvent;
    }

    set icalEvent(value: string | Buffer | Readable | IcalAttachment | undefined) {
        this._icalEvent = value;
    }

    get alternatives(): Attachment[] | undefined {
        return this._alternatives;
    }

    set alternatives(value: Attachment[] | undefined) {
        this._alternatives = value;
    }

    get encoding(): string | undefined {
        return this._encoding;
    }

    set encoding(value: string | undefined) {
        this._encoding = value;
    }

    get raw(): string | Buffer | Readable | AttachmentLike | undefined {
        return this._raw;
    }

    set raw(value: string | Buffer | Readable | AttachmentLike | undefined) {
        this._raw = value;
    }

    get textEncoding(): TextEncoding | undefined {
        return this._textEncoding;
    }

    set textEncoding(value: TextEncoding | undefined ) {
        this._textEncoding = value;
    }

    get priority(): "high" | "normal" | "low" | undefined {
        return this._priority;
    }

    set priority(value: "high" | "normal" | "low" | undefined) {
        this._priority = value;
    }

    get headers(): Headers | undefined {
        return this._headers;
    }

    set headers(value: Headers | undefined) {
        this._headers = value;
    }

    get messageId(): string | undefined {
        return this._messageId;
    }

    set messageId(value: string | undefined) {
        this._messageId = value;
    }

    get date(): string | Date | undefined {
        return this._date;
    }

    set date(value: string | Date | undefined) {
        this._date = value;
    }

    get list(): ListHeaders | undefined {
        return this._list;
    }

    set list(value: ListHeaders | undefined) {
        this._list = value;
    }

    get disableFileAccess(): boolean | undefined {
        return this._disableFileAccess;
    }

    set disableFileAccess(value: boolean | undefined) {
        this._disableFileAccess = value;
    }

    get disableUrlAccess(): boolean | undefined {
        return this._disableUrlAccess;
    }

    set disableUrlAccess(value: boolean | undefined) {
        this._disableUrlAccess = value;
    }
}