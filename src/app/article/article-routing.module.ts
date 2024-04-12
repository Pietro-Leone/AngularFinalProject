import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { articleDetailResolver } from './resolvers/article-detail.resolver';
import { FormArticleComponent } from './components/form-article/form-article.component';
import { userResolver } from '../admin/resolvers/user.resolver';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'article', component: ArticleDetailComponent, resolve: { articleDetail: articleDetailResolver } },
  { path: 'new', component: FormArticleComponent, resolve: { formArticle: userResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
