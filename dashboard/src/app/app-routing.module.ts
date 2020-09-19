import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/model/content/article/articles/articles.component';
import { NewarticleComponent } from './components/model/content/article/newarticle/newarticle.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent} from './components/model/content/article/article/article.component';
import { PagesComponent } from './components/model/content/page/pages/pages.component';
import { PageComponent } from './components/model/content/page/page/page.component';
import { CategoriesComponent } from './components/model/content/category/categories/categories.component';
import { CategoryComponent } from './components/model/content/category/category/category.component';
import { TagsComponent } from './components/model/content/tag/tags/tags.component';
import { NewpageComponent } from './components/model/content/page/newpage/newpage.component';
import { UsersComponent } from './components/model/administration/user/users/users.component';
import { UserComponent } from './components/model/administration/user/user/user.component';
import { RolesComponent } from './components/model/administration/role/roles/roles.component';
import { RoleComponent } from './components/model/administration/role/role/role.component';
import { OptionsComponent } from './components/model/administration/options/options/options.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:articleslug', component: ArticleComponent},
  {path: 'new-article', component: NewarticleComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'categories/:categoryslug', component: CategoryComponent},
  {path: 'tags', component: TagsComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'pages/:pageslug', component: PageComponent},
  {path: 'new-page', component: NewpageComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:username', component: UserComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'roles/:roleslug', component: RoleComponent},
  {path: 'options', component: OptionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
