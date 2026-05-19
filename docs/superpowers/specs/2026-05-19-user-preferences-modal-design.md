# User Preferences Modal — Design Spec

## Overview

Add a "user preferences" modal accessible via the user badge in the header. The modal has three sections: **Profile**, **Theme**, and **Stack**. Stack selections filter which interview categories are shown in the main app.

---

## Components

### 1. `UserPreferencesComponent` (new)

**Location:** `src/app/shared/components/user-preferences/user-preferences.component.ts`

**Trigger:** Header user badge (replaces inline "Déconnexion" button).

**Sections:**

#### Profile
- Display name (editable — `user_metadata.name` from Supabase auth)
- Email (read-only, from auth)
- Save button → calls `auth.updateProfile(name)`

#### Theme
- Three-way toggle: **Light / Dark / System**
- Radio-button style cards
- Selection persisted to `localStorage` key `theme-preference`
- `interviewService.toggleTheme()` wired up to apply immediately

#### Stack
- List of all available interview categories
- Multi-select chips (toggle on/off)
- Stored in `user_metadata.stack` in Supabase auth
- **Controls category visibility in `InterviewService`** — only selected categories appear in the category pills and main view

---

## Data Flow

```
UserPreferencesComponent
  └── AuthService
        └── Supabase auth.updateUser({ data: { name, stack } })

InterviewService
  └── activeCategories = computed filtering categoryTree by user.stack
```

`activeCategories` is a new computed in `InterviewService` that returns only categories whose IDs are in `userState.stack()`. The header category pills and `InterviewShellPage` use `activeCategories` instead of `categoryTree` when a stack is set.

---

## UX Details

- Modal opened via `showPreferences.set(true)` signal in header
- Header shows user badge only when `auth.user()` is non-null
- Clicking outside or X closes modal
- On save: success toast/msg, modal closes, UI updates immediately
- Empty stack = show all categories (no filtering)

---

## Acceptance Criteria

- [ ] User badge in header opens preferences modal
- [ ] Profile section pre-fills name and email from auth session
- [ ] Theme selection immediately applies dark/light mode
- [ ] Stack selection persists and filters categories in the main app
- [ ] Preferences survive page reload (persisted in Supabase auth + localStorage for theme)
- [ ] Build passes clean
