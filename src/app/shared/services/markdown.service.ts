import { Service } from '@angular/core';
import MarkdownIt from 'markdown-it';

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Tokenizer ───────────────────────────────────────────────────────────────

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
      const ch = line[i];
      const ch2 = line.slice(i, i + 2);

      if (ch2 === '//' || (isSql && ch2 === '--')) {
        row += `<span class="co">${esc(line.slice(i))}</span>`;
        i = line.length;
        continue;
      }

      if (ch2 === '/*') {
        const end = line.indexOf('*/', i + 2);
        const slice = end >= 0 ? line.slice(i, end + 2) : line.slice(i);
        row += `<span class="co">${esc(slice)}</span>`;
        i += slice.length;
        continue;
      }

      if (ch === '@') {
        let j = i + 1;
        while (j < line.length && /\w/.test(line[j])) j++;
        row += `<span class="ct">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      if (ch === '"' || ch === "'" || ch === '`') {
        const quote = ch;
        let j = i + 1;
        while (j < line.length) {
          if (line[j] === '\\') { j += 2; continue; }
          if (line[j] === quote) { j++; break; }
          j++;
        }
        row += `<span class="cs">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(line[i + 1] ?? ''))) {
        let j = i;
        while (j < line.length && /[0-9.xXa-fA-FbBoO_]/.test(line[j])) j++;
        row += `<span class="cn">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      if (/[a-zA-Z_$]/.test(ch)) {
        let j = i;
        while (j < line.length && /\w/.test(line[j])) j++;
        const word = line.slice(i, j);
        const checkWord = isSql ? word.toUpperCase() : word;

        if (keywords.has(checkWord)) {
          row += `<span class="ck">${esc(word)}</span>`;
        } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
          row += `<span class="ct">${esc(word)}</span>`;
        } else if (line[j] === '(') {
          row += `<span class="cf">${esc(word)}</span>`;
        } else {
          row += esc(word);
        }
        i = j;
        continue;
      }

      if (isJsTs && /[+\-*/%=<>!&|^~?]/.test(ch)) {
        let j = i;
        while (j < line.length && /[+\-*/%=<>!&|^~?.]/.test(line[j])) j++;
        row += `<span class="co2">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      if (/[()\[\]{}.,'";:`]/.test(ch)) {
        row += `<span class="cp">${esc(ch)}</span>`;
        i++;
        continue;
      }

      row += esc(ch);
      i++;
    }

    out.push(row);
  }

  return out.join('\n');
}

// ─── Code block builder ──────────────────────────────────────────────────────

const CODE_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;

function buildCodeBlock(code: string, lang: string): string {
  const label = lang || 'text';
  return `<div class="code-block">
  <div class="code-header">
    <div class="code-lang">${CODE_ICON}${label}</div>
  </div>
  <pre><code class="language-${label}">${tokenize(code, label.toLowerCase())}</code></pre>
</div>`;
}

// ─── Service ─────────────────────────────────────────────────────────────────

@Service()
export class MarkdownService {
  private readonly md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: false,
  });

  render(text: string, searchQuery?: string): string {
    if (!text?.trim()) return '';

    let html = this.md.render(text);

    html = html.replace(/<h2>([^<]+)<\/h2>/g, (_match, text) => {
      const id = slugify(text);
      return `<h2 id="${id}">${text}</h2>`;
    });

    html = html.replace(
      /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g,
      (_match, lang: string | undefined, escaped: string) => {
        const code = escaped
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        return buildCodeBlock(code, lang ?? 'text');
      }
    );

    if (searchQuery?.trim()) {
      const escaped = searchQuery.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      html = html.replace(regex, '<mark class="search-match">$1</mark>');
    }

    return html;
  }
}