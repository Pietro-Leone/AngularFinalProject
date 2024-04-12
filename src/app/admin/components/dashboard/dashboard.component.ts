import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  users$!: Observable<Array<User>>;

  user: User | null = this.authService.userLogged;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('userId');
    this.users$ = this.adminService.getUsers().pipe(
      take(1)
    );
  }

  goToForm(u: User) {
    localStorage.setItem('userId', u.id);
    this.router.navigate(['admin/edit'], { queryParams: { editUserId: u.id } });
  }

  newArticle(u: User){
    this.router.navigate(['/articles/new'], { queryParams: { editUserId: u.id } })
  }

  logout() {
    this.authService.logout();
    this.router.navigate([this.authService.redirectNoAuthUrl]);
  }

}
