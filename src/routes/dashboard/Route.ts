import {LogService} from "../../service/tool/LogService.js";
import {Logger} from "log4js";

export class Route {

    protected log: Logger;

    constructor(routeName: string){
        this.log = new LogService().getLogger(routeName);
    }

}