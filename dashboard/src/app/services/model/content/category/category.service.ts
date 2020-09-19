import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/model/content/Category';
import { BackendConfigService } from 'src/app/services/tool/backendconfig/backendconfig.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = new BackendConfigService().getCategoriesUrl();

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(this.url);
  }

  getCategoy(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertCategory(category: Category) {
    return this.http.post(this.url, category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.url, category);
  }

  deleteCategory(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
