import { Component, input, output, computed, signal, viewChild, afterNextRender, afterRenderEffect, inject, ElementRef, DestroyRef } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Interview } from '../../state/interview';

@Component({
  selector: 'app-category-pills',
  imports: [LucideAngularModule],
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
    .pills-row-wrap {
      position: relative;
    }
    .pills-fade {
      position: absolute;
      top: 0;
      bottom: 8px;
      width: 40px;
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      transition: opacity 220ms ease;
    }
    .pills-fade-visible {
      opacity: 1;
    }
    .pills-fade-left {
      left: 0;
      background: linear-gradient(to right, var(--color-bg) 25%, transparent);
    }
    .pills-fade-right {
      right: 0;
      background: linear-gradient(to left, var(--color-bg) 25%, transparent);
    }
    .pills-scroll-btn {
      position: absolute;
      top: 0;
      bottom: 8px;
      margin: auto 0;
      height: 26px;
      width: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      color: var(--color-text-secondary);
      box-shadow: var(--shadow-sm);
      cursor: pointer;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.85);
      transition: opacity 200ms ease, transform 150ms ease, color 180ms ease, background 180ms ease, border-color 180ms ease;
    }
    .pills-scroll-btn-visible {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1);
    }
    .pills-scroll-btn:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-primary);
      border-color: var(--color-text-muted);
    }
    .pills-scroll-btn:active {
      transform: scale(0.9);
    }
    .pills-scroll-btn-left {
      left: 2px;
    }
    .pills-scroll-btn-right {
      right: 2px;
    }
  `,
  template: `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
      <div class="pills-row-wrap">
        <div #pillsRow
             class="flex items-center gap-2 overflow-x-auto pb-2"
             (scroll)="updateScrollState()">
          @for (cat of categories(); track cat.id) {
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

        <div class="pills-fade pills-fade-left" [class.pills-fade-visible]="canScrollLeft()"></div>
        <div class="pills-fade pills-fade-right" [class.pills-fade-visible]="canScrollRight()"></div>

        <button type="button"
                class="pills-scroll-btn pills-scroll-btn-left"
                [class.pills-scroll-btn-visible]="canScrollLeft()"
                [attr.tabindex]="canScrollLeft() ? 0 : -1"
                [attr.aria-hidden]="!canScrollLeft()"
                aria-label="Catégories précédentes"
                (click)="scrollBy(-160)">
          <lucide-icon name="chevron-left" class="h-3.5 w-3.5"></lucide-icon>
        </button>
        <button type="button"
                class="pills-scroll-btn pills-scroll-btn-right"
                [class.pills-scroll-btn-visible]="canScrollRight()"
                [attr.tabindex]="canScrollRight() ? 0 : -1"
                [attr.aria-hidden]="!canScrollRight()"
                aria-label="Catégories suivantes"
                (click)="scrollBy(160)">
          <lucide-icon name="chevron-right" class="h-3.5 w-3.5"></lucide-icon>
        </button>
      </div>
    </div>
  `,
})
export class CategoryPillsComponent {
  readonly svc = inject(Interview);
  activeCategory = input<string>('rh');
  categoryChange = output<string>();

  private readonly pillsRow = viewChild<ElementRef<HTMLDivElement>>('pillsRow');

  readonly canScrollLeft = signal(false);
  readonly canScrollRight = signal(false);

  readonly categories = computed(() => this.svc.activeCategories());

  readonly categoryTotals = computed(() =>
    Object.fromEntries(
      this.categories().map(cat => [cat.id, cat.sections.reduce((a, s) => a + s.questions.length, 0)])
    )
  );

  constructor() {
    afterRenderEffect(() => {
      this.categories();
      this.updateScrollState();
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.pillsRow()?.nativeElement;
      if (!el) return;
      const resizeObserver = new ResizeObserver(() => this.updateScrollState());
      resizeObserver.observe(el);
      destroyRef.onDestroy(() => resizeObserver.disconnect());
    });
  }

  updateScrollState(): void {
    const el = this.pillsRow()?.nativeElement;
    if (!el) return;
    this.canScrollLeft.set(el.scrollLeft > 4);
    this.canScrollRight.set(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  scrollBy(amount: number): void {
    this.pillsRow()?.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }
}