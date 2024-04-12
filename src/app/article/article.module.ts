import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { FormArticleComponent } from './components/form-article/form-article.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    FormArticleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
