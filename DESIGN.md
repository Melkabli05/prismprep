# DevPrep Design System

## 1. Concept & Vision

DevPrep is a focused, editorial-style interview preparation tool. The aesthetic is **"Warm Technical"** — like a well-typeset technical textbook with the warmth of a reading lamp. Every decision prioritizes readability and sustained focus over decoration. The app should feel calm, authoritative, and uncluttered — comfortable for hours of study without eye strain.

---

## 2. Design Language

### Aesthetic Direction
Warm editorial. Generous whitespace. Strong typographic hierarchy. Soft, comfortable tones — never garish or neon. Content is king. Color serves hierarchy and interaction, never decoration.

### Color Palette

All colors use CSS custom properties — no direct hex in templates.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-bg` | `#FAFAF7` (warm parchment) | `#141412` (warm charcoal) | Page background |
| `--color-surface` | `#FFFFFF` | `#1E1D1B` | Cards, panels |
| `--color-surface-raised` | `#FDFDF9` | `#242320` | Action bars, nested surfaces |
| `--color-surface-hover` | `#F4F3EF` | `#2A2926` | Hover states |
| `--color-surface-active` | `#EEEDE7` | `#302E2B` | Active states |
| `--color-border` | `#E2E0D9` | `#2E2D29` | Dividers, outlines |
| `--color-border-subtle` | `#EBE9E2` | `#262420` | Subtle dividers |
| `--color-border-strong` | `#C8C5BC` | `#3E3D38` | Prominent borders |
| `--color-text-primary` | `#1E1D1A` (soft black) | `#F2F0EC` (warm white) | Headlines, body |
| `--color-text-secondary` | `#5C5A54` | `#8E8C86` | Body text, descriptions |
| `--color-text-muted` | `#9A9890` | `#6A6862` | Labels, captions |
| `--color-text-placeholder` | `#B5B2A8` | `#524F49` | Empty inputs |
| `--color-accent` | `#4444D0` (deep indigo) | `#6565E0` (lighter indigo) | Interactive, links, progress |
| `--color-accent-hover` | `#3333B0` | `#7878F0` | Hover accent |
| `--color-accent-active` | `#2222A0` | `#8A8AF8` | Active/pressed accent |
| `--color-accent-soft` | `#EEEEF8` | `#1E1E38` | Accent backgrounds |
| `--color-amber` | `#B07D00` | `#D4A000` | Bookmarks, highlights |
| `--color-amber-soft` | `#FEF4E0` | `#3A2800` | Amber backgrounds |
| `--color-success` | `#1A7A3C` | `#28A050` | Positive states |
| `--color-success-soft` | `#E8F7EE` | `#0D2A1A` | Success backgrounds |
| `--color-error` | `#C42020` | `#E83030` | Error states |
| `--color-error-soft` | `#FDEAEA` | `#3A0D0D` | Error backgrounds |
| `--color-info` | `#1A6FAA` | `#2890CC` | Info states |
| `--color-info-soft` | `#E5F3FB` | `#0A2035` | Info backgrounds |
| `--color-code-bg` | `#F5F4F0` | `#1E1D1B` | Code blocks |
| `--color-code-border` | `#E2E0D9` | `#2E2D29` | Code block borders |

### Typography

**Display font**: `Fraunces` (Google Fonts) — variable optical size, elegant serifs. Used for `h1`, `h2`, the app logo. Soft, editorial, distinctive.

**Body font**: `DM Sans` (Google Fonts) — geometric, humanist, excellent screen legibility at small sizes. Used for all body text, labels, UI.

**Mono font**: `JetBrains Mono` — clear monospace for code blocks.

```
--font-display: 'Fraunces', Georgia, serif;
--font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
```

**Type scale** (base 16px):
- `text-xs`: 11px — labels, metadata
- `text-sm`: 13px — captions, hints
- `text-base`: 15px / 1.75 — body reading
- `text-lg`: 17px / 1.6 — prominent text
- `text-xl`: 20px — card titles
- `text-2xl`: 24px — section headers
- `text-3xl`: 32px — category title
- `text-4xl`: 40px — hero/title

### Spacing System

Base unit: `0.25rem` (4px).

