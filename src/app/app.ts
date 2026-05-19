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
    <router-outlet />
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
  `,
})
export class App {
  private auth = inject(AuthService);
  private interview = inject(InterviewService);

  constructor() {
    this.auth.init();
    this.interview.init();

    effect(() => {
      if (!this.auth.loading() && this.interview.loaded()) {
        this.interview.initRemoteState();
      }
    });
  }
}