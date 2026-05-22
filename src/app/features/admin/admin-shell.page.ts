import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  template: `
    <!-- Top nav — clean, minimal -->
    <nav class="shell-nav">
      <div class="nav-left">
        <a routerLink="/" class="back-link">
          <lucide-icon name="arrow-left" class="nav-icon" />
          <span class="back-label">Prism</span>
        </a>
        <span class="nav-sep"></span>
        <span class="nav-title">Admin</span>
      </div>

      <!-- Tab bar — like the main app's toolbar -->
      <div class="nav-tabs">
        <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="tab">
          <lucide-icon name="layout-dashboard" class="tab-icon" />
          Dashboard
        </a>
        <a routerLink="/admin/questions" routerLinkActive="active" class="tab">
          <lucide-icon name="file-text" class="tab-icon" />
          Questions
        </a>
      </div>

      <span class="nav-email">{{ auth.user()?.email }}</span>
    </nav>

    <!-- Content — full width, no sidebar -->
    <main class="shell-main">
      <router-outlet />
    </main>
  `,
  styles: `
    :host { display: block; min-height: 100dvh; background: var(--color-bg); color: var(--color-text-primary); }

    .shell-nav {
      position: sticky; top: 0; z-index: 50;
      display: flex; align-items: center; gap: 1rem;
      height: 3.5rem; padding: 0 1rem;
      background: color-mix(in srgb, var(--color-bg) 85%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
    }
    @media (min-width: 640px) {
      .shell-nav { height: 4rem; padding: 0 1.5rem; }
    }

    .nav-left { display: flex; align-items: center; gap: 0.625rem; }
    .back-link {
      display: flex; align-items: center; gap: 0.375rem;
      color: var(--color-text-secondary); text-decoration: none;
      font-size: 0.8125rem; font-weight: 500;
      transition: color 150ms ease;
    }
    .back-link:hover { color: var(--color-accent); }
    .back-label { display: none; }
    @media (min-width: 640px) { .back-label { display: inline; } }
    .nav-icon { width: 1rem; height: 1rem; }
    .nav-sep { width: 1px; height: 20px; background: var(--color-border); display: none; }
    @media (min-width: 640px) { .nav-sep { display: block; } }

    .nav-title {
      font-family: var(--font-display); font-weight: 700; font-size: 1rem;
      letter-spacing: -0.01em; color: var(--color-text-primary);
    }

    /* Tab bar — matches toolbar btn pattern */
    .nav-tabs { display: flex; align-items: center; gap: 0.25rem; flex: 1; justify-content: center; }
    .tab {
      display: flex; align-items: center; gap: 0.375rem;
      height: 32px; padding: 0 0.875rem; border: none; border-radius: var(--radius-full);
      color: var(--color-text-muted); text-decoration: none;
      font-size: 0.8125rem; font-weight: 500;
      transition: background 180ms ease, color 180ms ease, box-shadow 180ms ease;
    }
    .tab:hover { background: var(--color-surface-hover); color: var(--color-text-secondary); }
    .tab.active { background: var(--color-surface); color: var(--color-text-primary); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); }
    .tab-icon { width: 0.875rem; height: 0.875rem; flex-shrink: 0; }

    .nav-email { font-size: 0.75rem; color: var(--color-text-muted); flex-shrink: 0; }

    /* Content */
    .shell-main { padding: 1.5rem; }
    @media (min-width: 640px) { .shell-main { padding: 2rem; } }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
}
