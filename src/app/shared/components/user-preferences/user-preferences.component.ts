import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { InterviewService } from '../../../core/services/interview.service';

type ThemeOption = 'light' | 'dark' | 'system';
type Tab = 'profile' | 'theme' | 'stack';

interface ProfileModel {
  name: string;
}

const EMPTY_PROFILE: ProfileModel = { name: '' };

@Component({
  selector: 'app-user-preferences',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, LucideAngularModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center h-screen p-4"
      style="background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(4px)"
      (click)="close.emit()"
    >
      <div
        class="relative w-full rounded-2xl border p-4 sm:p-6 md:p-8"
        style="background: var(--color-surface); border-color: var(--color-border); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); max-width: min(600px, 100vw)"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-title"
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
            <lucide-icon name="settings" class="w-6 h-6" />
          </div>
          <h2 id="prefs-title" class="text-xl font-bold tracking-tight" style="font-family: var(--font-display); color: var(--color-text-primary)">
            Préférences
          </h2>
        </div>

        @if (successMsg()) {
          <div class="mb-4 px-4 py-2.5 rounded-lg text-sm text-center flex items-center justify-center gap-2"
               style="background: var(--color-success-soft); color: var(--color-success)" role="status">
            <lucide-icon name="check-circle" class="w-4 h-4" />
            {{ successMsg() }}
          </div>
        }

        @if (errorMsg()) {
          <div class="mb-4 px-4 py-2.5 rounded-lg text-sm text-center"
               style="background: var(--color-error-soft); color: var(--color-error)" role="alert">
            {{ errorMsg() }}
          </div>
        }

        <!-- Tabs -->
        <div class="flex gap-1 mb-4 sm:mb-6 p-1 rounded-xl" style="background: var(--color-surface-raised)">
          @for (tab of tabs; track tab.id) {
            <button
              type="button"
              class="flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150"
              [style.color]="activeTab() === tab.id ? 'var(--color-accent)' : 'var(--color-text-muted)'"
              [style.background]="activeTab() === tab.id ? 'var(--color-surface)' : 'transparent'"
              (click)="activeTab.set(tab.id)"
            >
              {{ tab.label }}
            </button>
          }
        </div>

        <!-- Profile Tab -->
        @if (activeTab() === 'profile') {
          <form (submit)="saveProfile(); $event.preventDefault()">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="prefs-name" class="text-sm font-medium" style="color: var(--color-text-secondary)">Nom complet</label>
                <input id="prefs-name" type="text"
                       [formField]="profileForm.name"
                       placeholder="Votre nom"
                       class="prefs-input w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200"
                       style="background: var(--color-surface-raised); border-color: var(--color-border); color: var(--color-text-primary)" />
                @if (profileForm.name().touched() && profileForm.name().invalid()) {
                  @for (error of profileForm.name().errors(); track error.kind) {
                    <span class="text-xs" style="color: var(--color-error)" role="alert">{{ error.message }}</span>
                  }
                }
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="prefs-email" class="text-sm font-medium" style="color: var(--color-text-secondary)">Email</label>
                <input id="prefs-email" type="email"
                       [value]="user()?.email ?? ''"
                       readonly
                       class="prefs-input w-full px-4 py-3 rounded-xl text-sm border outline-none cursor-not-allowed"
                       style="background: var(--color-surface-hover); border-color: var(--color-border); color: var(--color-text-muted)" />
                <span class="text-xs" style="color: var(--color-text-muted)">Non modifiable</span>
              </div>
            </div>
            <button type="submit" [disabled]="loading()"
                    class="w-full mt-6 h-12 rounded-full text-sm font-semibold transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
                    style="background: var(--color-accent); color: var(--color-accent-text)">
              {{ loading() ? 'Chargement...' : 'Enregistrer' }}
            </button>
          </form>
        }

        <!-- Theme Tab -->
        @if (activeTab() === 'theme') {
          <div class="flex flex-col gap-3">
            @for (opt of themeOptions; track opt.value) {
              <button
                type="button"
                class="flex items-center gap-4 p-4 rounded-xl border transition-all duration-150"
                [style.border-color]="theme() === opt.value ? 'var(--color-accent)' : 'var(--color-border)'"
                [style.background]="theme() === opt.value ? 'var(--color-accent-soft)' : 'var(--color-surface-raised)'"
                (click)="setTheme(opt.value)"
              >
                <lucide-icon [name]="opt.icon" class="w-5 h-5" [style.color]="'var(--color-text-secondary)'" />
                <div class="flex flex-col items-start">
                  <span class="text-sm font-medium" style="color: var(--color-text-primary)">{{ opt.label }}</span>
                  <span class="text-xs" style="color: var(--color-text-muted)">{{ opt.description }}</span>
                </div>
                @if (theme() === opt.value) {
                  <lucide-icon name="check" class="w-4 h-4 ml-auto" style="color: var(--color-accent)" />
                }
              </button>
            }
          </div>
        }

        <!-- Stack Tab -->
        @if (activeTab() === 'stack') {
          <div class="flex flex-col gap-3">
            <p class="text-sm mb-2" style="color: var(--color-text-muted)">Sélectionnez vos technologies — vos choix sont triés par priorité et les autres restent accessibles.</p>
            <div class="flex flex-col gap-3">
              @if (selectedCategories().length > 0) {
                <div>
                  <p class="text-xs font-medium uppercase tracking-wider mb-2" style="color: var(--color-text-muted)">Sélectionnées</p>
                  <div class="flex flex-wrap gap-2">
                    @for (cat of selectedCategories(); track cat.id) {
                      <button
                        type="button"
                        class="px-3 py-1.5 rounded-full text-sm border transition-all duration-150"
                        style="border-color: var(--color-accent); background: var(--color-accent-soft); color: var(--color-accent)"
                        (click)="toggleStack(cat.id)"
                      >
                        {{ cat.title }}
                        <lucide-icon name="x" class="w-3 h-3 ml-1 inline" />
                      </button>
                    }
                  </div>
                </div>
              }
              @if (unselectedCategories().length > 0) {
                <div>
                  <p class="text-xs font-medium uppercase tracking-wider mb-2" style="color: var(--color-text-muted)">Autres</p>
                  <div class="flex flex-wrap gap-2">
                    @for (cat of unselectedCategories(); track cat.id) {
                      <button
                        type="button"
                        class="px-3 py-1.5 rounded-full text-sm border transition-all duration-150"
                        style="border-color: var(--color-border); background: var(--color-surface-raised); color: var(--color-text-muted)"
                        (click)="toggleStack(cat.id)"
                      >
                        + {{ cat.title }}
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
            @if (selectedStack().length === 0) {
              <p class="text-xs text-center" style="color: var(--color-text-muted)">Aucune sélection — toutes les catégories sont affichées.</p>
            }
            <button type="button"
                    class="w-full mt-4 h-10 rounded-full text-sm font-medium transition-all duration-150 hover:opacity-80"
                    style="border: 1px solid var(--color-border); color: var(--color-text-secondary); background: transparent"
                    (click)="clearStack()">
              Tout afficher
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host { display: contents; }
    .prefs-input:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-accent-soft);
    }
  `,
})
export class UserPreferencesComponent {
  private readonly auth = inject(AuthService);
  private readonly interview = inject(InterviewService);

  readonly close = output<void>();

  readonly user = this.auth.user;
  readonly loading = signal(false);
  readonly errorMsg = signal('');
  readonly successMsg = signal('');
  readonly activeTab = signal<Tab>('profile');

  readonly tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profil' },
    { id: 'theme', label: 'Thème' },
    { id: 'stack', label: 'Stack' },
  ];

  readonly themeOptions: { value: ThemeOption; label: string; description: string; icon: string }[] = [
    { value: 'light', label: 'Clair', description: 'Mode jour', icon: 'sun' },
    { value: 'dark', label: 'Sombre', description: 'Mode nuit', icon: 'moon' },
    { value: 'system', label: 'Système', description: 'Suit votre OS', icon: 'monitor' },
  ];

  private readonly profileModel = signal<ProfileModel>(EMPTY_PROFILE);
  readonly profileForm = form(this.profileModel, (s) => {
    required(s.name, { message: 'Le nom est requis' });
  });

  readonly allCategories = computed(() => this.interview.categoryTree());

  private readonly _selectedStack = signal<string[]>([]);
  readonly selectedStack = this._selectedStack.asReadonly();

  readonly selectedCategories = computed(() =>
    this.allCategories().filter(c => this._selectedStack().includes(c.id))
  );

  readonly unselectedCategories = computed(() =>
    this.allCategories().filter(c => !this._selectedStack().includes(c.id))
  );

  readonly theme = signal<ThemeOption>('system');

  readonly isStackSelected = (id: string) => this._selectedStack().includes(id);

  constructor() {
    // Init profile form with current user name
    const meta = this.user()?.user_metadata;
    if (meta?.['name']) {
      this.profileModel.set({ name: meta['name'] as string });
    }

    // Init stack from auth
    this._selectedStack.set([...this.auth.stack()]);

    // Init theme from localStorage
    const stored = localStorage.getItem('theme-preference') as ThemeOption | null;
    if (stored) this.theme.set(stored);
    else this.applyTheme(this.theme());
  }

  toggleStack(id: string): void {
    this._selectedStack.update(stack =>
      stack.includes(id) ? stack.filter(s => s !== id) : [...stack, id]
    );
  }

  clearStack(): void {
    this._selectedStack.set([]);
  }

  setTheme(option: ThemeOption): void {
    this.theme.set(option);
    localStorage.setItem('theme-preference', option);
    this.applyTheme(option);
  }

  private applyTheme(option: ThemeOption): void {
    const isDark =
      option === 'dark' ||
      (option === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  saveProfile(): void {
    this.errorMsg.set('');
    this.loading.set(true);
    this.auth.updateProfile(this.profileModel().name, this._selectedStack()).then(result => {
      this.loading.set(false);
      if (result.error) {
        this.errorMsg.set(result.error);
      } else {
        this.successMsg.set('Profil mis à jour !');
        setTimeout(() => this.close.emit(), 1200);
      }
    });
  }
}