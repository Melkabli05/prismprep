import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AdminContentService, type AdminEntityKind, type DependentCounts } from '../data/admin-content.service';

const KIND_LABEL: Record<AdminEntityKind, string> = {
  category: 'category',
  section: 'section',
  question: 'question',
};

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [LucideAngularModule],
  template: `
    <div class="overlay" (click)="cancel.emit()" role="presentation">
      <div class="panel" (click)="$event.stopPropagation()" role="alertdialog" aria-modal="true" aria-labelledby="del-dialog-title" aria-describedby="del-dialog-desc">

        <div class="panel-header">
          <div class="panel-title-group">
            <lucide-icon name="alert-triangle" class="warn-icon" aria-hidden="true" />
            <h2 id="del-dialog-title" class="panel-title">Delete {{ kindLabel() }}?</h2>
          </div>
          <button type="button" class="close-btn" (click)="cancel.emit()" aria-label="Close dialog">
            <lucide-icon name="x" class="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p id="del-dialog-desc" class="entity-name">"{{ label() }}"</p>

        @if (counts() === null) {
          <p class="loading" aria-live="polite">Checking what this affects…</p>
        } @else {
          <div class="impact-section">
            <p class="impact-label">This will affect:</p>
            <ul class="impact-list" aria-label="Dependent items that will be deleted">
              @if (counts()!.sections > 0) {
                <li><strong>{{ counts()!.sections }}</strong> section{{ counts()!.sections === 1 ? '' : 's' }}</li>
              }
              @if (counts()!.questions > 0) {
                <li><strong>{{ counts()!.questions }}</strong> question{{ counts()!.questions === 1 ? '' : 's' }}</li>
              }
              @if (counts()!.bookmarks > 0) {
                <li><strong>{{ counts()!.bookmarks }}</strong> user bookmark{{ counts()!.bookmarks === 1 ? '' : 's' }}</li>
              }
              @if (counts()!.notes > 0) {
                <li><strong>{{ counts()!.notes }}</strong> user note{{ counts()!.notes === 1 ? '' : 's' }}</li>
              }
              @if (counts()!.revealed > 0) {
                <li><strong>{{ counts()!.revealed }}</strong> reveal record{{ counts()!.revealed === 1 ? '' : 's' }}</li>
              }
              @if (counts()!.viewed > 0) {
                <li><strong>{{ counts()!.viewed }}</strong> view record{{ counts()!.viewed === 1 ? '' : 's' }}</li>
              }
              @if (isEmpty()) {
                <li class="safe-item">
                  <lucide-icon name="check-circle" class="safe-icon" aria-hidden="true" />
                  No dependent content — safe to delete.
                </li>
              }
            </ul>
          </div>

          <p class="warning-text">This action cannot be undone.</p>

          @if (requiresTypedConfirm()) {
            <div class="confirm-field">
              <label class="confirm-label" for="confirm-name">
                Type <strong>{{ label() }}</strong> to confirm deletion
              </label>
              <input
                id="confirm-name"
                type="text"
                class="confirm-input"
                [value]="typedName()"
                (input)="typedName.set($any($event.target).value)"
                autocomplete="off"
                aria-describedby="confirm-name-hint"
              />
              <span id="confirm-name-hint" class="sr-only">Enter the exact name of the {{ kindLabel() }} to confirm.</span>
            </div>
          }
        }

        <div class="actions">
          <button type="button" class="btn-cancel" (click)="cancel.emit()">Cancel</button>
          <button
            type="button"
            class="btn-danger"
            [disabled]="!canConfirm() || deleting()"
            (click)="onConfirm()"
          >
            <lucide-icon name="trash-2" class="w-3.5 h-3.5" aria-hidden="true" />
            {{ deleting() ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .overlay {
      position: fixed; inset: 0; z-index: 70;
      display: flex; align-items: center; justify-content: center;
      background: rgba(30, 29, 26, 0.6);
      backdrop-filter: blur(2px);
      padding: 1rem;
      animation: fadeIn 120ms ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .panel {
      width: 100%; max-width: 26rem;
      background: var(--color-surface);
      border: 1.5px solid var(--color-text-primary);
      padding: 1.25rem;
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
      margin-bottom: 0.5rem;
    }
    .panel-title-group { display: flex; align-items: center; gap: 0.5rem; }
    .warn-icon { color: var(--color-error); flex-shrink: 0; }
    .panel-title {
      font-family: var(--font-display); font-size: 1.0625rem; font-weight: 700;
      color: var(--color-text-primary); letter-spacing: 0.01em;
    }
    .close-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border: none; background: none;
      color: var(--color-text-muted); cursor: pointer;
    }
    .close-btn:hover { color: var(--color-text-primary); }

    .entity-name {
      font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: 1rem; padding: 0.5rem 0.625rem;
      background: var(--color-surface-raised);
      border-left: 3px solid var(--color-border-strong);
    }

    .loading {
      font-family: var(--font-sans); font-size: 0.8125rem;
      color: var(--color-text-muted); font-style: italic;
    }

    .impact-section { margin-bottom: 0.875rem; }
    .impact-label {
      font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.06em;
      color: var(--color-text-muted); margin-bottom: 0.5rem;
    }
    .impact-list {
      list-style: none; margin: 0; padding: 0.625rem;
      background: var(--color-surface-raised);
      border: 1px solid var(--color-border);
      display: flex; flex-direction: column; gap: 0.25rem;
    }
    .impact-list li {
      font-family: var(--font-sans); font-size: 0.8125rem;
      color: var(--color-text-secondary);
      padding: 0.125rem 0;
    }
    .impact-list li strong { color: var(--color-text-primary); font-weight: 700; }

    .safe-item {
      display: flex; align-items: center; gap: 0.375rem;
      color: var(--color-success) !important; font-weight: 500;
    }
    .safe-icon { color: var(--color-success); flex-shrink: 0; }

    .warning-text {
      font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700;
      color: var(--color-error); text-transform: uppercase; letter-spacing: 0.04em;
      margin-bottom: 0.875rem;
    }

    .confirm-field { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1rem; }
    .confirm-label {
      font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
      color: var(--color-text-secondary);
    }
    .confirm-label strong { color: var(--color-text-primary); }
    .confirm-input {
      width: 100%; padding: 0.5rem 0.75rem;
      background: var(--color-surface);
      border: 1.5px solid var(--color-border);
      border-radius: 0;
      color: var(--color-text-primary);
      font-family: var(--font-sans); font-size: 0.875rem; font-family: inherit;
      transition: border-color 120ms ease;
    }
    .confirm-input:focus {
      outline: none; border-color: var(--color-error);
      box-shadow: 2px 2px 0 var(--color-error-soft);
    }

    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
    }

    .actions { display: flex; justify-content: flex-end; gap: 0.625rem; }
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
    .btn-danger {
      display: inline-flex; align-items: center; gap: 0.375rem;
      height: 34px; padding: 0 0.875rem;
      border: 1.5px solid var(--color-error);
      border-radius: 0; background: var(--color-error);
      color: white;
      font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700;
      letter-spacing: 0.04em; text-transform: uppercase;
      font-family: inherit; cursor: pointer;
      transition: background 120ms ease;
    }
    .btn-danger:hover:not(:disabled) { background: #a01818; border-color: #a01818; }
    .btn-danger:disabled { opacity: 0.4; cursor: not-allowed; }
  `,
})
export class DeleteConfirmDialogComponent implements OnInit {
  private readonly admin = inject(AdminContentService);

  readonly kind = input.required<AdminEntityKind>();
  readonly id = input.required<string>();
  readonly label = input.required<string>();

  readonly confirmed = output<void>();
  readonly cancel = output<void>();

  readonly kindLabel = computed(() => KIND_LABEL[this.kind()]);
  readonly counts = signal<DependentCounts | null>(null);
  readonly typedName = signal('');
  readonly deleting = signal(false);

  readonly requiresTypedConfirm = computed(() => this.kind() === 'category');
  readonly isEmpty = computed(() => {
    const c = this.counts();
    return c !== null && c.sections === 0 && c.questions === 0 && c.bookmarks === 0 && c.notes === 0 && c.revealed === 0 && c.viewed === 0;
  });

  readonly canConfirm = computed(() => {
    if (this.counts() === null) return false;
    if (!this.requiresTypedConfirm()) return true;
    return this.typedName().trim().toLowerCase() === this.label().trim().toLowerCase();
  });

  async ngOnInit(): Promise<void> {
    this.counts.set(await this.admin.countDependents(this.kind(), this.id()));
  }

  onConfirm(): void {
    if (!this.canConfirm() || this.deleting()) return;
    this.deleting.set(true);
    this.confirmed.emit();
  }
}
