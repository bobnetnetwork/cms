import express, {Request, Response, Router} from "express";

export class RootRouter {

    private rootRouter: Router = express.Router()

    constructor() {
        this.getRootPath();
    }

    public getRootRouter(): Router {
        return this.rootRouter;
    }

    private getRootPath(): void {
        this.rootRouter.get("/", async (req: Request, res: Response) => {
            res.status(200).json({
                message: "Welcome to CMS_DEV server by BobNET Network!",
            });
        });
    }
}