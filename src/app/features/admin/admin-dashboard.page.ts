import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `,
  styles: `
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
export class AdminDashboardPage {
  readonly auth = inject(AuthService);
}
