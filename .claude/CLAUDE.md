# CLAUDE.md — Angular v22 / TypeScript Engineering Guide

You are an expert in TypeScript, Angular, and scalable web application
development. You write functional, maintainable, performant, and accessible
code following Angular and TypeScript best practices.

> Target: **Angular v22** (released 2026-06-03). Verify version-sensitive claims
> against angular.dev before relying on them; the framework moves fast.

---

## Toolchain requirements (v22)
- **TypeScript 6 is required.** TypeScript 5.9 and older are not supported.
- **Node 22 is the minimum**; Node 20 is dropped; Node 26 is supported.
- Use **ESLint** (TSLint is dead). Enforce lint + typecheck in CI.

## TypeScript Best Practices
- Use strict type checking (`strict: true`); also enable `strictTemplates` and
  prefer `noUncheckedIndexedAccess`.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when the type is uncertain, then narrow.

## Angular Best Practices
- Always use standalone components over NgModules.
- Must NOT set `standalone: true` in Angular decorators — it's the default in v20+.
- Use signals for state management.
- Implement lazy loading for feature routes (`loadComponent` / `loadChildren`).
- Use `injectAsync()` (v22) to lazily inject heavy/feature-specific dependencies
  that shouldn't load at startup; it complements lazy routes (route lazy-loading
  defers the component, but its services are otherwise bundled eagerly).
- Do NOT use `@HostBinding` / `@HostListener` decorators. Put host bindings in
  the `host` object of the `@Component` / `@Directive` decorator instead.
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements
- MUST pass all AXE checks.
- MUST meet WCAG AA minimums: focus management, color contrast, ARIA attributes.
- Prefer the stable **Angular Aria** primitives (v22) for accessible behaviors
  rather than hand-rolling ARIA where a primitive exists.

## Components
- Keep components small and focused on a single responsibility.
- Use `input()` / `output()` functions instead of decorators; `model()` for
  two-way binding.
- Use `computed()` for derived state — never a manually-synced field.
- **Change detection:** OnPush is the default in v22.
  - Must NOT set `changeDetection: ChangeDetectionStrategy.OnPush` — it's
    redundant (the CLI no longer emits it).
  - Never write `ChangeDetectionStrategy.Default` — it was renamed to `Eager`.
  - Treat any existing `ChangeDetectionStrategy.Eager` as a modernization TODO:
    a component still relying on the old check-always behavior, to be migrated
    to signals + OnPush.
- Prefer inline templates for small components.
- Prefer **Signal Forms** (`form()` / `FormField` from `@angular/forms/signals`,
  stable in v22) over Reactive or Template-driven forms. Touched state is the
  readonly `touched` signal on `FieldState`; set it via `markAsTouched()`, not
  by writing to `touched` directly.
- Do NOT use `ngClass` — use `class` bindings.
- Do NOT use `ngStyle` — use `style` bindings.
- When using external templates/styles, use paths relative to the component TS file.

## State Management
- Use signals for local component state.
- Use `computed()` for derived state; keep transformations pure and predictable.
- Do NOT use `mutate` on signals — use `update` or `set`.
- Default to signals + plain injectable stores. Do NOT reach for NgRx by default;
  adopt a state library only for a concrete need it solves (time-travel
  debugging, complex cross-feature event sourcing), never preemptively.

## Async data
- Use the stable Resource APIs (v22) for reactive async **reads**:
  `httpResource()` for HTTP, `resource()` / `rxResource()` for general async.
  (Exception: Supabase reads go through the SDK query builder, not
  `httpResource` — see the Supabase section.)
  A signal used inside the request lambda re-runs it on change.
- Use plain async service methods for side-effecting **writes** (POST/PUT/DELETE)
  — do NOT force commands into resources.
- The `HttpClient` uses the Fetch API by default in v22. Fetch has no upload
  progress; use `reportUploadProgress` / `reportDownloadProgress` (not the
  deprecated `reportProgress`) where progress is needed.

