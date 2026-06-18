import { Service, signal, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth.service';

export type ThemeOption = 'light' | 'dark' | 'system';

@Service()
export class ThemeService {
  private auth = inject(AuthService);

  /** Active theme from backend, falls back to localStorage */
  readonly theme = signal<ThemeOption>('system');

  /** True if dark mode is currently applied to the document */
  readonly isDark = signal(false);

  readonly cycleMap: Record<string, ThemeOption> = { light: 'dark', dark: 'system', system: 'light' };

  constructor() {
    // Init from backend or localStorage
    const backend = this.auth.theme() as ThemeOption;
    const stored = localStorage.getItem('theme-preference') as ThemeOption | null;
    const initial = backend && backend !== 'system' ? backend as ThemeOption : (stored ?? 'system');
    this.theme.set(initial);
    this.applyTheme(initial);

    // Sync when auth user loads (e.g. after login)
    effect(() => {
      const userTheme = this.auth.theme() as ThemeOption;
      if (userTheme && userTheme !== 'system') {
        this.theme.set(userTheme);
        this.applyTheme(userTheme);
      }
    });
  }

  setTheme(option: ThemeOption): void {
    this.theme.set(option);
    localStorage.setItem('theme-preference', option);
    this.applyTheme(option);
    this.auth.updateTheme(option);
  }

  toggle(): void {
    this.setTheme(this.cycleMap[this.theme()] ?? 'system');
  }

  private applyTheme(option: ThemeOption): void {
    const isDark =
      option === 'dark' ||
      (option === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.isDark.set(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}