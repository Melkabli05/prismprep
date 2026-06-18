# Architecture Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 7 architecture violations identified in the 2026-06-18 audit (against the "Enterprise-Grade Angular Architecture" guide) without changing any user-visible behavior.

**Architecture:** Move interview-specific business logic (`InterviewService`, `QuestionsService`, `UserStateService`) and interview-specific UI (`auth-modal`, `user-preferences`, `deep-dive-modal`, `flashcard-reveal`, `note-editor`) out of `core/` and `shared/` into `features/interview/{state,data,components}`. Introduce a single shared Supabase client behind one injectable so the raw SDK stops being threaded through method parameters. Delete dead code, fix `package.json` dependency classification, and enforce the resulting dependency rule with `eslint-plugin-boundaries` so it can't silently regress.

**Tech Stack:** Angular 21 (standalone, signals, OnPush), `@supabase/supabase-js`, `eslint-plugin-boundaries`, `@angular-eslint/schematics`, Vitest, Playwright (manual smoke check only).

## Global Constraints

- No behavior change. Every fix is a structural move or a mechanical simplification that preserves existing runtime behavior exactly.
- Do not rename `.service.ts`/`.component.ts` file suffixes — the codebase already uses that convention consistently; this plan doesn't touch naming conventions.
- Do not move `core/models/interview.models.ts` or introduce path aliases (`@core/*` etc.) — out of scope; not part of the 7 identified violations, and both would touch 25+ unrelated files for no behavioral gain. Mention as optional follow-up only.
- Keep `features/interview/components/` as the folder name for interview UI (do not rename to `ui/`) — matches the existing convention already used by `header/`, `toolbar/`, `question-card/`, etc.
- After every task: run `npx ng build --configuration development` from `/home/mohammed/Desktop/dev/prismprep` and confirm it succeeds before committing.

---

### Task 1: Single shared Supabase client

**Files:**
- Create: `src/app/core/services/supabase-client.service.ts`
- Modify: `src/app/core/services/auth.service.ts`

**Interfaces:**
- Produces: `SupabaseClientService` with `readonly client: SupabaseClient` (eagerly constructed, always non-null — no SSR in this app, confirmed via `angular.json`/no `server.ts`).
- Consumes (next tasks rely on this): inject `SupabaseClientService` and read `.client` instead of calling `createClient()` yourself.

- [ ] **Step 1: Create the shared client service**

```ts
// src/app/core/services/supabase-client.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseClientService {
  readonly client: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}
```

- [ ] **Step 2: Rewrite `auth.service.ts` to use it**

Replace the full file content of `src/app/core/services/auth.service.ts` with:

```ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseClientService);
  private get client() { return this.supabase.client; }

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  readonly stack = computed(() => {
    const meta = this._user()?.user_metadata;
    return Array.isArray(meta?.['stack']) ? meta['stack'] as string[] : [];
  });

  /** Exposes theme preference from backend for ThemeService consumption */
  readonly theme = computed(() => {
    const meta = this._user()?.user_metadata;
    return (meta?.['theme'] as string) ?? 'system';
  });

  init(): void {
    this.client.auth.getSession().then(({ data }) => {
      this._user.set(data.session?.user ?? null);
      this._loading.set(false);
    });
    this.client.auth.onAuthStateChange((_event, session) => {
      this._user.set(session?.user ?? null);
    });
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    this.cleanQueryParams();
    return { error: error?.message ?? null };
  }

  async signUp(email: string, password: string, name: string): Promise<{ error: string | null }> {
    const { error } = await this.client.auth.signUp({ email, password, options: { data: { name } } });
    this.cleanQueryParams();
    return { error: error?.message ?? null };
  }

  private cleanQueryParams(): void {
    if (window.location.search.includes('ng.')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  async updateProfile(name: string, stack: string[] = []): Promise<{ error: string | null }> {
    const { error } = await this.client.auth.updateUser({ data: { name, stack } });
    return { error: error?.message ?? null };
  }

  async updateTheme(theme: string): Promise<{ error: string | null }> {
    const { error } = await this.client.auth.updateUser({ data: { theme } });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }

  get uid(): string | null { return this._user()?.id ?? null; }
}
```