## Templates
- Keep templates simple; avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`,
  `*ngFor`, `*ngSwitch`. Always provide `track` in `@for`.
- Use `@defer` to lazy-load heavy or below-the-fold UI out of the initial bundle.
- Use the async pipe for observables (or migrate the source to a signal/resource).
- Optional chaining in templates now returns `undefined` (not `null`) — align
  any equality checks accordingly.
- Do not assume globals like `new Date()` are available; inject what you need.

## Services
- Design services around a single responsibility.
- Use the `@Service()` decorator (v22) for the common root-singleton case instead
  of `@Injectable({ providedIn: 'root' })`. Use `@Service({ autoProvided: false })`
  to opt out of root provision (then provide at app/route/component level).
  `@Injectable()` remains valid where non-root provider configs are needed.
- Use the `inject()` function instead of constructor injection.
  - TEAM CONVENTION (not a framework limitation): prefer `inject()` exclusively
    in `@Service()` classes for consistency. (`@Service()` does not *require*
    abandoning constructor params at the framework level — this is our standard,
    so state it as such, don't assert it as an Angular rule.)

## Zoneless caveat (critical for correctness)
v22 is signal-first and zoneless-oriented. Callbacks originating **outside**
Angular — SDK events, WebSocket `onmessage`, `socket.io` handlers, `setTimeout`
— only trigger a render if they **write a signal**. Updating a plain field from
such a callback will not re-render. This is the most common zoneless bug; always
route external async results through a signal.

## Testing
- **Vitest is the default runner** in v22 (jsdom environment); Karma/Jasmine are
  still supported but legacy. Write new specs for Vitest.
- `describe`/`it`/`expect`/`vi` — globals work because `tsconfig.spec.json` has
  `types: ["vitest/globals"]`. Use `vi.fn()` / `vi.spyOn()` (not Jasmine spies).
- In CI run `ng test --no-watch` (watch defaults on in a terminal).
- **`fakeAsync` / `tick` / `waitForAsync` throw a ProxyZone error under Vitest** —
  either apply the experimental zone-testing patch or rewrite with Vitest fake
  timers (`vi.useFakeTimers()`). Don't reach for `fakeAsync` reflexively.
- What to test at each layer:
  - `shared/util` pure functions → plain unit tests, no TestBed.
  - signal stores → assert signal/`computed` transitions directly (no DOM).
  - dumb `ui` components → component tests on inputs→render and output emissions.
  - critical flows → a few E2E (Playwright/Cypress). Protractor is dead — never use it.
- Mock at the boundary: stub the injectable service wrapping an SDK/HTTP, not the
  SDK internals. Don't mock signals — drive them with real `set()`.
- For legacy/untested migrations, write a characterization test before porting a
  behavior so a regression is visible.

## Error handling
- One **typed error model** in `core/http`; normalize every failure to it. UI and
  stores consume that shape, never a raw exception or raw `HttpErrorResponse`.
- A functional **HTTP interceptor** maps transport/HTTP errors to the model
  (status → domain error), attaches correlation ids, and centralizes retry/auth-refresh.
- A global `ErrorHandler` is the last resort for unexpected throws — log to the
  telemetry abstraction, show a generic fallback; it is not your primary strategy.
- Surface errors as state, not control flow: prefer a resource's error/loading
  signals or an explicit `error` signal on a store over scattered try/catch in UI.
- Never swallow errors silently. If you catch to continue, log via the
  abstraction and record why.

## RxJS ↔ signals interop
- Signals are the default for state and templates. Keep RxJS where it's genuinely
  better: complex async orchestration (debounce, switchMap, retry, race,
  combineLatest), and event streams.
- Bridge with `toSignal()` (observable → signal, for templates/derived state) and
  `toObservable()` (signal → observable, to feed an Rx pipeline). Don't manually
  `.subscribe()` and `.set()` a signal — that's what `toSignal` is for.
- `toSignal()` auto-unsubscribes on injector destroy; manual subscriptions need
  `takeUntilDestroyed()`. Never leave a bare subscription uncleaned.
- For reactive HTTP reads prefer `httpResource()` over a hand-built
  observable+`toSignal` chain — it gives loading/error/value signals for free.
  (Not for Supabase — wrap the SDK and bridge with `resource()`/`toSignal()`.)
- Don't wrap a plain synchronous value in an Observable to feel "reactive" —
  use a signal.

## Security
- Trust Angular's default sanitization; do NOT reach for `bypassSecurityTrust*`
  except on genuinely trusted input, and isolate/comment it when you must.
- Never build HTML by string concatenation with user input. Use bindings/templates.
- Client-side role/permission gates are **UX only** — every authorization
  decision must be enforced server-side. A hidden button is not security.
- Never commit secrets/keys. Runtime config via `InjectionToken`; secrets stay
  server-side.
- Store tokens deliberately (prefer httpOnly cookies where the backend allows);
  be explicit about XSS/CSRF posture rather than defaulting to `localStorage`.
- Validate/encode anything crossing a trust boundary, including data from
  third-party SDKs and websockets, before it drives UI or navigation.

## Performance (v22-aware)
- OnPush + signals is the baseline; updates from outside Angular must write a
  signal to render (see Zoneless caveat).
- `@defer` heavy or below-the-fold UI with explicit triggers (`on idle`,
  `on viewport`, `on interaction`) — keep large SDKs (e.g. editors, charts) out
  of the initial bundle.
- Lazy-load every feature route; pair with `injectAsync()` for heavy
  feature-only services.
- Always `track` in `@for`. Use CDK **virtual scrolling** for large lists.
- Incremental hydration is the v22 SSR default — let `@defer` drive it; avoid
  eagerly hydrating below-the-fold regions.
- `NgOptimizedImage` with `priority` on LCP images; lazy by default otherwise.
- Treat **bundle size as a tracked metric** (CI budget). Perceived "scale"
  problems are usually bundle bloat, not architecture.
- Profile before optimizing: the v22 signal-graph and DI-graph DevTools show
  what's actually re-running.

## Supabase (Auth + Postgres data)
This project uses Supabase for **authentication** and **Postgres data**
(`@supabase/supabase-js`). Treat it like every other volatile SDK: **wrapped,
never imported directly in `ui` / `pages` / `state`.**

- **One client, one place.** Create the `SupabaseClient` once in a `core`
  service (`core/supabase/supabase-client.ts`). Nothing else calls
  `createClient`. Features depend on your services, not on `supabase-js`.
- **Keys:** use the new **publishable** key (`sb_publishable_…`) client-side; the
  legacy `anon` key is being deprecated (end of 2026). The publishable/anon key
  is safe in the browser **only because RLS enforces access**. NEVER put the
  `service_role` / secret key in Angular code — it bypasses all security.
- Provide URL + publishable key via `InjectionToken` (not scattered
  `environment` imports), per the config rule above.

### Data — overrides the generic httpResource rule
- For Supabase reads, use the **SDK query builder**
  (`supabase.from('t').select()`), wrapped in a feature `data/` service —
  **do NOT** front it with `httpResource()`. `httpResource` builds a raw URL and
  bypasses the SDK's auth headers, RLS-aware client, and typed queries. The
  "httpResource for reads" rule applies to plain REST backends, not Supabase.
- Bridge SDK promises/observables to signals with `resource()` /
  `rxResource()` / `toSignal()` so templates stay signal-driven. Writes
  (insert/update/delete) are plain async service methods, not resources.
- Type your tables: generate types with the Supabase CLI
  (`supabase gen types typescript`) and type query results; don't hand-write row
  shapes that drift from the schema.
- **RLS is the real authorization.** A query returns only policy-permitted rows.
  Client-side guards/role checks remain UX-only (see Security) — never assume a
  filter in the query is a security boundary; the RLS policy is.
- Always handle the `{ data, error }` envelope every Supabase call returns;
  normalize `error` into the app's typed error model (see Error handling). Never
  read `data` without checking `error`.

### Auth — replaces custom JWT/session logic
- `supabase.auth` owns sign-in/up/out and session/token lifecycle (access +
  refresh tokens, refresh handling). Do not hand-roll JWT decode/refresh.
- Wrap it in `core/auth/session-store.ts`: expose `user` / `session` /
  `isAuthenticated` as signals. `onAuthStateChange` is a **callback** — under
  zoneless it MUST write a signal to trigger render (see Zoneless caveat).
- Functional route guards read the session signal (the auth-guard pattern).
- For SSR, use `@supabase/ssr` for cookie-based session handling rather than
  the browser client; don't share a single client across server requests.
- App-specific user data lives in a `profiles` table keyed to `auth.users`, not
  crammed into auth metadata.

## Enforcement
A rule that isn't enforced decays. Wire boundary lint
(`eslint-plugin-boundaries` or equivalent), strict TS, and these conventions
into CI so violations fail the build rather than relying on review.
