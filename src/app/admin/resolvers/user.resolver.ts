import { ResolveFn, Router } from '@angular/router';
import { User } from '../models/user';
import { inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { mergeMap, of } from 'rxjs';

export const userResolver: ResolveFn<User | null> = (route, state) => {
  const adminService: AdminService = inject(AdminService);
  const id: string | null = route.queryParamMap.get('editUserId');

  if (id) {
    return adminService.getUserById(id).pipe(mergeMap(user => {
      if (user) {
        return of(user);
      } else {
        return of(null)
      }
    }))
  } else {
    return of(null)
  }
};
