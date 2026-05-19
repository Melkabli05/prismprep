import { Component, input, output, computed, linkedSignal, effect, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { type InterviewQuestion } from '../../../../core/models/interview.models';
import { CodeBlockComponent } from '../../../../shared/components/code-block/code-block.component';
import { InlineTextPipe } from '../../../../shared/pipes/inline-text.pipe';
import { AnswerParagraphsComponent } from '../../../../shared/components/answer-paragraphs/answer-paragraphs.component';
import { ExampleBlockComponent } from '../../../../shared/components/example-block/example-block.component';
import { NoteEditorComponent } from '../../../../shared/components/note-editor/note-editor.component';
import { FlashcardRevealComponent } from '../../../../shared/components/flashcard-reveal/flashcard-reveal.component';

@Component({
  selector: 'app-question-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    CodeBlockComponent,
    InlineTextPipe,
    AnswerParagraphsComponent,
    ExampleBlockComponent,
    NoteEditorComponent,
    FlashcardRevealComponent,
  ],
  styles: `
    article {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-card);
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    article:hover {
      border-color: var(--color-border-strong);
      box-shadow: var(--shadow-card-hover);
    }
    .question-index {
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.02em;
    }
    .category-tag {
      display: inline-flex;
      align-items: center;
      height: 22px;
      padding: 0 0.625rem;
      border-radius: var(--radius-full);
      font-size: 0.6875rem;
      font-weight: 600;
      background: var(--color-accent-soft);
      color: var(--color-accent);
    }
    .bookmark-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: var(--radius-full);
      border: none;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease, transform 150ms ease;
      background: transparent;
    }
    .bookmark-btn-active {
      color: var(--color-amber);
    }
    .bookmark-btn-active:hover {
      background: var(--color-amber-soft);
    }
    .bookmark-btn-inactive {
      color: var(--color-text-muted);
    }
    .bookmark-btn-inactive:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-secondary);
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      height: 30px;
      padding: 0 0.75rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--color-border);
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
      background: var(--color-surface);
      color: var(--color-text-secondary);
    }
    .action-btn:hover {
      background: var(--color-surface-hover);
      color: var(--color-text-primary);
      border-color: var(--color-border-strong);
    }
    .reveal-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      height: 30px;
      padding: 0 0.875rem;
      border-radius: var(--radius-full);
      border: none;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 150ms ease, transform 150ms ease;
      background: var(--color-accent);
      color: var(--color-accent-text);
    }
    .reveal-btn:hover {
      background: var(--color-accent-hover);
      transform: translateY(-1px);
    }
    .reveal-btn:active {
      background: var(--color-accent-active);
      transform: translateY(0);
    }
    @keyframes fade-slide-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-slide-in {
      animation: fade-slide-in 0.25s ease-out;
    }
  `,
  template: `
    <article>
      <!-- Header -->
      <div class="p-4 sm:p-6 lg:p-8 pb-0">
        <div class="flex items-start justify-between gap-3 sm:gap-4">
          <div class="flex-1 min-w-0">
            @if (indexInCategory() > 0 && totalInCategory() > 0) {
              <div class="question-index mb-1 sm:mb-2">{{ indexInCategory() }} / {{ totalInCategory() }}</div>
            }
            <h2 class="text-sm sm:text-base font-semibold leading-relaxed" style="color: var(--color-text-primary)">
              <span [innerHTML]="question().question | inlineText"></span>
            </h2>
          </div>
          <button (click)="onToggleBookmark()"
                  class="bookmark-btn shrink-0"
                  [class.bookmark-btn-active]="isBookmarked()"
                  [class.bookmark-btn-inactive]="!isBookmarked()"
                  [attr.aria-label]="isBookmarked() ? 'Retirer des favoris' : 'Ajouter aux favoris'">
            <lucide-icon name="star" class="h-4 w-4"
                         [class.fill-current]="isBookmarked()"
                         style="transition: transform 150ms ease"></lucide-icon>
          </button>
        </div>

        @if (categoryName()) {
          <div class="mt-2 sm:mt-3">
            <span class="category-tag">{{ categoryName() }}</span>
          </div>
        }
      </div>

      <!-- Answer -->
      <div class="p-4 sm:p-6 lg:p-8 pt-4 sm:pt-5">
        <div class="h-px w-full mb-4 sm:mb-6" style="background: var(--color-border-subtle)"></div>

        @if (isHidden()) {
          <app-flashcard-reveal
            [isRevealed]="isRevealed()"
            (toggle)="onReveal()">
            <app-answer-paragraphs [answer]="question().answer"></app-answer-paragraphs>
          </app-flashcard-reveal>
        } @else {
          <app-answer-paragraphs [answer]="question().answer"></app-answer-paragraphs>
        }

        @if (showAnswer() && question().code) {
          <app-code-block [code]="question().code!" [language]="question().language"></app-code-block>
        }

        @if (showAnswer() && question().example && !question().code) {
          <app-example-block [example]="question().example!"></app-example-block>
        }

        @if (openNotes() === question().id) {
          <div class="fade-slide-in mt-4 sm:mt-5">
            <app-note-editor
              [note]="noteText()"
              (noteChange)="onNoteChange($event)">
            </app-note-editor>
          </div>
        }
      </div>

      <!-- Action bar -->
      <div class="flex items-center justify-between px-6 sm:px-8 py-4 rounded-b-xl"
           style="border-top: 1px solid var(--color-border-subtle); background: var(--color-surface-raised)">
        <button (click)="toggleNotes()" class="action-btn">
          <lucide-icon name="sticky-note" class="h-3.5 w-3.5"></lucide-icon>
          Note
          @if (hasNote()) {
            <lucide-icon name="check" class="h-3 w-3" style="color: var(--color-success)"></lucide-icon>
          }
        </button>

        @if (flashcardMode() && !isRevealed()) {
          <button (click)="onReveal()" class="reveal-btn">
            <lucide-icon name="eye" class="h-3.5 w-3.5"></lucide-icon>
            Révéler
          </button>
        }

        @if (hasDeepDive()) {
          <button (click)="openDeepDiveModal.emit(question().id)" class="action-btn">
            <lucide-icon name="graduation-cap" class="h-3.5 w-3.5"></lucide-icon>
            Deep Dive
          </button>
        }
      </div>
    </article>
  `,
})
export class QuestionCardComponent {
  question = input.required<InterviewQuestion>();
  categoryName = input<string>();
  categoryColor = input<string>();
  flashcardMode = input(false);
  revealedCards = input<Set<string>>(new Set());
  bookmarks = input<Set<string>>(new Set());
  notes = input<Record<string, string>>({});
  totalInCategory = input(0);
  indexInCategory = input(0);
  highlightQuery = input<string>('');

