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
    <div class="ai-toolbar" role="toolbar" [attr.aria-label]="'AI actions for ' + field()">
      @for (action of actions; track action.id) {
        <button
          type="button"
          class="toolbar-btn"
          [disabled]="loading() || disabled()"
          (click)="actionSelected.emit(action.id)"
          [attr.aria-label]="action.label + ' ' + field()"
        >
          <lucide-icon [name]="action.icon" class="btn-icon" aria-hidden="true" />
          <span class="btn-label">{{ action.label }}</span>
        </button>
      }
    </div>
  `,
  styles: `
    .ai-toolbar {
      display: flex;
      align-items: center;
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
      transition: background 120ms ease, opacity 120ms ease;
    }

    .toolbar-btn:last-child { border-right: none; }

    .toolbar-btn:hover:not(:disabled) { background: var(--color-accent-soft); }

    .toolbar-btn:active:not(:disabled) {
      background: var(--color-accent);
      color: var(--color-surface);
    }

    .toolbar-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .btn-icon { width: 0.875rem; height: 0.875rem; flex-shrink: 0; }
    .btn-label { line-height: 1; }
  `,
})
export class AiToolbarComponent {
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly field = input.required<'answer' | 'deepDive'>();
  readonly actionSelected = output<string>();

  readonly actions: AiToolbarAction[] = [
    { id: 'review', label: 'Review', icon: 'sparkles' },
    { id: 'format', label: 'Format', icon: 'align-left' },
    { id: 'rewrite', label: 'Rewrite', icon: 'refresh-cw' },
    { id: 'expand', label: 'Expand', icon: 'plus' },
    { id: 'code', label: 'Code', icon: 'code' },
  ];
}