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
import { CategoriesComponent } from './components/model/content/category/categories/categories.component';
import { CategoryComponent } from './components/model/content/category/category/category.component';
import { TagsComponent } from './components/model/content/tag/tags/tags.component';
import { UsersComponent } from './components/model/administration/user/users/users.component';
import { UserComponent } from './components/model/administration/user/user/user.component';
import { RolesComponent } from './components/model/administration/role/roles/roles.component';
import { RoleComponent } from './components/model/administration/role/role/role.component';
import { OptionsComponent } from './components/model/administration/options/options/options.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

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
    NewpageComponent,
    CategoriesComponent,
    CategoryComponent,
    TagsComponent,
    UsersComponent,
    UserComponent,
    RolesComponent,
    RoleComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
