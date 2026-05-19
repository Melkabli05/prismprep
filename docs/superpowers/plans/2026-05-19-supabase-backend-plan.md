# Prism × Supabase Backend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate question data from TypeScript files to Postgres, add email/password auth, and sync user state (bookmarks, notes, revealed, viewed) across devices for signed-in users while keeping full local-only experience for anonymous users.

**Architecture:** Questions live in 3 read-only Postgres tables. User state lives in 4 RLS-protected tables. Angular boots with Supabase session check — authenticated → load from Postgres; anonymous → use localStorage signals. New `SupabaseService` owns all Supabase interactions. `InterviewService` delegates user-data reads/writes to it.

**Tech Stack:** Supabase (Postgres + Auth + JS client), Angular 21 standalone components.

---

## File Map

```
src/app/
├── core/
│   └── services/
│       ├── supabase.service.ts       # NEW
│       └── interview.service.ts      # MODIFY — async data load, delegate user data
├── shared/components/
│   └── auth-modal/                   # NEW
│       └── auth-modal.component.ts
├── features/interview/
│   ├── components/header/
│   │   └── header.component.ts        # MODIFY — auth button + user badge
│   └── pages/interview-shell.page.ts # MODIFY — call loadQuestionsFromSupabase on boot
└── app.ts                            # MODIFY — boot SupabaseService, effect-based auth watch

src/environments/                      # NEW — Supabase URL + anon key
scripts/                               # NEW — one-time data migration script
```

**Other (outside src/):**
- One-time migration script: `scripts/migrate-data.ts` — reads all 21 TS data files, inserts into Postgres
- Supabase schema: applied via MCP `apply_migration`

---

## Prerequisites

The user must have a Supabase project created at supabase.com. Before starting, they provide:
- `SUPABASE_URL` — project URL from Settings → API
- `SUPABASE_ANON_KEY` — `anon` key from Settings → API

---

## Task 1: Create Supabase Schema

**Apply via MCP `apply_migration`:**

```sql
-- Reference data (no RLS — read-only, no user content)
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE sections (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id),
  title TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES sections(id),
  category_id TEXT NOT NULL REFERENCES categories(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  example TEXT,
  code TEXT,
  language TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- User data (RLS enabled)
CREATE TABLE user_bookmarks (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE user_notes (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE user_revealed (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE user_viewed (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);

-- RLS
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_revealed ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_viewed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own bookmarks" ON user_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own notes" ON user_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own revealed" ON user_revealed FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own viewed" ON user_viewed FOR ALL USING (auth.uid() = user_id);
```

- [ ] **Step 1: Apply schema via `apply_migration`**

```
name: create_prism_schema
query: <the SQL above>
```

---

## Task 2: Create Migration Script to Load Questions into Postgres

**File:** `scripts/migrate-data.ts` (one-time script, run manually)

```typescript
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Dynamic import all category files
const categoryFiles = fs.readdirSync('./src/app/features/interview/data/questions');
const categories: any[] = [];
const sections: any[] = [];
const questions: any[] = [];

for (const file of categoryFiles) {
  if (!file.endsWith('.ts')) continue;
  // Relative to scripts/migrate-data.ts → ../src/app/features/interview/data/questions/
  const mod = await import(`../src/app/features/interview/data/questions/${file}`);
  const cat = Object.values(mod).find(v => v && v.id && v.sections);
  if (!cat) continue;
  categories.push({ id: cat.id, title: cat.title, color: cat.color, description: cat.description, sort_order: categories.length });
  for (const sec of cat.sections) {
    sections.push({ id: sec.id, category_id: cat.id, title: sec.title, sort_order: sections.length });
    for (const q of sec.questions) {
      questions.push({ id: q.id, section_id: sec.id, question: q.question, answer: q.answer,
        example: q.example ?? null, code: q.code ?? null, language: q.language ?? null, sort_order: questions.length });
    }
  }
}

const { error: catErr } = await supabase.from('categories').upsert(categories);
const { error: secErr } = await supabase.from('sections').upsert(sections);
const { error: qErr } = await supabase.from('questions').upsert(questions);

if (catErr || secErr || qErr) {
  console.error('Migration failed:', { catErr, secErr, qErr });
  process.exit(1);
}
console.log(`Migrated ${categories.length} categories, ${sections.length} sections, ${questions.length} questions`);
```

