import { Component, input, signal } from '@angular/core';
import { LucideAngularComponent as LucideAngular, Code2, Copy, Check } from 'lucide-angular';

@Component({
  selector: 'app-code-block',
  imports: [LucideAngular],
  template: `
    <div class="rounded-xl overflow-hidden border mt-6 shadow-sm"
         [class.border-base-300]="!isDark()"
         [class.bg-base-200]="isDark()"
         [class.border-base-200]="isDark()">
      <div class="flex items-center justify-between px-4 py-2 border-b"
           [class.border-base-300]="!isDark()"
           [class.bg-base-300]="isDark()"
           [class.border-base-200]="isDark()">
        <div class="flex items-center gap-2">
          <lucide-icon name="code-2" class="h-3.5 w-3.5 text-base-content/50"></lucide-icon>
          <span class="text-[11px] text-base-content/50 font-medium uppercase tracking-wider">
            {{ language() ?? 'code' }}
          </span>
        </div>
        <button (click)="copyCode()"
                class="flex items-center gap-1 text-[11px] text-base-content/50 hover:text-base-content transition-colors px-1.5 py-0.5 rounded hover:bg-base-200">
          <lucide-icon [name]="copied() ? 'check' : 'copy'" class="h-3 w-3"
                       [class.text-success]="copied()"></lucide-icon>
          {{ copied() ? 'Copié' : 'Copier' }}
        </button>
      </div>
      <pre class="p-4 overflow-x-auto text-sm font-mono leading-relaxed"><code>{{ code() }}</code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  code = input.required<string>();
  language = input<string>();

  readonly isDark = signal(false);
  readonly copied = signal(false);

  private mediaQuery: MediaQueryList | null = null;

  ngOnInit(): void {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark.set(this.mediaQuery.matches);
    this.mediaQuery.addEventListener('change', (e) => this.isDark.set(e.matches));
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}