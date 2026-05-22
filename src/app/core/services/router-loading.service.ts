import { Injectable, signal } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterLoadingService {
  readonly active = signal(false);
  readonly progress = signal(0);

  private trickleHandle: ReturnType<typeof setInterval> | null = null;

  constructor(router: Router) {
    router.events.subscribe((e) => {
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
