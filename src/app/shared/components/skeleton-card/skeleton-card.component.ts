import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-grid" role="status" aria-label="Chargement du contenu">
      @for (_ of skeletonItems(); track $index) {
        <div class="skeleton-card" aria-hidden="true">
          <div class="skeleton-line skeleton-title"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-text short"></div>
          <div class="skeleton-line skeleton-text short"></div>
          <div class="skeleton-footer">
            <div class="skeleton-tag"></div>
            <div class="skeleton-tag"></div>
          </div>
        </div>
      }
      <span class="sr-only">Chargement des questions…</span>
    </div>
  `,
  styles: `
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1rem;
      padding: 0;
    }

    .skeleton-card {
      background: var(--color-surface, #1e293b);
      border: 1px solid var(--color-border, #334155);
      border-radius: var(--radius-lg, 12px);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .skeleton-line {
      height: 14px;
      border-radius: 6px;
      background: linear-gradient(
        90deg,
        var(--color-border, #334155) 0%,
        color-mix(in srgb, var(--color-border, #334155) 60%, transparent) 50%,
        var(--color-border, #334155) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .skeleton-line { animation: none; opacity: 0.4; }
    }

    .skeleton-title { width: 65%; height: 18px; }
    .skeleton-text { width: 90%; }
    .skeleton-text.short { width: 50%; }

    .skeleton-footer {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }
    .skeleton-tag {
      height: 24px;
      width: 64px;
      border-radius: 9999px;
      background: linear-gradient(
        90deg,
        var(--color-border, #334155) 0%,
        color-mix(in srgb, var(--color-border, #334155) 60%, transparent) 50%,
        var(--color-border, #334155) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .skeleton-tag { animation: none; opacity: 0.4; }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `,
})
export class SkeletonCardComponent {
  readonly count = input(6);

  readonly skeletonItems = computed(() => {
    const items: number[] = [];
    for (let i = 0; i < this.count(); i++) items.push(i);
    return items;
  });
}
