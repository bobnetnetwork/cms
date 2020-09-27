import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/model/content/article/article.service';
import { HttpClient } from '@angular/common/http';
import {Article, ArticlesMessage} from 'src/app/model/content/Article';

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [HttpClient]
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  msg: ArticlesMessage;

  constructor(private service: ArticleService) {
    this.service.getAllArticles().subscribe(res => {
      this.msg = res as ArticlesMessage;
      this.articles = this.msg.content;
    });
  }

  ngOnInit(): void {
  }

}
