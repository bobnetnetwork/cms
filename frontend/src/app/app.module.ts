import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/template/appheader/appheader.component';
import { AppfooterComponent } from './components/template/appfooter/appfooter.component';
import { AppmenuComponent } from './components/template/appmenu/appmenu.component';
import { AppsidebarComponent } from './components/template/appsidebar/appsidebar.component';
import { AppcontentComponent } from './components/template/appcontent/appcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsidebarComponent,
    AppcontentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
