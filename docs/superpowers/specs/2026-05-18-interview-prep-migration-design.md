# DevPrep Angular Migration — Design Spec

## Overview

Migrate the Next.js `interview-prep-next` app to Angular 21 (`interview-prep-angular`) with full feature parity. No backend, no database — static TypeScript data, Angular signals for state, DaisyUI + Tailwind CSS 4 for styling.

---

## Data Model

### TypeScript Interfaces

```typescript
interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  example?: string;
  code?: string;
  language?: string;
}

interface InterviewSection {
  id: string;
  title: string;
  questions: InterviewQuestion[];
}

interface InterviewCategory {
  id: string;
  title: string;
  color: string;       // DaisyUI badge class e.g. "badge-primary"
  description: string;
  sections: InterviewSection[];
}

interface InterviewState {
  activeCategory: string;         // category id
  searchQuery: string;
  flashcardMode: boolean;
  revealedCards: Set<string>;     // question ids
  bookmarks: Set<string>;
  showBookmarksOnly: boolean;
  notes: Record<string, string>; // question id → note text
  viewedQuestions: Set<string>;
  shuffledIds: string[] | null;
  showDailyChallenge: boolean;
  showMockInterview: boolean;
  mockInterviewIdx: number;
  mockTimer: number;
  mockRunning: boolean;
}
```

### Data Migration

Copy all `src/lib/data-*.ts` files from Next.js project into `src/app/data/`. The content is identical — only import paths change (remove JSDoc `/** @type {...} */` annotations and any Next.js-specific imports).

Single source of truth: `src/app/data/interview-categories.ts` exports `interviewCategories: InterviewCategory[]`.

---

## Application Structure

```
src/app/
├── data/
│   ├── interview-categories.ts   # Main data file (copied + adapted from Next.js)
│   ├── data-rh.ts
│   ├── data-java.ts
│   └── ... (all 21 category files)
├── models/
│   └── interview.models.ts       # Interfaces above
├── services/
│   ├── interview.service.ts      # Signal-based state, all business logic
│   └── local-storage.service.ts  # Wraps localStorage with JSON serialization
├── components/
│   ├── header.component.ts
│   ├── toolbar.component.ts
│   ├── question-card.component.ts
│   ├── search-bar.component.ts
│   ├── code-block.component.ts
│   └── category-pills.component.ts
├── app.ts
├── app.routes.ts
└── app.config.ts
```

---

## Components

### `header.component.ts`
- Logo (inline SVG, same as Next.js)
- App title "DevPrep"
- Search bar input
- Theme toggle button (moon/sun icon via `lucide-angular`)
- Sticky positioning

### `toolbar.component.ts`
- Flashcard mode toggle button
- Bookmarks filter button (shows count)
- Shuffle button
- Daily Challenge button
- Mock Interview button
- Keyboard shortcut hints

### `question-card.component.ts`
- Question number badge (`{index}/{total}`)
- Category badge (color from `category.color`)
- Question text with inline formatting
- Answer paragraphs with text search highlighting
- Code block (`code-block.component`)
- Example block
- Notes textarea (toggle)
- Bookmark star button
- "Reveal" button in flashcard mode
- Action bar: note toggle, reveal

### `code-block.component.ts`
- Language label header
- Copy button
- `<pre><code>` block with Tailwind monospace styling
- No Monaco Editor — plain `<pre>` with Tailwind `bg-muted`, `text-sm`, `font-mono`

### `category-pills.component.ts`
- Horizontal scrollable pill list
- Active category highlighted with DaisyUI `badge-primary`
- Total question count per category
- Click → category switch

---

## Services

### `interview.service.ts`

Signal-based store. All state lives here. Exposes signals for component consumption.

```typescript
// Inputs
activeCategory = signal('rh')
searchQuery = signal('')
flashcardMode = signal(false)
showBookmarksOnly = signal(false)
showDailyChallenge = signal(false)
showMockInterview = signal(false)

// Derived
category = computed(() => interviewCategories.find(c => c.id === activeCategory()))
searchResults = computed(() => ...)
dailyQuestions = computed(() => ...)
mockQuestions = computed(() => ...)
bookmarkCount = computed(() => bookmarks().size)
categoryProgress = computed(() => ...)  // { total, viewed, percent }

// Actions
setCategory(id: string)
toggleBookmark(id: string)
toggleRevealedCard(id: string)
updateNote(id: string, note: string)
markViewed(id: string)
shuffleCurrentCategory()
```

