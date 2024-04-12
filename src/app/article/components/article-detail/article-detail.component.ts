import { Component, OnDestroy, OnInit } from '@angular/core';
import { Articolo } from '../../models/article';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article: Articolo | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      const article: Articolo = data['articleDetail']; // Chiave usata nel ResolveData in article-routing.module.ts
      if (article)
        this.article = article;
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('articleId');
  }

}
