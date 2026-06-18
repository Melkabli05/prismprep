import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inlineText',
  pure: true,
})
export class InlineTextPipe implements PipeTransform {
  transform(text: string): string {
    let result = text;
    // Escape HTML first
    result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    // **bold** → strong
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 600">$1</strong>');
    // *emphasis* → amber-tinted highlight (inline highlight, not italic)
    result = result.replace(/\*(.+?)\*/g, '<em style="font-style: normal; background: var(--color-amber-soft); color: var(--color-amber); padding: 0.1em 0.35em; border-radius: var(--radius-sm); font-weight: 500">$1</em>');
    // __underline__ → accent underline
    result = result.replace(/__(.+?)__/g, '<u style="text-decoration-color: var(--color-accent); text-underline-offset: 3px">$1</u>');
    // `code` → styled inline code
    result = result.replace(/`([^`]+)`/g, '<code style="font-family: var(--font-mono); background: var(--color-code-bg); padding: 0.15em 0.4em; border-radius: var(--radius-sm); font-size: 0.875em; border: 1px solid var(--color-code-border); color: var(--color-text-primary)">$1</code>');
    return result;
  }
}