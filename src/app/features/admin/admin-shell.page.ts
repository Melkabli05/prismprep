import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav class="admin-nav">
      <a routerLink="/" class="brand">← Prism</a>
      <span class="nav-title">Administration</span>
      <span class="nav-user">{{ auth.user()?.email }}</span>
    </nav>

    <div class="admin-layout">
      <aside class="admin-sidebar">
        <a routerLink="/admin" class="sidebar-link active">Tableau de bord</a>
      </aside>
      <main class="admin-main">
        <h2>Tableau de bord</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">295</span>
            <span class="stat-label">Questions</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">21</span>
            <span class="stat-label">Catégories</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ auth.user()?.email ?? '—' }}</span>
            <span class="stat-label">Connecté en tant que</span>
          </div>
        </div>
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
    }
    .sidebar-link {
      display: block; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm);
      color: var(--color-text); text-decoration: none; font-size: 0.875rem;
    }
    .sidebar-link.active, .sidebar-link:hover { background: var(--color-surface-hover); color: var(--color-accent); }
    .admin-main { flex: 1; padding: 2rem; }
    h2 { margin: 0 0 1.5rem; font-size: 1.25rem; font-family: var(--font-display); }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
    .stat-card {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem;
    }
    .stat-value { font-size: 1.5rem; font-weight: 700; color: var(--color-accent); }
    .stat-label { font-size: 0.8rem; color: var(--color-text-muted); }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
}
