import { Service } from '@angular/core';
import MarkdownIt from 'markdown-it';
import { slugify, buildCodeBlock } from '@shared/utils/tokenizer';

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