# Admin Content Management — Design

## 1. Concept

Prism gets an `/admin` section for managing the question bank (categories, sections, questions) directly against Supabase, replacing manual SQL/dashboard edits. Built fresh on the current architecture rather than ported from the earlier `feat/admin-panel` branch, which predates Signal Forms, the `@core`/`@shared`/`@features` boundary lint, and had no real authorization model.

## 2. Data & security model

- **`profiles` table** (`id uuid PK → auth.users`, `role text default 'user' check in ('user','admin')`) holds the role. Populated by a `security definer` trigger on `auth.users` insert. No UPDATE policy exists — granting admin is a manual Supabase dashboard edit only. This replaces the old branch's `user_metadata.is_admin`, which was client-writable via `auth.updateUser()`.
- **RLS enabled on `categories`/`sections`/`questions`** — previously disabled despite "Anyone can read" policies already existing, meaning the publishable key had open write access to all three tables. Public SELECT policies (`to public`) are unchanged; INSERT/UPDATE/DELETE are admin-only, split into separate per-action policies (not `FOR ALL`) to avoid redundant SELECT evaluation against the existing public read policy.
- **Cascade deletes**: `sections`/`questions` FKs to `categories`/`sections` changed from `NO ACTION` to `ON DELETE CASCADE`. The four `user_bookmarks`/`user_notes`/`user_revealed`/`user_viewed` tables had **no FK at all** on `question_id` — fixed with `ON DELETE CASCADE` FKs, closing an orphan-row bug as a byproduct.
- **`admin_count_dependents(question_ids text[])` RPC** — `security definer`, self-checks the caller's admin role, returns counts only (never row content) for `user_bookmarks`/`notes`/`revealed`/`viewed`. Needed because RLS restricts those tables to each user's own rows, so a direct client-side count would only ever see the admin's own data.
- All new RLS policies use `to authenticated` explicitly and wrap `auth.uid()` as `(select auth.uid())` for planner caching, per Supabase's documented RLS performance guidance. Added indexes on the four tables' `question_id` columns — previously only the second column of a composite PK, unusable for the new cascade FKs or the RPC's lookup.

## 3. Module architecture

- `core/guards/admin.guard.ts` — `CanMatch`, awaits `AuthService.untilReady()` then checks `isAdmin()`.
- `AuthService` extended with a `resource()`-backed `profile` fetch (keyed on user id) and `isAdmin = computed(...)`.
- `features/admin/` (depends only on `core`/`shared`, boundary-lint clean):
  - `data/admin-content.service.ts` — single `@Service()`: loads categories/sections/questions, CRUD + `reorder()` (sets `sort_order` to array index) + `countDependents()`, maps `PostgrestError` to a small `{ kind: 'forbidden' | 'conflict' | 'unknown' }` shape.
  - `components/` — `category-form-dialog`, `section-form-dialog` (Signal Forms), `delete-confirm-dialog` (two-tier: typed-name confirmation for categories, itemized-impact list for sections/questions).
  - `pages/admin-shell.page.ts`, `admin-browser.page.ts` (tree browser), `admin-question-edit.page.ts` (full-page editor).
  - `admin.routes.ts`, lazy-loaded under `/admin` in `app.routes.ts` guarded by `adminGuard`.

## 4. UI/UX

- **Browser**: category → section → question tree with debounced search (auto-expands matches), inline create/edit/delete per level, reorder via CDK drag handle *and* explicit ▲▼ buttons. CDK drag-drop is pointer-only (verified against the installed package — no built-in keyboard support), so the buttons are the actual accessible mechanism, satisfying WCAG 2.2 SC 2.5.7.
- **Editor**: breadcrumb, prev/next nav across the full question list, Signal Forms fields, Edit/Preview/Split tabs for the `deep_dive` markdown field via the existing `MarkdownService`. Supports both edit (`/admin/questions/:id`) and create (`/admin/questions/new?categoryId=&sectionId=`) in one component via a `linkedSignal` that resets the form model when the route's question changes.
- **Delete confirmation**: title phrased as a question, itemized impact list from `countDependents()`, destructive-styled confirm button, default focus on Cancel (`cdkTrapFocus` + `cdkFocusInitial`). Category deletes additionally require typing the category name.

## 5. Error handling

No app-wide typed-error model exists yet (`AuthService` uses ad hoc `{ error: string | null }`); Supabase's `{ data, error }` envelope is normalized per-call in `admin-content.service.ts` instead of through an `HttpClient` interceptor, since Supabase isn't a generic REST backend. RLS-denial (`42501`) maps to a `forbidden` kind, surfaced as a banner — defends against a role being revoked mid-session.

## 6. Testing

Unit/component tests were explicitly skipped for this feature per user instruction. Manual verification performed instead: `ng build` and `ng lint` both pass with zero errors; Supabase security and performance advisors clean (aside from informational "unused index" notices on indexes created in this change, and a pre-existing, unrelated "leaked password protection disabled" toggle).
