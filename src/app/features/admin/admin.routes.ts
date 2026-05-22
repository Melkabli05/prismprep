import type { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  { path: '', loadComponent: () => import('./admin-dashboard.page').then(m => m.AdminDashboardPage) },
  { path: 'questions', loadComponent: () => import('./admin-questions.page').then(m => m.AdminQuestionsPage) },
];
