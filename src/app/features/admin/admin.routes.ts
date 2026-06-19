import type { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/admin-shell.page').then(m => m.AdminShellPage),
    children: [
      { path: '', loadComponent: () => import('./pages/admin-browser.page').then(m => m.AdminBrowserPage) },
      { path: 'questions/:id', loadComponent: () => import('./pages/admin-question-edit.page').then(m => m.AdminQuestionEditPage) },
    ],
  },
];
