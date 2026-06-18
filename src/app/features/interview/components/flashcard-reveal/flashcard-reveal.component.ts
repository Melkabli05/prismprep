import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-flashcard-reveal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  host: {
    '[attr.aria-expanded]': 'isRevealed()',
  },
  styles: `
    details {
      border-radius: var(--radius-lg);
      border: 1px dashed var(--color-border);
      background: var(--color-surface-raised);
      overflow: hidden;
      transition: border-color 200ms ease, background 200ms ease;
    }
    details[open] {
      border-style: solid;
      border-color: var(--color-border-strong);
      background: var(--color-surface);
    }
    summary {
      padding: 1.25rem 1.5rem;
      cursor: pointer;
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.375rem;
      user-select: none;
      transition: background 150ms ease;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary:hover {
      background: var(--color-surface-hover);
    }
    details[open] summary {
      border-bottom: 1px solid var(--color-border-subtle);
    }
    .reveal-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-muted);
      transition: color 200ms ease;
    }
    details[open] .reveal-label {
      color: var(--color-text-secondary);
    }
    summary:hover .reveal-label {
      color: var(--color-text-secondary);
    }
    .reveal-hint {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      opacity: 0.7;
    }
    details[open] .reveal-hint {
      opacity: 0.5;
    }
    .content-wrapper {
      padding: 1.25rem 1.5rem 1.5rem;
    }
  `,
  template: `
    <details [open]="isRevealed()" (toggle)="onToggle()">
      <summary>
        <div class="reveal-label">
          <lucide-icon [name]="isRevealed() ? 'eye' : 'eye-off'" class="h-4 w-4"></lucide-icon>
          <span>{{ isRevealed() ? 'Réponse révélée' : 'Réponse masquée' }}</span>
        </div>
        <p class="reveal-hint">Cliquez pour {{ isRevealed() ? 'masquer' : 'révéler' }}</p>
      </summary>
      <div class="content-wrapper">
        <ng-content></ng-content>
      </div>
    </details>
  `,
})
export class FlashcardRevealComponent {
  isRevealed = input(false);
  toggle = output<void>();

  onToggle(): void {
    this.toggle.emit();
  }
}