import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  console.log("isLoggedIn", authService.isLoggedIn);

  if (authService.isLoggedIn)
    return true;

  return router.parseUrl(authService.redirectNoAuthUrl);
};
