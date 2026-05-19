# Prism × Supabase Backend — Design

## 1. Concept & Vision

Prism gets a Supabase backend for two purposes: (1) the full question bank lives in Postgres instead of 21 TypeScript files, and (2) user state — bookmarks, notes, revealed cards, viewed questions — syncs across devices when signed in, while anonymous users still get the full local-only experience.

The migration is additive: localStorage stays for anonymous/guest users. Authenticated users get cross-device sync. The question data is the same regardless of auth state — only the user-persisted layer changes.

---

## 2. Data Architecture

### 2.1 Reference Data (read-only, no RLS needed)

| Table | Purpose |
|---|---|
| `categories` | All 21 interview categories |
| `sections` | Sections within each category |
| `questions` | All interview questions |

These are loaded by the Angular app at boot and cached. They are **denormalized into flat question records** (no nested JSON). Each question has a stable `id` string (e.g. `java-001`) that matches the current file-based IDs so bookmarks remain valid after migration.

### 2.2 User Data (auth-protected, RLS enabled)

| Table | Purpose | Auth |
|---|---|---|
| `user_bookmarks` | Set of question IDs | authenticated only |
| `user_notes` | `{ question_id, note_text }` records | authenticated only |
| `user_revealed` | Set of revealed question IDs | authenticated only |
| `user_viewed` | Set of viewed question IDs | authenticated only |

Anonymous users use **localStorage only** — identical to today's behavior. Authenticated users write to Postgres.

### 2.3 Sync Strategy

```
Anonymous session:
  localStorage (signals) ←→ localStorage (no Supabase involvement)

Authenticated session:
  Supabase (server-side, RLS) ←→ Supabase client → localStorage signals (read)
  User actions → update localStorage signal + write to Supabase
```

On **sign-in**: merge localStorage state with any existing Supabase state (local wins if newer, or union-merge for sets).

On **sign-out**: clear Supabase-persisted signals but keep local state untouched.

---

## 3. Auth Design

### 3.1 Providers
- **Email/password** — primary auth method
- **Magic link** — passwordless option

### 3.2 Anonymous Session
- App works fully without auth, using existing localStorage signals
- Prompt to sign in / sign up appears in the header or empty state when relevant (e.g. no bookmarks yet, or first visit)
- No automatic account creation

### 3.3 Auth State Flow
```
App boot
  → check Supabase session
    → if valid session: load user data from Supabase, populate signals
    → if no session: load from localStorage, app works anonymously
```

---

## 4. Database Schema

```sql
-- Reference data (no RLS — data-only, no user content)
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
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  example TEXT,
  code TEXT,
  language TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- User data (RLS — users only see their own rows)
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

-- RLS policies
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_revealed ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_viewed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own bookmarks" ON user_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own notes" ON user_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own revealed" ON user_revealed FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own viewed" ON user_viewed FOR ALL USING (auth.uid() = user_id);
```

---

## 5. API Surface (Supabase JS client)

### 5.1 Question data loading
```typescript
const supabase = createClient(...)
const { data: questions } = await supabase
  .from('questions')
  .select('id, question, answer, example, code, language, section_id, section:section_id(title, category_id, category:category_id(title, color))')
  .order('sort_order')
```

### 5.2 User data loading on auth
```typescript
async function loadUserState(userId: string) {
  const [bookmarks, notes, revealed, viewed] = await Promise.all([
    supabase.from('user_bookmarks').select('question_id').eq('user_id', userId),
    supabase.from('user_notes').select('question_id, note').eq('user_id', userId),
    supabase.from('user_revealed').select('question_id').eq('user_id', userId),
    supabase.from('user_viewed').select('question_id').eq('user_id', userId),
  ]);
  return {
    bookmarks: new Set(bookmarks.data?.map(r => r.question_id) ?? []),
    notes: Object.fromEntries(notes.data?.map(r => [r.question_id, r.note]) ?? []),
    revealed: new Set(revealed.data?.map(r => r.question_id) ?? []),
    viewed: new Set(viewed.data?.map(r => r.question_id) ?? []),
  };
}
```

### 5.3 Writing user actions
All mutations go through the Supabase client. On conflict (upsert) the client handles it — no manual conflict resolution needed at this layer since the frontend operations are commutative (adding to a Set, updating a note text).

---

## 6. Angular Service Architecture

### 6.1 New `SupabaseService`
Injected by `InterviewService`. Handles:
- Boot-time session check → decide local vs remote data source
- Auth state change events → trigger merge
- All Supabase reads/writes

### 6.2 Updated `InterviewService`
Keeps all existing signal-based state. On init, checks auth state:
- **Authenticated**: fetches from Supabase, populates signals, starts listening to realtime changes
- **Anonymous**: existing localStorage behavior unchanged

### 6.3 Conflict merge on sign-in
```typescript
function mergeState(local: UserState, remote: UserState): UserState {
  return {
    bookmarks: new Set([...local.bookmarks, ...remote.bookmarks]),
    notes: { ...remote.notes, ...local.notes },          // local overwrites remote
    revealed: new Set([...local.revealed, ...remote.revealed]),
    viewed: new Set([...local.viewed, ...remote.viewed]),
  };
}
```

---

## 7. Auth UI

- **Sign up / Sign in**: modal or page — Supabase handles the flow via their UI components or a custom form
- **Anonymous badge**: small indicator in header when not signed in
- **Sign-in prompt**: shown contextually, not as a hard wall — anonymous users still get full functionality

---

## 8. What Stays the Same

- Question data loading path changes from `import from TypeScript files` to `fetch from Supabase`
- All component templates, styling, interactions — unchanged
- The `InterviewService` signal API — unchanged (components don't know where data comes from)
- Dark mode, theme, keyboard shortcuts — unchanged

---

## 9. What Changes

| What | How |
|---|---|
| 21 TypeScript data files | Replaced by 3 Postgres tables |
| `InterviewService` init | Checks Supabase session, loads from remote or local |
| User data persistence | localStorage for anonymous, Supabase for authenticated |
| New `SupabaseService` | Auth state, client init, data loading/writing |
| Auth UI | Email/password modal with sign-up / sign-in |
| `local-storage.service.ts` | Still used for anonymous; SupabaseService takes over when auth'd |

---

## 10. Migration Path

1. **Provision Supabase project** → create schema, load question data from a script that reads the current TS files
2. **Add auth** → email/password enabled in Supabase dashboard
3. **Wire SupabaseService** → load questions from Postgres, boot gracefully if offline
4. **Connect user data** → bookmarks/notes/revealed/viewed sync on sign-in
5. **Test anonymous + auth flows** → verify localStorage fallback, sign-in merge, sign-out behavior
6. **Deploy** → Vercel env vars for Supabase URL + anon key

---

## 11. Verification Checklist

- [ ] Anonymous users see all questions, bookmark, take notes, reveal — no auth required
- [ ] Sign-up / sign-in works end-to-end
- [ ] Authenticated user data persists across sessions / devices
- [ ] Sign-in merges localStorage state with Supabase state correctly
- [ ] Sign-out clears Supabase session but keeps local data
- [ ] RLS policies prevent user A from seeing user B's data
- [ ] App loads questions from Supabase, not TypeScript files
- [ ] `ng build` succeeds with zero errors