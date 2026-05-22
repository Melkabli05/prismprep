import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <div class="dashboard">
      <div class="section-header">
        <div class="icon-wrap">
          <lucide-icon name="layout-dashboard" class="h-5 w-5" />
        </div>
        <div>
          <h2 class="section-title">Tableau de bord</h2>
          <p class="section-sub">Aperçu de votre contenu</p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon amber">
            <lucide-icon name="file-text" class="h-5 w-5" />
          </div>
          <div>
            <span class="stat-value">295</span>
            <span class="stat-label">Questions</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon accent">
            <lucide-icon name="folder-tree" class="h-5 w-5" />
          </div>
          <div>
            <span class="stat-value">21</span>
            <span class="stat-label">Catégories</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon success">
            <lucide-icon name="shield-check" class="h-5 w-5" />
          </div>
          <div>
            <span class="stat-value">{{ auth.user()?.email ?? '—' }}</span>
            <span class="stat-label">Connecté en tant qu'administrateur</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .dashboard { max-width: 48rem; }
    .section-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; }
    .icon-wrap {
      width: 44px; height: 44px; border-radius: var(--radius-lg);
      background: var(--color-accent-soft); border: 1px solid var(--color-border-subtle);
      display: flex; align-items: center; justify-content: center; color: var(--color-accent); flex-shrink: 0;
    }
    .section-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 600; margin: 0 0 0.125rem; letter-spacing: -0.01em; }
    .section-sub { margin: 0; font-size: 0.8125rem; color: var(--color-text-muted); }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
    .stat-card {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); padding: 1.25rem;
      display: flex; align-items: flex-start; gap: 1rem;
    }
    .stat-icon {
      width: 40px; height: 40px; border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .stat-icon.amber { background: var(--color-amber-soft); color: var(--color-amber); }
    .stat-icon.accent { background: var(--color-accent-soft); color: var(--color-accent); }
    .stat-icon.success { background: var(--color-success-soft); color: var(--color-success); }
    .stat-value { display: block; font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); line-height: 1.2; }
    .stat-label { font-size: 0.75rem; color: var(--color-text-muted); }
  `,
})
export class AdminDashboardPage {
  readonly auth = inject(AuthService);
}
