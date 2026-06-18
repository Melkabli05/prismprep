import { Service, signal, computed, effect, inject, linkedSignal } from '@angular/core';
import type { InterviewCategory, InterviewQuestion, InterviewSection } from '@core/models/interview.models';
import { localStorageSignal, setLocalStorage } from '@core/services/local-storage.service';
import { QuestionsService } from '../data/questions.service';
import { UserState } from './user-state';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => { h ^= h >>> 16; h = Math.imul(h, 2246822507); h ^= h >>> 13; h = Math.imul(h, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
function getDailySeed(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }
function formatTime(s: number): string { return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`; }

@Service()
export class Interview {
  readonly questions = inject(QuestionsService);
  readonly userState = inject(UserState);
  private auth = inject(AuthService);
  private theme = inject(ThemeService);

  readonly categoryTree = computed(() => this.questions.categoryTree());

  /** Sorts categories: user's selected stack first (high priority), then all others. Never hides anything. */
  readonly activeCategories = computed(() => {
    const cats = this.categoryTree();
    const userStack = this.auth.stack();
    if (!userStack.length) return cats;
    const selected = cats.filter(c => userStack.includes(c.id));
    const rest = cats.filter(c => !userStack.includes(c.id));
    return [...selected, ...rest];
  });

  /** linkedSignal — auto-resets to first category when tree loads, preserves selection if still valid */
  private readonly _activeCategory = linkedSignal({
    source: () => this.categoryTree(),
    computation: (cats: InterviewCategory[], previous: { value: string } | undefined) => {
      const prev = previous?.value ?? 'rh';
      return cats.find(c => c.id === prev)?.id ?? cats[0]?.id ?? prev;
    },
  });

  private readonly _searchQuery = signal('');
  private readonly _flashcardMode = signal(false);
  private readonly _showBookmarksOnly = signal(false);
  private readonly _showDailyChallenge = signal(false);
  private readonly _showMockInterview = signal(false);
  private readonly _mockInterviewIdx = signal(0);
  private readonly _mockTimer = signal(0);
  private readonly _mockRunning = signal(false);
  private readonly _shuffledIds = localStorageSignal<string[]>('shuffled-ids', []);

  readonly activeCategory = this._activeCategory.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly flashcardMode = this._flashcardMode.asReadonly();
  readonly showBookmarksOnly = this._showBookmarksOnly.asReadonly();
  readonly showDailyChallenge = this._showDailyChallenge.asReadonly();
  readonly showMockInterview = this._showMockInterview.asReadonly();
  readonly mockInterviewIdx = this._mockInterviewIdx.asReadonly();
  readonly mockTimer = this._mockTimer.asReadonly();
  readonly mockRunning = this._mockRunning.asReadonly();
  readonly formatTime = formatTime;
  readonly loaded = this.questions.loaded;

  readonly bookmarks = this.userState.bookmarks;
  readonly notes = this.userState.notes;
  readonly revealedCards = this.userState.revealed;
  readonly viewedQuestions = this.userState.viewed;
  readonly bookmarkCount = computed(() => this.userState.bookmarks().size);

  readonly category = computed(() => {
    const cats = this.activeCategories();
    return cats.find(c => c.id === this._activeCategory()) ?? cats[0] ?? { id: 'rh', title: 'Entretien RH', color: '', description: '', sections: [] };
  });

  readonly allQuestionsFlat = computed<{ category: InterviewCategory; question: InterviewQuestion }[]>(() => {
    const result: { category: InterviewCategory; question: InterviewQuestion }[] = [];
    for (const cat of this.activeCategories()) for (const sec of cat.sections) for (const q of sec.questions) result.push({ category: cat, question: q });
    return result;
  });

  readonly searchResults = computed(() => {
    const q = this._searchQuery().toLowerCase().trim();
    if (!q || q.length < 2) return null;
    return this.allQuestionsFlat().filter(({ question }) =>
      question.question.toLowerCase().includes(q));
  });

  readonly dailyQuestions = computed(() => { const rng = seededRandom(getDailySeed()); return [...this.allQuestionsFlat()].sort(() => rng() - 0.5).slice(0, 5); });
  readonly mockQuestions = computed(() => { const rng = seededRandom('mock-' + this._activeCategory()); return [...this.allQuestionsFlat().filter(({ category: c }) => c.id === this._activeCategory())].sort(() => rng() - 0.5); });

  readonly categoryProgress = computed(() => {
    const cat = this.category();
    const total = cat.sections.reduce((a, s) => a + s.questions.length, 0);
    const viewed = cat.sections.reduce((a, s) => a + s.questions.filter(q => this.userState.viewed().has(q.id)).length, 0);
    return { total, viewed, percent: total > 0 ? Math.round((viewed / total) * 100) : 0 };
  });

  /** Template helpers — expose so the dumb shell can call them directly */
  readonly isSearching = computed(() => this._searchQuery().trim().length > 0);
  readonly totalQuestions = computed(() => this.allQuestionsFlat().length);
  readonly categoryCount = computed(() => this.activeCategories().length);

  getOrderedQuestions(section: InterviewSection): InterviewQuestion[] {
    const ids = this._shuffledIds();
    if (!ids.length) return section.questions;
    return [...section.questions].sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  }

  getFilteredQuestions(section: InterviewSection): InterviewQuestion[] {
    const questions = this.getOrderedQuestions(section);
    return this._showBookmarksOnly() ? questions.filter(q => this.userState.bookmarks().has(q.id)) : questions;
  }

  toQuestionList(questions: InterviewQuestion[]) {
    return questions.map(q => ({ category: this.category(), question: q }));
  }

  onFlashcardModeChange(v: boolean): void { this.setFlashcardMode(v); }
  prevMock(): void { this.setMockInterviewIdx(Math.max(0, this._mockInterviewIdx() - 1)); this.resetRevealedCards(); }
  nextMock(): void { this.setMockInterviewIdx(this._mockInterviewIdx() + 1); this.resetRevealedCards(); }
  finishMock(): void { this.setShowMockInterview(false); this.setMockRunning(false); this.setMockTimer(0); }

  init(): void {
    this.questions.init();
  }

  async initRemoteState(): Promise<void> {
    if (!this.auth.uid || !this.questions.loaded()) return;
    await this.userState.loadRemote();
  }

  setCategory(id: string): void { this._activeCategory.set(id); this._shuffledIds.set([]); }
  setSearchQuery(q: string): void { this._searchQuery.set(q); }
  setFlashcardMode(v: boolean): void { this._flashcardMode.set(v); if (v) this.userState.resetRevealed(); }
  setShowBookmarksOnly(v: boolean): void { this._showBookmarksOnly.set(v); }
  setShowDailyChallenge(v: boolean): void { this._showDailyChallenge.set(v); this._showMockInterview.set(false); }
  setShowMockInterview(v: boolean): void { this._showMockInterview.set(v); this._showDailyChallenge.set(false); this.setMockInterviewIdx(0); this.setMockTimer(0); this.setMockRunning(false); this.userState.resetRevealed(); }
  setMockInterviewIdx(i: number): void { this._mockInterviewIdx.set(i); }
  setMockTimer(v: number): void { this._mockTimer.set(v); }
  setMockRunning(v: boolean): void { this._mockRunning.set(v); }

  toggleBookmark(id: string): void { this.userState.toggleBookmark(id); }
  toggleRevealedCard(id: string): void { this.userState.toggleRevealed(id); }
  resetRevealedCards(): void { this.userState.resetRevealed(); }
  updateNote(id: string, note: string): void { this.userState.updateNote(id, note); }
  markViewed(id: string): void { this.userState.markViewed(id); }

  shuffleCurrentCategory(): void {
    const ids = this.category().sections.flatMap(s => s.questions.map(q => q.id));
    this._shuffledIds.set([...ids].sort(() => Math.random() - 0.5));
  }

  toggleMockInterview(): void { this._showMockInterview.update(v => !v); this._showDailyChallenge.set(false); this.setMockInterviewIdx(0); this.setMockTimer(0); this.setMockRunning(false); this.userState.resetRevealed(); }
  toggleDailyChallenge(): void { this._showDailyChallenge.update(v => !v); this._showMockInterview.set(false); }

  startTimer(): void { this._mockRunning.set(true); }
  stopTimer(): void { this._mockRunning.set(false); }
  toggleTimer(): void { this._mockRunning.update(v => !v); }

  toggleTheme(): void { this.theme.toggle(); }

  constructor() {
    effect(() => setLocalStorage('shuffled-ids', this._shuffledIds()));
    let intervalId: ReturnType<typeof setInterval> | undefined;
    effect(() => {
      const running = this._mockRunning();
      if (running) {
        intervalId = setInterval(() => this._mockTimer.update(t => t + 1), 1000);
      } else {
        if (intervalId !== undefined) { clearInterval(intervalId); intervalId = undefined; }
        this._mockTimer.set(0);
      }
    });
  }
}
