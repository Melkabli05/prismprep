import { Component, input, output, signal, effect, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, FormField],
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }
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
    .search-input::placeholder {
      color: var(--color-text-placeholder);
    }
    .search-input:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-accent-soft);
      background: var(--color-surface);
    }
    .search-input:focus::placeholder {
      color: var(--color-text-muted);
    }
    .search-icon-wrapper {
      color: var(--color-text-placeholder);
      transition: color 200ms ease;
      pointer-events: none;
    }
    .search-input:focus ~ .search-icon-wrapper {
      color: var(--color-text-muted);
    }
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: var(--radius-full);
      border: none;
      background: transparent;
      color: var(--color-text-muted);
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
      padding: 0;
      flex-shrink: 0;
    }
    .clear-btn:hover {
      background: var(--color-surface-active);
      color: var(--color-text-primary);
    }
    .theme-btn {
      border: 1px solid var(--color-border);
      border-radius: 9999px;
      transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
      color: var(--color-text-secondary);
      background: transparent;
    }
    .theme-btn:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
      background: var(--color-accent-soft);
    }
    .logo-text {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.5rem;
      letter-spacing: -0.02em;
      color: var(--color-text-primary);
    }
  `,
  template: `
    <header class="h-14 sm:h-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="shrink-0 w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
            <!-- Asymmetric angular mark: a bold angular chevron + triangular shard -->
            <polygon points="16,2 30,28 16,22 2,28" fill="var(--color-accent)" />
            <polygon points="16,2 22,14 16,11 10,14" fill="var(--color-accent-text)" opacity="0.9" />
            <polygon points="16,22 22,14 16,17 10,14" fill="var(--color-accent-text)" opacity="0.5" />
          </svg>
          <span class="logo-text text-lg sm:text-xl tracking-tight">Prism</span>
        </div>

        <!-- Search + Theme -->
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="relative flex items-center">
            <lucide-icon name="search" class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 search-icon-wrapper"></lucide-icon>
            <input
              id="search-input"
              type="text"
              [formField]="searchForm.query"
              (input)="onSearchInput($event)"
              placeholder="Rechercher..."
              aria-label="Rechercher dans les questions"
              class="search-input pl-12 pr-9 h-9 sm:h-10 w-32 sm:w-40 md:w-52 lg:w-64">
            @if (searchForm.query().value()) {
              <button (click)="clearSearch()" class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 clear-btn" aria-label="Effacer la recherche">
                <lucide-icon name="x" class="h-3 w-3"></lucide-icon>
              </button>
            }
          </div>
          <button (click)="toggleTheme.emit()" class="theme-btn h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center" aria-label="Toggle theme">
            <lucide-icon [name]="isDark() ? 'sun' : 'moon'" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnDestroy {
  readonly isDark = signal(false);

  searchModel = signal({ query: '' });
  searchForm = form(this.searchModel);

  toggleTheme = output<void>();
  searchChange = output<string>();

  private themeObserver: MutationObserver | null = null;

  constructor() {
    this.isDark.set(document.documentElement.classList.contains('dark'));
    effect(() => {
      const update = () => this.isDark.set(document.documentElement.classList.contains('dark'));
      if (this.themeObserver) this.themeObserver.disconnect();
      this.themeObserver = new MutationObserver(update);
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  clearSearch(): void {
    this.searchModel.update(m => ({ ...m, query: '' }));
    this.searchChange.emit('');
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
  }
}