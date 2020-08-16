import express, {Request, Response} from "express";
import {LogService} from "../service/LogService.js";
import {UploadedFile} from "express-fileupload";

export class FilesRouter {

    private filesRouter = express.Router();

    private log = new LogService().getLogger("articlesRouter");

    public getFileRouter() {
        return this.filesRouter;
    }

    constructor() {
        this.uploadFiles();
    }

    private uploadFiles() {
        this.filesRouter.post("/upload", async (req: Request, res: Response) => {
            try {
                if(!req.files) {
                    res.send({
                       "status": false,
                       "message": "No file uploaded",
                    });
                } else {
                    const avatar = req.files.file as UploadedFile;

                    await avatar.mv("./uploads/" + avatar.name);

                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: avatar.name,
                            mimetype: avatar.mimetype,
                            size: avatar.size
                        }
                    });
                }
            } catch (e) {
                this.log.error(e.message);
                this.log.debug(e.stack);
                res.status(500).send(e);
            }
        });

    }

}