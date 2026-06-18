import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { type InterviewQuestion } from '@core/models/interview.models';
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  selector: 'app-question-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuestionCardComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1.75rem;">
      @for (item of items(); track item.question.id; let i = $index) {
        <app-question-card
          [question]="item.question"
          [categoryName]="item.category.title"
          [categoryColor]="item.category.color"
          [flashcardMode]="flashcardMode()"
          [revealedCards]="revealedCards()"
          [bookmarks]="bookmarks()"
          [notes]="notes()"
          [highlightQuery]="highlightQuery()"
          [totalInCategory]="totalInCategory()"
          [indexInCategory]="indexInCategory() ? i + 1 : 0"
          (toggleBookmark)="toggleBookmark.emit($event)"
          (toggleRevealed)="toggleRevealed.emit($event)"
          (noteChange)="noteChange.emit($event)"
          (markViewed)="markViewed.emit($event)"
          (openDeepDiveModal)="openDeepDiveModal.emit($event)">
        </app-question-card>
      }
    </div>
  `,
})
export class QuestionListComponent {
  items = input.required<{ category: { title: string; color: string }; question: InterviewQuestion }[]>();
  flashcardMode = input(false);
  revealedCards = input<Set<string>>(new Set());
  bookmarks = input<Set<string>>(new Set());
  notes = input<Record<string, string>>({});
  highlightQuery = input<string>('');
  totalInCategory = input(0);
  indexInCategory = input<number>(0);

  toggleBookmark = output<string>();
  toggleRevealed = output<string>();
  noteChange = output<{ id: string; note: string }>();
  markViewed = output<string>();
  openDeepDiveModal = output<string>();
}