import { Directive, output } from '@angular/core';

@Directive({
  selector: '[appKeyboardShortcut]',
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class KeyboardShortcutDirective {
  searchFocus = output<void>();
  escape = output<void>();
  navigateLeft = output<void>();
  navigateRight = output<void>();

  onKeydown(e: KeyboardEvent): void {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.searchFocus.emit();
    }
    if (e.key === 'Escape') {
      this.escape.emit();
    }
    if (!e.metaKey && !e.ctrlKey && !e.altKey) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.navigateLeft.emit();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.navigateRight.emit();
      }
    }
  }
}