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

// ─── Token sets ──────────────────────────────────────────────────────────────

const JS_TS_KEYWORDS = new Set([
  'abstract', 'as', 'asserts', 'async', 'await',
  'break', 'case', 'catch', 'class', 'const', 'continue',
  'constructor', 'declare', 'default', 'delete', 'do',
  'else', 'enum', 'export', 'extends',
  'false', 'finally', 'for', 'from', 'function',
  'get', 'if', 'implements', 'import', 'in', 'infer', 'instanceof', 'interface', 'is',
  'keyof', 'let', 'namespace', 'new', 'null',
  'of', 'override', 'package', 'private', 'protected', 'public',
  'readonly', 'return', 'satisfies', 'set', 'static', 'super', 'switch',
  'this', 'throw', 'true', 'try', 'type', 'typeof',
  'undefined', 'var', 'void', 'while', 'yield',
]);

const JAVA_KEYWORDS = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
  'class', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends',
  'false', 'final', 'finally', 'float', 'for', 'if', 'implements', 'import',
  'instanceof', 'int', 'interface', 'long', 'native', 'new', 'null', 'package',
  'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp',
  'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
  'true', 'try', 'void', 'volatile', 'while',
]);

const SQL_KEYWORDS = new Set([
  'ADD', 'ALL', 'ALTER', 'AND', 'AS', 'ASC',
  'BETWEEN', 'BY', 'CASE', 'CREATE', 'CROSS',
  'DELETE', 'DESC', 'DISTINCT', 'DROP',
  'ELSE', 'END', 'EXISTS',
  'FALSE', 'FOREIGN', 'FROM', 'FULL',
  'GROUP', 'HAVING', 'IN', 'INDEX', 'INNER', 'INSERT', 'INTO', 'IS',
  'JOIN', 'KEY', 'LEFT', 'LIKE', 'LIMIT',
  'NOT', 'NULL', 'OFFSET', 'ON', 'OR', 'ORDER', 'OUTER',
  'PRIMARY', 'REFERENCES', 'RIGHT',
  'SELECT', 'SET',
  'TABLE', 'THEN', 'TRUE', 'UNION', 'UPDATE', 'VALUES',
  'WHEN', 'WHERE',
  // aggregate functions
  'AVG', 'COUNT', 'MAX', 'MIN', 'SUM',
]);

const LANG_KEYWORDS: Record<string, Set<string>> = {
  ts: JS_TS_KEYWORDS,
  typescript: JS_TS_KEYWORDS,
  js: JS_TS_KEYWORDS,
  javascript: JS_TS_KEYWORDS,
  java: JAVA_KEYWORDS,
  sql: SQL_KEYWORDS,
};

// ─── HTML escape ─────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Tokenizer ───────────────────────────────────────────────────────────────

/**
 * Produces HTML with syntax-highlighting <span> tags.
 * Output is constructed entirely from escaped source text — safe to trust.
 */
function tokenize(code: string, lang: string): string {
  const keywords = LANG_KEYWORDS[lang] ?? JS_TS_KEYWORDS;
  const isSql = lang === 'sql';
  const isJsTs = lang === 'ts' || lang === 'typescript' || lang === 'js' || lang === 'javascript';

  const lines = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trimEnd().split('\n');
  const out: string[] = [];

  for (const line of lines) {
    let row = '';
    let i = 0;

    while (i < line.length) {
      const ch = line[i] ?? '';
      const ch2 = line.slice(i, i + 2);

      // Single-line comments: // or (SQL/Java) --
      if (ch2 === '//' || (isSql && ch2 === '--')) {
        row += `<span class="co">${esc(line.slice(i))}</span>`;
        i = line.length;
        continue;
      }

      // Block comment start: /* (consume to end of line; multi-line handled as-is)
      if (ch2 === '/*') {
        const end = line.indexOf('*/', i + 2);
        const slice = end >= 0 ? line.slice(i, end + 2) : line.slice(i);
        row += `<span class="co">${esc(slice)}</span>`;
        i += slice.length;
        continue;
      }

      // Decorator / annotation: @Word
      if (ch === '@') {
        let j = i + 1;
        while (j < line.length && /\w/.test(line[j] ?? '')) j++;
        row += `<span class="ct">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // String literals: ", ', `
      if (ch === '"' || ch === "'" || ch === '`') {
        const quote = ch;
        let j = i + 1;
        while (j < line.length) {
          if ((line[j] ?? '') === '\\') { j += 2; continue; }  // skip escaped char
          if ((line[j] ?? '') === quote) { j++; break; }
          j++;
        }
        row += `<span class="cs">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Numbers (int, float, hex)
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(line[i + 1] ?? ''))) {
        let j = i;
        while (j < line.length && /[0-9.xXa-fA-FbBoO_]/.test(line[j] ?? '')) j++;
        row += `<span class="cn">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Identifiers and keywords
      if (/[a-zA-Z_$]/.test(ch)) {
        let j = i;
        while (j < line.length && /\w/.test(line[j] ?? '')) j++;
        const word = line.slice(i, j);
        const checkWord = isSql ? word.toUpperCase() : word;

        if (keywords.has(checkWord)) {
          row += `<span class="ck">${esc(word)}</span>`;
        } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
          row += `<span class="ct">${esc(word)}</span>`;
        } else if ((line[j] ?? '') === '(') {
          row += `<span class="cf">${esc(word)}</span>`;
        } else {
          row += esc(word);
        }
        i = j;
        continue;
      }

      // Operators (JS/TS only — avoid misclassifying SQL symbols)
      if (isJsTs && /[+\-*/%=<>!&|^~?]/.test(ch)) {
        let j = i;
        while (j < line.length && /[+\-*/%=<>!&|^~?.]/.test(line[j] ?? '')) j++;
        row += `<span class="co2">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Punctuation
      if (/[()\[\]{}.,'";:`]/.test(ch)) {
        row += `<span class="cp">${esc(ch ?? '')}</span>`;
        i++;
        continue;
      }

      row += esc(ch ?? '');
      i++;
    }

    out.push(row);
  }

  return out.join('\n');
}

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
    navigator.clipboard.writeText(this.code()).then(() => {
      if (this.copyTimer !== null) clearTimeout(this.copyTimer);

      this.copied.set(true);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);

      this.destroyRef.onDestroy(() => {
        if (this.copyTimer !== null) clearTimeout(this.copyTimer);
      });
    });
  }
}