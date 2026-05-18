import { Component, input, output, computed, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularComponent as LucideAngular, Star, Eye, EyeOff, StickyNote, Lightbulb } from 'lucide-angular';
import { type InterviewQuestion } from '../models/interview.models';
import { CodeBlockComponent } from './code-block.component';

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Component({
  selector: 'app-question-card',
  imports: [FormsModule, LucideAngular, CodeBlockComponent],
  template: `
    <div class="group border rounded-xl transition-all duration-200"
         [class.cursor-pointer]="flashcardMode() && !isRevealed()"
         [class.hover:shadow-md]="flashcardMode() && !isRevealed()"
         [class.hover:border-primary/30]="flashcardMode() && !isRevealed()"
         [class.shadow-sm]="!flashcardMode() || isRevealed()"
         [class.hover:shadow-md]="!flashcardMode() || isRevealed()"
         [class.border-base-200]="!isRevealed() && flashcardMode()"
         [class.border-base-300]="!flashcardMode()"
         [class.bg-base-100]="true">

      <!-- Question header -->
      <div class="px-5 sm:px-7 pt-5 sm:pt-6 pb-0">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            @if (indexInCategory() > 0 && totalInCategory() > 0) {
              <span class="text-[11px] text-base-content/40 mb-1.5 block font-medium tabular-nums">
                {{ indexInCategory() }}/{{ totalInCategory() }}
              </span>
            }
            <p class="text-[16px] font-semibold leading-relaxed tracking-tight text-base-content">
              <span [innerHTML]="parseInline(question().question)"></span>
            </p>
          </div>
          <button (click)="onToggleBookmark()"
                  class="p-1.5 rounded-lg transition-all duration-200 shrink-0"
                  [class.text-amber-500]="isBookmarked()"
                  [class.hover:text-amber-600]="isBookmarked()"
                  [class.hover:bg-amber-50]="isBookmarked()"
                  [class.text-base-content/30]="!isBookmarked()"
                  [class.hover:text-base-content/60]="!isBookmarked()"
                  [class.hover:bg-base-200]="!isBookmarked()">
            <lucide-icon name="star" class="h-4 w-4"
                         [class.fill-current]="isBookmarked()"
                         [class.scale-110]="isBookmarked()"></lucide-icon>
          </button>
        </div>

        @if (categoryName()) {
          <span class="inline-block mt-2.5 mb-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                [class]="categoryColor()">
            {{ categoryName() }}
          </span>
        }
      </div>

      <!-- Answer section -->
      <div class="px-5 sm:px-7 pt-4 pb-5 sm:pb-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-px flex-1 bg-gradient-to-r from-base-300/60 via-base-base/30 to-transparent"></div>
        </div>

        @if (isHidden()) {
          <div class="mt-5 flex flex-col items-center gap-2 py-8 px-6 rounded-xl bg-base-200/20 border border-dashed border-base-content/10">
            <div class="flex items-center gap-2 text-base-content/40">
              <lucide-icon name="eye-off" class="h-4 w-4"></lucide-icon>
              <span class="text-sm font-medium">Réponse masquée</span>
            </div>
            <p class="text-xs text-base-content/30">Cliquez sur la carte pour révéler</p>
          </div>
        } @else {
          <div class="space-y-4">
            @for (para of answerParagraphs(); track $index) {
              <p class="leading-[1.8] text-[15.5px]"
                 [class.text-base-content/90]="$first"
                 [class.text-base-content/80]="!$first">
                <span [innerHTML]="highlightText(para)"></span>
              </p>
            }
          </div>
        }

        @if (showAnswer() && question().code) {
          <app-code-block [code]="question().code!" [language]="question().language"></app-code-block>
        }

        @if (showAnswer() && question().example && !question().code) {
          <div class="mt-6 rounded-xl bg-primary/[0.04] p-4 border border-primary/10">
            <div class="flex items-center gap-1.5 mb-2">
              <lucide-icon name="lightbulb" class="h-3.5 w-3.5 text-primary/60"></lucide-icon>
              <span class="text-[11px] font-semibold text-primary/60 uppercase tracking-wider">Exemple</span>
            </div>
            <p class="text-[14.5px] leading-[1.75] text-base-content/70">
              <span [innerHTML]="highlightText(question().example!)"></span>
            </p>
          </div>
        }

        @if (openNotes() === question().id) {
          <div class="mt-5">
            <textarea
              [value]="noteText()"
              (input)="onNoteChange($event)"
              placeholder="Ajoutez vos notes personnelles..."
              class="textarea textarea-bordered text-sm min-h-[80px] w-full border-dashed"></textarea>
          </div>
        }
      </div>

      <!-- Action bar -->
      <div class="flex items-center gap-1 px-5 sm:px-7 py-3 border-t border-base-300/40 bg-base-200/[0.15] rounded-b-xl">
        <button (click)="toggleNotes()"
                class="btn btn-ghost btn-sm h-7 px-2.5 text-xs text-base-content/60 hover:text-base-content">
          <lucide-icon name="sticky-note" class="h-3.5 w-3.5 mr-1"></lucide-icon>
          Note{{ hasNote() ? ' ✓' : '' }}
        </button>

        @if (flashcardMode() && !isRevealed()) {
          <button (click)="onReveal()"
                  class="btn btn-outline btn-sm h-7 px-3 text-xs ml-auto">
            <lucide-icon name="eye" class="h-3.5 w-3.5 mr-1"></lucide-icon>
            Révéler
          </button>
        }
      </div>
    </div>
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

  // Outputs
  toggleBookmark = output<string>();
  toggleRevealed = output<string>();
  noteChange = output<{ id: string; note: string }>();
  markViewed = output<string>();

  openNotes = signal<string | null>(null);

  get isBookmarked(): boolean { return this.bookmarks().has(this.question().id); }
  get isRevealed(): boolean { return this.revealedCards().has(this.question().id); }
  get showAnswer(): boolean { return !this.flashcardMode() || this.isRevealed; }
  get isHidden(): boolean { return this.flashcardMode() && !this.isRevealed; }

  get answerParagraphs(): string[] {
    return this.question().answer.split(/\n\n|\n/).filter(p => p.trim().length > 0);
  }

  noteText = computed(() => this.notes()[this.question().id] ?? '');
  hasNote = computed(() => Boolean(this.noteText().trim()));

  onToggleBookmark(): void { this.toggleBookmark.emit(this.question().id); }
  onReveal(): void { this.toggleRevealed.emit(this.question().id); }
  emitMarkViewed(): void { this.markViewed.emit(this.question().id); }

  ngOnInit(): void { this.emitMarkViewed(); }

  toggleNotes(): void {
    const id = this.question().id;
    this.openNotes.update(v => v === id ? null : id);
  }

  onNoteChange(event: Event): void {
    const note = (event.target as HTMLTextAreaElement).value;
    this.noteChange.emit({ id: this.question().id, note });
  }

  parseInline(text: string): string {
    let result = text;
    result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    result = result.replace(/\*(.+?)\*/g, '<em class="italic bg-primary/[0.07] px-1 rounded-sm">$1</em>');
    result = result.replace(/__(.+?)__/g, '<u class="underline decoration-primary/50 decoration-2 underline-offset-4">$1</u>');
    result = result.replace(/`([^`]+)`/g, '<code class="inline-flex items-center bg-base-200 px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-base-300">$1</code>');
    return result;
  }

  highlightText(text: string): string {
    const query = this.highlightQuery();
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