Note: the `if (!this.client) return { error: 'Client not initialized' }` guards are gone — the client is now a synchronously-available field via DI, not something built lazily inside `init()`. This is a direct, intended consequence of the fix, not scope creep.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: no errors.

Run: `npx ng build --configuration development`
Expected: `Application bundle generation complete.`

- [ ] **Step 4: Commit**

```bash
git add src/app/core/services/supabase-client.service.ts src/app/core/services/auth.service.ts
git commit -m "refactor: introduce single shared Supabase client"
```

---

### Task 2: Move interview state/data services out of `core/`, remove the client-threading

This is one task because `InterviewService`, `QuestionsService`, and `UserStateService` are tightly coupled (`InterviewService` orchestrates both) — splitting them across tasks would leave the build broken between commits.

**Files:**
- Create: `src/app/features/interview/data/questions.service.ts`
- Create: `src/app/features/interview/state/user-state.service.ts`
- Create: `src/app/features/interview/state/interview.service.ts`
- Delete: `src/app/core/services/questions.service.ts`
- Delete: `src/app/core/services/user-state.service.ts`
- Delete: `src/app/core/services/interview.service.ts`
- Modify: `src/app/app.ts`
- Modify: `src/app/features/interview/pages/interview-shell.page.ts`
- Modify: `src/app/features/interview/components/category-pills/category-pills.component.ts`

**Interfaces:**
- Produces: `QuestionsService` (no more `getClient()`, no more `(this as any)` casts — uses typed private fields `sectionRows`/`categoryRows`). `UserStateService` methods (`toggleBookmark(id)`, `toggleRevealed(id)`, `updateNote(id, note)`, `markViewed(id)`, `loadRemote()`) no longer take a `client`/`uid` parameter — they inject `SupabaseClientService` + `AuthService` themselves and no-op the remote sync when there's no signed-in user. `InterviewService` keeps its existing public API (`toggleBookmark`, `toggleRevealedCard`, `updateNote`, `markViewed`, `initRemoteState`, etc.) — only the bodies simplify.
- Consumes: `SupabaseClientService` from Task 1.

- [ ] **Step 1: Create `features/interview/data/questions.service.ts`**

