import {
  Component,
  input,
  output,
  signal,
  computed,
  inject,
} from '@angular/core';
import { MarkdownService } from '@shared/services/markdown.service';

@Component({
  selector: 'app-answer-editor',
  template: `
    <div class="answer-editor">
      <div class="tab-bar" role="tablist" aria-label="Answer editor view">
        <button type="button" class="tab" [class.active]="activeTab() === 'edit'"
          (click)="activeTab.set('edit')" role="tab" [attr.aria-selected]="activeTab() === 'edit'">
          Edit
        </button>
        <button type="button" class="tab" [class.active]="activeTab() === 'preview'"
          (click)="activeTab.set('preview')" role="tab" [attr.aria-selected]="activeTab() === 'preview'">
          Preview
        </button>
        <button type="button" class="tab" [class.active]="activeTab() === 'split'"
          (click)="activeTab.set('split')" role="tab" [attr.aria-selected]="activeTab() === 'split'">
          Split
        </button>
      </div>

      @if (activeTab() === 'edit') {
        <textarea
          class="answer-textarea"
          [value]="value()"
          (input)="onInput($any($event.target).value)"
          [placeholder]="placeholder()"
          aria-label="Answer content"
          [rows]="rows()"
        ></textarea>
      }

      @if (activeTab() === 'preview') {
        @if (rendered()) {
          <div class="deep-dive-body md-preview" [innerHTML]="rendered()" aria-label="Answer preview" role="region"></div>
        } @else {
          <div class="empty-preview">No answer yet.</div>
        }
      }

      @if (activeTab() === 'split') {
        <div class="split-view">
          <div class="split-left">
            <textarea
              class="answer-textarea"
              [value]="value()"
              (input)="onInput($any($event.target).value)"
              [placeholder]="placeholder()"
              aria-label="Answer content"
              rows="20"
            ></textarea>
          </div>
          <div class="deep-dive-body split-right" [innerHTML]="rendered()" aria-label="Answer preview" role="region"></div>
        </div>
      }
    </div>
  `,
  styles: `
    :host { display: block; }

    .answer-editor { border: 1.5px solid var(--color-border); background: var(--color-surface); }

    .tab-bar {
      display: flex; align-items: center; gap: 0;
      padding: 0 0.75rem;
      border-bottom: 1.5px solid var(--color-border);
      background: var(--color-surface-raised);
    }

    .tab {
      padding: 0.5rem 0.875rem; border: none; background: none;
      color: var(--color-text-muted);
      font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.03em; text-transform: uppercase;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1.5px;
      transition: color 120ms ease, border-color 120ms ease;
    }
    .tab:hover { color: var(--color-text-primary); }
    .tab.active { color: var(--color-text-primary); border-bottom-color: var(--color-text-primary); }

    .answer-textarea {
      display: block; width: 100%; box-sizing: border-box;
      padding: 0.875rem 1rem;
      border: none; background: var(--color-surface);
      color: var(--color-text-primary);
      font-family: var(--font-sans); font-size: 0.875rem; line-height: 1.75;
      resize: vertical; outline: none;
    }
    .answer-textarea::placeholder { color: var(--color-text-placeholder); }

    .md-preview {
      padding: 1.25rem;
      min-height: 120px; max-height: 400px; overflow-y: auto;
    }

    .empty-preview {
      padding: 1.25rem;
      font-family: var(--font-sans); font-size: 0.875rem;
      color: var(--color-text-muted); font-style: italic;
    }

    .split-view { display: grid; grid-template-columns: 1fr 1fr; min-height: 240px; }
    .split-left {
      border-right: 1.5px solid var(--color-border);
    }
    .split-left .answer-textarea { border: none; }
    .split-right {
      min-height: 240px; max-height: 400px; overflow-y: auto;
    }

    @media (max-width: 720px) {
      .split-view { grid-template-columns: 1fr; }
      .split-left { border-right: none; border-bottom: 1.5px solid var(--color-border); }
    }
  `,
})
export class AnswerEditorComponent {
  private readonly md = inject(MarkdownService);

  readonly value = input<string>('');
  readonly placeholder = input<string>('Write the answer here — markdown supported…');
  readonly rows = input<number>(6);
  readonly valueChange = output<string>();

  readonly activeTab = signal<'edit' | 'preview' | 'split'>('edit');

  readonly rendered = computed(() => {
    const text = this.value();
    if (!text?.trim()) return '';
    return this.md.render(text);
  });

  onInput(value: string): void {
    this.valueChange.emit(value);
  }
}
