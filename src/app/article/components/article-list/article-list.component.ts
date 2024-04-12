import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Articolo } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit{
  articles$!: Observable<Array<Articolo>>;

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('articleId');
    this.articles$ = this.articleService.getArticles();
  }

  goToDetail(art: Articolo){
    localStorage.setItem('articleId', art.id);
    this.router.navigate(['/articles/article'], { queryParams: { articleDetailId: art.id } });
  }


}
