import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="loader-overlay"
      role="progressbar"
      [attr.aria-label]="label()"
      [attr.aria-hidden]="!visible()"
      [class.hidden]="!visible()"
    >
      <svg viewBox="0 0 32 32" fill="none" class="prism-logo" aria-hidden="true">
        <polygon points="16,2 30,28 16,22 2,28" fill="var(--color-accent)" />
        <polygon points="16,2 22,14 16,11 10,14" fill="var(--color-accent-text)" opacity="0.9" />
        <polygon points="16,22 22,14 16,17 10,14" fill="var(--color-accent-text)" opacity="0.5" />
      </svg>
      <div class="loader-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      @if (message()) {
        <p class="loader-message">{{ message() }}</p>
      }
    </div>
  `,
  styles: `
    .loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-bg, #0f172a);
      gap: 1.5rem;
      transition: opacity 300ms ease, visibility 300ms ease;
      opacity: 1;
      visibility: visible;
    }
    .loader-overlay.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .prism-logo {
      width: 48px;
      height: 48px;
      animation: pulse-fade 1.8s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .prism-logo {
        animation: none;
        opacity: 0.8;
      }
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
      animation: dot-bounce 1.2s ease-in-out infinite;
    }
    .loader-dots span:nth-child(2) { animation-delay: 0.15s; }
    .loader-dots span:nth-child(3) { animation-delay: 0.3s; }

    @media (prefers-reduced-motion: reduce) {
      .loader-dots span { animation: none; opacity: 0.6; }
    }

    .loader-message {
      color: var(--color-text-secondary, #94a3b8);
      font-size: 0.875rem;
      font-family: var(--font-sans);
      margin: 0;
      text-align: center;
      max-width: 280px;
    }

    @keyframes pulse-fade {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(0.92); }
    }
    @keyframes dot-bounce {
      0%, 100% { transform: translateY(0); opacity: 0.35; }
      50% { transform: translateY(-8px); opacity: 1; }
    }
  `,
})
export class AppLoaderComponent {
  readonly visible = input(true);
  readonly label = input('Chargement en cours…');
  readonly message = input('');
}