### `local-storage.service.ts`

Wraps localStorage for Sets and Records (same serialization logic as Next.js `useLocalStorage` hook).

```typescript
getSet<T>(key: string, initial: Set<T>): Signal<Set<T>>
getRecord<T>(key: string, initial: Record<string, T>): Signal<Record<string, T>>
```

---

## Features

### Search
- Filters `question.question`, `question.answer`, `question.code`
- Highlights matched text with `<mark>` in question and answer
- Results count shown above results
- Esc to clear

### Flashcard Mode
- All answers hidden by default
- Click card or "Révéler" button to show answer
- Progress through cards sequentially
- Revealed state persisted in localStorage

### Bookmarks
- Star button on each card
- Bookmarks filter toggles to show only bookmarked
- Count shown on toolbar button
- Persisted in localStorage

### Notes
- Toggle textarea on each card
- Note content shown as checkmark on button
- Persisted in localStorage per question id

### Daily Challenge
- 5 random questions, seeded by today's date (deterministic)
- Displays date in French format
- Same card component as normal browsing

### Mock Interview
- Timer (counts up in MM:SS format)
- Play/Pause button
- Previous/Next navigation
- Progress bar
- Question index counter
- Resets reveal state on question change

### Theme Toggle
- DaisyUI `data-theme="dark"` / `data-theme="light"`
- Toggled on `<html>` element
- Sun icon (light mode) / Moon icon (dark mode)
- No transition on toggle (matching Next.js behavior)

### Keyboard Shortcuts
- `Ctrl+K` / `Cmd+K` → focus search
- `Esc` → clear search / close overlays
- `←` / `→` → previous / next category (when not in search input)

---

## Styling

- **Tailwind CSS 4** (already configured)
- **DaisyUI 5** (already configured)
- DaisyUI theme variables set on `<html data-theme="...">`
- Custom `bg-muted`, `text-foreground`, `border-border` CSS variables defined in `styles.css` (same as Next.js `globals.css`)
- Font: system font stack (no Google Fonts — matching Next.js `Geist` approach of native fonts)

---

## Dependencies to Add

```json
{
  "lucide-angular": "^0.475.0"
}
```

---

## Dependencies NOT Migrating

- Monaco Editor (replaced with `<pre><code>`)
- Prisma / database
- NextAuth
- React Query / TanStack Table
- Radix UI components (all replaced with DaisyUI equivalents)
- Framer Motion (animations not critical)
- All Radix shadcn/ui components (rebuilt as Angular standalone components)

---

## Implementation Order

1. **Data layer** — copy `data-*.ts` files, create `interview.models.ts`, set up `local-storage.service.ts`
2. **Shell + header** — `app.ts` layout, header with search and theme toggle
3. **Category navigation** — pills, progress bar, category switching
4. **Question cards** — display questions, rich text parsing, code blocks, examples
5. **Search** — filtering, highlighting, results view
6. **Flashcard mode** — reveal mechanic, revealed state
7. **Bookmarks + notes** — localStorage persistence, filter view
8. **Daily challenge** — daily seeded random questions
9. **Mock interview** — timer, navigation, progress
10. **Polish** — keyboard shortcuts, progress tracking, footer

---

## Files to Create

- `src/app/models/interview.models.ts`
- `src/app/data/interview-categories.ts` + 20 data files
- `src/app/services/local-storage.service.ts`
- `src/app/services/interview.service.ts`
- `src/app/components/header.component.ts`
- `src/app/components/toolbar.component.ts`
- `src/app/components/question-card.component.ts`
- `src/app/components/code-block.component.ts`
- `src/app/components/category-pills.component.ts`
- `src/styles.css` (update with CSS variables)
- `src/app/app.ts` (update root component)

## Files to Modify

- `package.json` — add `lucide-angular`
- `angular.json` — budget increases (the app will exceed 500kB initial)
