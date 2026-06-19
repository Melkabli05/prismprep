import { Component, input, output, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AiSuggestion } from '@core/ai/ai-provider.service';

export interface DiffLine {
  text: string;
  type: 'unchanged' | 'added' | 'removed';
}

/**
 * O(n) line-by-line diff algorithm.
 * Lines present in `b` not in `a` are 'added'.
 * Lines in `a` not in `b` are 'removed'.
 * Rest are aligned by index as 'unchanged'.
 */
export function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const result: DiffLine[] = [];

  const maxLen = Math.max(linesA.length, linesB.length);

  for (let i = 0; i < maxLen; i++) {
    const lineA: string | undefined = linesA[i];
    const lineB: string | undefined = linesB[i];

    if (!lineA && lineB) {
      result.push({ text: lineB, type: 'added' });
    } else if (!lineB && lineA) {
      result.push({ text: lineA, type: 'removed' });
    } else if (lineA && lineB) {
      if (lineA === lineB) {
        result.push({ text: lineA, type: 'unchanged' });
      } else {
        result.push({ text: lineA, type: 'removed' });
        result.push({ text: lineB, type: 'added' });
      }
    }
  }

  return result;
}

@Component({
  selector: 'app-ai-banner',
  imports: [LucideAngularModule],
  template: `
    <div class="banner" role="status" aria-live="polite">
      <div class="banner-header">
        <lucide-icon name="sparkles" class="banner-icon" aria-hidden="true"></lucide-icon>
        <span class="banner-label">{{ actionLabel() }} by AI</span>
      </div>

      @if (loading()) {
        <div class="skeleton-wrap" aria-label="Loading AI suggestion...">
          <div class="skeleton-line" style="width: 60%"></div>
          <div class="skeleton-line" style="width: 85%"></div>
          <div class="skeleton-line" style="width: 70%"></div>
          <div class="skeleton-line" style="width: 40%"></div>
        </div>
      } @else {
        <div class="diff-view" aria-label="AI suggestion diff">
          @for (line of diffLines(); track $index) {
            <div
              class="diff-line"
              [class.diff-line--unchanged]="line.type === 'unchanged'"
              [class.diff-line--added]="line.type === 'added'"
              [class.diff-line--removed]="line.type === 'removed'"
            >
              <span class="diff-marker">{{ getMarker(line.type) }}</span>
              <span class="diff-text">{{ line.text }}</span>
            </div>
          }
        </div>
      }

      <div class="banner-actions">
        <button
          type="button"
          class="btn btn--ghost"
          [disabled]="loading()"
          (click)="dismissed.emit()"
          aria-label="Dismiss suggestion"
        >
          <lucide-icon name="x" class="btn-icon" aria-hidden="true"></lucide-icon>
          Dismiss
        </button>
        <button
          type="button"
          class="btn btn--accept"
          [disabled]="loading()"
          (click)="accepted.emit()"
          aria-label="Accept suggestion"
        >
          <lucide-icon name="check" class="btn-icon" aria-hidden="true"></lucide-icon>
          Accept
        </button>
      </div>
    </div>
  `,
  styles: `
    .banner {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--color-surface);
      border: 1.5px solid var(--color-accent);
      border-radius: 0;
    }

    .banner-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .banner-icon {
      width: 14px;
      height: 14px;
      color: var(--color-accent);
      flex-shrink: 0;
    }

    .banner-label {
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-accent);
      flex-shrink: 0;
    }

    .diff-view {
      flex: 1;
      overflow: auto;
      max-height: 200px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      line-height: 1.6;
      border: 1px solid var(--color-border);
      background: var(--color-bg);
    }

    .diff-line {
      display: flex;
      padding: 0.125rem 0.375rem;
    }

    .diff-line--unchanged {
      color: var(--color-text-muted);
    }

    .diff-line--added {
      background: var(--color-success-soft);
      color: var(--color-success);
    }

    .diff-line--removed {
      background: var(--color-error-soft);
      color: var(--color-error);
      text-decoration: line-through;
    }

    .diff-marker {
      width: 1.25rem;
      flex-shrink: 0;
      user-select: none;
    }

    .diff-text {
      white-space: pre-wrap;
      word-break: break-all;
    }

    .banner-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      border: 1.5px solid var(--color-border);
      font-family: var(--font-sans);
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-icon {
      width: 14px;
      height: 14px;
    }

    .btn--ghost {
      background: transparent;
      color: var(--color-text-primary);
    }

    .btn--ghost:hover:not(:disabled) {
      background: var(--color-bg);
    }

    .btn--accept {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-surface);
    }

    .btn--accept:hover:not(:disabled) {
      background: var(--color-accent-dark);
      border-color: var(--color-accent-dark);
    }

    .skeleton-wrap { padding: 0.75rem; }
    .skeleton-line {
      height: 0.875rem; margin-bottom: 0.5rem;
      background: var(--color-border);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .skeleton-line:last-child { margin-bottom: 0; }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
  `,
})
export class AiBannerComponent {
  suggestion = input.required<AiSuggestion>();
  loading = input(false);

  accepted = output<void>();
  dismissed = output<void>();

  actionLabel = computed(() => this.suggestion().action.toUpperCase());
  readonly diffLines = computed(() => diffLines(this.suggestion().original, this.suggestion().result));

  getMarker(type: DiffLine['type']): string {
    switch (type) {
      case 'added':
        return '+';
      case 'removed':
        return '-';
      default:
        return ' ';
    }
  }
}