```ts
// src/app/features/interview/data/questions.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import type { InterviewCategory, InterviewSection } from '../../../core/models/interview.models';
import { SupabaseClientService } from '../../../core/services/supabase-client.service';

export interface QuestionRow {
  id: string; section_id: string; category_id: string;
  question: string; answer: string; example: string | null;
  code: string | null; language: string | null; sort_order: number;
  deep_dive: string | null;
}

interface SectionRow { id: string; category_id: string; title: string; sort_order: number; }
interface CategoryRow { id: string; title: string; color: string; description: string; sort_order: number; }

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly _questions = signal<QuestionRow[]>([]);
  private readonly _loaded = signal(false);

  private sectionRows: SectionRow[] = [];
  private categoryRows: CategoryRow[] = [];

  readonly questions = this._questions.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly categoryTree = computed<InterviewCategory[]>(() =>
    this.buildTreeInternal(this._questions())
  );

  init(): void {
    this.load();
  }

  async load(): Promise<void> {
    try {
      const client = this.supabase.client;
      const [questionsRes, sectionsRes, categoriesRes] = await Promise.all([
        client.from('questions').select('id, section_id, category_id, question, answer, example, code, language, sort_order, deep_dive').order('sort_order'),
        client.from('sections').select('id, category_id, title, sort_order').order('sort_order'),
        client.from('categories').select('id, title, color, description, sort_order').order('sort_order'),
      ]);
      if (questionsRes.error) { console.error('[QuestionsService] Questions error:', questionsRes.error); return; }
      this.sectionRows = sectionsRes.data ?? [];
      this.categoryRows = categoriesRes.data ?? [];
      console.log('[QuestionsService] Loaded', questionsRes.data?.length ?? 0, 'questions,', this.sectionRows.length, 'sections,', this.categoryRows.length, 'categories');
      this._questions.set(questionsRes.data ?? []);
      this._loaded.set(true);
    } catch (e) {
      console.error('[QuestionsService] Load exception:', e);
    }
  }

  private buildTreeInternal(questions: QuestionRow[]): InterviewCategory[] {
    const catMap = new Map<string, InterviewCategory>();
    const secMap = new Map<string, InterviewSection>();

    for (const s of this.sectionRows) {
      secMap.set(s.id, { id: s.id, title: s.title, questions: [] });
    }
    for (const c of this.categoryRows) {
      catMap.set(c.id, { id: c.id, title: c.title, color: c.color, description: c.description, sections: [] });
    }

    for (const q of questions) {
      if (!secMap.has(q.section_id)) secMap.set(q.section_id, { id: q.section_id, title: '', questions: [] });
      if (!catMap.has(q.category_id)) catMap.set(q.category_id, { id: q.category_id, title: '', color: '', description: '', sections: [] });
      secMap.get(q.section_id)!.questions.push({
        id: q.id, question: q.question, answer: q.answer,
        example: q.example ?? undefined, code: q.code ?? undefined, language: q.language ?? undefined,
        deepDive: q.deep_dive ?? undefined,
      });
    }

    for (const cat of catMap.values()) {
      cat.sections = Array.from(secMap.values()).filter(sec => {
        const sectionRow = this.sectionRows.find(s => s.id === sec.id);
        return sectionRow && sectionRow.category_id === cat.id;
      });
    }
    return Array.from(catMap.values());
  }
}
```

Delete `src/app/core/services/questions.service.ts`.

- [ ] **Step 2: Create `features/interview/state/user-state.service.ts`**

```ts
// src/app/features/interview/state/user-state.service.ts
import { Injectable, inject } from '@angular/core';
import { localStorageSignal } from '../../../core/services/local-storage.service';
import { SupabaseClientService } from '../../../core/services/supabase-client.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly auth = inject(AuthService);

  readonly bookmarks = localStorageSignal<Set<string>>('bookmarks', new Set());
  readonly notes = localStorageSignal<Record<string, string>>('notes', {});
  readonly revealed = localStorageSignal<Set<string>>('revealed', new Set());
  readonly viewed = localStorageSignal<Set<string>>('viewed', new Set());

  toggleBookmark(id: string): void {
    const next = new Set(this.bookmarks());
    next.has(id) ? next.delete(id) : next.add(id);
    this.bookmarks.set(next);
    this.syncBookmark(id);
  }

  toggleRevealed(id: string): void {
    const next = new Set(this.revealed());
    next.add(id);
    this.revealed.set(next);
    this.syncRevealed(id);
  }

  resetRevealed(): void { this.revealed.set(new Set()); }

  updateNote(id: string, note: string): void {
    this.notes.set({ ...this.notes(), [id]: note });
    this.syncNote(id, note);
  }

  markViewed(id: string): void {
    const next = new Set(this.viewed());
    next.add(id);
    this.viewed.set(next);
    this.syncViewed(id);
  }

  async loadRemote(): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    const client = this.supabase.client;
    const [b, n, r, v] = await Promise.all([
      client.from('user_bookmarks').select('question_id').eq('user_id', uid),
      client.from('user_notes').select('question_id, note').eq('user_id', uid),
      client.from('user_revealed').select('question_id').eq('user_id', uid),
      client.from('user_viewed').select('question_id').eq('user_id', uid),
    ]);
    this.bookmarks.set(new Set([...this.bookmarks(), ...(b.data?.map(x => x.question_id) ?? [])]));
    this.notes.set({ ...this.notes(), ...Object.fromEntries(n.data?.map(x => [x.question_id, x.note]) ?? []) });
    this.revealed.set(new Set([...this.revealed(), ...(r.data?.map(x => x.question_id) ?? [])]));
    this.viewed.set(new Set([...this.viewed(), ...(v.data?.map(x => x.question_id) ?? [])]));
  }

  private async syncBookmark(id: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    const client = this.supabase.client;
    try {
      const { data } = await client.from('user_bookmarks').select('question_id').eq('user_id', uid).eq('question_id', id).maybeSingle();
      if (data) {
        await client.from('user_bookmarks').delete().eq('user_id', uid).eq('question_id', id);
      } else {
        await client.from('user_bookmarks').insert({ user_id: uid, question_id: id });
      }
    } catch (e) {
      console.warn('[UserState] syncBookmark failed:', e);
    }
  }

  private async syncNote(id: string, note: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    try {
      await this.supabase.client.from('user_notes').upsert({ user_id: uid, question_id: id, note, updated_at: new Date().toISOString() });
    } catch (e) {
      console.warn('[UserState] syncNote failed:', e);
    }
  }

  private async syncRevealed(id: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    try {
      await this.supabase.client.from('user_revealed').upsert({ user_id: uid, question_id: id });
    } catch (e) {
      console.warn('[UserState] syncRevealed failed:', e);
    }
  }

  private async syncViewed(id: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    try {
      await this.supabase.client.from('user_viewed').upsert({ user_id: uid, question_id: id });
    } catch (e) {
      console.warn('[UserState] syncViewed failed:', e);
    }
  }
}
```

