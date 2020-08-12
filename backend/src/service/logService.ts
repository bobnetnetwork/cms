import log4js, {Logger} from "log4js";

export class LogService {

    constructor(){
        LogService.setConfigure()
    }

    private static setConfigure(): void{
        log4js.configure("./config/loggerConfig.json");
    }

    public getLogger(category?: string): Logger{
        return log4js.getLogger(category);
    }
}
