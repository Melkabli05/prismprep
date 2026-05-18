import { Component, output, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, LucideAngularModule],
  template: `
    <header class="sticky top-0 z-40 border-b bg-base-100/95 backdrop-blur-sm">
      <div class="max-w-2xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" class="shrink-0">
              <rect width="36" height="36" rx="10" class="fill-primary"></rect>
              <path d="M10 12h7v2.4h-4.2v2.4h3.6v2.4h-3.6V24H10V12Z" class="fill-primary-content"></path>
              <path d="M19 12h3.6c2.4 0 4.4 1.8 4.4 4.2v3.6c0 2.4-2 4.2-4.4 4.2H19V12Zm2.8 2.4v7.2h.8c1 0 1.6-.6 1.6-1.8v-3.6c0-1.2-.6-1.8-1.6-1.8h-.8Z" class="fill-primary-content"></path>
            </svg>
            <h1 class="text-2xl font-bold tracking-tight">DevPrep</h1>
          </div>
          <button (click)="toggleTheme.emit()"
                  class="btn btn-ghost btn-sm h-9 w-9 p-0">
            <lucide-icon [name]="isDark() ? 'sun' : 'moon'" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
        <div class="relative">
          <lucide-icon name="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/50 absolute pointer-events-none top-3 left-3.5"></lucide-icon>
          <input
            id="search-input"
            type="text"
            [(ngModel)]="searchValue"
            (ngModelChange)="searchChange.emit($event)"
            placeholder="Rechercher... (Ctrl+K)"
            class="input input-bordered w-full pl-10 h-10">
          @if (searchValue) {
            <button (click)="clearSearch()" class="absolute right-3.5 top-1/2 -translate-y-1/2">
              <lucide-icon name="x" class="h-4 w-4 text-base-content/50"></lucide-icon>
            </button>
          }
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  isDark = signal(false);
  searchValue = '';

  toggleTheme = output<void>();
  searchChange = output<string>();

  ngOnInit(): void {
    this.isDark.set(document.documentElement.dataset['theme'] === 'dark');
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchChange.emit('');
  }
}
