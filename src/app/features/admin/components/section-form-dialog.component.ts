import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormField, disabled, form, required, submit } from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';
import { AdminContentService, type SectionRow } from '../data/admin-content.service';

interface SectionModel {
  id: string;
  title: string;
}

@Component({
  selector: 'app-section-form-dialog',
  imports: [FormField, LucideAngularModule],
  template: `
    <div class="overlay" (click)="cancel.emit()" role="presentation">
      <div class="panel" (click)="$event.stopPropagation()" role="dialog" aria-modal="true" aria-labelledby="sec-dialog-title">

        <div class="panel-header">
          <h2 id="sec-dialog-title" class="panel-title">
            {{ editing() ? 'Edit section' : 'New section' }}
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
            <label class="field-label" for="sec-id">ID slug</label>
            <input
              id="sec-id"
              type="text"
              [formField]="secForm.id"
              placeholder="java-streams"
              class="input"
              autocomplete="off"
              [attr.aria-describedby]="editing() ? 'sec-id-note' : null"
            />
            @if (editing()) {
              <span id="sec-id-note" class="field-hint">ID cannot be changed after creation.</span>
            }
            @if (secForm.id().touched() && secForm.id().invalid()) {
              @for (e of secForm.id().errors(); track e.kind) {
                <span class="field-error" role="alert">{{ e.message }}</span>
              }
            }
          </div>

          <div class="field">
            <label class="field-label" for="sec-title">Title</label>
            <input id="sec-title" type="text" [formField]="secForm.title" class="input" placeholder="Java Streams & Lambdas" />
            @if (secForm.title().touched() && secForm.title().invalid()) {
              @for (e of secForm.title().errors(); track e.kind) {
                <span class="field-error" role="alert">{{ e.message }}</span>
              }
            }
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
      width: 100%; max-width: 26rem;
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
export class SectionFormDialogComponent {
  private readonly admin = inject(AdminContentService);

  readonly section = input<SectionRow | null>(null);
  readonly categoryId = input.required<string>();
  readonly saved = output<void>();
  readonly cancel = output<void>();

  readonly editing = computed(() => this.section() !== null);
  readonly saving = signal(false);
  readonly errorMsg = signal('');

  readonly model = signal<SectionModel>(this.initialModel());

  readonly secForm = form(this.model, (s) => {
    required(s.id, { message: 'ID is required' });
    required(s.title, { message: 'Title is required' });
    disabled(s.id, () => this.editing());
  });

  private initialModel(): SectionModel {
    const s = this.section();
    return s ? { id: s.id, title: s.title } : { id: '', title: '' };
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMsg.set('');
    submit(this.secForm, {
      action: async () => {
        this.saving.set(true);
        try {
          const m = this.model();
          const existing = this.section();
          const error = existing
            ? await this.admin.updateSection(existing.id, { title: m.title })
            : await this.admin.createSection({ id: m.id, title: m.title, category_id: this.categoryId(), sort_order: this.nextSortOrder() });
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

  private nextSortOrder(): number {
    return this.admin.sections()
      .filter(s => s.category_id === this.categoryId())
      .reduce((max, s) => Math.max(max, s.sort_order), -1) + 1;
  }
}
