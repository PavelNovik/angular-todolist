import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = authService.isAuth;
  if (!isAuth) {
    router.navigate(['/login'], {
      queryParams: {
        isAuth: false,
      },
    });
  }
  return isAuth;
};
