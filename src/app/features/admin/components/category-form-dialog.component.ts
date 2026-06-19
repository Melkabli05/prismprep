import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormField, disabled, form, required, submit } from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';
import { AdminContentService, type CategoryRow } from '../data/admin-content.service';

interface CategoryModel {
  id: string;
  title: string;
  color: string;
  description: string;
}

const DEFAULT_COLOR = 'background: var(--color-accent); color: white';

const COLOR_PRESETS = [
  { label: 'Accent', value: DEFAULT_COLOR },
  { label: 'Error', value: 'background: var(--color-error); color: white' },
  { label: 'Warning', value: 'background: var(--color-amber); color: white' },
  { label: 'Info', value: 'background: var(--color-info); color: white' },
  { label: 'Success', value: 'background: var(--color-success); color: white' },
];

@Component({
  selector: 'app-category-form-dialog',
  imports: [FormField, LucideAngularModule],
  template: `
    <div class="overlay" (click)="cancel.emit()" role="presentation">
      <div class="panel" (click)="$event.stopPropagation()" role="dialog" aria-modal="true" aria-labelledby="cat-dialog-title">

        <div class="panel-header">
          <h2 id="cat-dialog-title" class="panel-title">
            {{ editing() ? 'Edit category' : 'New category' }}
          </h2>
          <button type="button" class="close-btn" (click)="cancel.emit()" aria-label="Close dialog">
            <lucide-icon name="x" class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        @if (errorMsg()) {
          <div class="alert" role="alert">{{ errorMsg() }}</div>
        }

        <form (submit)="onSubmit($event)" novalidate>

          <div class="field">
            <label class="field-label" for="cat-id">ID slug</label>
            <input
              id="cat-id"
              type="text"
              [formField]="catForm.id"
              placeholder="java"
              class="input"
              autocomplete="off"
              [attr.aria-describedby]="editing() ? 'cat-id-note' : null"
            />
            @if (editing()) {
              <span id="cat-id-note" class="field-hint">ID cannot be changed after creation.</span>
            }
            @if (catForm.id().touched() && catForm.id().invalid()) {
              @for (e of catForm.id().errors(); track e.kind) {
                <span class="field-error" role="alert">{{ e.message }}</span>
              }
            }
          </div>

          <div class="field">
            <label class="field-label" for="cat-title">Title</label>
            <input id="cat-title" type="text" [formField]="catForm.title" class="input" placeholder="Java Fundamentals" />
            @if (catForm.title().touched() && catForm.title().invalid()) {
              @for (e of catForm.title().errors(); track e.kind) {
                <span class="field-error" role="alert">{{ e.message }}</span>
              }
            }
          </div>

          <div class="field">
            <label class="field-label" for="cat-desc">Description</label>
            <textarea id="cat-desc" [formField]="catForm.description" rows="2" class="input textarea" placeholder="Core Java interview questions covering streams, collections, and OOP principles."></textarea>
          </div>

          <div class="field">
            <label class="field-label" for="cat-color">Color</label>
            <div class="color-row">
              <span class="swatch" [style]="model().color" aria-hidden="true"></span>
              <input id="cat-color" type="text" [formField]="catForm.color" class="input" placeholder="background: var(--color-accent); color: white" />
            </div>
            <div class="presets" role="group" aria-label="Color presets">
              @for (preset of presets; track preset.value) {
                <button
                  type="button"
                  class="preset-btn"
                  [style]="preset.value"
                  (click)="applyPreset(preset.value)"
                  [attr.aria-pressed]="model().color === preset.value"
                >{{ preset.label }}</button>
              }
            </div>
          </div>

          <div class="actions">
            <button type="button" class="btn-cancel" (click)="cancel.emit()">Cancel</button>
            <button type="submit" class="btn-save" [disabled]="saving()">
              {{ saving() ? 'Saving…' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .overlay {
      position: fixed; inset: 0; z-index: 60;
      display: flex; align-items: center; justify-content: center;
      background: rgba(30, 29, 26, 0.5);
      backdrop-filter: blur(2px);
      padding: 1rem;
      animation: fadeIn 120ms ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .panel {
      width: 100%; max-width: 28rem;
      background: var(--color-surface);
      border: 1.5px solid var(--color-text-primary);
      padding: 1.5rem;
      box-shadow: 6px 6px 0 var(--color-text-primary);
      animation: panelIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes panelIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) { .overlay, .panel { animation: none; } }

    .panel-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem; padding-bottom: 0.875rem;
      border-bottom: 1.5px solid var(--color-border);
    }
    .panel-title {
      font-family: var(--font-display); font-size: 1.125rem; font-weight: 700;
      color: var(--color-text-primary); letter-spacing: 0.01em;
    }
    .close-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border: none; background: none;
      color: var(--color-text-muted); cursor: pointer;
    }
    .close-btn:hover { color: var(--color-text-primary); }

    .alert {
      padding: 0.5rem 0.75rem; margin-bottom: 1rem;
      border-left: 3px solid var(--color-error);
      background: var(--color-error-soft); color: var(--color-error);
      font-family: var(--font-sans); font-size: 0.8125rem;
      animation: slideDown 200ms ease-out;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .field { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1rem; }
    .field-label {
      font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.06em;
      color: var(--color-text-muted);
    }
    .field-hint { font-family: var(--font-sans); font-size: 0.6875rem; color: var(--color-text-muted); font-style: italic; }
    .field-error { font-family: var(--font-sans); font-size: 0.75rem; color: var(--color-error); }

    .input {
      width: 100%; padding: 0.5rem 0.75rem;
      background: var(--color-surface);
      border: 1.5px solid var(--color-border);
      border-radius: 0;
      color: var(--color-text-primary);
      font-family: var(--font-sans); font-size: 0.875rem; font-family: inherit;
      transition: border-color 120ms ease;
    }
    .input:focus { outline: none; border-color: var(--color-text-primary); box-shadow: 2px 2px 0 var(--color-border-strong); }
    .input:disabled { opacity: 0.5; cursor: not-allowed; }
    .textarea { resize: vertical; }

    .color-row { display: flex; align-items: center; gap: 0.625rem; }
    .swatch {
      display: inline-block; width: 1.75rem; height: 1.75rem;
      border-radius: 0; flex-shrink: 0;
      border: 1.5px solid var(--color-border);
    }
    .presets { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-top: 0.5rem; }
    .preset-btn {
      border: none; border-radius: 0;
      padding: 0.25rem 0.625rem;
      font-family: var(--font-sans); font-size: 0.625rem; font-weight: 700;
      letter-spacing: 0.04em; text-transform: uppercase;
      cursor: pointer;
    }

    .actions { display: flex; justify-content: flex-end; gap: 0.625rem; margin-top: 1.5rem; }
    .btn-cancel {
      height: 34px; padding: 0 0.875rem;
      border: 1.5px solid var(--color-border-strong);
      border-radius: 0; background: none;
      color: var(--color-text-secondary);
      font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.02em; font-family: inherit; cursor: pointer;
      transition: border-color 120ms ease, color 120ms ease;
    }
    .btn-cancel:hover { border-color: var(--color-text-primary); color: var(--color-text-primary); }
    .btn-save {
      height: 34px; padding: 0 0.875rem;
      border: 1.5px solid var(--color-text-primary);
      border-radius: 0; background: var(--color-text-primary);
      color: var(--color-bg);
      font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.04em; text-transform: uppercase;
      font-family: inherit; cursor: pointer;
      transition: background 120ms ease, border-color 120ms ease;
    }
    .btn-save:hover:not(:disabled) { background: var(--color-accent); border-color: var(--color-accent); }
    .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
  `,
})
export class CategoryFormDialogComponent {
  private readonly admin = inject(AdminContentService);

