import { Component, inject, signal, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, submit, required, email } from '@angular/forms/signals';
import { AuthService } from '../../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-auth-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, LucideAngularModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center h-screen p-4"
         style="background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(4px)"
         (click)="close.emit()">
      <div class="relative w-full max-w-sm rounded-2xl border p-8"
           style="background: var(--color-surface); border-color: var(--color-border); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
           (click)="$event.stopPropagation()"
           role="dialog"
           aria-modal="true"
           [attr.aria-labelledby]="'auth-title'">

        <button class="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150"
                style="background: transparent; color: var(--color-text-muted)"
                (click)="close.emit()"
                aria-label="Fermer">
          <lucide-icon name="x" class="w-4 h-4" />
        </button>

        <div class="flex flex-col items-center text-center mb-6">
          <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
               style="background: var(--color-accent-soft); color: var(--color-accent)">
            <lucide-icon [name]="isSignUp() ? 'user-plus' : 'log-in'" class="w-6 h-6" />
          </div>
          <h2 id="auth-title"
              class="text-xl font-bold tracking-tight"
              style="font-family: var(--font-display); color: var(--color-text-primary)">
            {{ isSignUp() ? 'Créer un compte' : 'Connexion' }}
          </h2>
          <p class="mt-1 text-sm" style="color: var(--color-text-muted)">
            {{ isSignUp() ? 'Rejoignez Prism et préparez vos entretiens' : 'Bon retour ! Connectez-vous à votre compte' }}
          </p>
        </div>

        @if (successMsg()) {
          <div class="mb-4 px-4 py-2.5 rounded-lg text-sm text-center flex items-center justify-center gap-2"
               style="background: var(--color-success-soft); color: var(--color-success)">
            <lucide-icon name="check-circle" class="w-4 h-4" />
            {{ successMsg() }}
          </div>
        }

        @if (errorMsg()) {
          <div class="mb-4 px-4 py-2.5 rounded-lg text-sm text-center"
               style="background: var(--color-error-soft); color: var(--color-error)">
            {{ errorMsg() }}
          </div>
        }

        <form (submit)="onSubmit($event)">
          <div class="flex flex-col gap-4">

            @if (isSignUp()) {
              <div class="flex flex-col gap-1.5">
                <label for="auth-name" class="text-sm font-medium" style="color: var(--color-text-secondary)">Nom complet</label>
                <input id="auth-name" type="text"
                       [formField]="signUpForm.name"
                       placeholder="Votre nom"
                       autocomplete="name"
                       class="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 auth-input"
                       style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)" />
                @if (signUpForm.name().touched() && signUpForm.name().invalid()) {
                  @for (error of signUpForm.name().errors(); track error) {
                    <span class="text-xs" style="color: var(--color-error)">{{ error.message }}</span>
                  }
                }
              </div>
            }

            <div class="flex flex-col gap-1.5">
              <label for="auth-email" class="text-sm font-medium" style="color: var(--color-text-secondary)">Email</label>
              <input id="auth-email" type="email"
                     [formField]="activeForm().email"
                     placeholder="vous@example.com"
                     autocomplete="email"
                     class="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 auth-input"
                     style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)" />
              @if (activeForm().email().touched() && activeForm().email().invalid()) {
                @for (error of activeForm().email().errors(); track error) {
                  <span class="text-xs" style="color: var(--color-error)">{{ error.message }}</span>
                }
              }
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="auth-password" class="text-sm font-medium" style="color: var(--color-text-secondary)">Mot de passe</label>
              <input id="auth-password" type="password"
                     [formField]="activeForm().password"
                     placeholder="••••••••"
                     [attr.autocomplete]="isSignUp() ? 'new-password' : 'current-password'"
                     class="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 auth-input"
                     style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)" />
              @if (activeForm().password().touched() && activeForm().password().invalid()) {
                @for (error of activeForm().password().errors(); track error) {
                  <span class="text-xs" style="color: var(--color-error)">{{ error.message }}</span>
                }
              }
            </div>

            @if (isSignUp()) {
              <div class="flex flex-col gap-1.5">
                <label for="auth-confirm-password" class="text-sm font-medium" style="color: var(--color-text-secondary)">Confirmer le mot de passe</label>
                <input id="auth-confirm-password" type="password"
                       [formField]="signUpForm.confirmPassword"
                       placeholder="••••••••"
                       autocomplete="new-password"
                       class="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 auth-input"
                       style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)" />
                @if (signUpForm.confirmPassword().touched() && signUpForm.confirmPassword().invalid()) {
                  @for (error of signUpForm.confirmPassword().errors(); track error) {
                    <span class="text-xs" style="color: var(--color-error)">{{ error.message }}</span>
                  }
                }
              </div>
            }

          </div>

          <button type="submit"
                  [disabled]="loading()"
                  class="w-full mt-6 h-12 rounded-full text-sm font-semibold transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
                  style="background: var(--color-accent); color: var(--color-accent-text)">
            @if (loading()) {
              Chargement...
            } @else if (isSignUp()) {
              Créer mon compte
            } @else {
              Se connecter
            }
          </button>
        </form>

        <p class="mt-5 text-center text-sm" style="color: var(--color-text-muted)">
          {{ isSignUp() ? 'Déjà un compte ?' : "Pas encore de compte ?" }}
          <button class="ml-1 font-medium text-sm p-0 border-none bg-transparent cursor-pointer"
                  style="color: var(--color-accent)"
                  (click)="switchMode()">
            {{ isSignUp() ? 'Se connecter' : "S'inscrire" }}
          </button>
        </p>

      </div>
    </div>
  `,
  styles: `
    :host { display: contents; }
    .auth-input:focus {
      border-color: var(--color-accent) !important;
      box-shadow: 0 0 0 3px var(--color-accent-soft) !important;
    }
  `,
})
export class AuthModalComponent {
  private auth = inject(AuthService);

  close = output<void>();

  readonly errorMsg = signal('');
  readonly successMsg = signal('');
  readonly loading = signal(false);
  readonly isSignUp = signal(false);

  private readonly signInModel = signal({ email: '', password: '' });
  private readonly signUpModel = signal({ name: '', email: '', password: '', confirmPassword: '' });

  readonly signInForm = form(this.signInModel, (s) => {
    required(s.email, { message: 'Email requis' });
    email(s.email, { message: 'Email invalide' });
    required(s.password, { message: 'Mot de passe requis' });
  });

  readonly signUpForm = form(this.signUpModel, (s) => {
    required(s.name, { message: 'Le nom est requis' });
    required(s.email, { message: 'Email requis' });
    email(s.email, { message: 'Email invalide' });
    required(s.password, { message: 'Mot de passe requis' });
    required(s.confirmPassword, { message: 'Confirmez le mot de passe' });
  });

  readonly activeForm = computed(() => this.isSignUp() ? this.signUpForm : this.signInForm);

  switchMode(): void {
    this.isSignUp.update(v => !v);
    this.errorMsg.set('');
    this.successMsg.set('');
    this.signInModel.set({ email: '', password: '' });
    this.signUpModel.set({ name: '', email: '', password: '', confirmPassword: '' });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMsg.set('');

    if (this.isSignUp()) {
      submit(this.signUpForm, {
        action: async () => {
          const { email, password, confirmPassword } = this.signUpModel();

          if (password !== confirmPassword) {
            this.errorMsg.set('Les mots de passe ne correspondent pas');
            return;
          }

          this.loading.set(true);
          const result = await this.auth.signUp(email, password);
          this.loading.set(false);

          if (result.error) {
            this.errorMsg.set(result.error);
          } else {
            this.successMsg.set('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
            this.signUpModel.set({ name: '', email: '', password: '', confirmPassword: '' });
          }
        },
      });
    } else {
      submit(this.signInForm, {
        action: async () => {
          const { email, password } = this.signInModel();

          this.loading.set(true);
          const result = await this.auth.signIn(email, password);
          this.loading.set(false);

          if (result.error) {
            this.errorMsg.set(result.error);
          } else {
            this.close.emit();
          }
        },
      });
    }
  }
}