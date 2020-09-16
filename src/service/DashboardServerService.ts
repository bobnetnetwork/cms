import { ServerService } from './ServerService.js';
import * as HTTP from "http";

export class DashboardServerService implements ServerService {

    public startServer(app: HTTP.RequestListener): void{

    }
    
    public shutDown(msg: string): void{
        
    }

}