  readonly category = input<CategoryRow | null>(null);
  readonly saved = output<void>();
  readonly cancel = output<void>();

  readonly presets = COLOR_PRESETS;
  readonly editing = computed(() => this.category() !== null);
  readonly saving = signal(false);
  readonly errorMsg = signal('');

  readonly model = signal<CategoryModel>(this.initialModel());

  readonly catForm = form(this.model, (s) => {
    required(s.id, { message: 'ID is required' });
    required(s.title, { message: 'Title is required' });
    required(s.color, { message: 'Color is required' });
    disabled(s.id, () => this.editing());
  });

  private initialModel(): CategoryModel {
    const c = this.category();
    return c
      ? { id: c.id, title: c.title, color: c.color, description: c.description ?? '' }
      : { id: '', title: '', color: DEFAULT_COLOR, description: '' };
  }

  applyPreset(value: string): void {
    this.model.update(m => ({ ...m, color: value }));
  }

  private nextSortOrder(): number {
    return this.admin.categories().reduce((max, c) => Math.max(max, c.sort_order), -1) + 1;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMsg.set('');
    submit(this.catForm, {
      action: async () => {
        this.saving.set(true);
        try {
          const m = this.model();
          const existing = this.category();
          const error = existing
            ? await this.admin.updateCategory(existing.id, { title: m.title, color: m.color, description: m.description })
            : await this.admin.createCategory({ id: m.id, title: m.title, color: m.color, description: m.description, sort_order: this.nextSortOrder() });
          if (error) {
            this.errorMsg.set(error.message);
          } else {
            this.saved.emit();
          }
        } finally {
          this.saving.set(false);
        }
      },
    });
  }
}
