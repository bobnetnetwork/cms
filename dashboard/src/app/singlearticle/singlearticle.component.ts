import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/model/content/Article';
import { ArticleService } from 'src/article.service';

export class ArticleMessage {
  content: Article[];
  message: String;
}

@Component({
  selector: 'app-singlearticle',
  templateUrl: './singlearticle.component.html',
  styleUrls: ['./singlearticle.component.css']
})
export class SinglearticleComponent implements OnInit {

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
