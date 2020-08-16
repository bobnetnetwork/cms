// import textVersionJs from "textversionjs";

export class EmailMessage {
    private _sender: any;
    private _receivers: any;
    private _cc: any;
    private _bcc: any;
    private _replyTo: any;
    private _inReplyTo: any;
    private _references: any;
    private _envelope: any;

    private _subject: any;
    private _text: string | undefined;
    private _html: string | undefined;
    private _amp: any;
    private _attachDataUrls: any;
    private _watchHtml: any;
    private _attachments: any;

    private _icalEvent: any;
    private _alternatives: any;
    private _encoding: any;
    private _raw: any;
    private _textEncoding: any;

    private _priority: any;
    private _headers: any;
    private _messageId: any;
    private _date: any;
    private _list: any;

    private _disableFileAccess: any;
    private _disableUrlAccess: any;

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
        }
    }

   /* public generateTextFromHtml(html?: string) {
        if(!html) {
            this._text = textVersionJs(this._html);
        } else {
            this._html = html;
            this._text = textVersionJs(html);
        }
    }*/

    get sender() {
        return this._sender;
    }

    set sender(value) {
        this._sender = value;
    }

    get receivers() {
        return this._receivers;
    }

    set receivers(value) {
        this._receivers = value;
    }

    get cc() {
        return this._cc;
    }

    set cc(value) {
        this._cc = value;
    }

    get bcc() {
        return this._bcc;
    }

    set bcc(value) {
        this._bcc = value;
    }

    get replyTo() {
        return this._replyTo;
    }

    set replyTo(value) {
        this._replyTo = value;
    }

    get inReplyTo() {
        return this._inReplyTo;
    }

    set inReplyTo(value) {
        this._inReplyTo = value;
    }

    get references() {
        return this._references;
    }

    set references(value) {
        this._references = value;
    }

    get envelope() {
        return this._envelope;
    }

    set envelope(value) {
        this._envelope = value;
    }

    get subject() {
        return this._subject;
    }

    set subject(value) {
        this._subject = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    get html() {
        return this._html;
    }

    set html(value) {
        this._html = value;
    }

    get amp() {
        return this._amp;
    }

    set amp(value) {
        this._amp = value;
    }

    get attachDataUrls() {
        return this._attachDataUrls;
    }

    set attachDataUrls(value) {
        this._attachDataUrls = value;
    }

    get watchHtml() {
        return this._watchHtml;
    }

    set watchHtml(value) {
        this._watchHtml = value;
    }

    get attachments() {
        return this._attachments;
    }

    set attachments(value) {
        this._attachments = value;
    }

    get icalEvent() {
        return this._icalEvent;
    }

    set icalEvent(value) {
        this._icalEvent = value;
    }

    get alternatives() {
        return this._alternatives;
    }

    set alternatives(value) {
        this._alternatives = value;
    }

    get encoding() {
        return this._encoding;
    }

    set encoding(value) {
        this._encoding = value;
    }

    get raw() {
        return this._raw;
    }

    set raw(value) {
        this._raw = value;
    }

    get textEncoding() {
        return this._textEncoding;
    }

    set textEncoding(value) {
        this._textEncoding = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get headers() {
        return this._headers;
    }

    set headers(value) {
        this._headers = value;
    }

    get messageId() {
        return this._messageId;
    }

    set messageId(value) {
        this._messageId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get list() {
        return this._list;
    }

    set list(value) {
        this._list = value;
    }

    get disableFileAccess() {
        return this._disableFileAccess;
    }

    set disableFileAccess(value) {
        this._disableFileAccess = value;
    }

    get disableUrlAccess() {
        return this._disableUrlAccess;
    }

    set disableUrlAccess(value) {
        this._disableUrlAccess = value;
    }
}