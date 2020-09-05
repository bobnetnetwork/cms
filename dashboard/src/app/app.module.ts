import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SinglearticleComponent } from './singlearticle/singlearticle.component';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';
import { NewarticleComponent } from './newarticle/newarticle.component';
import { NewpageComponent } from './newpage/newpage.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    DashboardComponent,
    SinglearticleComponent,
    PagesComponent,
    PageComponent,
    NewarticleComponent,
    NewpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
