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
    this.service.getAllArticles().subscribe(res => {
      this.msg = res as ArticleMessage;
      this.articles = this.msg.content;
    });
  }

  ngOnInit(): void {
  }

}
