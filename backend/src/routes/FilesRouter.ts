import express, {Request, Response, Router} from "express";
import {LogService} from "../service/LogService.js";
import {UploadedFile} from "express-fileupload";
import {Logger} from "log4js";

export class FilesRouter {

    private filesRouter: Router = express.Router();

    private log: Logger = new LogService().getLogger("articlesRouter");

    constructor() {
        this.uploadFiles();
    }


    public getFileRouter(): Router {
        return this.filesRouter;
    }

    private uploadFiles(): void {
        this.filesRouter.post("/upload", async (req: Request, res: Response) => {
            try {
                if(!req.files) {
                    res.send({
                       "message": "No file uploaded",
                        "status": false,
                    });
                } else {
                    const avatar = req.files.file as UploadedFile;

                    await avatar.mv("./uploads/" + avatar.name);

                    res.send({
                        data: {
                            mimetype: avatar.mimetype,
                            name: avatar.name,
                            size: avatar.size,
                        },
                        message: "File is uploaded",
                        status: true,
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
