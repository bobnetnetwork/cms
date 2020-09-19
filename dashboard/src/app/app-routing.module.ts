import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/model/content/article/articles/articles.component';
import { NewarticleComponent } from './components/model/content/article/newarticle/newarticle.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent} from './components/model/content/article/article/article.component';
import { PagesComponent } from './components/model/content/page/pages/pages.component';
import { PageComponent } from './components/model/content/page/page/page.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:articleslug', component: ArticleComponent},
  {path: 'new-article', component: NewarticleComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'pages/:pageslug', component: PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