Delete `src/app/core/services/user-state.service.ts`.

- [ ] **Step 3: Create `features/interview/state/interview.service.ts`**

```ts
// src/app/features/interview/state/interview.service.ts
import { Injectable, signal, computed, effect, inject, linkedSignal } from '@angular/core';
import type { InterviewCategory, InterviewQuestion, InterviewSection } from '../../../core/models/interview.models';
import { localStorageSignal, setLocalStorage } from '../../../core/services/local-storage.service';
import { QuestionsService } from '../data/questions.service';
import { UserStateService } from './user-state.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return () => { h ^= h >>> 16; h = Math.imul(h, 2246822507); h ^= h >>> 13; h = Math.imul(h, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
function getDailySeed(): string { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }
function formatTime(s: number): string { return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`; }

@Injectable({ providedIn: 'root' })
export class InterviewService {
  readonly questions = inject(QuestionsService);
  readonly userState = inject(UserStateService);
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
    if (!ids?.length) return section.questions;
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
```

Delete `src/app/core/services/interview.service.ts`.

- [ ] **Step 4: Fix consumer import paths**

In `src/app/app.ts`, change:
```ts
import { InterviewService } from './core/services/interview.service';
```
to:
```ts
import { InterviewService } from './features/interview/state/interview.service';
```

In `src/app/features/interview/pages/interview-shell.page.ts`, change:
```ts
import { InterviewService } from '../../../core/services/interview.service';
```
to:
```ts
import { InterviewService } from '../state/interview.service';
```

In `src/app/features/interview/components/category-pills/category-pills.component.ts`, change:
```ts
import { InterviewService } from '../../../../core/services/interview.service';
```
to:
```ts
import { InterviewService } from '../../state/interview.service';
```

(`src/app/shared/components/user-preferences/user-preferences.component.ts` also imports `InterviewService` — it moves in Task 3 and gets its import fixed there directly to its final path, so it's intentionally not touched here.)

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: no errors except (temporarily) in `user-preferences.component.ts`, which Task 3 fixes next. If you want a clean build at this checkpoint, also apply Step 4's pattern to `user-preferences.component.ts`'s `InterviewService` import (point it at `'../../../../features/interview/state/interview.service'` — note the path is from `shared/components/user-preferences/`, still in its pre-Task-3 location) as a temporary fix; Task 3 will then change it again to its final form when the file moves. Recommended: just do Task 2 and Task 3 back-to-back in the same sitting so you never need this temporary patch.

Run: `npx ng build --configuration development`
Expected: `Application bundle generation complete.`

Run: `grep -rn "core/services/interview.service\|core/services/questions.service\|core/services/user-state.service" src/app`
Expected: no output (all references updated).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: move interview state/data services out of core into features/interview"
```

---

### Task 3: Relocate misplaced components out of `shared/`

`auth-modal`, `user-preferences`, `deep-dive-modal` (+ `deep-dive-content`), `flashcard-reveal`, and `note-editor` are interview-feature UI with service dependencies — they don't belong in `shared/` (business-agnostic only). Move them into `features/interview/components/`, matching the existing folder convention used by `header/`, `toolbar/`, etc.

**Files:**
- Create: `src/app/features/interview/components/auth-modal/auth-modal.component.ts`
- Create: `src/app/features/interview/components/user-preferences/user-preferences.component.ts`
- Create: `src/app/features/interview/components/deep-dive-modal/deep-dive-modal.component.ts`
- Create: `src/app/features/interview/components/deep-dive-modal/deep-dive-content.component.ts`
- Create: `src/app/features/interview/components/flashcard-reveal/flashcard-reveal.component.ts`
- Create: `src/app/features/interview/components/note-editor/note-editor.component.ts`
- Delete: the 6 corresponding files under `src/app/shared/components/`
- Modify: `src/app/features/interview/components/header/header.component.ts`
- Modify: `src/app/features/interview/pages/interview-shell.page.ts`
- Modify: `src/app/features/interview/components/question-card/question-card.component.ts`

**Interfaces:**
- Consumes: `InterviewService` from `../../state/interview.service` (Task 2), `AuthService`/`ThemeService` from `../../../../core/services/*` (unchanged, just one level deeper than their old `shared/` location), `MarkdownService` from `../../../../shared/services/markdown.service` (unchanged file, deeper relative path).
- Produces: same component classes/selectors as before (`AuthModalComponent`, `UserPreferencesComponent`, `DeepDiveModalComponent`, `DeepDiveContentComponent`, `FlashcardRevealComponent`, `NoteEditorComponent`) — only their file location and import paths change, not their public API.

- [ ] **Step 1: Move `auth-modal`**

Create `src/app/features/interview/components/auth-modal/auth-modal.component.ts` with the exact same content as the current `src/app/shared/components/auth-modal/auth-modal.component.ts`, except the import line:
```ts
import { AuthService } from '../../../core/services/auth.service';
```
becomes:
```ts
import { AuthService } from '../../../../core/services/auth.service';
```
Delete `src/app/shared/components/auth-modal/auth-modal.component.ts` (and the now-empty `src/app/shared/components/auth-modal/` directory).

- [ ] **Step 2: Move `user-preferences`**

Create `src/app/features/interview/components/user-preferences/user-preferences.component.ts` with the same content as the current file, except these three import lines:
```ts
import { AuthService } from '../../../core/services/auth.service';
import { InterviewService } from '../../../core/services/interview.service';
import { ThemeService, ThemeOption } from '../../../core/services/theme.service';
```
become:
```ts
import { AuthService } from '../../../../core/services/auth.service';
import { InterviewService } from '../../state/interview.service';
import { ThemeService, ThemeOption } from '../../../../core/services/theme.service';
```
Delete `src/app/shared/components/user-preferences/user-preferences.component.ts` (and its now-empty directory).

- [ ] **Step 3: Move `deep-dive-modal` + `deep-dive-content`**

Create `src/app/features/interview/components/deep-dive-modal/deep-dive-modal.component.ts` — identical content to the current file (it only imports its sibling `./deep-dive-content.component`, no path change needed).

Create `src/app/features/interview/components/deep-dive-modal/deep-dive-content.component.ts` — same content, except:
```ts
import { MarkdownService } from '../../services/markdown.service';
```
becomes:
```ts
import { MarkdownService } from '../../../../shared/services/markdown.service';
```
Delete `src/app/shared/components/deep-dive-modal/` (both files + the directory).

- [ ] **Step 4: Move `flashcard-reveal` and `note-editor`**

Create `src/app/features/interview/components/flashcard-reveal/flashcard-reveal.component.ts` and `src/app/features/interview/components/note-editor/note-editor.component.ts` with identical content to their current `shared/components/` versions — neither file has a relative import that needs adjusting (both only import from `@angular/core` / `@angular/forms/signals` / `lucide-angular`).

Delete `src/app/shared/components/flashcard-reveal/` and `src/app/shared/components/note-editor/` (files + directories).

- [ ] **Step 5: Fix the three files that import the moved components**

In `src/app/features/interview/components/header/header.component.ts`, change:
```ts
import { AuthModalComponent } from '../../../../shared/components/auth-modal/auth-modal.component';
import { UserPreferencesComponent } from '../../../../shared/components/user-preferences/user-preferences.component';
```
to:
```ts
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';
```

In `src/app/features/interview/pages/interview-shell.page.ts`, change:
```ts
import { DeepDiveModalComponent } from '../../../shared/components/deep-dive-modal/deep-dive-modal.component';
```
to:
```ts
import { DeepDiveModalComponent } from '../components/deep-dive-modal/deep-dive-modal.component';
```

In `src/app/features/interview/components/question-card/question-card.component.ts`, change:
```ts
import { NoteEditorComponent } from '../../../../shared/components/note-editor/note-editor.component';
import { FlashcardRevealComponent } from '../../../../shared/components/flashcard-reveal/flashcard-reveal.component';
```
to:
```ts
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { FlashcardRevealComponent } from '../flashcard-reveal/flashcard-reveal.component';
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: no errors.

Run: `npx ng build --configuration development`
Expected: `Application bundle generation complete.`

Run: `grep -rln "shared/components/auth-modal\|shared/components/user-preferences\|shared/components/deep-dive-modal\|shared/components/flashcard-reveal\|shared/components/note-editor" src/app`
Expected: no output.

Run: `ls src/app/shared/components`
Expected: only `answer-paragraphs`, `app-loader`, `code-block`, `example-block`, `progress-bar`, `section-header`, `skeleton-card` remain.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: move interview-specific components out of shared into features/interview"
```

---

### Task 4: Delete dead `MarkdownPipe`

`src/app/shared/pipes/markdown.pipe.ts` duplicates the tokenizer/keyword logic already in `src/app/shared/services/markdown.service.ts` and is never imported anywhere (confirmed via `grep -rn "MarkdownPipe" src/app`, which only matches its own declaration).

**Files:**
- Delete: `src/app/shared/pipes/markdown.pipe.ts`

- [ ] **Step 1: Confirm it's truly unused**

Run: `grep -rn "MarkdownPipe" src/app --include="*.ts" --include="*.html"`
Expected: exactly one match — the `export class MarkdownPipe` line in the file itself.

- [ ] **Step 2: Delete the file**

```bash
rm src/app/shared/pipes/markdown.pipe.ts
```

- [ ] **Step 3: Verify**

Run: `npx ng build --configuration development`
Expected: `Application bundle generation complete.`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete dead MarkdownPipe (duplicate of MarkdownService, never imported)"
```

---

### Task 5: Package dependency hygiene

`@supabase/supabase-js` is imported at runtime (now in `core/services/supabase-client.service.ts`) but listed under `devDependencies` — wrong classification. `marked` is listed as a dependency but never imported anywhere in `src/app` (the app uses `markdown-it` instead) — dead weight.

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (regenerated by `npm install`, not hand-edited)

- [ ] **Step 1: Confirm `marked` is unused**

Run: `grep -rn "from 'marked'" src/app --include="*.ts"`
Expected: no output.

- [ ] **Step 2: Edit `package.json`**

Remove this line from `dependencies`:
```json
    "marked": "^18.0.4",
```

Move this line from `devDependencies` to `dependencies` (keep the same version string):
```json
    "@supabase/supabase-js": "^2.106.0",
```

- [ ] **Step 3: Resync the lockfile**

Run: `npm install`
Expected: exits 0, `package-lock.json` is updated, no `marked` entries remain in it for the root package.

- [ ] **Step 4: Verify**

Run: `npx ng build --configuration development`
Expected: `Application bundle generation complete.`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: move @supabase/supabase-js to dependencies, drop unused marked"
```

---

### Task 6: Enforce the dependency rule with ESLint

Right now nothing stops `shared/` from importing `core/` or a feature, or one feature from importing another. Add `eslint-plugin-boundaries` on top of the standard Angular ESLint setup so this is enforced by `npm run lint`, not just convention.

**Files:**
- Create: `eslint.config.js` (via schematic, then hand-edited)
- Modify: `package.json` (adds `lint` script + new devDependencies, done by the schematic)

- [ ] **Step 1: Scaffold Angular's standard ESLint config**

Run: `npx ng add @angular-eslint/schematics@21 --skip-confirmation`
Expected: adds `eslint.config.js`, plus `eslint`, `angular-eslint`, `typescript-eslint` to `devDependencies`, plus a `lint` script in `package.json`.

- [ ] **Step 2: Install the boundaries plugin**

Run: `npm install --save-dev eslint-plugin-boundaries@^6.0.2`

- [ ] **Step 3: Read the generated `eslint.config.js`**

Open it and find the config block that targets `files: ["**/*.ts"]`. You'll merge the boundaries plugin into that block's `plugins`/`rules`/`settings` — exact line numbers depend on what the schematic generated, so read the file first rather than guessing an offset.

- [ ] **Step 4: Add the boundaries rule**

In that `**/*.ts` config block, add a `settings` key (sibling of `rules`) if one doesn't already exist:

```js
settings: {
  'boundaries/include': ['src/app/**/*.ts'],
  'boundaries/elements': [
    { type: 'shared', pattern: 'src/app/shared/**' },
    { type: 'core', pattern: 'src/app/core/**' },
    { type: 'feature', pattern: 'src/app/features/*/**', capture: ['feature'] },
    { type: 'app', pattern: 'src/app/*.ts' },
  ],
},
```

Add `boundaries` to that block's `plugins` object (create the key if missing):

```js
plugins: {
  boundaries: require('eslint-plugin-boundaries'),
},
```

Add this rule to that block's `rules`:

```js
'boundaries/element-types': [
  'error',
  {
    default: 'disallow',
    rules: [
      { from: 'shared', allow: [] },
      { from: 'core', allow: ['shared'] },
      { from: 'feature', allow: ['shared', 'core', ['feature', { feature: '${feature}' }]] },
      { from: 'app', allow: ['shared', 'core', 'feature'] },
    ],
  },
],
```

This says: `shared` may depend on nothing internal; `core` may depend on `shared`; a `feature` may depend on `shared`, `core`, and itself (not a sibling feature — there's only one feature today, so this half of the rule is currently unexercised but will activate the moment a second feature is added); the app shell (`app.ts`, `app.config.ts`, `app.routes.ts`) may depend on all three.

- [ ] **Step 5: Run it and resolve only boundary violations**

Run: `npm run lint`

If it reports `boundaries/element-types` violations: that means Tasks 2–3 left a dependency-direction problem — re-check the relevant import. (There should be none, since Tasks 2–3 already fixed every case this rule covers.)

If it reports a large volume of *unrelated* pre-existing style/template findings from the Angular-recommended base config (this codebase has never been linted before): do not mass-fix them as part of this task — that's a separate, much larger cleanup with its own risk profile. Instead, in that `**/*.ts` block, downgrade the noisy *non-boundaries* rules from `'error'` to `'warn'` so `npm run lint` exits 0 on the boundary check while still surfacing (not blocking on) the pre-existing style debt. Leave `'boundaries/element-types'` itself at `'error'`.

Expected end state: `npm run lint` exits 0, and `boundaries/element-types` shows zero violations.

- [ ] **Step 6: Verify the rule actually catches violations (regression check)**

Temporarily add a throwaway bad import to confirm the rule fires — e.g. add `import { InterviewService } from '../../features/interview/state/interview.service';` to `src/app/shared/services/markdown.service.ts`, run `npm run lint`, confirm it reports a `boundaries/element-types` error, then revert the throwaway edit (`git checkout -- src/app/shared/services/markdown.service.ts`).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: enforce core/shared/feature dependency direction with eslint-plugin-boundaries"
```

---

### Task 7: End-to-end smoke verification

Tasks 1–3 changed dependency injection wiring and a public service API (`UserStateService`). `ng build` only proves it compiles — confirm it still behaves correctly at runtime.

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `npx ng serve --port 4400` (background)

- [ ] **Step 2: Smoke-test the flows touched by this refactor**

Using a browser (or Playwright, headless, against `http://localhost:4400`):
1. Load the app — confirm the loader resolves and the question list renders (proves `AuthService.init()` + `InterviewService.init()` still wire up correctly through the new paths).
2. Click a category pill — confirm it switches category (proves `category-pills` → relocated `InterviewService` works).
3. Open the auth modal (sign-in icon in header) — confirm it renders and the form fields work (proves the relocated `AuthModalComponent` resolves `AuthService` correctly).
4. Open user preferences — confirm the "Stack" tab lists categories (proves the relocated `UserPreferencesComponent` resolves the relocated `InterviewService` correctly).
5. Toggle a bookmark on a question card — confirm the star fills in and persists after reloading the page (proves `UserStateService.toggleBookmark` still writes to `localStorage` correctly with its simplified signature).
6. Open a card's note editor, type a note — confirm it saves (same proof for `updateNote`).
7. Open flashcard mode and reveal a card — confirm reveal state toggles (relocated `FlashcardRevealComponent`).
8. Open a deep dive — confirm content renders with syntax highlighting (relocated `DeepDiveModalComponent`/`DeepDiveContentComponent` + `MarkdownService` still wired).

Expected: all 8 pass with no console errors.

- [ ] **Step 3: Stop the dev server**

```bash
pkill -f "ng serve --port 4400"
```

- [ ] **Step 4: Final full-suite check**

Run: `npx ng build --configuration development`
Run: `npx ng test -- --run` (or the project's existing `npm test` command)
Run: `npm run lint`

Expected: all three exit 0.

No commit for this task — it's verification only. If anything fails, fix it in a follow-up commit referencing which of Tasks 1–6 introduced the regression.

---

## Explicitly out of scope (raised in the audit, not fixed here)

- Moving `core/models/interview.models.ts` into `features/interview/data/` — touches 25+ data files for a type-only change with no runtime/coupling risk; not one of the 7 numbered violations.
- Introducing path aliases (`@core/*`, `@features/*`, `@shared/*`) — cosmetic, would touch every file with a relative import; not requested.
- Mass-fixing pre-existing Angular ESLint style/template findings surfaced once linting is turned on for the first time (Task 6, Step 5) — separate cleanup, separate risk profile.
- Auditing whether every component in `features/interview/components/` is properly "dumb" (e.g. `category-pills` injects `InterviewService` directly rather than receiving categories via `input()`) — not one of the 7 violations; would be a much larger, separately-scoped change.
