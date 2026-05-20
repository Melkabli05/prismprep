import { Pipe, PipeTransform } from '@angular/core';
import MarkdownIt from 'markdown-it';

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
  sql: new Set(['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'INDEX', 'DROP', 'ALTER', 'ADD', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'NULL', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'UNION', 'ALL', 'EXISTS', 'BETWEEN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC']),
  ts: new Set(['const', 'let', 'var', 'function', 'class', 'interface', 'type', 'enum', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'as', 'async', 'await', 'public', 'private', 'protected', 'readonly', 'static', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'interface', 'implements', 'extends', 'abstract', 'override', 'constructor', 'get', 'set', 'keyof', 'infer', 'declare', 'namespace', 'is', 'asserts', 'satisfies']),
  typescript: new Set(['const', 'let', 'var', 'function', 'class', 'interface', 'type', 'enum', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'as', 'async', 'await', 'public', 'private', 'protected', 'readonly', 'static', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'interface', 'implements', 'extends', 'abstract', 'override', 'constructor', 'get', 'set', 'keyof', 'infer', 'declare', 'namespace', 'is', 'asserts', 'satisfies']),
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

function buildCodeBlock(code: string, lang: string): string {
  const langLabel = lang || 'text';
  const highlighted = tokenize(code, langLabel);
  const langIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
  return `<div class="code-block">
  <div class="code-header">
    <div class="code-lang">${langIcon}${langLabel}</div>
  </div>
  <pre><code class="language-${langLabel}">${highlighted}</code></pre>
</div>`;
}

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  private readonly md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: false,
  });

  transform(text: string): string {
    if (!text?.trim()) return '';
    let html = this.md.render(text);

    // Replace markdown-it code blocks with CodeBlockComponent-style blocks
    // markdown-it renders code blocks as <pre><code class="language-X">...</code></pre>
    html = html.replace(
      /<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>/g,
      (match, langClass, codeContent) => {
        const decoded = codeContent
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        return buildCodeBlock(decoded, langClass);
      }
    );

    return html;
  }
}