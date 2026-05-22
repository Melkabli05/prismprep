import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <nav class="admin-nav">
      <a routerLink="/" class="brand">← Prism</a>
      <span class="nav-title">Administration</span>
      <span class="nav-user">{{ auth.user()?.email }}</span>
    </nav>

    <div class="admin-layout">
      <aside class="admin-sidebar">
        <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="sidebar-link">Tableau de bord</a>
        <a routerLink="/admin/questions" routerLinkActive="active" class="sidebar-link">Questions</a>
      </aside>
      <main class="admin-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    :host { display: block; min-height: 100dvh; background: var(--color-bg); color: var(--color-text); }
    .admin-nav {
      display: flex; align-items: center; gap: 1rem;
      padding: 0.75rem 1.25rem;
      background: var(--color-surface); border-bottom: 1px solid var(--color-border);
    }
    .brand { color: var(--color-accent); text-decoration: none; font-weight: 600; font-size: 0.875rem; }
    .nav-title { font-weight: 700; flex: 1; }
    .nav-user { color: var(--color-text-muted); font-size: 0.8rem; }
    .admin-layout { display: flex; min-height: calc(100dvh - 49px); }
    .admin-sidebar {
      width: 200px; flex-shrink: 0; padding: 1rem;
      background: var(--color-surface); border-right: 1px solid var(--color-border);
      display: flex; flex-direction: column; gap: 0.25rem;
    }
    .sidebar-link {
      display: block; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm);
      color: var(--color-text); text-decoration: none; font-size: 0.875rem;
    }
    .sidebar-link.active, .sidebar-link:hover { background: var(--color-surface-hover); color: var(--color-accent); }
    .admin-main { flex: 1; padding: 2rem; overflow: auto; }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
}
