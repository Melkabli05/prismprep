import { Component, inject, signal, output, effect, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';
import { SearchShortcutDirective } from '../../../../shared/directives/search-shortcut.directive';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthModalComponent } from '../../../../shared/components/auth-modal/auth-modal.component';
import { UserPreferencesComponent } from '../../../../shared/components/user-preferences/user-preferences.component';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, FormField, SearchShortcutDirective, AuthModalComponent, UserPreferencesComponent],
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 50; }
    header {
      background: rgba(var(--color-bg), 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--color-border);
      transition: background 250ms ease, border-color 250ms ease;
    }
    .search-input {
      background: var(--color-surface-raised);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      border-radius: var(--radius-full);
      transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
      font-size: 0.875rem;
    }
    .search-input::placeholder { color: var(--color-text-placeholder); }
    .search-input:focus {
      outline: none; border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-accent-soft);
      background: var(--color-surface);
    }
    .search-input:focus::placeholder { color: var(--color-text-muted); }
    .search-icon-wrapper { color: var(--color-text-placeholder); transition: color 200ms ease; pointer-events: none; }
    .search-input:focus ~ .search-icon-wrapper { color: var(--color-text-muted); }
    .search-kbd {
      display: inline-flex; align-items: center; justify-content: center;
      height: 18px; padding: 0 0.375rem; border-radius: var(--radius-sm);
      border: 1px solid var(--color-border); background: var(--color-surface-hover);
      font-size: 0.6875rem; font-weight: 500; color: var(--color-text-muted);
      font-family: var(--font-sans); pointer-events: none; flex-shrink: 0; white-space: nowrap;
    }
    .clear-btn {
      display: flex; align-items: center; justify-content: center;
      width: 18px; height: 18px; border-radius: var(--radius-full);
      border: none; background: transparent; color: var(--color-text-muted);
      cursor: pointer; transition: background 150ms ease, color 150ms ease; padding: 0; flex-shrink: 0;
    }
    .clear-btn:hover { background: var(--color-surface-active); color: var(--color-text-primary); }
    .theme-btn {
      border: 1px solid var(--color-border); border-radius: 9999px;
      transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
      color: var(--color-text-secondary); background: transparent;
    }
    .theme-btn:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-accent-soft); }
    .logo-text { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; letter-spacing: -0.02em; color: var(--color-text-primary); }
    .auth-btn {
      height: 32px; padding: 0 0.75rem; border-radius: var(--radius-full);
      border: 1px solid var(--color-border); background: var(--color-surface);
      color: var(--color-text-secondary); font-size: 0.8125rem; font-weight: 500;
      cursor: pointer; transition: all 150ms ease; white-space: nowrap;
    }
    .auth-btn:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-accent-soft); }
    .user-badge {
      display: flex; align-items: center; gap: 0.375rem;
      height: 32px; padding: 0 0.625rem; border-radius: var(--radius-full);
      border: 1px solid var(--color-border); background: var(--color-surface);
      color: var(--color-text-secondary); font-size: 0.75rem;
      cursor: pointer; transition: all 150ms ease; white-space: nowrap;
    }
    @media (max-width: 480px) {
      .search-input { width: 100px !important; }
    }
    .user-badge:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-accent-soft); }
    .user-initial {
      width: 20px; height: 20px; border-radius: 9999px;
      display: flex; align-items: center; justify-content: center;
      background: var(--color-accent); color: var(--color-accent-text);
      font-size: 0.6875rem; font-weight: 700; flex-shrink: 0;
    }
    .user-dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      min-width: 160px; border-radius: var(--radius-lg); border: 1px solid var(--color-border);
      background: var(--color-surface); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
      overflow: hidden; z-index: 100;
    }
    @media (max-width: 380px) {
      .user-dropdown {
        right: -8px;
        min-width: 140px;
      }
    }
    .dropdown-item {
      display: flex; align-items: center; gap: 0.5rem;
      width: 100%; padding: 0.625rem 0.875rem;
      font-size: 0.8125rem; color: var(--color-text-secondary);
      background: transparent; border: none; cursor: pointer; text-align: left;
      transition: background 150ms ease, color 150ms ease;
    }
    .dropdown-item:hover { background: var(--color-surface-hover); color: var(--color-text-primary); }
    .dropdown-item.danger:hover { background: var(--color-error-soft); color: var(--color-error); }
    .dropdown-divider { height: 1px; background: var(--color-border); margin: 0.25rem 0; }
  `,
  template: `
    <header class="h-14 sm:h-16">
      @if (showAuthModal()) {
        <app-auth-modal (close)="showAuthModal.set(false)" />
      }
      @if (showPreferences()) {
        <app-user-preferences (close)="showPreferences.set(false)" />
      }

      <div class="max-w-3xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="shrink-0 w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
            <polygon points="16,2 30,28 16,22 2,28" fill="var(--color-accent)" />
            <polygon points="16,2 22,14 16,11 10,14" fill="var(--color-accent-text)" opacity="0.9" />
            <polygon points="16,22 22,14 16,17 10,14" fill="var(--color-accent-text)" opacity="0.5" />
          </svg>
          <span class="logo-text text-lg sm:text-xl tracking-tight">Prism</span>
        </div>

        <!-- Search + Auth + Theme -->
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="relative flex items-center" appSearchShortcut>
            <lucide-icon name="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 search-icon-wrapper"></lucide-icon>
            <input id="search-input" type="text" [formField]="searchForm.query" (input)="onSearchInput($event)"
              placeholder="Rechercher..." aria-label="Rechercher dans les questions"
              class="search-input pl-12 pr-24 sm:pr-28 h-9 sm:h-10 w-32 sm:w-40 md:w-52 lg:w-64">
            <div class="absolute right-9 sm:right-10 flex items-center gap-1">
              <kbd class="search-kbd hidden sm:flex">{{ isMac() ? '⌘K' : 'Ctrl+K' }}</kbd>
            </div>
            @if (searchForm.query().value()) {
              <button (click)="clearSearch()" class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 clear-btn" aria-label="Effacer la recherche">
                <lucide-icon name="x" class="h-3 w-3"></lucide-icon>
              </button>
            }
          </div>

          @if (auth.user(); as user) {
            <!-- User dropdown -->
            <div class="relative">
              <button class="user-badge" (click)="toggleDropdown()" [attr.aria-expanded]="showDropdown()" aria-haspopup="true">
                <span class="user-initial">{{ user.email?.[0]?.toUpperCase() ?? '?' }}</span>
                <span class="hidden md:inline" style="max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ user.email }}</span>
                <lucide-icon name="chevron-down" class="w-3 h-3" style="color: var(--color-text-muted); flex-shrink: 0" />
              </button>

              @if (showDropdown()) {
                <div class="user-dropdown" role="menu">
                  <button class="dropdown-item" role="menuitem" (click)="openPreferences()">
                    <lucide-icon name="settings" class="w-4 h-4" />
                    Préférences
                  </button>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item danger" role="menuitem" (click)="signOut()">
                    <lucide-icon name="log-out" class="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              }
            </div>
          } @else {
            <button class="auth-btn" (click)="showAuthModal.set(true)">Connexion</button>
          }

          <button (click)="toggleTheme.emit()" class="theme-btn h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center" aria-label="Basculer le thème">
            <lucide-icon [name]="isDark() ? 'sun' : 'moon'" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnDestroy {
  readonly auth = inject(AuthService);
  readonly isDark = signal(false);
  readonly isMac = signal(false);
  readonly showAuthModal = signal(false);
  readonly showPreferences = signal(false);
  readonly showDropdown = signal(false);

  searchModel = signal({ query: '' });
  searchForm = form(this.searchModel);

  searchChange = output<string>();
  toggleTheme = output<void>();

  private themeObserver: MutationObserver | null = null;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private dropdownListener: (() => void) | null = null;

  constructor() {
    this.isDark.set(document.documentElement.classList.contains('dark'));
    this.isMac.set(navigator.platform.toUpperCase().includes('MAC'));
    effect(() => {
      const update = () => this.isDark.set(document.documentElement.classList.contains('dark'));
      if (this.themeObserver) this.themeObserver.disconnect();
      this.themeObserver = new MutationObserver(update);
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    });
    effect(() => {
      if (this.showDropdown()) {
        this.dropdownListener = () => {
          this.showDropdown.set(false);
          document.removeEventListener('click', this.dropdownListener!);
        };
        setTimeout(() => document.addEventListener('click', this.dropdownListener!), 0);
      } else {
        if (this.dropdownListener) {
          document.removeEventListener('click', this.dropdownListener);
          this.dropdownListener = null;
        }
      }
    });
  }

  toggleDropdown(): void {
    this.showDropdown.update(v => !v);
  }

  openPreferences(): void {
    this.showDropdown.set(false);
    this.showPreferences.set(true);
  }

  signOut(): void {
    this.showDropdown.set(false);
    this.auth.signOut();
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchModel.update(m => ({ ...m, query: value }));
    if (this.debounceTimer !== null) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.searchChange.emit(value), 150);
  }

  clearSearch(): void {
    if (this.debounceTimer !== null) clearTimeout(this.debounceTimer);
    this.searchModel.update(m => ({ ...m, query: '' }));
    this.searchChange.emit('');
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
    if (this.debounceTimer !== null) clearTimeout(this.debounceTimer);
    if (this.dropdownListener) document.removeEventListener('click', this.dropdownListener);
  }
}