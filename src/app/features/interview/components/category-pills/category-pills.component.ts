import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { interviewCategories } from '../../data';

@Component({
  selector: 'app-category-pills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styles: `
    .category-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      height: 32px;
      padding: 0 0.875rem;
      border-radius: var(--radius-full);
      font-size: 0.8125rem;
      font-weight: 500;
      border: 1px solid transparent;
      cursor: pointer;
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
      white-space: nowrap;
    }
    .category-pill-active {
      background: var(--color-surface);
      color: var(--color-text-primary);
      border-color: var(--color-border);
      box-shadow: var(--shadow-sm);
    }
    .category-pill-active:hover {
      background: var(--color-surface-hover);
    }
    .category-pill-inactive {
      background: transparent;
      color: var(--color-text-muted);
      border-color: transparent;
    }
    .category-pill-inactive:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-secondary);
    }
    .count-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 18px;
      padding: 0 5px;
      border-radius: var(--radius-full);
      font-size: 0.6875rem;
      font-weight: 600;
    }
    .count-badge-active {
      background: var(--color-accent-soft);
      color: var(--color-accent);
    }
    .count-badge-inactive {
      background: var(--color-surface-hover);
      color: var(--color-text-muted);
    }
    .overflow-x-auto::-webkit-scrollbar {
      display: none;
    }
    .overflow-x-auto {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  `,
  template: `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        @for (cat of categories; track cat.id) {
          <button (click)="categoryChange.emit(cat.id)"
                  class="category-pill shrink-0"
                  [class.category-pill-active]="activeCategory() === cat.id"
                  [class.category-pill-inactive]="activeCategory() !== cat.id">
            {{ cat.title }}
            <span class="count-badge"
                  [class.count-badge-active]="activeCategory() === cat.id"
                  [class.count-badge-inactive]="activeCategory() !== cat.id">
              {{ categoryTotals()[cat.id] }}
            </span>
          </button>
        }
      </div>
    </div>
  `,
})
export class CategoryPillsComponent {
  activeCategory = input<string>('rh');
  categoryChange = output<string>();

  readonly categories = interviewCategories;

  readonly categoryTotals = computed(() =>
    Object.fromEntries(
      this.categories.map(cat => [cat.id, cat.sections.reduce((a, s) => a + s.questions.length, 0)])
    )
  );
}