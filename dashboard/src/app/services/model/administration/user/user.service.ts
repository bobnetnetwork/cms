import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/User';
import { BackendConfigService } from 'src/app/services/tool/backendconfig/backendconfig.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = new BackendConfigService().getUsersUrl();

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.url);
  }

  getUser(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertUser(user: User) {
    return this.http.post(this.url, user);
  }

  updateUser(user: User) {
    return this.http.put(this.url, user);
  }

  deleteUser(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
