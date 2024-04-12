import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Articolo } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../../admin/models/user';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrl: './form-article.component.scss'
})
export class FormArticleComponent implements OnInit {
  FormArticle!: FormGroup
  titolo!: FormControl;
  testo!: FormControl;
  categoria!: FormControl;
  autore!: FormControl;
  dataCreazione!: FormControl;
  dataModifica!: FormControl;

  article!: Articolo;

  nomePenna!: string | undefined;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data) => {
      const user: User = data['formArticle']; // Chiave usata nel ResolveData in article-routing.module.ts
      if (user)
        this.nomePenna = user.nomePenna;
    });
    this.buildForm();
  }

  buildForm() {
    this.titolo = new FormControl('', [Validators.required]);
    this.testo = new FormControl('', [Validators.required]);
    this.categoria = new FormControl('');
    this.autore = new FormControl(this.nomePenna);
    this.dataCreazione = new FormControl(new Date().toISOString().substring(0, 10));
    this.dataModifica = new FormControl(new Date());

    this.FormArticle = this.fb.group({
      titolo: this.titolo,
      testo: this.testo,
      categoria: this.categoria,
      autore: this.autore,
      dataCreazione: this.dataCreazione,
      dataModifica: this.dataModifica
    });

  }

  onSubmit(): void {
    let newArticle = new Articolo(this.FormArticle.value);
    this.articleService.addArticle(newArticle).pipe(take(1)).subscribe(res => console.log("Articolo aggiunto", res));
  }

}
