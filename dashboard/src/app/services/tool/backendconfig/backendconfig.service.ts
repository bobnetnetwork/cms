import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendConfigService {
  private bePort: string;
  private beHost: string;
  private beProtocol: string;
  private beApiPath: string;
  
  constructor() { 
    this.bePort = "9421";
    this.beHost = "10.9.110.111";
    this.beProtocol = "http";
    this.beApiPath= "/api/v01/";
  }

  private getBaseUrl(): string {
    return this.beProtocol + "://" + this.beHost + ":" + this.bePort + this.beApiPath;
  }

  private getContentUrl(): string {
    return this.getBaseUrl() + "content/";
  }

  public getArticlesUrl(): string {
    return this.getContentUrl() + "articles/";
  }

  public getPagesUrl(): string {
    return this.getContentUrl() + "page/";
  }

  public getCategoriesUrl(): string {
    return this.getContentUrl() + "category/";
  }

  public getTagsUrl(): string {
    return this.getContentUrl() + "tag/";
  }

  public getMediaUrl(): string {
    return this.getContentUrl() + "files/";
  }

  public getUsersUrl(): string {
    return this.getBaseUrl() + "";
  }

  public getRolesUrl(): string {
    return this.getBaseUrl() + "";
  }

  public getSettingsUrl(): string {
    return this.getBaseUrl() + "";
  }

}
