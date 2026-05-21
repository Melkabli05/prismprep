import { Component, input, output, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { InterviewService } from '../../../../core/services/interview.service';

@Component({
  selector: 'app-category-pills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  styles: `
    :host { display: block; }

    .pills-track {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      scrollbar-width: none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }
    .pills-track::-webkit-scrollbar { display: none; }

    .category-pill {
      position: relative;
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
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 150ms ease;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .category-pill-active {
      background: var(--color-surface);
      color: var(--color-text-primary);
      border-color: var(--color-border);
      box-shadow: var(--shadow-card);
      transform: translateY(-1px);
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
      transition: background 180ms ease, color 180ms ease;
    }
    .count-badge-active {
      background: var(--color-accent-soft);
      color: var(--color-accent);
    }
    .count-badge-inactive {
      background: var(--color-surface-hover);
      color: var(--color-text-muted);
    }

    /* Tooltip */
    .pill-tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-text-primary);
      color: var(--color-bg);
      font-size: 0.6875rem;
      padding: 0.375rem 0.625rem;
      border-radius: var(--radius-md);
      white-space: nowrap;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms ease;
      z-index: 20;
      font-weight: 500;
    }
    .pill-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--color-text-primary);
    }
    .category-pill:hover .pill-tooltip {
      opacity: 1;
    }
  `,
  template: `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
      <div
        class="pills-track"
        role="tablist"
        aria-label="Catégories">

        @for (cat of categories(); track cat.id) {
          <button
            role="tab"
            [attr.aria-selected]="activeCategory() === cat.id"
            (click)="selectCategory(cat.id)"
            (keydown)="onKeydown($event, cat.id)"
            class="category-pill"
            [class.category-pill-active]="activeCategory() === cat.id"
            [class.category-pill-inactive]="activeCategory() !== cat.id">
            {{ cat.title }}
            <span
              class="count-badge"
              [class.count-badge-active]="activeCategory() === cat.id"
              [class.count-badge-inactive]="activeCategory() !== cat.id">
              {{ categoryTotals()[cat.id] }}
            </span>

            <!-- Tooltip -->
            <span class="pill-tooltip">{{ cat.description }}</span>
          </button>
        }
      </div>
    </div>
  `,
})
export class CategoryPillsComponent {
  readonly svc = inject(InterviewService);
  activeCategory = input<string>('rh');
  categoryChange = output<string>();

  readonly categories = computed(() => this.svc.activeCategories());

  readonly categoryTotals = computed(() =>
    Object.fromEntries(
      this.categories().map(cat => [cat.id, cat.sections.reduce((a, s) => a + s.questions.length, 0)])
    )
  );

  selectCategory(id: string): void {
    this.categoryChange.emit(id);
  }

  onKeydown(e: KeyboardEvent, catId: string): void {
    const cats = this.categories();
    const current = cats.findIndex(c => c.id === catId);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = cats[current + 1]?.id;
      if (next) this.categoryChange.emit(next);
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = cats[current - 1]?.id;
      if (prev) this.categoryChange.emit(prev);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.categoryChange.emit(catId);
    }
  }
}