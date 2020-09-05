import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/article.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/model/content/Article';

export class ArticleMessage {
  content: Article[]
  message: String
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [HttpClient]
})
export class ArticleComponent implements OnInit {

  articles: Article[]
  msg: ArticleMessage;

  constructor(private service: ArticleService) {
    console.log(this.service.getAllArticles());
    this.service.getAllArticles().subscribe(res => {
      console.log(res);
      this.msg = res as ArticleMessage;
      console.log(this.msg);
      this.articles = this.msg.content;
      console.log(this.articles);
    });
    //this.service.getAllArticles().subscribe(articles => this.articles = articles as Article[])
  }

  ngOnInit(): void {
  }

}
