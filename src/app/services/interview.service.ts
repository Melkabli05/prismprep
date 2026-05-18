import { Injectable, signal, computed, effect } from '@angular/core';
import { interviewCategories } from '../data/interview-categories';
import { type InterviewCategory, type InterviewQuestion, type InterviewSection } from '../models/interview.models';
import { localStorageSignal, setLocalStorage } from './local-storage.service';

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function getDailySeed(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

@Injectable({ providedIn: 'root' })
export class InterviewService {
  // ── Raw state signals ───────────────────────────────────────
  activeCategory = signal('rh');
  searchQuery = signal('');
  flashcardMode = signal(false);
  showBookmarksOnly = signal(false);
  showDailyChallenge = signal(false);
  showMockInterview = signal(false);
  mockInterviewIdx = signal(0);
  mockTimer = signal(0);
  mockRunning = signal(false);
  shuffledIds = localStorageSignal<string[]>('shuffled-ids', null);

  // Persisted sets
  revealedCards = localStorageSignal<Set<string>>('revealed-cards', new Set());
  bookmarks = localStorageSignal<Set<string>>('bookmarks', new Set());
  viewedQuestions = localStorageSignal<Set<string>>('viewed', new Set());

  // Persisted notes
  notes = localStorageSignal<Record<string, string>>('notes', {});

  // ── Derived state ──────────────────────────────────────────
  category = computed(() =>
    interviewCategories.find(c => c.id === this.activeCategory()) ?? interviewCategories[0]
  );

  allQuestionsFlat = computed<{ category: InterviewCategory; question: InterviewQuestion }[]>(() => {
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

  searchResults = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return null;
    return this.allQuestionsFlat().filter(
      ({ question }) =>
        question.question.toLowerCase().includes(q) ||
        question.answer.toLowerCase().includes(q) ||
        (question.code?.toLowerCase().includes(q) ?? false)
    );
  });

  dailyQuestions = computed(() => {
    const rng = seededRandom(getDailySeed());
    return [...this.allQuestionsFlat()].sort(() => rng() - 0.5).slice(0, 5);
  });

  mockQuestions = computed(() => {
    const catQuestions = this.allQuestionsFlat().filter(({ category: c }) => c.id === this.activeCategory());
    const rng = seededRandom('mock-' + this.activeCategory());
    return [...catQuestions].sort(() => rng() - 0.5);
  });

  bookmarkCount = computed(() => this.bookmarks().size);

  categoryProgress = computed(() => {
    const cat = this.category();
    const total = cat.sections.reduce((a, s) => a + s.questions.length, 0);
    const viewed = cat.sections.reduce(
      (a, s) => a + s.questions.filter(q => this.viewedQuestions().has(q.id)).length,
      0
    );
    return { total, viewed, percent: total > 0 ? Math.round((viewed / total) * 100) : 0 };
  });

  // ── Persistence effects ─────────────────────────────────────
  constructor() {
    effect(() => setLocalStorage('revealed-cards', Array.from(this.revealedCards())));
    effect(() => setLocalStorage('bookmarks', Array.from(this.bookmarks())));
    effect(() => setLocalStorage('viewed', Array.from(this.viewedQuestions())));
    effect(() => setLocalStorage('notes', this.notes()));
    effect(() => setLocalStorage('shuffled-ids', this.shuffledIds()));
  }

  // ── Actions ────────────────────────────────────────────────
  setCategory(id: string): void {
    this.activeCategory.set(id);
    this.shuffledIds.set(null);
  }

  toggleBookmark(id: string): void {
    const next = new Set(this.bookmarks());
    if (next.has(id)) next.delete(id); else next.add(id);
    this.bookmarks.set(next);
  }

  toggleRevealedCard(id: string): void {
    const next = new Set(this.revealedCards());
    next.add(id);
    this.revealedCards.set(next);
  }

  resetRevealedCards(): void {
    this.revealedCards.set(new Set());
  }

  updateNote(id: string, note: string): void {
    this.notes.set({ ...this.notes(), [id]: note });
  }

  markViewed(id: string): void {
    const next = new Set(this.viewedQuestions());
    next.add(id);
    this.viewedQuestions.set(next);
  }

  shuffleCurrentCategory(): void {
    const ids = this.category().sections.flatMap(s => s.questions.map(q => q.id));
    const shuffled = [...ids].sort(() => Math.random() - 0.5);
    this.shuffledIds.set(shuffled);
  }

  getOrderedQuestions(section: InterviewSection): InterviewQuestion[] {
    const ids = this.shuffledIds();
    if (!ids) return section.questions;
    return [...section.questions].sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  }

  toggleMockInterview(): void {
    this.showMockInterview.update(v => !v);
    this.showDailyChallenge.set(false);
    this.mockInterviewIdx.set(0);
    this.mockTimer.set(0);
    this.mockRunning.set(false);
    this.resetRevealedCards();
  }

  toggleDailyChallenge(): void {
    this.showDailyChallenge.update(v => !v);
    this.showMockInterview.set(false);
  }

  formatTime(s: number): string {
    return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  }
}
