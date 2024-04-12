import { ResolveFn } from '@angular/router';
import { Articolo } from '../models/article';
import { ArticleService } from '../services/article.service';
import { inject } from '@angular/core';
import { mergeMap, of } from 'rxjs';

export const articleDetailResolver: ResolveFn<Articolo | null> = (route, state) => {
  const articleService: ArticleService = inject(ArticleService);
  const id: string | null = route.queryParamMap.get('articleDetailId');

  if (id) {
    return articleService.getArticleById(id).pipe(mergeMap(article => {
      if (article) {
        return of(article);
      } else {
        return of(null)
      }
    }))
  } else {
    return of(null)
  }
};
