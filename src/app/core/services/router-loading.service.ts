import { Service, inject, signal } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';

@Service()
export class RouterLoadingService {
  private readonly router = inject(Router);

  readonly active = signal(false);
  readonly progress = signal(0);

  private trickleHandle: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.start();
      } else if (
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      ) {
        this.complete();
      }
    });
  }

  private start(): void {
    this.active.set(true);
    this.progress.set(0);
    this.trickle();
  }

  private trickle(): void {
    this.trickleHandle = setInterval(() => {
      const p = this.progress();
      if (p < 90) {
        // Fast at start, slows as it approaches 90
        const increment = Math.max(1, (90 - p) * 0.15);
        this.progress.set(Math.min(90, p + increment));
      }
    }, 300);
  }

  private complete(): void {
    if (this.trickleHandle) {
      clearInterval(this.trickleHandle);
      this.trickleHandle = null;
    }
    this.progress.set(100);
    // Small delay so the user sees the bar complete
    setTimeout(() => {
      this.active.set(false);
      this.progress.set(0);
    }, 400);
  }
}
