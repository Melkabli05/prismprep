import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { InlineTextPipe } from '../../pipes/inline-text.pipe';

@Component({
  selector: 'app-example-block',
  imports: [LucideAngularModule, InlineTextPipe],
  styles: `
    .example-card {
      margin-top: 1rem;
      padding: 1rem 1.25rem;
      border-radius: var(--radius-lg);
      background: var(--color-amber-soft);
      border: 1px solid rgba(176, 125, 0, 0.15);
    }
    .example-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.625rem;
    }
    .example-label {
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-amber);
    }
    .example-text {
      font-size: 0.875rem;
      line-height: 1.65;
      color: var(--color-text-secondary);
    }
  `,
  template: `
    <div class="example-card">
      <div class="example-header">
        <lucide-icon name="lightbulb" class="h-3.5 w-3.5" style="color: var(--color-amber)"></lucide-icon>
        <span class="example-label">Exemple</span>
      </div>
      <p class="example-text" style="color: var(--color-text-secondary)">
        <span [innerHTML]="example() | inlineText"></span>
      </p>
    </div>
  `,
})
export class ExampleBlockComponent {
  example = input.required<string>();
}