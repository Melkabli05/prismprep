import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DeepDiveContentComponent } from './deep-dive-content.component';

@Component({
  selector: 'app-deep-dive-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, DeepDiveContentComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center h-screen p-4"
      style="background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(4px)"
      (click)="close.emit()"
    >
      <div
        class="relative w-full rounded-2xl border overflow-hidden"
        style="background: var(--color-surface); border-color: var(--color-border); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); max-width: min(700px, 100vw)"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deep-dive-title"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4" style="border-bottom: 1px solid var(--color-border-subtle)">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              style="background: var(--color-accent-soft); color: var(--color-accent)"
            >
              <lucide-icon name="graduation-cap" class="w-4 h-4" />
            </div>
            <div>
              <h2 id="deep-dive-title" class="text-sm font-semibold" style="color: var(--color-text-primary)">Deep Dive</h2>
              <p class="text-xs" style="color: var(--color-text-muted)">{{ question() }}</p>
            </div>
          </div>
          <button
            class="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150"
            style="background: transparent; color: var(--color-text-muted)"
            type="button"
            (click)="close.emit()"
            aria-label="Fermer"
          >
            <lucide-icon name="x" class="w-4 h-4" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6" style="max-height: 70vh; overflow-y: auto">
          <app-deep-dive-content [content]="deepDive()"></app-deep-dive-content>
        </div>
      </div>
    </div>
  `,
})
export class DeepDiveModalComponent {
  question = input.required<string>();
  deepDive = input.required<string>();
  readonly close = output<void>();
}