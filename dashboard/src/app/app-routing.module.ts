import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/model/content/article/articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent} from './components/model/content/article/article/article.component';

const routes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: '', component: DashboardComponent},
  {path: 'articles/:articleslug', component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
