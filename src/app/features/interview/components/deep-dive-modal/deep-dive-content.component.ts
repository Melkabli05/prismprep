import { Component, input, inject, ViewEncapsulation } from '@angular/core';
import { MarkdownService } from '@shared/services/markdown.service';

@Component({
  selector: 'app-deep-dive-content',
  encapsulation: ViewEncapsulation.None,
  imports: [],
  styles: `
    :host { display: block; }
    .deep-dive-body {
      font-size: 0.9375rem;
      line-height: 1.85;
      color: var(--color-text-secondary);
    }
    .deep-dive-body h2 {
      font-size: 1.0625rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 2rem 0 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-accent-soft);
    }
    .deep-dive-body h2:first-child { margin-top: 0; }
    .deep-dive-body h3 {
      font-size: 0.9375rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 1.5rem 0 0.5rem;
    }
    .deep-dive-body p { margin: 0 0 1rem; color: var(--color-text-secondary); line-height: 1.8; }
    .deep-dive-body p:last-child { margin-bottom: 0; }
    .deep-dive-body strong, .deep-dive-body b { font-weight: 600; color: var(--color-text-primary); }
    .deep-dive-body em {
      font-style: normal;
      background: var(--color-amber-soft);
      color: var(--color-amber);
      padding: 0.1em 0.4em;
      border-radius: var(--radius-sm);
      font-weight: 500;
    }
    .deep-dive-body code {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      background: var(--color-code-bg);
      color: var(--color-text-primary);
      padding: 0.15em 0.45em;
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-code-border);
    }
    .deep-dive-body .code-block {
      margin: 1rem 0;
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-code-border);
      overflow: hidden;
      background: var(--color-code-bg);
    }
    .deep-dive-body .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.875rem;
      border-bottom: 1px solid var(--color-code-border);
    }
    .deep-dive-body .code-lang {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }
    .deep-dive-body .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm);
      border: none;
      font-size: 0.6875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease;
      background: transparent;
      color: var(--color-text-muted);
    }
    .deep-dive-body .copy-btn:hover { background: var(--color-border); color: var(--color-text-secondary); }
    .deep-dive-body .copy-btn-copied { color: var(--color-success); }
    .deep-dive-body pre {
      margin: 0;
      padding: 1rem 1.25rem;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.75;
      font-family: var(--font-mono);
      background: transparent;
      tab-size: 2;
    }
    .deep-dive-body pre code { display: block; background: transparent; }
    .deep-dive-body code[class*="language-"] { border: none; }
    .deep-dive-body .ck { color: var(--color-token-keyword) !important; }
    .deep-dive-body .cs { color: var(--color-token-string) !important; }
    .deep-dive-body .co { color: var(--color-token-comment) !important; font-style: italic; }
    .deep-dive-body .cn { color: var(--color-token-number) !important; }
    .deep-dive-body .co2 { color: var(--color-token-operator) !important; }
    .deep-dive-body .cp { color: var(--color-token-punctuation) !important; }
    .deep-dive-body .ct { color: var(--color-token-type) !important; }
    .deep-dive-body .cf { color: var(--color-token-function) !important; }
    .deep-dive-body .cl { display: block; }
    .deep-dive-body ul { margin: 0.75rem 0 1rem; padding-left: 1.25rem; list-style: none; }
    .deep-dive-body ul li { position: relative; padding-left: 0.75rem; margin-bottom: 0.5rem; line-height: 1.75; color: var(--color-text-secondary); }
    .deep-dive-body ul li::before { content: ''; position: absolute; left: 0; top: 0.6rem; width: 5px; height: 5px; border-radius: 50%; background: var(--color-accent); }
    .deep-dive-body ul li strong { color: var(--color-text-primary); }
    .deep-dive-body ol { margin: 0.75rem 0 1rem; padding-left: 1.5rem; }
    .deep-dive-body ol li { margin-bottom: 0.5rem; line-height: 1.75; color: var(--color-text-secondary); padding-left: 0.25rem; }
    .deep-dive-body table { width: 100%; border-collapse: collapse; margin: 1rem 0; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--color-border); font-size: 0.875rem; }
    .deep-dive-body thead { background: var(--color-surface-raised); }
    .deep-dive-body th { text-align: left; padding: 0.625rem 1rem; font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border); }
    .deep-dive-body td { padding: 0.5rem 1rem; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border-subtle); }
    .deep-dive-body tr:last-child td { border-bottom: none; }
    .deep-dive-body tbody tr:hover td { background: var(--color-surface-hover); }
    .deep-dive-body hr { display: none; }
    .deep-dive-body a { color: var(--color-accent); text-decoration: underline; text-underline-offset: 2px; }
    .deep-dive-body a:hover { color: var(--color-accent-hover); }
    .deep-dive-body blockquote { border-left: 3px solid var(--color-accent); margin: 1rem 0; padding: 0.5rem 0 0.5rem 1rem; color: var(--color-text-muted); font-style: italic; }
  `,
  template: `<div class="deep-dive-body" [innerHTML]="md.render(content(), searchQuery())"></div>`,
})
export class DeepDiveContentComponent {
  readonly md = inject(MarkdownService);
  content = input.required<string>();
  searchQuery = input<string>('');
}