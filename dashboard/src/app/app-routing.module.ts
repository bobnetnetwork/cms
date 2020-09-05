import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SinglearticleComponent} from './singlearticle/singlearticle.component';

const routes: Routes = [
  {path: 'articles', component: ArticleComponent},
  {path: '', component: DashboardComponent},
  {path: 'articles/:articleslug', component: SinglearticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
