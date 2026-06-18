import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Toolbar, ToolbarWidget, ToolbarWidgetGroup } from '@angular/aria/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [LucideAngularModule, Toolbar, ToolbarWidget, ToolbarWidgetGroup],
  host: {
    'role': 'toolbar',
    '[attr.aria-label]': '"Actions"',
  },
  template: `
    <div style="border-bottom: 1px solid var(--color-border); background: var(--color-bg)">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="flex items-center h-12 sm:h-11 overflow-x-auto pb-0.5">
          <div ngToolbar class="flex items-center gap-1 sm:gap-0.5 shrink-0">
            <div ngToolbarWidgetGroup role="group" aria-label="Modes" [multi]="false">
              <button ngToolbarWidget
                      value="flashcard"
                      [attr.aria-pressed]="flashcardMode()"
                      (click)="flashcardModeChange.emit(!flashcardMode())"
                      class="toolbar-btn"
                      [class.toolbar-btn-active]="flashcardMode()"
                      [class.toolbar-btn-inactive]="!flashcardMode()">
                <lucide-icon [name]="flashcardMode() ? 'eye-off' : 'eye'" class="h-4 w-4"></lucide-icon>
                <span class="hidden sm:inline">Flashcard</span>
              </button>

              <button ngToolbarWidget
                      value="bookmarks"
                      [attr.aria-pressed]="showBookmarksOnly()"
                      (click)="bookmarksOnlyChange.emit(!showBookmarksOnly())"
                      class="toolbar-btn"
                      [class.toolbar-btn-active]="showBookmarksOnly()"
                      [class.toolbar-btn-inactive]="!showBookmarksOnly()">
                <lucide-icon name="bookmark" class="h-4 w-4"></lucide-icon>
                <span class="hidden sm:inline">Favoris</span>
                @if (bookmarkCount() > 0) {
                  <span class="bookmark-count">{{ bookmarkCount() }}</span>
                }
              </button>

              <button ngToolbarWidget
                      value="shuffle"
                      (click)="shuffleChange.emit()"
                      class="toolbar-btn toolbar-btn-inactive">
                <lucide-icon name="shuffle" class="h-4 w-4"></lucide-icon>
                <span class="hidden sm:inline">Mélanger</span>
              </button>
            </div>

            <div class="toolbar-divider shrink-0 mx-1 sm:mx-0.5"></div>

            <div ngToolbarWidgetGroup role="group" aria-label="Défis" [multi]="false">
              <button ngToolbarWidget
                      value="daily"
                      [attr.aria-pressed]="showDailyChallenge()"
                      (click)="dailyChallengeChange.emit()"
                      class="toolbar-btn toolbar-btn-challenge"
                      [class.toolbar-btn-active]="showDailyChallenge()"
                      [class.toolbar-btn-ghost]="!showDailyChallenge()">
                <lucide-icon name="calendar" class="h-4 w-4"></lucide-icon>
                <span class="hidden sm:inline">Défi du jour</span>
              </button>

              <button ngToolbarWidget
                      value="mock"
                      [attr.aria-pressed]="showMockInterview()"
                      (click)="mockInterviewChange.emit()"
                      class="toolbar-btn toolbar-btn-challenge"
                      [class.toolbar-btn-active]="showMockInterview()"
                      [class.toolbar-btn-ghost]="!showMockInterview()">
                <lucide-icon name="clock" class="h-4 w-4"></lucide-icon>
                <span class="hidden sm:inline">Simulation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 56px;
      z-index: 40;
    }
    @media (min-width: 640px) {
      :host { top: 64px; }
    }
    .toolbar-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      height: 34px;
      padding: 0 0.875rem;
      border-radius: var(--radius-full);
      font-size: 0.8125rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: background 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 120ms ease;
      white-space: nowrap;
      user-select: none;
    }
    .toolbar-btn:active {
      transform: scale(0.96);
    }
    .toolbar-btn-active {
      background: var(--color-accent);
      color: var(--color-accent-text);
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    .toolbar-btn-active:hover {
      background: var(--color-accent-hover);
    }
    .toolbar-btn-inactive {
      background: transparent;
      color: var(--color-text-secondary);
    }
    .toolbar-btn-inactive:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-primary);
    }
    .toolbar-btn-ghost {
      background: transparent;
      color: var(--color-text-muted);
    }
    .toolbar-btn-ghost:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-secondary);
    }
    .toolbar-btn-challenge.toolbar-btn-active {
      background: var(--color-amber-soft);
      color: var(--color-amber);
      box-shadow: none;
    }
    .toolbar-btn-challenge.toolbar-btn-active:hover {
      background: var(--color-amber);
      color: white;
    }
    .toolbar-divider {
      width: 1px;
      height: 22px;
      background: var(--color-border);
      flex-shrink: 0;
    }
    .bookmark-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 18px;
      padding: 0 5px;
      border-radius: var(--radius-full);
      font-size: 0.6875rem;
      font-weight: 600;
      background: var(--color-accent);
      color: var(--color-accent-text);
    }
    .toolbar-btn-inactive .bookmark-count {
      background: var(--color-text-muted);
      color: var(--color-surface);
    }
  `,
})
export class ToolbarComponent {
  flashcardMode = input(false);
  showBookmarksOnly = input(false);
  showDailyChallenge = input(false);
  showMockInterview = input(false);
  bookmarkCount = input(0);

  flashcardModeChange = output<boolean>();
  bookmarksOnlyChange = output<boolean>();
  shuffleChange = output<void>();
  dailyChallengeChange = output<void>();
  mockInterviewChange = output<void>();
}
