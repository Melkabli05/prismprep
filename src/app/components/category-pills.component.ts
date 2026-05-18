import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { interviewCategories } from '../data/interview-categories';

@Component({
  selector: 'app-category-pills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2.5 mb-6">
      @for (cat of categories; track cat.id) {
        <button (click)="categoryChange.emit(cat.id)"
                class="px-4 py-2 rounded-full text-sm transition-all duration-200"
                [class.btn-primary]="activeCategory() === cat.id"
                [class.btn-outline]="activeCategory() !== cat.id"
                [class.font-semibold]="activeCategory() === cat.id"
                [class.shadow-sm]="activeCategory() === cat.id">
          {{ cat.title }}
          <span class="ml-1.5 text-xs opacity-60">{{ categoryTotals()[cat.id] }}</span>
        </button>
      }
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
