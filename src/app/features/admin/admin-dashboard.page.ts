import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  template: `
    <div class="max-w-2xl mx-auto">
      <h1 class="dash-title">Tableau de bord</h1>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="stat">
          <span class="stat-value">295</span>
          <span class="stat-label">Questions</span>
        </div>
        <div class="stat">
          <span class="stat-value">21</span>
          <span class="stat-label">Catégories</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ auth.user()?.email ?? '—' }}</span>
          <span class="stat-label">Connecté en tant qu'admin</span>
        </div>
      </div>

      <h2 class="dash-subtitle">Accès rapide</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a routerLink="/admin/questions" class="quick-link">
          <lucide-icon name="file-text" class="ql-icon" />
          <div>
            <span class="ql-title">Éditeur de questions</span>
            <span class="ql-desc">Modifier le contenu des 295 questions</span>
          </div>
          <lucide-icon name="arrow-right" class="ql-arrow" />
        </a>
      </div>
    </div>
  `,
  styles: `
    .dash-title {
      font-family: var(--font-display); font-size: 1.5rem; font-weight: 700;
      letter-spacing: -0.02em; color: var(--color-text-primary); margin: 0 0 1.5rem;
    }
    .dash-subtitle {
      font-family: var(--font-display); font-size: 1rem; font-weight: 600;
      color: var(--color-text-secondary); margin: 0 0 0.75rem;
    }

    .stat {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); padding: 1.25rem;
      display: flex; flex-direction: column; gap: 0.125rem;
    }
    .stat-value { font-size: 1.25rem; font-weight: 700; color: var(--color-accent); }
    .stat-label { font-size: 0.75rem; color: var(--color-text-muted); }

    .quick-link {
      display: flex; align-items: center; gap: 1rem;
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); padding: 1rem 1.25rem;
      text-decoration: none; transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .quick-link:hover { border-color: var(--color-accent); box-shadow: var(--shadow-card-hover); }
    .ql-icon { width: 1.25rem; height: 1.25rem; flex-shrink: 0; color: var(--color-accent); }
    .ql-title { display: block; font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); }
    .ql-desc { font-size: 0.75rem; color: var(--color-text-muted); }
    .ql-arrow { width: 1rem; height: 1rem; flex-shrink: 0; color: var(--color-text-muted); margin-left: auto; }
  `,
})
export class AdminDashboardPage {
  readonly auth = inject(AuthService);
}
