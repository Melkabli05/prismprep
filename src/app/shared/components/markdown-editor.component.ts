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
  selector: 'app-markdown-editor',
  template: `
    <div class="md-editor">
      <div class="tab-bar" role="tablist" aria-label="Markdown editor view">
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
        @if (activeTab() !== 'preview') {
          <span class="tab-hint" aria-hidden="true">Markdown supported</span>
        }
      </div>

      <div class="editor-body">
        @if (activeTab() === 'edit') {
          <textarea
            class="md-textarea"
            [value]="value()"
            (input)="onInput($any($event.target).value)"
            placeholder="## Deep Dive&#10;&#10;Explain the topic in depth…"
            aria-label="Markdown content editor"
            rows="20"
          ></textarea>
        }

        @if (activeTab() === 'preview') {
          <div class="deep-dive-body md-preview" [innerHTML]="rendered()" aria-label="Markdown preview" role="region"></div>
        }

        @if (activeTab() === 'split') {
          <div class="split-view">
            <div class="split-left">
              <textarea
                class="md-textarea"
                [value]="value()"
                (input)="onInput($any($event.target).value)"
                placeholder="## Deep Dive&#10;&#10;Markdown content…"
                aria-label="Markdown content editor"
                rows="20"
              ></textarea>
            </div>
            <div class="deep-dive-body md-preview split-right" [innerHTML]="rendered()" aria-label="Markdown preview" role="region"></div>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }

    .md-editor { border: 1.5px solid var(--color-border); background: var(--color-surface); }

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

    .tab-hint {
      margin-left: auto;
      font-family: var(--font-mono); font-size: 0.5625rem;
      color: var(--color-text-placeholder); letter-spacing: 0.04em;
    }

    .md-textarea {
      display: block; width: 100%; box-sizing: border-box;
      padding: 1rem 1rem; border: none; background: var(--color-surface);
      color: var(--color-text-primary);
      font-family: var(--font-mono); font-size: 0.8125rem; line-height: 1.7;
      resize: vertical; outline: none;
    }
    .md-textarea::placeholder { color: var(--color-text-placeholder); }

    .md-preview {
      padding: 1.25rem;
      min-height: 200px; max-height: 600px; overflow-y: auto;
    }

    .split-view { display: grid; grid-template-columns: 1fr 1fr; }
    .split-left { border-right: 1.5px solid var(--color-border); }
    .split-right { min-height: 400px; max-height: 600px; overflow-y: auto; }

    @media (max-width: 720px) {
      .split-view { grid-template-columns: 1fr; }
      .split-left { border-right: none; border-bottom: 1.5px solid var(--color-border); }
    }
  `,
})
export class MarkdownEditorComponent {
  private readonly md = inject(MarkdownService);

  readonly value = input<string>('');
  readonly valueChange = output<string>();

  readonly activeTab = signal<'edit' | 'preview' | 'split'>('edit');

  readonly rendered = computed(() => this.md.render(this.value()));

  onInput(value: string): void {
    this.valueChange.emit(value);
  }
}
