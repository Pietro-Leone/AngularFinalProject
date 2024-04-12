import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { User } from '../../admin/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = "http://localhost:3000";

  isLoggedIn: boolean = false;
  userLogged: User | null = null;

  redirectNoAuthUrl: string = '/login';

  constructor(
    private http: HttpClient
  ) { }

  login(cred: User): Observable<boolean> {
    return this.checkUser(cred).pipe(
      map((res => {
        if (res) {
          this.isLoggedIn = true;
          this.userLogged = res;
          return true
        } else {
          this.isLoggedIn = false;
          this.userLogged = null;
          return false
        }
      }))
    )
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userLogged = null;
  }

  checkUser(cred: User): Observable<User> {
    const options = {
      params: new HttpParams()
        .set('username', cred.username)
        .set('password', cred.password)
    };
    return this.http.get<Array<User>>(`${this.apiUrl}/users`, options).pipe(
      map((res) => res[0])
    )
  }
}