import { Component, inject, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Interview } from '@features/interview/state/interview';
import { AppLoaderComponent } from '@shared/components/app-loader/app-loader.component';
import { RouterProgressBarComponent } from '@core/components/router-progress-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppLoaderComponent, RouterProgressBarComponent],
  template: `
    <app-router-progress-bar />
    <a href="#main-content" class="skip-link">Passer au contenu principal</a>

    @if (showLoader()) {
      <app-loader
        [visible]="auth.loading()"
        label="Vérification de votre session…"
        message="Préparez-vous à briller en entretien"
      />
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
    .skip-link:focus {
      top: 0;
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }
  `,
})
export class App {
  readonly auth = inject(AuthService);
  private interview = inject(Interview);

  /** Holds the loader in DOM for 300ms after auth resolves so the fade-out plays */
  readonly showLoader = signal(true);

  constructor() {
    this.auth.init();
    this.interview.init();

    if (window.location.search.includes('ng.')) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    effect(() => {
      if (!this.auth.loading()) {
        // Delay removal so the CSS opacity transition can play
        setTimeout(() => this.showLoader.set(false), 300);
      }
    });

    let remoteStateInited = false;
    effect(() => {
      if (!this.auth.loading() && this.interview.loaded() && !remoteStateInited) {
        remoteStateInited = true;
        this.interview.initRemoteState();
      }
    });
  }
}
