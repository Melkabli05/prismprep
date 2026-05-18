import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngular, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-angular';
import { HeaderComponent } from './components/header.component';
import { ToolbarComponent } from './components/toolbar.component';
import { CategoryPillsComponent } from './components/category-pills.component';
import { QuestionCardComponent } from './components/question-card.component';
import { InterviewService } from './services/interview.service';
import { interviewCategories } from './data/interview-categories';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    LucideAngular,
    HeaderComponent,
    ToolbarComponent,
    CategoryPillsComponent,
    QuestionCardComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly CheckCircle2 = CheckCircle2;

  readonly activeCategory = this.svc.activeCategory;
  readonly searchQuery = this.svc.searchQuery;
  readonly flashcardMode = this.svc.flashcardMode;
  readonly showBookmarksOnly = this.svc.showBookmarksOnly;
  readonly showDailyChallenge = this.svc.showDailyChallenge;
  readonly showMockInterview = this.svc.showMockInterview;
  readonly mockInterviewIdx = this.svc.mockInterviewIdx;
  readonly mockTimer = this.svc.mockTimer;
  readonly mockRunning = this.svc.mockRunning;
  readonly bookmarkCount = this.svc.bookmarkCount;
  readonly category = this.svc.category;
  readonly categoryProgress = this.svc.categoryProgress;
  readonly searchResults = this.svc.searchResults;
  readonly dailyQuestions = this.svc.dailyQuestions;
  readonly mockQuestions = this.svc.mockQuestions;
  readonly revealedCards = this.svc.revealedCards;
  readonly bookmarks = this.svc.bookmarks;
  readonly notes = this.svc.notes;

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(readonly svc: InterviewService) {
    effect(() => {
      if (this.svc.mockRunning()) {
        this.timerInterval = setInterval(() => {
          this.svc.mockTimer.update(t => t + 1);
        }, 1000);
      } else if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeydown.bind(this));
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  private handleKeydown(e: KeyboardEvent): void {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('search-input')?.focus();
    }
    if (e.key === 'Escape') {
      this.svc.searchQuery.set('');
      this.svc.showDailyChallenge.set(false);
      this.svc.showMockInterview.set(false);
      (document.activeElement as HTMLElement)?.blur();
    }
    if (!e.metaKey && !e.ctrlKey && !e.altKey && document.activeElement?.id !== 'search-input') {
      const idx = interviewCategories.findIndex(c => c.id === this.svc.activeCategory());
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        this.svc.setCategory(interviewCategories[idx - 1].id);
      }
      if (e.key === 'ArrowRight' && idx < interviewCategories.length - 1) {
        e.preventDefault();
        this.svc.setCategory(interviewCategories[idx + 1].id);
      }
    }
  }

  onSearchChange(q: string): void { this.svc.searchQuery.set(q); }

  onToggleTheme(): void {
    const html = document.documentElement;
    const current = html.dataset['theme'];
    html.dataset['theme'] = current === 'dark' ? 'light' : 'dark';
  }

  onFlashcardModeChange(v: boolean): void {
    this.svc.flashcardMode.set(v);
    if (v) this.svc.resetRevealedCards();
  }

  onBookmarksOnlyChange(v: boolean): void { this.svc.showBookmarksOnly.set(v); }
  onShuffle(): void { this.svc.shuffleCurrentCategory(); }
  onDailyChallenge(): void { this.svc.toggleDailyChallenge(); }
  onMockInterview(): void { this.svc.toggleMockInterview(); }
  onCategoryChange(id: string): void { this.svc.setCategory(id); }
  onToggleBookmark(id: string): void { this.svc.toggleBookmark(id); }
  onToggleRevealed(id: string): void { this.svc.toggleRevealedCard(id); }
  onNoteChange(event: { id: string; note: string }): void { this.svc.updateNote(event.id, event.note); }
  onMarkViewed(id: string): void { this.svc.markViewed(id); }

  prevMock(): void { this.svc.mockInterviewIdx.update(i => Math.max(0, i - 1)); this.svc.resetRevealedCards(); }
  nextMock(): void { this.svc.mockInterviewIdx.update(i => i + 1); this.svc.resetRevealedCards(); }
  finishMock(): void { this.svc.showMockInterview.set(false); this.svc.mockRunning.set(false); this.svc.mockTimer.set(0); }

  get isSearching(): boolean { return this.svc.searchQuery().trim().length > 0; }
  get totalQuestions(): number { return this.svc.allQuestionsFlat().length; }
  get categoryCount(): number { return interviewCategories.length; }
  todayDate(): string { return new Date().toLocaleDateString('fr-FR'); }
  formatTime(s: number): string { return this.svc.formatTime(s); }
  getOrderedQuestions(section: any): any[] { return this.svc.getOrderedQuestions(section); }
}