import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { InterviewService } from './core/services/interview.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <a href="#main-content" class="skip-link">Passer au contenu principal</a>
    @if (auth.loading()) {
      <div class="app-loader">
        <svg viewBox="0 0 32 32" fill="none">
          <polygon points="16,2 30,28 16,22 2,28" fill="#D97706"/>
          <polygon points="16,2 22,14 16,11 10,14" fill="white" opacity="0.9"/>
          <polygon points="16,22 22,14 16,17 10,14" fill="white" opacity="0.5"/>
        </svg>
        <span>Chargement...</span>
      </div>
    } @else {
      <router-outlet />
    }
  `,
  styles: `
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--color-accent);
      color: var(--color-accent-text);
      padding: 0.5rem 1rem;
      z-index: 9999;
      border-radius: 0 0 var(--radius-md) 0;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: top 200ms ease;
    }
    .skip-link:focus { top: 0; outline: 2px solid var(--color-accent); outline-offset: 2px; }
    .app-loader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg, #0f172a);
      flex-direction: column;
      gap: 1rem;
    }
    .app-loader svg { width: 48px; height: 48px; }
    .app-loader span {
      font-family: var(--font-sans, 'DM Sans', sans-serif);
      font-size: 0.875rem;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.05em;
    }
  `,
})
export class App {
  readonly auth = inject(AuthService);
  private interview = inject(InterviewService);

  constructor() {
    this.auth.init();
    this.interview.init();

    // Clean Supabase auth callback query params on app load
    if (window.location.search.includes('ng.')) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    effect(() => {
      if (!this.auth.loading() && this.interview.loaded()) {
        this.interview.initRemoteState();
      }
    });
  }
}