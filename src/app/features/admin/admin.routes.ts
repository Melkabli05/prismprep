import type { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-shell.page').then(m => m.AdminShellPage),
  },
];
