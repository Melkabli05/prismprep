import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { tokenize } from '@shared/utils/tokenizer';

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-code-block',
  // ViewEncapsulation.None is intentional: <pre> and token spans must be styled
  // globally because [innerHTML] content is inserted outside Angular's shadow DOM.
  // All rules are scoped under .code-block to limit bleed.
  encapsulation: ViewEncapsulation.None,
  styles: `
    .code-block {
      margin-top: 1rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-code-border);
      overflow: hidden;
      background: var(--color-code-bg);
    }
    .code-block .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.875rem;
      border-bottom: 1px solid var(--color-code-border);
    }
    .code-block .code-lang {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }
    .code-block .copy-btn {
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
    .code-block .copy-btn:hover {
      background: var(--color-border);
      color: var(--color-text-secondary);
    }
    .code-block .copy-btn-copied { color: var(--color-success); }
    .code-block pre {
      margin: 0;
      padding: 1rem 1.25rem;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.75;
      font-family: var(--font-mono);
      background: transparent;
      tab-size: 2;
    }
    .code-block pre code { display: block; background: transparent; }

    /* Token colors — mapped from design system CSS vars */
    .code-block .ck  { color: var(--color-token-keyword); }
    .code-block .cs  { color: var(--color-token-string); }
    .code-block .co  { color: var(--color-token-comment); font-style: italic; }
    .code-block .co2 { color: var(--color-token-operator); }
    .code-block .cp  { color: var(--color-token-punctuation); }
    .code-block .ct  { color: var(--color-token-type); }
    .code-block .cf  { color: var(--color-token-function); }
  `,
  template: `
    @let lang = language() ?? 'code';

    <div class="code-block">
      <div class="code-header">
        <div class="code-lang">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {{ lang }}
        </div>
        <button
          type="button"
          class="copy-btn"
          [class.copy-btn-copied]="copied()"
          [attr.aria-label]="copied() ? 'Code copié' : 'Copier le code'"
          (click)="copyCode()"
        >
          @if (copied()) {
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copié !
          } @else {
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copier
          }
        </button>
      </div>
      <pre><code [innerHTML]="highlightedHtml()"></code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>();

  protected readonly copied = signal(false);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  // SECURITY: bypassSecurityTrustHtml is intentional here. tokenize() is a pure
  // syntax-highlighter that only ever receives static question data from the
  // interview question bundle — never arbitrary user input. The token output
  // consists of span-wrapped keywords, strings, and operators with all HTML
  // metacharacters (& < > " ') escaped. Safe to inject as-is without risk of
  // XSS. If question data ever becomes user-authored, this must be reviewed.
  // See CLAUDE.md §Security — "bypassSecurityTrust* only on genuinely trusted input".
  protected readonly highlightedHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      tokenize(this.code(), (this.language() ?? 'ts').toLowerCase())
    )
  );

  copyCode(): void {
    // Register cleanup unconditionally — must happen before the async clipboard
    // call, not after it resolves, so navigation away mid-copy still clears the timer.
    this.destroyRef.onDestroy(() => {
      if (this.copyTimer !== null) clearTimeout(this.copyTimer);
    });

    navigator.clipboard.writeText(this.code()).then(() => {
      if (this.copyTimer !== null) clearTimeout(this.copyTimer);
      this.copied.set(true);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    });
  }
}