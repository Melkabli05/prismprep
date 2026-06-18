import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import {
  FormField,
  email,
  form,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth.service';

interface SignInModel {
  email: string;
  password: string;
}

interface SignUpModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMPTY_SIGN_IN: SignInModel = { email: '', password: '' };
const EMPTY_SIGN_UP: SignUpModel = { name: '', email: '', password: '', confirmPassword: '' };

@Component({
  selector: 'app-auth-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, LucideAngularModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center h-screen p-4"
      style="background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(4px)"
      (click)="close.emit()"
    >
      <div
        class="relative w-full max-w-sm rounded-2xl border p-8"
        style="background: var(--color-surface); border-color: var(--color-border); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button
          class="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150"
          style="background: transparent; color: var(--color-text-muted)"
          type="button"
          (click)="close.emit()"
          aria-label="Fermer"
        >
          <lucide-icon name="x" class="w-4 h-4" />
        </button>

        <div class="flex flex-col items-center text-center mb-6">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style="background: var(--color-accent-soft); color: var(--color-accent)"
          >
            <lucide-icon [name]="isSignUp() ? 'user-plus' : 'log-in'" class="w-6 h-6" />
          </div>
          <h2
            id="auth-title"
            class="text-xl font-bold tracking-tight"
            style="font-family: var(--font-display); color: var(--color-text-primary)"
          >
            {{ isSignUp() ? 'Créer un compte' : 'Connexion' }}
          </h2>
          <p class="mt-1 text-sm" style="color: var(--color-text-muted)">
            {{ isSignUp() ? 'Rejoignez Prism et préparez vos entretiens' : 'Bon retour ! Connectez-vous à votre compte' }}
          </p>
        </div>

        @if (successMsg()) {
          <div
            class="mb-4 px-4 py-2.5 rounded-lg text-sm text-center flex items-center justify-center gap-2"
            style="background: var(--color-success-soft); color: var(--color-success)"
            role="status"
          >
            <lucide-icon name="check-circle" class="w-4 h-4" />
            {{ successMsg() }}
          </div>
        }

        @if (errorMsg()) {
          <div
            class="mb-4 px-4 py-2.5 rounded-lg text-sm text-center"
            style="background: var(--color-error-soft); color: var(--color-error)"
            role="alert"
          >
            {{ errorMsg() }}
          </div>
        }

        <form (submit)="onSubmit($event)">
          <div class="flex flex-col gap-4">
            @if (isSignUp()) {
              <div class="flex flex-col gap-1.5">
                <label for="auth-name" class="text-sm font-medium" style="color: var(--color-text-secondary)">
                  Nom complet
                </label>
                <input
                  id="auth-name"
                  type="text"
                  [formField]="signUpForm.name"
                  placeholder="Votre nom"
                  autocomplete="name"
                  class="auth-input w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200"
                  style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)"
                />
                @if (signUpForm.name().touched() && signUpForm.name().invalid()) {
                  @for (error of signUpForm.name().errors(); track error.kind) {
                    <span class="text-xs" style="color: var(--color-error)" role="alert">{{ error.message }}</span>
                  }
                }
              </div>
            }

            @let af = activeForm();

            <div class="flex flex-col gap-1.5">
              <label for="auth-email" class="text-sm font-medium" style="color: var(--color-text-secondary)">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                [formField]="af.email"
                placeholder="vous@example.com"
                autocomplete="email"
                class="auth-input w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200"
                style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)"
              />
              @if (af.email().touched() && af.email().invalid()) {
                @for (error of af.email().errors(); track error.kind) {
                  <span class="text-xs" style="color: var(--color-error)" role="alert">{{ error.message }}</span>
                }
              }
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="auth-password" class="text-sm font-medium" style="color: var(--color-text-secondary)">
                Mot de passe
              </label>
              <input
                id="auth-password"
                type="password"
                [formField]="af.password"
                placeholder="••••••••"
                [attr.autocomplete]="isSignUp() ? 'new-password' : 'current-password'"
                class="auth-input w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200"
                style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)"
              />
              @if (af.password().touched() && af.password().invalid()) {
                @for (error of af.password().errors(); track error.kind) {
                  <span class="text-xs" style="color: var(--color-error)" role="alert">{{ error.message }}</span>
                }
              }
            </div>

            @if (isSignUp()) {
              <div class="flex flex-col gap-1.5">
                <label for="auth-confirm-password" class="text-sm font-medium" style="color: var(--color-text-secondary)">
                  Confirmer le mot de passe
                </label>
                <input
                  id="auth-confirm-password"
                  type="password"
                  [formField]="signUpForm.confirmPassword"
                  placeholder="••••••••"
                  autocomplete="new-password"
                  class="auth-input w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200"
                  style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)"
                />
                @if (signUpForm.confirmPassword().touched() && signUpForm.confirmPassword().invalid()) {
                  @for (error of signUpForm.confirmPassword().errors(); track error.kind) {
                    <span class="text-xs" style="color: var(--color-error)" role="alert">{{ error.message }}</span>
                  }
                }
              </div>
            }
          </div>

          <button
            type="submit"
            [disabled]="loading()"
            class="w-full mt-6 h-12 rounded-full text-sm font-semibold transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
            style="background: var(--color-accent); color: var(--color-accent-text)"
          >
            {{ submitLabel() }}
          </button>
        </form>

        <p class="mt-5 text-center text-sm" style="color: var(--color-text-muted)">
          {{ isSignUp() ? 'Déjà un compte ?' : "Pas encore de compte ?" }}
          <button
            type="button"
            class="ml-1 font-medium text-sm p-0 border-none bg-transparent cursor-pointer"
            style="color: var(--color-accent)"
            (click)="switchMode()"
          >
            {{ isSignUp() ? 'Se connecter' : "S'inscrire" }}
          </button>
        </p>
      </div>
    </div>
  `,
  styles: `
    :host { display: contents; }

    .auth-input:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-accent-soft);
    }
  `,
})
export class AuthModalComponent {
  private readonly auth = inject(AuthService);

  readonly close = output<void>();

  readonly isSignUp = signal(false);
  readonly loading = signal(false);
  readonly errorMsg = signal('');
  readonly successMsg = signal('');

  private readonly signInModel = signal<SignInModel>(EMPTY_SIGN_IN);
  private readonly signUpModel = signal<SignUpModel>(EMPTY_SIGN_UP);

  protected readonly signInForm = form(this.signInModel, (s) => {
    required(s.email, { message: 'Email requis' });
    email(s.email, { message: 'Email invalide' });
    required(s.password, { message: 'Mot de passe requis' });
  });

  protected readonly signUpForm = form(this.signUpModel, (s) => {
    required(s.name, { message: 'Le nom est requis' });
    required(s.email, { message: 'Email requis' });
    email(s.email, { message: 'Email invalide' });
    required(s.password, { message: 'Mot de passe requis' });
    required(s.confirmPassword, { message: 'Confirmez le mot de passe' });
    validate(s.confirmPassword, ({ value, valueOf }) =>
      value() !== valueOf(s.password)
        ? { kind: 'passwordMismatch', message: 'Les mots de passe ne correspondent pas' }
        : null
    );
  });

  protected readonly activeForm = computed(() =>
    this.isSignUp() ? this.signUpForm : this.signInForm
  );

  protected readonly submitLabel = computed(() => {
    if (this.loading()) return 'Chargement...';
    return this.isSignUp() ? 'Créer mon compte' : 'Se connecter';
  });

  switchMode(): void {
    this.isSignUp.update((v) => !v);
    this.errorMsg.set('');
    this.successMsg.set('');
    this.signInModel.set(EMPTY_SIGN_IN);
    this.signUpModel.set(EMPTY_SIGN_UP);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMsg.set('');

    if (this.isSignUp()) {
      this.handleSignUp();
    } else {
      this.handleSignIn();
    }
  }

  private handleSignIn(): void {
    submit(this.signInForm, {
      action: async () => {
        const { email, password } = this.signInModel();
        this.loading.set(true);
        try {
          const result = await this.auth.signIn(email, password);
          if (result.error) {
            this.errorMsg.set(result.error);
          } else {
            this.close.emit();
          }
        } finally {
          this.loading.set(false);
        }
      },
    });
  }

  private handleSignUp(): void {
    submit(this.signUpForm, {
      action: async () => {
        const { email, password, name } = this.signUpModel();
        this.loading.set(true);
        try {
          const result = await this.auth.signUp(email, password, name);
          if (result.error) {
            this.errorMsg.set(result.error);
          } else {
            this.successMsg.set('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
            this.signUpModel.set(EMPTY_SIGN_UP);
            this.close.emit();
          }
        } finally {
          this.loading.set(false);
        }
      },
    });
  }
}