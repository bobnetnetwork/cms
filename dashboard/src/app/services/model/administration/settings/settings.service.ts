import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendConfigService } from 'src/app/services/tool/backendconfig/backendconfig.service';
import { Option } from 'src/app/model/administration/Option';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private url = new BackendConfigService().getSettingsUrl();

  constructor(private http: HttpClient) { }

  getAllOptions() {
    return this.http.get(this.url);
  }

  getOption(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertOption(option: Option) {
    return this.http.post(this.url, option);
  }

  updateOption(option: Option) {
    return this.http.put(this.url, option);
  }

  deleteOption(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
