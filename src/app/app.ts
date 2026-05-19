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
        <svg viewBox="0 0 32 32" fill="none" class="prism-logo">
          <polygon points="16,2 30,28 16,22 2,28" fill="var(--color-accent)"/>
          <polygon points="16,2 22,14 16,11 10,14" fill="var(--color-accent-text)" opacity="0.9"/>
          <polygon points="16,22 22,14 16,17 10,14" fill="var(--color-accent-text)" opacity="0.5"/>
        </svg>
        <div class="loader-dots">
          <span></span><span></span><span></span>
        </div>
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
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-bg, #0f172a);
      gap: 2rem;
    }
    .prism-logo {
      width: 56px;
      height: 56px;
      animation: pulse-fade 1.5s ease-in-out infinite;
    }
    .loader-dots {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .loader-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-accent);
      animation: bounce 1.2s ease-in-out infinite;
    }
    .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loader-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse-fade {
      0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
      50% { opacity: 0.6; transform: scale(0.9) rotate(180deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); opacity: 0.4; }
      50% { transform: translateY(-8px); opacity: 1; }
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