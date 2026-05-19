import { Component, input, computed, signal, ChangeDetectionStrategy, inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'class', 'interface', 'type', 'enum', 'return',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'default',
  'try', 'catch', 'finally', 'throw', 'new', 'delete', 'typeof', 'instanceof',
  'import', 'export', 'from', 'as', 'async', 'await', 'yield', 'static', 'public',
  'private', 'protected', 'readonly', 'extends', 'implements', 'abstract', 'super',
  'this', 'null', 'undefined', 'true', 'false', 'void', 'in', 'of', 'get', 'set',
]);

const TYPES = new Set([
  'string', 'number', 'boolean', 'any', 'void', 'never', 'unknown', 'object',
  'Array', 'Promise', 'Set', 'Map', 'Record', 'Partial', 'Required', 'Readonly',
  'string', 'String', 'int', 'float', 'double', 'Boolean', 'char', 'void',
  'Integer', 'Long', 'Float', 'Double', 'Character', 'Byte', 'Short',
  'Component', 'input', 'output', 'signal', 'computed', 'effect', 'inject',
  'Injectable', 'Pipe', 'Directive', 'ChangeDetectionStrategy', 'OnInit', 'OnDestroy',
  'ElementRef', 'inject',
]);

const LANG_KEYWORDS: Record<string, Set<string>> = {
  java: new Set(['public', 'private', 'protected', 'class', 'interface', 'enum', 'extends', 'implements', 'static', 'final', 'abstract', 'synchronized', 'volatile', 'transient', 'native', 'throws', 'import', 'package', 'instanceof', 'super', 'this', 'true', 'false', 'null', 'return']),
  sql: new Set(['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'INDEX', 'DROP', 'ALTER', 'ADD', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'NULL', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'UNION', 'ALL', 'EXISTS', 'BETWEEN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'INSERT', 'UPDATE', 'DELETE', 'SELECT', 'FROM', 'JOIN']),
  ts: new Set(['const', 'let', 'var', 'function', 'class', 'interface', 'type', 'enum', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'as', 'async', 'await', 'public', 'private', 'protected', 'readonly', 'static', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'interface', 'implements', 'extends', 'abstract', 'override', 'constructor', 'get', 'set', 'keyof', 'infer', 'typeof', 'declare', 'namespace', 'as', 'is', 'asserts', 'satisfies']),
  typescript: new Set(['const', 'let', 'var', 'function', 'class', 'interface', 'type', 'enum', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'as', 'async', 'await', 'public', 'private', 'protected', 'readonly', 'static', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'interface', 'implements', 'extends', 'abstract', 'override', 'constructor', 'get', 'set', 'keyof', 'infer', 'typeof', 'declare', 'namespace', 'as', 'is', 'asserts', 'satisfies']),
  html: new Set(['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button', 'label', 'select', 'option', 'textarea', 'script', 'style', 'link', 'meta', 'title', 'header', 'footer', 'nav', 'main', 'section', 'article', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'class', 'id', 'src', 'href', 'alt', 'type', 'name', 'value', 'placeholder', 'required', 'disabled']),
};

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function tokenize(code: string, lang: string): string {
  const extra = LANG_KEYWORDS[lang] ?? LANG_KEYWORDS['ts'];
  const allKw = new Set([...KEYWORDS, ...extra]);
  const allTypes = new Set([...TYPES]);
  let result = '';
  const lines = code.split('\n');

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    result += `<span class="cl">`;
    let i = 0;
    while (i < line.length) {
      if (line.slice(i, i + 2) === '//') {
        result += `<span class="co">${escHtml(line.slice(i))}</span>`;
        break;
      }
      if (line.slice(i, i + 2) === '/*') {
        const end = line.indexOf('*/', i + 2);
        const endIdx = end >= 0 ? end + 2 : line.length;
        result += `<span class="co">${escHtml(line.slice(i, endIdx))}</span>`;
        i = endIdx;
        continue;
      }
      if (line[i] === '-' && line[i + 1] === '-') {
        result += `<span class="co">${escHtml(line.slice(i))}</span>`;
        break;
      }
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && (line[j] !== '"' || line[j - 1] === '\\')) j++;
        result += `<span class="cs">${escHtml(line.slice(i, j + 1))}</span>`;
        i = j + 1;
        continue;
      }
      if (line[i] === "'") {
        let j = i + 1;
        while (j < line.length && (line[j] !== "'" || line[j - 1] === '\\')) j++;
        result += `<span class="cs">${escHtml(line.slice(i, j + 1))}</span>`;
        i = j + 1;
        continue;
      }
      if (line[i] === '`') {
        let j = i + 1;
        while (j < line.length && line[j] !== '`') { if (line[j] === '\\') j++; j++; }
        result += `<span class="cs">${escHtml(line.slice(i, j + 1))}</span>`;
        i = j + 1;
        continue;
      }
      if (line[i] === '@') {
        let j = i + 1;
        while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
        result += `<span class="ct">${escHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (/[0-9]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[0-9.xXa-fA-F]/.test(line[j])) j++;
        result += `<span class="cn">${escHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (/[a-zA-Z_$]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
        const word = line.slice(i, j);
        if (allKw.has(word)) {
          result += `<span class="ck">${escHtml(word)}</span>`;
        } else if (allTypes.has(word) || /^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
          result += `<span class="ct">${escHtml(word)}</span>`;
        } else if (line[j] === '(') {
          result += `<span class="cf">${escHtml(word)}</span>`;
        } else {
          result += `<span class="cp">${escHtml(word)}</span>`;
        }
        i = j;
        continue;
      }
      if (/[+\-*/%=<>!&|^~?:]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[+\-*/%=<>!&|^~?:.]/.test(line[j])) j++;
        result += `<span class="co">${escHtml(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (/[()\[\]{}.',;:]/.test(line[i])) {
        result += `<span class="cp">${escHtml(line[i])}</span>`;
        i++;
        continue;
      }
      result += escHtml(line[i]);
      i++;
    }
    result += `</span>\n`;
  }
  return result.trimEnd();
}

@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: `
    .code-block {
      margin-top: 1rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-code-border);
      overflow: hidden;
      background: var(--color-code-bg);
    }
    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.875rem;
      border-bottom: 1px solid var(--color-code-border);
    }
    .code-lang {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--color-text-muted);
    }
    .copy-btn {
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
    .copy-btn:hover {
      background: var(--color-border);
      color: var(--color-text-secondary);
    }
    .copy-btn-copied {
      color: var(--color-success);
    }
    pre {
      margin: 0;
      padding: 1rem 1.25rem;
      overflow-x: auto;
      font-size: 0.8125rem;
      line-height: 1.75;
      font-family: var(--font-mono);
      background: transparent;
      tab-size: 2;
    }
    pre code {
      display: block;
      background: transparent;
    }
    /* Token colors — from global design system */
    .ck { color: var(--color-token-keyword); }
    .cs { color: var(--color-token-string); }
    .co { color: var(--color-token-comment); font-style: italic; }
    .cn { color: var(--color-token-number); }
    .co2 { color: var(--color-token-operator); }
    .cp { color: var(--color-token-punctuation); }
    .ct { color: var(--color-token-type); }
    .cf { color: var(--color-token-function); }
    .cl { display: block; }
  `,
  template: `
    <div class="code-block">
      <div class="code-header">
        <div class="code-lang">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          {{ language() ?? 'code' }}
        </div>
        <button (click)="copyCode()" class="copy-btn" [class.copy-btn-copied]="copied()" [attr.aria-label]="copied() ? 'Code copié' : 'Copier le code'">
          @if (copied()) {
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Copié!
          } @else {
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Copier
          }
        </button>
      </div>
      <pre><code [innerHTML]="highlightedHtml()"></code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  code = input.required<string>();
  language = input<string>();

  readonly copied = signal(false);
  private sanitizer = inject(DomSanitizer);

  readonly highlightedHtml = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(tokenize(this.code(), (this.language() ?? 'ts').toLowerCase()))
  );

  copyCode(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {});
  }
}