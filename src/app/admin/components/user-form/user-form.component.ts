import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnDestroy {
  UserForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  ruolo!: FormControl;
  nomePenna!: FormControl

  isWrongAttempt$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  user!: User;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const user: User = data['editUser']; // Chiave usata nel ResolveData in admin-routing.module.ts

      if (user) {
        this.user = user;
      }
    });

    this.buildForm();
  }

  buildForm() {
    this.username = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
    this.ruolo = new FormControl();
    this.nomePenna = new FormControl();

    this.UserForm = this.fb.group({
      username: this.username,
      password: this.password,
      ruolo: this.ruolo,
      nomePenna: this.nomePenna,
    });

    if (this.user) {
      this.patchFormValues();
    }
  }

  patchFormValues(): void {
    this.UserForm.patchValue({
      username: this.user.username,
      password: this.user.password,
      ruolo: this.user.ruolo,
      nomePenna: this.user.nomePenna,
    });
  }

  onSubmit(): void {
    this.authService.login(this.UserForm.value).pipe(take(1)).subscribe(() => {
      if (this.authService.isLoggedIn)
        this.router.navigate(['/admin']);
      else
        this.isWrongAttempt$.next(true);
    })
  }

  signup() {
    let newUser = new User(this.UserForm.value);
    this.adminService.checkUniqueUsername(this.username.value).subscribe(isUnique => {
      if (isUnique) {
        this.adminService.addUser(newUser).pipe(take(1)).subscribe(res => console.log("Utente aggiunto", res));

        if (this.authService.isLoggedIn)
          this.router.navigate(['/admin']);
        else
          this.isWrongAttempt$.next(true);

      } else {
        alert("User: " + newUser.username + " già in uso")
      }
    });
  }

  update() {
    let newUser = new User(this.UserForm.value);
    this.adminService.updateUser(this.user.id, newUser).pipe(take(1)).subscribe(res => console.log("Utente aggiornato", res));
    if (this.authService.isLoggedIn)
      this.router.navigate(['/admin']);
    else
      this.isWrongAttempt$.next(true);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('username');
  }

}