- `space-1`: 4px, `space-2`: 8px, `space-3`: 12px, `space-4`: 16px
- `space-5`: 20px, `space-6`: 24px, `space-8`: 32px, `space-10`: 40px, `space-12`: 48px
- `space-16`: 64px, `space-20`: 80px

### Border Radius

```
--radius-sm: 0.375rem;   /* 6px - small elements */
--radius-md: 0.5rem;     /* 8px - buttons, inputs */
--radius-lg: 0.875rem;   /* 14px - cards, panels */
--radius-xl: 1.125rem;   /* 18px - large panels */
--radius-full: 9999px;   /* pills, avatars */
```

### Shadows

Warm-tinted, never harsh. All shadows use warm neutral base (`rgb(60 55 45 / ...)` in light, `rgb(0 0 0 / ...)` in dark).

```
--shadow-sm: 0 1px 2px 0 rgb(60 55 45 / 0.04);        /* subtle */
--shadow-md: 0 2px 8px -2px rgb(...), 0 1px 3px -1px; /* elevated */
--shadow-lg: 0 8px 24px -4px rgb(...), 0 2px 8px -2px;/* floating */
--shadow-card: 0 1px 4px 0 rgb(...), 0 1px 2px -1px;   /* card default */
--shadow-card-hover: 0 4px 16px -4px rgb(...), 0 2px 6px -2px; /* card hover lift */
```

---

## 3. Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────┐
│  Header (sticky, h-16, backdrop-blur)               │
│  Logo · Search bar (rounded-full) · Theme toggle  │
├─────────────────────────────────────────────────────┤
│  Toolbar (sticky, top-64px, transparent bg)        │
│  Flashcard · Favoris · Mélanger │ Défi · Simulation│
├─────────────────────────────────────────────────────┤
│  Category Pills (max-w-3xl, pt-6 pb-2)             │
│  Rounded pills with count badges, scrollable       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Main (max-w-3xl mx-auto px-6 py-10)               │
│  Category hero (text-4xl display, progress bar)     │
│  Section label (uppercase tracking-widest)          │
│  Question cards (space-y-5)                        │
│                                                     │
└─────────────────────────────────────────────────────┘
│  Footer (surface bg, border-t, two-line info)     │
└─────────────────────────────────────────────────────┘
```

### Visual Pacing
- **Header** (`h-16`): sticky, rgba backdrop with blur, `border-bottom` separator
- **Toolbar** (`top-64px`, `h-12`): sticky, transparent background — floats over content
- **Category pills** (`pt-6 pb-2`): max-w-3xl, gap-2 pills with count badges, hidden scrollbar
- **Main content** (`max-w-3xl mx-auto px-6 py-10`): generous breathing room
- **Cards**: `rounded-xl`, `border border-[var(--color-border)]`, `shadow-card` → `shadow-card-hover` on hover
- **Section spacing**: `space-y-12` between sections, `space-y-5` between cards
- **Mock interview nav**: larger hit targets (`h-10 px-5`), primary accent fill

### Responsive Strategy
- Base: single column, `px-4`
- `sm:` `px-6`
- Content container always centered with `max-w-3xl`

---

## 4. Components

### Header
- `position: sticky; top: 0; z-index: 50`
- `background: rgba(var(--color-bg), 0.85); backdrop-filter: blur(12px)`
- `border-bottom: 1px solid var(--color-border)`
- Logo: inline SVG + `font-display` wordmark
- Search: `rounded-full`, `h-10 pl-10 pr-8`, search icon left, clear button right when active
- Theme toggle: `h-9 w-9` icon button, hover → `accent-soft` fill

### Toolbar
- `position: sticky; top: 64px; z-index: 40`
- `background: var(--color-bg); border-bottom: 1px solid var(--color-border)`
- Buttons: `h-8 px-3`, rounded-full, icon + label
- Active (mode): `bg-accent; color-white`, slight shadow
- Active (challenge): `bg-amber-soft; color-amber` (amber = daily/mock indicator)
- Inactive: transparent, `color-text-secondary`, hover → surface-hover
- Bookmark count badge: `min-w-18px h-18px rounded-full` inside button

### Category Pills
- `max-w-3xl mx-auto px-6 pt-6 pb-2`
- Pill: `h-8 px-3.5 rounded-full font-medium`
- Active: `bg-surface border-color-border shadow-sm`
- Inactive: transparent, muted text, hover → surface-hover
- Count badge: `min-w-20px h-18px rounded-full font-semibold` inside pill

### Question Card
- `bg-surface border border-radius-xl shadow-card`
- Hover: `border-color-border-strong + shadow-card-hover + translateY(-1px)`
- Header: question index (small muted), question text (semibold), bookmark button
- Category tag: `h-6 px-2.5 rounded-full text-xs font-semibold bg-accent-soft text-accent`
- Divider: `h-px w-full bg-border-subtle` (subtle, not harsh)
- Answer: first paragraph `color-text-primary`, subsequent `color-text-secondary`
- Action bar: `bg-surface-raised border-t`, Note button + optional Reveal button
- Note check: green check icon when note exists

### Flashcard Reveal
- `<details>` element, no JavaScript
- `border: 1px dashed border-color` when closed, `border-style: solid border-color-strong` when open
- `bg-surface-raised` closed, `bg-surface` open
- Summary: centered label + hint text, `cursor-pointer list-none`
- Transition: border and background animate over 200ms

### Progress Bar
- Track: `h-1 rounded-full bg-border`
- Fill: `h-full rounded-full bg-accent`, `transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1)`
- Used everywhere: category progress, mock interview progress, daily challenge

### Code Block
- `rounded-lg border code-border bg-code-bg`
- Header: language label (uppercase, tracking) + copy button
- Copy button: hover → `bg-border`, success state turns green with check icon

### Section Header
- Icon wrapper: `w-11 h-11 rounded-lg bg-accent-soft border border-color-subtle`
- Title: `font-display text-xl font-semibold`
- Subtitle: `text-sm color-text-muted`

### Note Editor
- `border: 1px dashed border-color; bg-surface-raised`
- Focus: `border-style: solid border-color-accent; bg-surface; box-shadow: 0 0 0 3px accent-soft`

### Footer
- `border-top: 1px solid border-color; bg-surface`
- Two items: left = "DevPrep — X questions · Y catégories", right = "Z% complété"

---

## 5. Design Tokens (CSS)

```css
/* In styles.css via @theme */
--font-display: 'Fraunces', Georgia, serif;
--font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;

