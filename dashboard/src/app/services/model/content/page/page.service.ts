import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../../../../model/content/Page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private url = "http://10.9.110.111:9421/api/v01/content/page/";

  constructor(private http: HttpClient) { }

  getAllPages() {
    return this.http.get(this.url);
  }

  getPage(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertPage(page: Page): Observable<Page> {
    return this.http.post<Page>(this.url, page);
  }

  updatePage(page: Page): Observable<void> {
    return this.http.put<void>(this.url + page.slug, page);
  }

  deletePage(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
