import axios from "axios";
import {Article} from "../../model/content/Article.js"

export class ArticlesRoute {
    
    private view: string;

    constructor(view: string){
        this.view = view;
    }

    public async getRoute(req: any, res: any): Promise<void> {
        const url: string = 'http://10.9.110.111:9421/api/v01/content/articles';

            try {
                const response = await axios.get(url);
                var cikkek:[Article] = response.data.content;
                res.render('cikkek', { articles: cikkek});
            } catch (exception) {
                process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
            }
    }
}