--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.875rem;
--radius-xl: 1.125rem;
--radius-full: 9999px;
```

---

## 6. Animation & Motion

- **No page transitions** — instant navigation for speed
- **No card entrance animations** — avoids layout shift
- **Reveal fade**: `opacity 0 → 1 + translateY(8px → 0)` over 250ms
- **Hover states**: `transition: background 180ms ease, color 180ms ease, border-color 180ms ease`
- **Card hover lift**: `transform: translateY(-1px)` over 200ms + shadow change
- **Button press**: `translateY(1px)` on active state
- **Progress bar**: `width 400ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Dark mode**: `transition: background-color 250ms ease, color 250ms ease, border-color 250ms ease`

---

## 7. Accessibility

- All interactive elements keyboard-navigable
- Focus ring: `outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 3px`
- Color contrast: all text meets WCAG AA (4.5:1 minimum)
- `prefers-reduced-motion`: disable transitions if set
- ARIA labels on icon-only buttons (theme toggle, bookmark, copy)

---

## 8. Implementation Checklist

- [x] Import Google Fonts (Fraunces, DM Sans, JetBrains Mono) in `index.html`
- [x] Rewrite `styles.css` with comprehensive `@theme` tokens and warm color palette
- [x] Update all 12 components to use design tokens — no hardcoded colors in templates
- [x] Header: sticky with blur, rounded-full search, theme toggle with hover
- [x] Toolbar: transparent bg, sticky at top-64px, challenge buttons amber-tinted
- [x] Category pills: surface bg, count badges, hidden scrollbar
- [x] Question cards: hover lift, soft divider, surface-raised action bar
- [x] Flashcard reveal: dashed → solid border transition, smooth open state
- [x] Footer: two-line layout with completion percentage
- [x] System `prefers-color-scheme` detection on first load (no flash)
- [x] Persist theme choice in `localStorage`
- [x] Build: zero errors, clean bundle