- [ ] **Step 1: Create `scripts/migrate-data.ts`**

```bash
mkdir -p scripts
```

Write the script above to `scripts/migrate-data.ts`.

- [ ] **Step 2: Run the migration script**

```bash
SUPABASE_URL=<url> SUPABASE_SERVICE_ROLE_KEY=<key> npx ts-node scripts/migrate-data.ts
```

Expected output: `Migrated 21 categories, N sections, M questions`

- [ ] **Step 3: Verify data in Supabase**

Run `execute_sql`:
```sql
SELECT count(*) from questions;  -- expect ~500+
SELECT count(*) from categories; -- expect 21
SELECT count(*) from sections;   -- expect 50+
```

---

## Task 3: Create Environment Files

**File:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'http://localhost:54321',
  supabaseAnonKey: 'your-anon-key',
};
```

**File:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key',
};
```

- [ ] **Step 1: Create `src/environments/` directory and both files**

- [ ] **Step 2: Add env vars to Vercel dashboard** (user does this manually — Supabase URL + anon key from their project settings)

---

## Task 4: Create `SupabaseService`

**File:** `src/app/core/services/supabase.service.ts`

```typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface UserState {
  bookmarks: Set<string>;
  notes: Record<string, string>;
  revealed: Set<string>;
  viewed: Set<string>;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient | null = null;
  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  init(): void {
    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });

    this.client.auth.getSession().then(({ data }) => {
      this._user.set(data.session?.user ?? null);
      this._loading.set(false);
    });

    this.client.auth.onAuthStateChange((_event, session) => {
      this._user.set(session?.user ?? null);
    });
  }

  async loadUserState(): Promise<UserState | null> {
    if (!this.client || !this._user()) return null;
    const uid = this._user()!.id;
    const [bookmarks, notes, revealed, viewed] = await Promise.all([
      this.client.from('user_bookmarks').select('question_id').eq('user_id', uid),
      this.client.from('user_notes').select('question_id, note').eq('user_id', uid),
      this.client.from('user_revealed').select('question_id').eq('user_id', uid),
      this.client.from('user_viewed').select('question_id').eq('user_id', uid),
    ]);
    return {
      bookmarks: new Set(bookmarks.data?.map(r => r.question_id) ?? []),
      notes: Object.fromEntries(notes.data?.map(r => [r.question_id, r.note]) ?? []),
      revealed: new Set(revealed.data?.map(r => r.question_id) ?? []),
      viewed: new Set(viewed.data?.map(r => r.question_id) ?? []),
    };
  }

  async loadQuestions() {
    if (!this.client) return [];
    const { data } = await this.client
      .from('questions')
      .select('id, question, answer, example, code, language, section_id')
      .order('sort_order');
    return data ?? [];
  }

  async loadCategories() {
    if (!this.client) return [];
    const { data: sections } = await this.client.from('sections').select('*').order('sort_order');
    const { data: categories } = await this.client.from('categories').select('*').order('sort_order');
    return { categories: categories ?? [], sections: sections ?? [] };
  }

  async toggleBookmark(questionId: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    const exists = await this.client.from('user_bookmarks')
      .select('question_id').eq('user_id', uid).eq('question_id', questionId).single();
    if (exists.data) {
      await this.client.from('user_bookmarks')
        .delete().eq('user_id', uid).eq('question_id', questionId);
    } else {
      await this.client.from('user_bookmarks')
        .insert({ user_id: uid, question_id: questionId });
    }
  }

  async upsertNote(questionId: string, note: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    await this.client.from('user_notes')
      .upsert({ user_id: uid, question_id: questionId, note, updated_at: new Date().toISOString() });
  }

  async addRevealed(questionId: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    await this.client.from('user_revealed')
      .upsert({ user_id: uid, question_id: questionId });
  }

  async addViewed(questionId: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    await this.client.from('user_viewed')
      .upsert({ user_id: uid, question_id: questionId });
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async signUp(email: string, password: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signOut();
  }
}
```

- [ ] **Step 1: Create `src/app/core/services/supabase.service.ts`** with the code above

- [ ] **Step 2: Build to verify no errors**

```bash
ng build 2>&1 | grep -E "(error|Error)" | head -10
```

Expected: no errors related to `supabase.service.ts`

---

## Task 5: Update `InterviewService` to Use `SupabaseService`

