import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .progress-track {
      width: 100%;
      height: 4px;
      border-radius: 9999px;
      background: var(--color-border);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 9999px;
      background: var(--color-accent);
      transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  `,
  template: `
    <div class="progress-track">
      <div class="progress-fill" [style.width.%]="percent()"></div>
    </div>
  `,
})
export class ProgressBarComponent {
  value = input(0);
  max = input(100);

  readonly percent = computed(() => {
    const m = this.max();
    return m > 0 ? Math.min(100, (this.value() / m) * 100) : 0;
  });
}