import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <div class="max-w-3xl">
      <!-- Section header -->
      <div class="flex items-start gap-4 mb-8">
        <div class="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-subtle" style="background: var(--color-accent-soft); color: var(--color-accent)">
          <lucide-icon name="layout-dashboard" class="h-5 w-5" />
        </div>
        <div>
          <h2 class="font-display text-xl font-semibold tracking-tight m-0 mb-0.5" style="color: var(--color-text-primary)">Tableau de bord</h2>
          <p class="text-sm m-0" style="color: var(--color-text-muted)">Aperçu de votre contenu</p>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (stat of stats; track stat.label) {
          <div class="rounded-xl border p-5 flex items-start gap-4 surface border-border">
            <div class="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0" [style.background]="stat.bg" [style.color]="stat.color">
              <lucide-icon [name]="stat.icon" class="h-5 w-5" />
            </div>
            <div>
              <span class="block text-xl font-bold leading-tight" style="color: var(--color-text-primary)">{{ stat.value }}</span>
              <span class="text-xs" style="color: var(--color-text-muted)">{{ stat.label }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class AdminDashboardPage {
  readonly auth = inject(AuthService);

  readonly stats = [
    { icon: 'file-text', value: '295', label: 'Questions', bg: 'var(--color-amber-soft)', color: 'var(--color-amber)' },
    { icon: 'folder-tree', value: '21', label: 'Catégories', bg: 'var(--color-accent-soft)', color: 'var(--color-accent)' },
  ];
}
