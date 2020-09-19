import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../../../../model/content/Page';
import { Observable } from 'rxjs';
import { BackendConfigService } from '../../../tool/backendconfig/backendconfig.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private url = new BackendConfigService().getPagesUrl();

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
