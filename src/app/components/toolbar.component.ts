import { Component, input, output } from '@angular/core';
import { LucideAngular, Eye, EyeOff, Bookmark, Shuffle, Calendar, Clock } from 'lucide-angular';

@Component({
  selector: 'app-toolbar',
  imports: [LucideAngular],
  template: `
    <div class="border-b bg-base-100/80 backdrop-blur-sm">
      <div class="max-w-2xl mx-auto px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
        <button (click)="flashcardModeChange.emit(!flashcardMode())"
                class="btn btn-sm gap-1.5"
                [class.btn-primary]="flashcardMode()"
                [class.btn-outline]="!flashcardMode()">
          <lucide-icon [name]="flashcardMode() ? 'eye-off' : 'eye'" class="h-3.5 w-3.5"></lucide-icon>
          Flashcard
        </button>

        <button (click)="bookmarksOnlyChange.emit(!showBookmarksOnly())"
                class="btn btn-sm gap-1.5"
                [class.btn-primary]="showBookmarksOnly()"
                [class.btn-outline]="!showBookmarksOnly()">
          <lucide-icon name="bookmark" class="h-3.5 w-3.5"></lucide-icon>
          Favoris{{ bookmarkCount() > 0 ? ' (' + bookmarkCount() + ')' : '' }}
        </button>

        <button (click)="shuffleChange.emit()"
                class="btn btn-outline btn-sm gap-1.5">
          <lucide-icon name="shuffle" class="h-3.5 w-3.5"></lucide-icon>
          Mélanger
        </button>

        <div class="h-5 w-px bg-base-300 shrink-0"></div>

        <button (click)="dailyChallengeChange.emit()"
                class="btn btn-sm gap-1.5"
                [class.btn-primary]="showDailyChallenge()"
                [class.btn-ghost]="!showDailyChallenge()">
          <lucide-icon name="calendar" class="h-3.5 w-3.5"></lucide-icon>
          Défi du jour
        </button>

        <button (click)="mockInterviewChange.emit()"
                class="btn btn-sm gap-1.5"
                [class.btn-primary]="showMockInterview()"
                [class.btn-ghost]="!showMockInterview()">
          <lucide-icon name="clock" class="h-3.5 w-3.5"></lucide-icon>
          Simulation
        </button>
      </div>
    </div>
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
