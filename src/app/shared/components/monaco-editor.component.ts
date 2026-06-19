import {
  Component,
  input,
  output,
  signal,
  AfterViewInit,
  inject,
  effect,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { EditorComponent, MonacoEditorModule, NgxEditorModel } from 'ngx-monaco-editor';

const SUPPORTED_LANGUAGES = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'sql', label: 'SQL' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'xml', label: 'XML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'shell', label: 'Shell' },
  { value: 'dockerfile', label: 'Dockerfile' },
];

@Component({
  selector: 'app-monaco-editor',
  imports: [MonacoEditorModule, LucideAngularModule],
  template: `
    <div class="code-editor-wrap">
      <div class="editor-toolbar">
        <div class="lang-select-wrap">
          <label class="lang-label" [for]="langSelectId">Language</label>
          <select
            [id]="langSelectId"
            class="lang-select"
            [value]="language()"
            (change)="onLanguageChange($any($event.target).value)"
            aria-label="Select programming language"
          >
            @for (lang of languages; track lang.value) {
              <option [value]="lang.value">{{ lang.label }}</option>
            }
          </select>
        </div>
        <button
          type="button"
          class="theme-toggle"
          (click)="toggleTheme()"
          [attr.aria-label]="isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
          [title]="isDark() ? 'Light theme' : 'Dark theme'"
        >
          @if (isDark()) {
            <lucide-icon name="sun" class="w-3.5 h-3.5" aria-hidden="true" />
          } @else {
            <lucide-icon name="moon" class="w-3.5 h-3.5" aria-hidden="true" />
          }
        </button>
      </div>

      @if (isBrowser) {
        <ngx-monaco-editor
          class="monaco-instance"
          [options]="editorOptions()"
          [model]="editorModel()"
          (onInit)="onEditorInit($event)"
          (change)="onCodeChange($any($event))"
        />
      }
    </div>
  `,
  styles: `
    :host { display: block; }

    .code-editor-wrap {
      border: 1.5px solid var(--color-border);
      background: var(--color-code-bg);
      overflow: hidden;
    }

    .editor-toolbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.375rem 0.625rem;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface-raised);
    }

    .lang-select-wrap { display: flex; align-items: center; gap: 0.5rem; }
    .lang-label {
      font-family: var(--font-sans); font-size: 0.625rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.06em;
      color: var(--color-text-muted);
    }
    .lang-select {
      height: 26px; padding: 0 0.5rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0;
      color: var(--color-text-primary);
      font-family: var(--font-mono); font-size: 0.6875rem;
      cursor: pointer;
    }
    .lang-select:focus { outline: none; border-color: var(--color-accent); }

    .theme-toggle {
      display: flex; align-items: center; justify-content: center;
      width: 26px; height: 26px;
      border: 1px solid var(--color-border);
      border-radius: 0; background: none;
      color: var(--color-text-muted); cursor: pointer;
      transition: border-color 120ms ease, color 120ms ease;
    }
    .theme-toggle:hover { border-color: var(--color-text-primary); color: var(--color-text-primary); }

    .monaco-instance { display: block; min-height: 200px; }
    ::ng-deep .monaco-instance .editor-container { width: 100% !important; }
  `,
})
export class MonacoEditorComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly value = input<string>('');
  readonly language = input<string>('typescript');
  readonly valueChange = output<string>();
  readonly languageChange = output<string>();

  readonly languages = SUPPORTED_LANGUAGES;
  readonly langSelectId = `lang-${Math.random().toString(36).slice(2, 9)}`;

  readonly isDark = signal(true);
  private editorInstance: any = null;

  private _value = '';
  private _language = 'typescript';

  readonly editorOptions = () => ({
    theme: this.isDark() ? 'prism-dark' : 'prism-light',
    language: this._language,
    minimap: { enabled: false },
    lineNumbers: 'on' as const,
    scrollBeyondLastLine: false,
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    renderLineHighlight: 'line' as const,
    padding: { top: 12, bottom: 12 },
    automaticLayout: true,
    wordWrap: 'on' as const,
    scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
  });

  readonly editorModel = (): NgxEditorModel => ({
    value: this._value,
    language: this._language,
  });

  constructor() {
    effect(() => {
      const v = this.value();
      if (this._value !== v && this.editorInstance) {
        const model = this.editorInstance.getModel();
        if (model && v !== model.getValue()) {
          this.editorInstance.getModel().setValue(v);
        }
      }
    });

    effect(() => {
      const lang = this.language();
      this._language = lang;
    });
  }

  ngAfterViewInit(): void {}

  onEditorInit(editor: any): void {
    this.editorInstance = editor;
    // Sync initial value after editor is ready
    const initial = this.value();
    if (initial) {
      const model = editor.getModel();
      if (model && model.getValue() !== initial) {
        model.setValue(initial);
      }
    }
  }

  onCodeChange(code: string): void {
    this._value = code;
    this.valueChange.emit(code);
  }

  onLanguageChange(lang: string): void {
    this._language = lang;
    this.languageChange.emit(lang);
    if (this.editorInstance) {
      const model = this.editorInstance.getModel();
      if (model) {
        (window as any).monaco?.editor.setModelLanguage(model, lang);
      }
    }
  }

  toggleTheme(): void {
    this.isDark.update(v => !v);
    if (this.editorInstance) {
      const theme = this.isDark() ? 'prism-dark' : 'prism-light';
      (window as any).monaco?.editor.setTheme(theme);
    }
  }
}
