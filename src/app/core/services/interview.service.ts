import { Injectable, signal, computed, effect } from '@angular/core';
import { interviewCategories } from '../../features/interview/data';
import type { InterviewCategory, InterviewQuestion, InterviewSection } from '../models/interview.models';
import { localStorageSignal, setLocalStorage } from './local-storage.service';

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h ^= h >>> 16;
    h = Math.imul(h, 2246822507);
    h ^= h >>> 13;
    h = Math.imul(h, 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function getDailySeed(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function formatTime(s: number): string {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private readonly _activeCategory = signal('rh');
  private readonly _searchQuery = signal('');
  private readonly _flashcardMode = signal(false);
  private readonly _showBookmarksOnly = signal(false);
  private readonly _showDailyChallenge = signal(false);
  private readonly _showMockInterview = signal(false);
  private readonly _mockInterviewIdx = signal(0);
  private readonly _mockTimer = signal(0);
  private readonly _mockRunning = signal(false);
  private readonly _shuffledIds = localStorageSignal<string[]>('shuffled-ids', []);
  private readonly _revealedCards = localStorageSignal<Set<string>>('revealed-cards', new Set());
  private readonly _bookmarks = localStorageSignal<Set<string>>('bookmarks', new Set());
  private readonly _viewedQuestions = localStorageSignal<Set<string>>('viewed', new Set());
  private readonly _notes = localStorageSignal<Record<string, string>>('notes', {});

  readonly activeCategory = this._activeCategory.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly flashcardMode = this._flashcardMode.asReadonly();
  readonly showBookmarksOnly = this._showBookmarksOnly.asReadonly();
  readonly showDailyChallenge = this._showDailyChallenge.asReadonly();
  readonly showMockInterview = this._showMockInterview.asReadonly();
  readonly mockInterviewIdx = this._mockInterviewIdx.asReadonly();
  readonly mockTimer = this._mockTimer.asReadonly();
  readonly mockRunning = this._mockRunning.asReadonly();
  readonly revealedCards = this._revealedCards.asReadonly();
  readonly bookmarks = this._bookmarks.asReadonly();
  readonly viewedQuestions = this._viewedQuestions.asReadonly();
  readonly notes = this._notes.asReadonly();

  readonly category = computed(() =>
    interviewCategories.find(c => c.id === this._activeCategory()) ?? interviewCategories[0]
  );

  readonly allQuestionsFlat = computed<{ category: InterviewCategory; question: InterviewQuestion }[]>(() => {
    const qs: { category: InterviewCategory; question: InterviewQuestion }[] = [];
    for (const cat of interviewCategories) {
      for (const sec of cat.sections) {
        for (const q of sec.questions) {
          qs.push({ category: cat, question: q });
        }
      }
    }
    return qs;
  });

  readonly searchResults = computed(() => {
    const q = this._searchQuery().toLowerCase().trim();
    if (!q) return null;
    return this.allQuestionsFlat().filter(
      ({ question }) =>
        question.question.toLowerCase().includes(q) ||
        question.answer.toLowerCase().includes(q) ||
        (question.code?.toLowerCase().includes(q) ?? false)
    );
  });

  readonly dailyQuestions = computed(() => {
    const rng = seededRandom(getDailySeed());
    return [...this.allQuestionsFlat()].sort(() => rng() - 0.5).slice(0, 5);
  });

  readonly mockQuestions = computed(() => {
    const catQuestions = this.allQuestionsFlat().filter(({ category: c }) => c.id === this._activeCategory());
    const rng = seededRandom('mock-' + this._activeCategory());
    return [...catQuestions].sort(() => rng() - 0.5);
  });

  readonly bookmarkCount = computed(() => this._bookmarks().size);

  readonly categoryProgress = computed(() => {
    const cat = this.category();
    const total = cat.sections.reduce((a, s) => a + s.questions.length, 0);
    const viewed = cat.sections.reduce(
      (a, s) => a + s.questions.filter(q => this._viewedQuestions().has(q.id)).length,
      0
    );
    return { total, viewed, percent: total > 0 ? Math.round((viewed / total) * 100) : 0 };
  });

  constructor() {
    effect(() => setLocalStorage('revealed-cards', Array.from(this._revealedCards())));
    effect(() => setLocalStorage('bookmarks', Array.from(this._bookmarks())));
    effect(() => setLocalStorage('viewed', Array.from(this._viewedQuestions())));
    effect(() => setLocalStorage('notes', this._notes()));
    effect(() => setLocalStorage('shuffled-ids', this._shuffledIds()));
    let timerId: ReturnType<typeof setInterval> | undefined;
    effect(() => {
      if (this._mockRunning()) {
        timerId = setInterval(() => this._mockTimer.update(t => t + 1), 1000);
      } else {
        if (timerId !== undefined) {
          clearInterval(timerId);
          timerId = undefined;
        }
      }
    });
  }

  setCategory(id: string): void {
    this._activeCategory.set(id);
    this._shuffledIds.set([]);
  }

  setSearchQuery(q: string): void { this._searchQuery.set(q); }
  setFlashcardMode(v: boolean): void { this._flashcardMode.set(v); }
  setShowBookmarksOnly(v: boolean): void { this._showBookmarksOnly.set(v); }
  setShowDailyChallenge(v: boolean): void { this._showDailyChallenge.set(v); }
  setShowMockInterview(v: boolean): void { this._showMockInterview.set(v); }
  setMockInterviewIdx(i: number): void { this._mockInterviewIdx.set(i); }
  setMockTimer(v: number): void { this._mockTimer.set(v); }
  setMockRunning(v: boolean): void { this._mockRunning.set(v); }

  toggleBookmark(id: string): void {
    const next = new Set(this._bookmarks());
    if (next.has(id)) next.delete(id); else next.add(id);
    this._bookmarks.set(next);
  }

  toggleRevealedCard(id: string): void {
    const next = new Set(this._revealedCards());
    next.add(id);
    this._revealedCards.set(next);
  }

  resetRevealedCards(): void {
    this._revealedCards.set(new Set());
  }

  updateNote(id: string, note: string): void {
    this._notes.set({ ...this._notes(), [id]: note });
  }

  markViewed(id: string): void {
    const next = new Set(this._viewedQuestions());
    next.add(id);
    this._viewedQuestions.set(next);
  }

  shuffleCurrentCategory(): void {
    const ids = this.category().sections.flatMap(s => s.questions.map(q => q.id));
    this._shuffledIds.set([...ids].sort(() => Math.random() - 0.5));
  }

  getOrderedQuestions(section: InterviewSection): InterviewQuestion[] {
    const ids = this._shuffledIds();
    if (!ids?.length) return section.questions;
    return [...section.questions].sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  }

  toggleMockInterview(): void {
    this._showMockInterview.update(v => !v);
    this._showDailyChallenge.set(false);
    this.setMockInterviewIdx(0);
    this.setMockTimer(0);
    this.setMockRunning(false);
    this.resetRevealedCards();
  }

  toggleDailyChallenge(): void {
    this._showDailyChallenge.update(v => !v);
    this._showMockInterview.set(false);
  }

  readonly formatTime = formatTime;

  startTimer(): void { this._mockRunning.set(true); }
  stopTimer(): void { this._mockRunning.set(false); }

  toggleTimer(): void {
    this._mockRunning.update(v => !v);
  }

  toggleTheme(): void {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}