import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/model/user/Role';
import { BackendConfigService } from 'src/app/services/tool/backendconfig/backendconfig.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = new BackendConfigService().getRolesUrl();

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get(this.url);
  }

  getRole(slug: string) {
    return this.http.get(this.url + slug);
  }

  insertRole(role: Role) {
    return this.http.post(this.url, role);
  }

  updateRole(role: Role) {
    return this.http.put(this.url, role);
  }

  deleteRole(slug: string) {
    return this.http.delete(this.url + slug);
  }
}
