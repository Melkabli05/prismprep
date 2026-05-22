import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  template: `
    <!-- Top nav bar -->
    <nav class="admin-nav">
      <div class="nav-left">
        <a routerLink="/" class="back-link">
          <lucide-icon name="arrow-left" class="nav-icon" />
          <span class="back-text">Retour à Prism</span>
        </a>
        <span class="nav-divider"></span>
        <span class="nav-title">Administration</span>
      </div>
      <span class="nav-email">{{ auth.user()?.email }}</span>
    </nav>

    <div class="admin-body">
      <!-- Sidebar — always visible -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="item.exact ? { exact: true } : {}"
              class="sidebar-link">
              <lucide-icon [name]="item.icon" class="sidebar-icon" />
              {{ item.label }}
            </a>
          }
        </nav>
      </aside>

      <!-- Content area -->
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    :host { display: block; min-height: 100dvh; background: var(--color-bg); color: var(--color-text-primary); }

    /* ── Top nav bar ─────────────────────────────────── */
    .admin-nav {
      position: sticky; top: 0; z-index: 50;
      display: flex; align-items: center; justify-content: space-between;
      height: 3.5rem; padding: 0 1rem;
      background: color-mix(in srgb, var(--color-bg) 85%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
    }
    @media (min-width: 640px) {
      .admin-nav { height: 4rem; padding: 0 1.5rem; }
    }

    .nav-left { display: flex; align-items: center; gap: 0.75rem; }
    .back-link {
      display: flex; align-items: center; gap: 0.375rem;
      color: var(--color-text-secondary); text-decoration: none;
      font-size: 0.8125rem; font-weight: 500;
      transition: color 150ms ease;
    }
    .back-link:hover { color: var(--color-accent); }
    .back-text { display: none; }
    @media (min-width: 640px) { .back-text { display: inline; } }

    .nav-icon { width: 1rem; height: 1rem; }
    .nav-divider { width: 1px; height: 22px; background: var(--color-border); }
    .nav-title {
      font-family: var(--font-display); font-weight: 700; font-size: 1.125rem;
      letter-spacing: -0.015em; color: var(--color-text-primary);
    }
    .nav-email { font-size: 0.75rem; color: var(--color-text-muted); }

    /* ── Body layout ─────────────────────────────────── */
    .admin-body { display: flex; min-height: calc(100dvh - 3.5rem); }
    @media (min-width: 640px) {
      .admin-body { min-height: calc(100dvh - 4rem); }
    }

    /* ── Sidebar ─────────────────────────────────────── */
    .sidebar {
      width: 200px; flex-shrink: 0;
      background: var(--color-surface);
      border-right: 1px solid var(--color-border);
      padding: 1rem 0.75rem;
    }
    .sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; }

    .sidebar-link {
      display: flex; align-items: center; gap: 0.625rem;
      padding: 0.5rem 0.75rem; border-radius: var(--radius-md);
      color: var(--color-text-secondary); text-decoration: none;
      font-size: 0.8125rem; font-weight: 500;
      transition: background 150ms ease, color 150ms ease;
    }
    .sidebar-link:hover { background: var(--color-surface-hover); color: var(--color-text-primary); }
    .sidebar-link.active { background: var(--color-accent-soft); color: var(--color-accent); }
    .sidebar-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

    /* ── Content area ────────────────────────────────── */
    .main-content { flex: 1; overflow-y: auto; padding: 1.5rem; }
    @media (min-width: 640px) { .main-content { padding: 2rem; } }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
  readonly navItems = [
    { path: '/admin', icon: 'layout-dashboard', label: 'Tableau de bord', exact: true },
    { path: '/admin/questions', icon: 'file-text', label: 'Questions', exact: false },
  ];
}
