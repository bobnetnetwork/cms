import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../../../model/content/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://10.9.110.111:9421/api/v01/content/articles/';

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get(this.url);
  }

  getArticle(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertArticle(article: Article) {
    return this.http.post(this.url, article);
  }

  updateArticle(article: Article) {
    return this.http.put(this.url, article);
  }

  deleteArticle(slug: string) {
    return this.http.delete(this.url + slug);
  }

}
