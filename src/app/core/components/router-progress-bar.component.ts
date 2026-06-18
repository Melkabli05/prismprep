import { Component, inject, computed } from '@angular/core';
import { RouterLoadingService } from '../services/router-loading.service';

@Component({
  selector: 'app-router-progress-bar',
  template: `
    @if (service.active()) {
      <div class="progress-bar" role="progressbar" aria-label="Navigation en cours" aria-valuenow="{{ progress() }}">
        <div class="progress-fill" [style.width.%]="service.progress()"></div>
      </div>
    }
  `,
  styles: `
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10001;
      height: 3px;
      background: transparent;
      pointer-events: none;
    }
    .progress-fill {
      height: 100%;
      background: var(--color-accent);
      transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 6px color-mix(in srgb, var(--color-accent) 40%, transparent);
    }
  `,
})
export class RouterProgressBarComponent {
  readonly service = inject(RouterLoadingService);
  readonly progress = computed(() => Math.round(this.service.progress()));
}
