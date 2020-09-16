import {ContentRouter} from "./ContentRouter.js";
import {FileService} from "../../../service/model/content/FileService.js";

export class FileRouter extends ContentRouter {
    protected service: FileService = new FileService();

    constructor() {
        super("FileRouter");
    }
}
