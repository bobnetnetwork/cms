import {ModelRouter} from "../ModelRouter.js";
import {Request, Response} from "express";
import {ContentService} from "../../../service/model/content/ContentService.js";

export abstract class ContentRouter extends ModelRouter {
    protected abstract service: ContentService;

    protected constructor(routerName: string) {
        super(routerName);
        this.get();
        this.delete();
    }

    protected get(): void {
        this.router.get("/:slug", async (req: Request, res: Response) => {
            try {
                await this.service.findBySlug(req.params.slug, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(404).json(result);
                    } else {
                        res.status(200).json(result);
                    }
                });
            } catch (e) {
                res.status(404).send(e.message);
                this.log.error(e.message);
                this.log.debug(e.stack);
            }
        });
    }

    protected delete(): void {
        this.router.delete("/:slug", async (req: Request, res: Response) => {
            try {
                await this.service.deleteBySlug(req.params.slug, (result: any) => {
                    if(result.error) {
                        this.log.error(result.error.message);
                        this.log.debug(result.error.stack);
                        res.status(500).json(result);
                    } else {
                        this.log.info("Article (" + req.body.userName + ") deleted!");
                        res.status(200).json(result);
                    }
                });
            } catch (e) {
                this.log.error(e.message);
                this.log.debug(e.stack);
                res.status(500).send(e.message);
            }
        });
    }
}