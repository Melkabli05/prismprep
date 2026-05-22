import type { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-shell.page').then(m => m.AdminShellPage),
    children: [
      { path: '', loadComponent: () => import('./admin-questions.page').then(m => m.AdminQuestionsPage) },
      { path: 'questions/:id', loadComponent: () => import('./admin-question-edit.page').then(m => m.AdminQuestionEditPage) },
    ],
  },
];
