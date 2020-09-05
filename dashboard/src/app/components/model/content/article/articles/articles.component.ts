import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../../../services/model/content/article/article.service';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../../../../model/content/Article';

export class ArticleMessage {
  content: Article[];
  message: String;
}

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [HttpClient]
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
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
