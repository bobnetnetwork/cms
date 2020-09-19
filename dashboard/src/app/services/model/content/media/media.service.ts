import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendConfigService } from 'src/app/services/tool/backendconfig/backendconfig.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url = new BackendConfigService().getMediaUrl();

  constructor(private http: HttpClient) { }

  getAllMedia() {
    return this.http.get(this.url);
  }

  getMedia(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertMedia(media: any) {
    return this.http.post(this.url, media);
  }

  updateMedia(media: any) {
    return this.http.put(this.url, media);
  }

  deleteMedia(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
