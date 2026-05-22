import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  template: `
    <nav class="sticky top-0 z-50 border-b flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6"
      style="background: color-mix(in srgb, var(--color-bg) 85%, transparent); backdrop-filter: blur(12px); border-color: var(--color-border)">
      <div class="flex items-center gap-3">
        <a routerLink="/" class="flex items-center gap-1.5 no-underline text-sm font-medium hover-accent transition-colors duration-150"
          style="color: var(--color-text-secondary)">
          <lucide-icon name="arrow-left" class="h-4 w-4" />
          <span class="hidden sm:inline">Retour à Prism</span>
        </a>
        <span class="w-px h-[22px]" style="background: var(--color-border)"></span>
        <span class="font-display text-lg font-bold tracking-tight" style="color: var(--color-text-primary)">Administration</span>
      </div>
      <span class="text-xs text-muted">{{ auth.user()?.email }}</span>
    </nav>

    <div class="flex" style="min-height: calc(100dvh - 3.5rem)">
      <!-- Desktop sidebar -->
      <aside class="hidden sm:flex flex-col gap-1 w-[220px] flex-shrink-0 p-4 border-r surface border-border">
        @for (item of navItems; track item.path) {
          <a [routerLink]="item.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="item.exact ? { exact: true } : {}"
            class="flex items-center gap-2.5 px-3 py-2 no-underline text-sm font-medium rounded-md transition-all duration-150 sidebar-link">
            <lucide-icon [name]="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </a>
        }
      </aside>

      <!-- Mobile tab bar -->
      <div class="sm:hidden flex gap-2 px-4 py-3 border-b w-full surface border-border">
        @for (item of navItems; track item.path) {
          <a [routerLink]="item.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="item.exact ? { exact: true } : {}"
            class="flex items-center gap-1.5 px-3 py-1.5 no-underline text-xs font-medium rounded-full transition-all duration-150 sidebar-link">
            <lucide-icon [name]="item.icon" class="h-3.5 w-3.5" />
            {{ item.label }}
          </a>
        }
      </div>

      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .sidebar-link { color: var(--color-text-secondary); }
    .sidebar-link:hover { background: var(--color-surface-hover); color: var(--color-text-primary); }
    .sidebar-link.active { background: var(--color-accent-soft); color: var(--color-accent); }
  `,
})
export class AdminShellPage {
  readonly auth = inject(AuthService);
  readonly navItems = [
    { path: '/admin', icon: 'layout-dashboard', label: 'Tableau de bord', exact: true },
    { path: '/admin/questions', icon: 'file-text', label: 'Questions', exact: false },
  ];
}
