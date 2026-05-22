import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet, LucideAngularModule],
  template: `
    <nav class="shell-nav">
      <a routerLink="/" class="back-link">
        <lucide-icon name="arrow-left" class="nav-icon" />
        <span class="back-label">Prism</span>
      </a>
      <span class="nav-sep"></span>
      <span class="nav-title">Admin</span>
      <span class="nav-email">{{ auth.user()?.email }}</span>
    </nav>

    <main class="shell-main">
      <router-outlet />
    </main>
  `,
  styles: `
    :host { display: block; min-height: 100dvh; background: var(--color-bg); color: var(--color-text-primary); }

    .shell-nav {
      position: sticky; top: 0; z-index: 50;
      display: flex; align-items: center; gap: 0.75rem;
      height: 3.5rem; padding: 0 1rem;
      background: color-mix(in srgb, var(--color-bg) 85%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
    }
    @media (min-width: 640px) {
      .shell-nav { height: 4rem; padding: 0 1.5rem; }
    }

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

    .nav-sep { width: 1px; height: 20px; background: var(--color-border); }

    .nav-title {
      font-family: var(--font-display); font-weight: 700; font-size: 1rem;
      letter-spacing: -0.01em; color: var(--color-text-primary);
    }

    .nav-email { font-size: 0.75rem; color: var(--color-text-muted); margin-left: auto; }

    .shell-main { padding: 1.5rem; }
    @media (min-width: 640px) { .shell-main { padding: 2rem; } }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
}
