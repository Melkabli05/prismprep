import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterOutlet, LucideAngularModule],
  template: `
    <nav class="shell-nav" role="banner">
      <a routerLink="/" class="back-link" aria-label="Back to Prism">
        <lucide-icon name="arrow-left" class="w-4 h-4" aria-hidden="true" />
        <span>Prism</span>
      </a>
      <span class="nav-sep" aria-hidden="true"></span>
      <span class="nav-label">Admin</span>
      <span class="nav-email" aria-label="Logged in as">{{ auth.user()?.email }}</span>
    </nav>
    <main class="shell-main" role="main" id="admin-content">
      <router-outlet />
    </main>
  `,
  styles: `
    :host { display: block; min-height: 100dvh; background: var(--color-bg); color: var(--color-text-primary); }

    .shell-nav {
      position: sticky; top: 0; z-index: 50;
      display: flex; align-items: center; gap: 0.875rem;
      height: 3.25rem; padding: 0 1.5rem;
      background: var(--color-bg);
      border-bottom: 2px solid var(--color-text-primary);
    }
    .back-link {
      display: inline-flex; align-items: center; gap: 0.375rem;
      color: var(--color-text-secondary); text-decoration: none;
      font-family: var(--font-sans); font-size: 0.8125rem; font-weight: 600;
      letter-spacing: 0.01em;
    }
    .back-link:hover { color: var(--color-accent); }
    .nav-sep { width: 1px; height: 1.25rem; background: var(--color-border-strong); }
    .nav-label {
      font-family: var(--font-display); font-weight: 700;
      font-size: 0.9375rem; color: var(--color-text-primary);
      letter-spacing: 0.02em;
    }
    .nav-email {
      margin-left: auto;
      font-family: var(--font-mono); font-size: 0.6875rem;
      color: var(--color-text-muted); letter-spacing: 0.01em;
    }
    .shell-main { max-width: 60rem; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
}
