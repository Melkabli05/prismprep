import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/interview/pages/interview-shell.page').then(m => m.InterviewShellPage),
  },
];