import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // const isAuth = authService.isAuth$;
  // if (!isAuth) {
  //   router.navigate(['/login'], {
  //     queryParams: {
  //       isAuth: false,
  //     },
  //   });
  // }
  // return isAuth;
  await authService.me();
  if (!authService.isAuth) {
    router.navigate(['/login'], {
      queryParams: {
        isAuth: false,
      },
    });
    return false;
  }
  return authService.isAuth;

  // Work with Behavior subject object

  // return authService.isAuth$.pipe(
  //   tap((isAuth) => {
  //     if (!isAuth) {
  //       router.navigate(['/login'], { queryParams: { isAuth: false } });
  //     }
  //   }),
  // );
};
