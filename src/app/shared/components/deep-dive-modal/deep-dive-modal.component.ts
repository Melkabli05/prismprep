import { ChangeDetectionStrategy, Component, input, output, signal, computed, viewChild } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DeepDiveContentComponent } from './deep-dive-content.component';

@Component({
  selector: 'app-deep-dive-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, DeepDiveContentComponent],
  template: `
    <div class="modal-card" (click)="$event.stopPropagation()" role="dialog" aria-modal="true" aria-labelledby="deep-dive-title">
      <!-- Sticky header bar -->
      <div class="flex items-center gap-3 px-4 py-2" style="border-bottom: 1px solid var(--color-border-subtle)">
        <!-- Left: graduation icon + question + reading time -->
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style="background: var(--color-accent-soft); color: var(--color-accent)"
          >
            <lucide-icon name="graduation-cap" class="w-3 h-3" />
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold truncate" style="color: var(--color-text-primary)">{{ question() }}</p>
            <p class="text-xs" style="color: var(--color-text-muted)">{{ readingTime() }} min de lecture</p>
          </div>
        </div>

        <!-- Right: action buttons -->
        <div class="flex items-center gap-1">
          <!-- Search toggle -->
          <button
            class="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150"
            style="background: transparent; color: var(--color-text-muted)"
            type="button"
            (click)="showSearch.set(!showSearch()); searchQuery.set('')"
            [attr.aria-label]="showSearch() ? 'Fermer la recherche' : 'Rechercher'"
          >
            <lucide-icon name="search" class="w-3.5 h-3.5" />
          </button>

          <!-- Close button -->
          <button
            class="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150"
            style="background: transparent; color: var(--color-text-muted)"
            type="button"
            (click)="close.emit()"
            aria-label="Fermer"
          >
            <lucide-icon name="x" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Search bar -->
      @if (showSearch()) {
        <div class="flex items-center gap-2 px-4 py-2" style="border-bottom: 1px solid var(--color-border-subtle)">
          <lucide-icon name="search" class="w-3.5 h-3.5 shrink-0" style="color: var(--color-text-muted)" />
          <input
            #searchInput
            type="text"
            class="flex-1 bg-transparent text-sm outline-none"
            style="color: var(--color-text-primary); caret-color: var(--color-accent)"
            placeholder="Rechercher dans le contenu..."
            [value]="searchQuery()"
            (input)="searchQuery.set($any($event.target).value)"
            (keydown.escape)="clearSearch()"
          />
          @if (searchQuery().trim()) {
            <span class="text-xs" style="color: var(--color-text-muted)">{{ searchResults() }} occurrence{{ searchResults() > 1 ? 's' : '' }}</span>
            <button
              class="flex items-center justify-center w-5 h-5 rounded transition-all duration-150"
              style="color: var(--color-text-muted)"
              type="button"
              (click)="clearSearch()"
              aria-label="Effacer"
            >
              <lucide-icon name="x" class="w-3 h-3" />
            </button>
          }
        </div>
      }

      <!-- Scrollable content -->
      <div #contentBody class="flex-1 overflow-y-auto p-6">
        <app-deep-dive-content
          [content]="deepDive()"
          [searchQuery]="searchQuery()"
        ></app-deep-dive-content>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      inset: 0;
      z-index: 50;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(4px);
    }

    .modal-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 100%;
      max-width: min(800px, 100vw);
      max-height: min(85vh, 800px);
      border-radius: 1rem;
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-card {
      animation: slideUp 200ms ease-out;
    }
  `,
  host: {
    '(click)': 'close.emit()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class DeepDiveModalComponent {
  question = input.required<string>();
  deepDive = input.required<string>();
  readonly close = output<void>();

  readonly searchQuery = signal('');
  readonly showSearch = signal(false);

  constructor() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  readonly readingTime = computed(() => {
    const words = this.deepDive().split(/\s+/).length;
    return Math.ceil(words / 200);
  });

  readonly searchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return 0;
    const body = this.deepDive().toLowerCase();
    let count = 0;
    let pos = 0;
    while ((pos = body.indexOf(q, pos)) !== -1) {
      count++;
      pos += q.length;
    }
    return count;
  });

  private searchInputRef = viewChild<HTMLInputElement>('searchInput');

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.close.emit();
      return;
    }
    if (e.key === '/' || (e.key === 'f' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      this.showSearch.set(true);
      setTimeout(() => this.searchInputRef()?.focus(), 0);
    }
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.showSearch.set(false);
  }
}