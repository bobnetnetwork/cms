import log4js, {Logger} from "log4js";

log4js.configure("./config/loggerConfig.json");

export class LogService {

    constructor(){
        //
    }

    public getLogger(category?: string): Logger{
        return log4js.getLogger(category);
    }
}
