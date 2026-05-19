import { Component, inject, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../core/services/supabase.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-auth-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideAngularModule],
  styles: `
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 100; backdrop-filter: blur(4px);
    }
    .modal-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 2rem;
      width: 100%; max-width: 380px;
      box-shadow: var(--shadow-card-hover);
    }
    .modal-title {
      font-family: var(--font-display);
      font-size: 1.5rem; font-weight: 600;
      color: var(--color-text-primary);
    }
    .form-group { margin-top: 1.25rem; }
    .form-label {
      display: block; font-size: 0.8125rem; font-weight: 500;
      color: var(--color-text-secondary); margin-bottom: 0.375rem;
    }
    .form-input {
      width: 100%; padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-raised);
      color: var(--color-text-primary);
      font-size: 0.875rem; font-family: var(--font-sans);
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .form-input:focus {
      outline: none; border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-accent-soft);
    }
    .form-input::placeholder { color: var(--color-text-placeholder); }
    .submit-btn {
      width: 100%; margin-top: 1.5rem; height: 42px;
      border-radius: var(--radius-full); border: none;
      background: var(--color-accent); color: var(--color-accent-text);
      font-weight: 600; cursor: pointer; font-size: 0.875rem;
      transition: background 150ms ease;
    }
    .submit-btn:hover:not(:disabled) { background: var(--color-accent-hover); }
    .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .toggle-mode {
      margin-top: 1rem; text-align: center;
      font-size: 0.8125rem; color: var(--color-text-muted);
    }
    .toggle-mode button {
      background: none; border: none; color: var(--color-accent);
      cursor: pointer; font-size: 0.8125rem; padding: 0;
    }
    .toggle-mode button:hover { text-decoration: underline; }
    .error-msg {
      margin-top: 0.75rem; padding: 0.5rem 0.75rem;
      border-radius: var(--radius-md);
      background: var(--color-error-soft); color: var(--color-error);
      font-size: 0.8125rem; text-align: center;
    }
    .close-btn {
      position: absolute; top: 1rem; right: 1rem;
      width: 32px; height: 32px; border-radius: var(--radius-full);
      border: none; background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--color-text-muted);
      transition: background 150ms ease, color 150ms ease;
    }
    .close-btn:hover { background: var(--color-surface-hover); color: var(--color-text-primary); }
  `,
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-card" (click)="$event.stopPropagation()" style="position: relative">
        <button class="close-btn" (click)="close.emit()" aria-label="Fermer">
          <lucide-icon name="x" class="h-4 w-4"></lucide-icon>
        </button>
        <h2 class="modal-title">{{ isSignUp() ? 'Créer un compte' : 'Connexion' }}</h2>
        @if (errorMsg()) { <div class="error-msg">{{ errorMsg() }}</div> }
        <div class="form-group">
          <label class="form-label" for="auth-email">Email</label>
          <input id="auth-email" type="email" class="form-input"
            [value]="email()" (input)="email.set($event.target.value)"
            placeholder="vous@example.com" autocomplete="email" />
        </div>
        <div class="form-group">
          <label class="form-label" for="auth-password">Mot de passe</label>
          <input id="auth-password" type="password" class="form-input"
            [value]="password()" (input)="password.set($event.target.value)"
            placeholder="••••••••" autocomplete="{{ isSignUp() ? 'new-password' : 'current-password' }}" />
        </div>
        <button class="submit-btn" (click)="submit()" [disabled]="loading()">
          {{ loading() ? 'Chargement...' : isSignUp() ? 'S\'inscrire' : 'Se connecter' }}
        </button>
        <p class="toggle-mode">
          {{ isSignUp() ? 'Déjà un compte ?' : 'Pas encore de compte ?' }}
          <button (click)="isSignUp.set(!isSignUp())">
            {{ isSignUp() ? 'Se connecter' : 'S\'inscrire' }}
          </button>
        </p>
      </div>
    </div>
  `,
})
export class AuthModalComponent {
  private supabase = inject(SupabaseService);
  close = output<void>();

  email = signal('');
  password = signal('');
  isSignUp = signal(false);
  loading = signal(false);
  errorMsg = signal('');

  async submit(): Promise<void> {
    const email = this.email().trim();
    const password = this.password();
    if (!email || !password) {
      this.errorMsg.set('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 6) {
      this.errorMsg.set('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    this.loading.set(true);
    this.errorMsg.set('');
    const result = this.isSignUp()
      ? await this.supabase.signUp(email, password)
      : await this.supabase.signIn(email, password);
    this.loading.set(false);

    if (result.error) {
      this.errorMsg.set(result.error);
    } else {
      this.close.emit();
    }
  }
}