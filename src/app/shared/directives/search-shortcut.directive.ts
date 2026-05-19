import { Directive, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appSearchShortcut]',
})
export class SearchShortcutDirective {
  private doc = inject(DOCUMENT);

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    // Don't fire when typing in an input or textarea
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    // Cmd/Ctrl + K — standard "focus search" across the web
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const input = this.doc.getElementById('search-input') as HTMLInputElement | null;
      if (input) {
        input.focus();
        window.setTimeout(() => input.select(), 0);
      }
    }
  }
}