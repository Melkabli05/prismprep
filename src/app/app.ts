import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
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
    LucideAngularModule,
    HeaderComponent,
    ToolbarComponent,
    CategoryPillsComponent,
    QuestionCardComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  get activeCategory() { return this.svc.activeCategory; }
  get searchQuery() { return this.svc.searchQuery; }
  get flashcardMode() { return this.svc.flashcardMode; }
  get showBookmarksOnly() { return this.svc.showBookmarksOnly; }
  get showDailyChallenge() { return this.svc.showDailyChallenge; }
  get showMockInterview() { return this.svc.showMockInterview; }
  get mockInterviewIdx() { return this.svc.mockInterviewIdx; }
  get mockTimer() { return this.svc.mockTimer; }
  get mockRunning() { return this.svc.mockRunning; }
  get bookmarkCount() { return this.svc.bookmarkCount; }
  get category() { return this.svc.category; }
  get categoryProgress() { return this.svc.categoryProgress; }
  get searchResults() { return this.svc.searchResults; }
  get dailyQuestions() { return this.svc.dailyQuestions; }
  get mockQuestions() { return this.svc.mockQuestions; }
  get revealedCards() { return this.svc.revealedCards; }
  get bookmarks() { return this.svc.bookmarks; }
  get notes() { return this.svc.notes; }

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  private svc: InterviewService;

  constructor(svc: InterviewService) {
    this.svc = svc;
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

  getFilteredQuestions(section: any): any[] {
    const questions = this.getOrderedQuestions(section);
    return this.showBookmarksOnly() ? questions.filter((q: any) => this.bookmarks().has(q.id)) : questions;
  }
}