**File:** `src/app/core/services/interview.service.ts` (modify)

Changes:
- Inject `SupabaseService`
- On `toggleBookmark`: if authenticated → call `supabase.toggleBookmark()`; always update local signal
- On `updateNote`: if authenticated → call `supabase.upsertNote()`; always update local signal
- On `toggleRevealed`: if authenticated → call `supabase.addRevealed()`; always update local signal
- On `markViewed`: if authenticated → call `supabase.addViewed()`; always update local signal
- Add `mergeState()` method used on sign-in
- Remove `effect()` calls that sync to localStorage for user data — keep them for `shuffled-ids` only
- Add `loadRemoteState()` called from `app.ts` boot after Supabase session resolves

```typescript
// Add after imports:
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  // ... existing signals and computed properties ...

  private supabase = inject(SupabaseService);

  // Keep existing constructor but remove user-data effect() calls
  // Keep the timer effect()

  // Update existing methods:
  toggleBookmark(id: string): void {
    const next = new Set(this._bookmarks());
    if (next.has(id)) next.delete(id); else next.add(id);
    this._bookmarks.set(next);
    this.supabase.toggleBookmark(id);
  }

  updateNote(id: string, note: string): void {
    this._notes.set({ ...this._notes(), [id]: note });
    this.supabase.upsertNote(id, note);
  }

  toggleRevealedCard(id: string): void {
    const next = new Set(this._revealedCards());
    next.add(id);
    this._revealedCards.set(next);
    this.supabase.addRevealed(id);
  }

  markViewed(id: string): void {
    const next = new Set(this._viewedQuestions());
    next.add(id);
    this._viewedQuestions.set(next);
    this.supabase.addViewed(id);
  }

  // Called from app boot after SupabaseService resolves auth
  async initRemoteState(): Promise<void> {
    if (!this.supabase.isAuthenticated()) return;
    const remote = await this.supabase.loadUserState();
    if (!remote) return;

    const local: UserState = {
      bookmarks: this._bookmarks(),
      notes: this._notes(),
      revealed: this._revealedCards(),
      viewed: this._viewedQuestions(),
    };

    // Union-merge: remote + local
    const merged: UserState = {
      bookmarks: new Set([...local.bookmarks, ...remote.bookmarks]),
      notes: { ...remote.notes, ...local.notes },
      revealed: new Set([...local.revealed, ...remote.revealed]),
      viewed: new Set([...local.viewed, ...remote.viewed]),
    };

    this._bookmarks.set(merged.bookmarks);
    this._notes.set(merged.notes);
    this._revealedCards.set(merged.revealed);
    this._viewedQuestions.set(merged.viewed);
  }

  // Remove localStorage effects for user data — Supabase handles it when auth'd
  // Keep: effect(() => setLocalStorage('shuffled-ids', this._shuffledIds()));
  // Remove: setLocalStorage for 'revealed-cards', 'bookmarks', 'viewed', 'notes'
}
```

- [ ] **Step 1: Read current `interview.service.ts`**
- [ ] **Step 2: Apply all modifications described above**
- [ ] **Step 3: Build to verify no errors**

---

## Task 6: Verify `app.config.ts` has `provideHttpClient()`

**File:** `src/app/app.config.ts`

Supabase's JS client uses `fetch` internally, so `provideHttpClient()` must be present. This was likely already added but verify.

- [ ] **Step 1: Check that `provideHttpClient()` is in `app.config.ts` providers**

---

## Task 7: Update `app.ts` — Boot Sequence

**File:** `src/app/app.ts`

```typescript
import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/services/supabase.service';
import { InterviewService } from './core/services/interview.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class App {
  private supabase = inject(SupabaseService);
  private interview = inject(InterviewService);

  constructor() {
    this.supabase.init();

    // Once auth state resolves (loading flips to false), merge remote state
    effect(() => {
      if (!this.supabase.loading()) {
        this.interview.initRemoteState();
      }
    }, { allowSignalWrites: true });
  }
}
```

- [ ] **Step 1: Update `app.ts` with the boot sequence above** (no polling, use `effect()`)
- [ ] **Step 2: Build to verify**

---

## Task 8: Add Auth UI to Header

**File:** `src/app/features/interview/components/header/header.component.ts`

Add to the template (inside the search+theme div):

