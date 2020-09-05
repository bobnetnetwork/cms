import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Article } from "./model/content/Article"

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string = "http://10.9.110.111:9421/api/v01/content/articles/"

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url)
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(this.url + slug)
  }

  insertArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url, article)
  }

  updateArticle(article: Article): Observable<void> {
    return this.http.put<void>(this.url + article.slug, article)
  }

  deleteArticle(slug: string) {
    return this.http.delete(this.url + slug)
  }

}
