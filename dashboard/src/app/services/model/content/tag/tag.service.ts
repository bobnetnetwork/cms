import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'src/app/model/content/Tag';
import { BackendConfigService } from 'src/app/services/tool/backendconfig/backendconfig.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url = new BackendConfigService().getTagsUrl();

  constructor(private http: HttpClient) { }

  getAllTags() {
    return this.http.get(this.url);
  }

  getTag(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertTag(tag: Tag) {
    return this.http.post(this.url, tag);
  }

  updateTag(tag: Tag) {
    return this.http.put(this.url, tag);
  }

  deleteTag(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