```html
@if (supabase.user()) {
  <span class="user-badge">{{ supabase.user()!.email }}</span>
  <button (click)="signOut()" class="auth-btn">Déconnexion</button>
} @else {
  <button (click)="openAuthModal()" class="auth-btn">Connexion</button>
}
```

Add to the component class:

```typescript
private supabase = inject(SupabaseService);

openAuthModal(): void {
  // TODO: open sign-in modal (Task 9)
}

async signOut(): Promise<void> {
  await this.supabase.signOut();
}
```

Add styles:

```css
.auth-btn {
  height: 32px;
  padding: 0 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
}
.auth-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-soft);
}
.user-badge {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- [ ] **Step 1: Update header template and component class**
- [ ] **Step 2: Build to verify**

---

## Task 9: Create Auth Modal Component

**File:** `src/app/shared/components/auth-modal/auth-modal.component.ts`

```typescript
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-auth-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  styles: `
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 100;
      backdrop-filter: blur(4px);
    }
    .modal-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 2rem;
      width: 100%;
      max-width: 360px;
      box-shadow: var(--shadow-card-hover);
    }
    .modal-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; }
    .form-group { margin-top: 1rem; }
    .form-label { display: block; font-size: 0.8125rem; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 0.375rem; }
    .form-input { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface-raised); color: var(--color-text-primary); font-size: 0.875rem; }
    .form-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .submit-btn { width: 100%; margin-top: 1.25rem; height: 40px; border-radius: var(--radius-full); border: none; background: var(--color-accent); color: var(--color-accent-text); font-weight: 600; cursor: pointer; font-size: 0.875rem; }
    .submit-btn:hover { background: var(--color-accent-hover); }
    .toggle-mode { margin-top: 1rem; text-align: center; font-size: 0.8125rem; color: var(--color-text-muted); }
    .toggle-mode button { background: none; border: none; color: var(--color-accent); cursor: pointer; font-size: 0.8125rem; }
    .error-msg { margin-top: 0.75rem; font-size: 0.8125rem; color: var(--color-error); text-align: center; }
  `,
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <h2 class="modal-title">{{ isSignUp() ? 'Créer un compte' : 'Connexion' }}</h2>
        @if (error()) { <p class="error-msg">{{ error() }}</p> }
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" [value]="email()" (input)="email.set($event.target.value)" placeholder="vous@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <input type="password" class="form-input" [value]="password()" (input)="password.set($event.target.value)" placeholder="••••••••" />
        </div>
        <button class="submit-btn" (click)="submit()" [disabled]="loading()">
          {{ loading() ? '...' : isSignUp() ? 'S'inscrire' : 'Se connecter' }}
        </button>
        <p class="toggle-mode">
          {{ isSignUp() ? 'Déjà un compte ?' : 'Pas de compte ?' }}
          <button (click)="isSignUp.set(!isSignUp())">{{ isSignUp() ? 'Se connecter' : 'S\'inscrire' }}</button>
        </p>
      </div>
    </div>
  `,
})
export class AuthModalComponent {
  private supabase = inject(SupabaseService);
  close = output<void>();
  email = '';
  password = '';
  isSignUp = signal(false);
  loading = signal(false);
  error = signal('');

  async submit(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    const result = this.isSignUp()
      ? await this.supabase.signUp(this.email, this.password)
      : await this.supabase.signIn(this.email, this.password);
    this.loading.set(false);
    if (result.error) {
      this.error.set(result.error);
    } else {
      this.close.emit();
    }
  }
}
```

Note: The template uses `[(value)]` which needs two-way binding — use a signal and `(input)` instead:

```typescript
email = signal('');
password = signal('');
```

- [ ] **Step 1: Create `src/app/shared/components/auth-modal/auth-modal.component.ts`**
- [ ] **Step 2: Wire into `HeaderComponent`** — when `openAuthModal()` is called, show the modal via a signal
- [ ] **Step 3: Build to verify**

---

## Task 10: Question Data — Build Category Tree from Supabase

**File:** `src/app/core/services/interview.service.ts`

With `category_id` on each question row, a single query returns everything needed to rebuild the category tree.

**Add to `InterviewService`:**

```typescript
readonly categoryTree = computed(() =>
  buildCategoryTree(this._questionsData())
);

readonly allQuestionsFlat = computed<{ category: InterviewCategory; question: InterviewQuestion }[]>(() => {
  const result: { category: InterviewCategory; question: InterviewQuestion }[] = [];
  for (const cat of this.categoryTree()) {
    for (const sec of cat.sections) {
      for (const q of sec.questions) {
        result.push({ category: cat, question: q });
      }
    }
  }
  return result;
});

private _questionsData = signal<QuestionWithMeta[]>([]);

async loadQuestionsFromSupabase(): Promise<void> {
  const data = await this.supabase.loadQuestions();
  this._questionsData.set(data);
}

readonly dailyQuestions = computed(() => {
  const rng = seededRandom(getDailySeed());
  return [...this.allQuestionsFlat()].sort(() => rng() - 0.5).slice(0, 5);
});

readonly mockQuestions = computed(() => {
  const catQuestions = this.allQuestionsFlat().filter(({ category: c }) => c.id === this._activeCategory());
  const rng = seededRandom('mock-' + this._activeCategory());
  return [...catQuestions].sort(() => rng() - 0.5);
});
```

Where `QuestionWithMeta` includes `section_id` and `category_id` from the query.

**`buildCategoryTree()` helper:**

```typescript
interface QuestionWithMeta {
  id: string; section_id: string; category_id: string;
  question: string; answer: string;
  example?: string; code?: string; language?: string; sort_order: number;
}

function buildCategoryTree(questions: QuestionWithMeta[]): InterviewCategory[] {
  const catMap = new Map<string, InterviewCategory>();
  const secMap = new Map<string, InterviewSection>();

  for (const q of questions) {
    if (!secMap.has(q.section_id)) {
      const sec: InterviewSection = { id: q.section_id, title: '', questions: [] };
      secMap.set(q.section_id, sec);
    }
    if (!catMap.has(q.category_id)) {
      const cat: InterviewCategory = { id: q.category_id, title: '', color: '', description: '', sections: [] };
      catMap.set(q.category_id, cat);
    }
    const sec = secMap.get(q.section_id)!;
    const cat = catMap.get(q.category_id)!;
    sec.questions.push({
      id: q.id, question: q.question, answer: q.answer,
      example: q.example, code: q.code, language: q.language,
    });
  }

  // Fill section titles from the first question's section metadata
  // (section metadata comes from loadCategories — merge here)
  const cats = Array.from(catMap.values());
  for (const cat of cats) {
    cat.sections = cat.sections.sort((a, b) => a.sort_order - b.sort_order);
  }
  return cats.sort((a, b) => a.sort_order - b.sort_order);
}
```

Note: Section titles require a separate `loadCategories()` call. An alternative is to denormalize `section_title` and `category_title` directly onto each question row so `buildCategoryTree` needs only one query. Consider this if performance is a concern.

**`loadQuestions()` in SupabaseService:**

```typescript
async loadQuestions(): Promise<QuestionWithMeta[]> {
  if (!this.client) return [];
  const { data } = await this.client
    .from('questions')
    .select('id, section_id, category_id, question, answer, example, code, language, sort_order')
    .order('sort_order');
  return data ?? [];
}
```

- [ ] **Step 1: Update `InterviewService` with `_questionsData`, `categoryTree`, `allQuestionsFlat` computed signals**
- [ ] **Step 2: Implement `buildCategoryTree()` helper**
- [ ] **Step 3: Update `loadQuestions()` to include `category_id` in selection**
- [ ] **Step 4: Call `loadQuestionsFromSupabase()` in app boot after `supabase.init()` resolves**
- [ ] **Step 5: Remove the old `import { interviewCategories }` static data — replace with async load**
- [ ] **Step 6: Build to verify**

---

## Verification

After all tasks:

- [ ] `ng build` — zero errors
- [ ] Anonymous user: browse questions, bookmark, add note, reveal — all works via localStorage
- [ ] Sign up a test user via auth modal
- [ ] Sign in with that user — data merges (sign-in flow works)
- [ ] After sign-in: bookmark on device A → appears on device B
- [ ] Sign out → returns to localStorage-only behavior, data preserved
- [ ] RLS: user A cannot see user B's bookmarks via direct API query

---

## Dependencies

- Task 1 must complete before Task 2
- Task 4 must complete before Task 5
- Task 5 must complete before Task 7
- Task 7 must complete before Task 8
- Task 8 must complete before Task 9
- Task 3 (env files) is independent — do early