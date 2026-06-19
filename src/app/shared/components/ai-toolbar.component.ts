import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface AiToolbarAction {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-ai-toolbar',
  imports: [LucideAngularModule],
  template: `
    <div class="toolbar" role="toolbar" aria-label="AI actions">
      @for (action of actions; track action.id) {
        <button
          type="button"
          class="toolbar-btn"
          [disabled]="loading() || disabled()"
          (click)="actionSelected.emit(action.id)"
          [attr.aria-label]="action.label"
          [attr.title]="action.label"
        >
          <lucide-icon [name]="action.icon" class="btn-icon" aria-hidden="true"></lucide-icon>
          <span class="btn-label">{{ action.label }}</span>
        </button>
      }
    </div>
  `,
  styles: `
    .toolbar {
      display: flex;
      align-items: center;
      gap: 0;
      border: 1.5px solid var(--color-border);
      background: var(--color-surface);
    }

    .toolbar-btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      border: none;
      border-right: 1.5px solid var(--color-border);
      background: transparent;
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: opacity 150ms ease, background 150ms ease;
      white-space: nowrap;
    }

    .toolbar-btn:last-child {
      border-right: none;
    }

    .toolbar-btn:hover:not(:disabled) {
      background: var(--color-accent-soft);
    }

    .toolbar-btn:active:not(:disabled) {
      background: var(--color-accent);
      color: var(--color-surface);
    }

    .toolbar-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }

    .btn-label {
      line-height: 1;
    }
  `,
})
export class AiToolbarComponent {
  loading = input(false);
  disabled = input(false);
  field = input.required<'answer' | 'deepDive'>();

  actionSelected = output<string>();

  readonly actions: AiToolbarAction[] = [
    { id: 'review', label: 'Review', icon: 'sparkles' },
    { id: 'format', label: 'Format', icon: 'align-left' },
    { id: 'rewrite', label: 'Rewrite', icon: 'refresh-cw' },
    { id: 'expand', label: 'Expand', icon: 'plus' },
    { id: 'code', label: 'Code', icon: 'code' },
  ];
}