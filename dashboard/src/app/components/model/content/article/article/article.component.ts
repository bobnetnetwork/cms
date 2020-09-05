import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/content/Article';
import { ArticleService } from 'src/app/services/model/content/article/article.service';

export class ArticleMessage {
  content: Article[];
  message: String;
}

@Component({
  selector: 'app-singlearticle',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private slug: string;
  private msg: ArticleMessage;
  article: Article;

  constructor(private route: ActivatedRoute, private service: ArticleService) {
    this.slug = this.route.snapshot.paramMap.get('articleslug');
    this.service.getArticle(this.slug).subscribe(res => {
      console.log(res);
      this.msg = res as ArticleMessage;
      this.article = this.msg.content as Article;
    });
  }

  ngOnInit(): void {

  }

}
