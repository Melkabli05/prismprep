import { inject } from '@angular/core';
import { Router } from '@angular/router';
import type { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) return true;

  return router.parseUrl('');
};
