import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-section-header',
  imports: [LucideAngularModule],
  styles: `
    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: var(--radius-lg);
      background: var(--color-accent-soft);
      border: 1px solid var(--color-border-subtle);
      flex-shrink: 0;
    }
    .title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--color-text-primary);
      line-height: 1.3;
    }
    .subtitle {
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      margin-top: 0.125rem;
    }
  `,
  template: `
    <div class="flex items-center gap-4 mb-8">
      <div class="icon-wrap">
        <lucide-icon [name]="iconName()" class="h-5 w-5" style="color: var(--color-accent)"></lucide-icon>
      </div>
      <div>
        <h2 class="title">{{ title() }}</h2>
        @if (subtitle()) {
          <p class="subtitle">{{ subtitle() }}</p>
        }
      </div>
    </div>
  `,
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  iconName = input<string>('calendar');
}