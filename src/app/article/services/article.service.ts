import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Articolo } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Array<Articolo>> {
    return this.http.get<Array<Articolo>>(`${this.apiUrl}/articles`)
  }

  addArticle(art: Articolo): Observable<Articolo> {
    return this.http.post<Articolo>(`${this.apiUrl}/articles`, art).pipe(map(a => {
      return a;
    }));
  }

  getArticleById(id: string): Observable<Articolo> {
    return this.http.get<Articolo>(`${this.apiUrl}/articles/${id}`)
      .pipe(map((art) => {
        return art
      }));
  }


}
