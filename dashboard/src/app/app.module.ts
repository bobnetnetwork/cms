import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/model/content/article/articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { AppheaderComponent } from './components/template/appheader/appheader.component';
import { AppmenuComponent } from './components/template/appmenu/appmenu.component';
import { AppfooterComponent } from './components/template/appfooter/appfooter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './components/model/content/article/article/article.component';
import { PagesComponent } from './components/model/content/page/pages/pages.component';
import { PageComponent } from './components/model/content/page/page/page.component';
import { NewarticleComponent } from './components/model/content/article/newarticle/newarticle.component';
import { NewpageComponent } from './components/model/content/page/newpage/newpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    DashboardComponent,
    ArticleComponent,
    PagesComponent,
    PageComponent,
    NewarticleComponent,
    NewpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
