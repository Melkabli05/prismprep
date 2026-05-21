import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight', pure: true })
export class HighlightPipe implements PipeTransform {
  transform(text: string, query: string): string {
    if (!text || !query?.trim()) return text;
    const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark class="search-match">$1</mark>');
  }
}