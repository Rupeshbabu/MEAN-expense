import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  let isLogged = sessionStorage.getItem('isLoggedIn');
  const authService = inject(AuthService);
  const toastrService = inject(ToastService);

  if (isLogged == 'false') {
    toastrService.showError('Please Login', 'Success');
    _router.navigate(['main/signin']);
    return false;
  }
  return true;
};
