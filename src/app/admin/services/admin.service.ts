import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/users`).pipe(take(1));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(map(usr => {
      return usr;
    }));
  }

  updateUser(id: string, user: Partial<User>) {
    return this.http.patch(`${this.apiUrl}/users/${id}`, user)
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
      .pipe(take(1));
  }

  checkUniqueUsername(username: string): Observable<boolean> {
    return this.getUsers().pipe(
      take(1),
      map((data: User[]) => {
        for (const user of data) {
          if (user.username === username) {
            return false; // Lo username esiste già
          }
        }
        return true; // Lo username è unico
      })
    );
  }

}