  toggleBookmark = output<string>();
  toggleRevealed = output<string>();
  noteChange = output<{ id: string; note: string }>();
  markViewed = output<string>();
  openDeepDiveModal = output<string>();

  openNotes = linkedSignal<string | null, string | null>({
    source: () => this.question().id,
    computation: () => null,
  });

  readonly hasDeepDive = computed(() => Boolean(this.question().deepDive?.trim()));
  readonly isBookmarked = computed(() => this.bookmarks().has(this.question().id));
  readonly isRevealed = computed(() => this.revealedCards().has(this.question().id));
  readonly showAnswer = computed(() => !this.flashcardMode() || this.isRevealed());
  readonly isHidden = computed(() => this.flashcardMode() && !this.isRevealed());

  noteText = computed(() => this.notes()[this.question().id] ?? '');
  hasNote = computed(() => Boolean(this.noteText().trim()));

  constructor() {
    effect(() => {
      const id = this.question().id;
      this.markViewed.emit(id);
    });
  }

  onToggleBookmark(): void { this.toggleBookmark.emit(this.question().id); }
  onReveal(): void { this.toggleRevealed.emit(this.question().id); }

  toggleNotes(): void {
    const id = this.question().id;
    this.openNotes.update(v => v === id ? null : id);
  }

  onNoteChange(note: string): void {
    this.noteChange.emit({ id: this.question().id, note });
  }
}