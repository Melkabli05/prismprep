import { Service, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SeoPageData {
  title: string;
  description: string;
  route?: string;
}

@Service()
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);

  private readonly siteName = 'Prism';
  private readonly defaultDescription =
    'Entraînez-vous aux entretiens techniques avec des questions SQL, Angular, et plus. Préparation efficace avec feedback instantané.';
  private readonly baseUrl = 'https://prismprep.dev/';

  updatePage(data: SeoPageData): void {
    const fullTitle = data.title
      ? `${data.title} | ${this.siteName}`
      : `${this.siteName} — Préparez vos entretiens techniques`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description || this.defaultDescription });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description || this.defaultDescription });
    this.meta.updateTag({ property: 'og:url', content: this.baseUrl + (data.route || this.router.url.slice(1)) });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description || this.defaultDescription });
  }
}