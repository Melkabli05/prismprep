import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canMatch: [adminGuard],
    loadChildren: () => import('@features/admin/admin.routes').then(m => m.adminRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('@features/interview/pages/interview-shell.page').then(m => m.InterviewShellPage),
  },
];