# Admin AI Assist — Inline Toolbar Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement task-by-task.

**Goal:** Add AI toolbar buttons (Review, Format, Rewrite, Expand, Code) to the Answer and Deep Dive fields in the admin question editor, powered by Google Gemini.

**Architecture:** `AiService` wraps `@google/generative-ai`, exposes signals for loading/suggestion/error state, consumed by the admin page. `AiToolbarComponent` and `AiBannerComponent` are pure presentational components. Prompts live in typed template functions under `shared/ai/prompts/`.

**Tech Stack:** Angular v22, Vitest, `@google/generative-ai`, Angular Signals, `@angular/cdk/drag-drop` (existing)

---

## Global Constraints
- Angular v22: standalone components, `input()`/`output()`, signals, `@angular/forms/signals`, no NgModules
- Use `@Service()` for all services
- Use `inject()` over constructor injection
- No `ChangeDetectionStrategy` (OnPush is the default)
- API key via `InjectionToken` — never hardcode
- Follow existing patterns from `AdminContentService` in the same feature

---

### Task 1: AI Config & Prompt Templates

**Files:**
- Create: `src/app/core/config/ai.config.ts`
- Create: `src/app/core/ai/ai-provider.service.ts`
- Create: `src/app/shared/ai/prompts/answer-prompts.ts`
- Create: `src/app/shared/ai/prompts/deep-dive-prompts.ts`

**Interfaces (copy verbatim — later tasks rely on these):**

```typescript
// src/app/core/ai/ai-provider.service.ts
export const AI_PROVIDER_CONFIG = new InjectionToken<AiProviderConfig>('ai.config', {
  providedIn: 'root',
});
export interface AiProviderConfig { apiKey: string; }
export interface AiSuggestion { original: string; result: string; action: string; timestamp: number; }
export interface AiError { code: 'network' | 'rate_limit' | 'api_error' | 'empty_response'; message: string; }
```

**Interfaces for prompts (copy verbatim — service and page rely on these):**

```typescript
// src/app/shared/ai/prompts/answer-prompts.ts
export type AnswerAction = 'format' | 'rewrite' | 'expand' | 'review' | 'code';
export function formatAnswer(answer: string): string
export function rewriteAnswer(answer: string): string
export function expandAnswer(answer: string): string
export function reviewAnswer(answer: string): string
export function generateCodeExample(question: string, language: string): string
```

```typescript
// src/app/shared/ai/prompts/deep-dive-prompts.ts
export type DeepDiveAction = 'format' | 'rewrite' | 'expand' | 'review';
export function formatDeepDive(text: string): string
export function rewriteDeepDive(text: string): string
export function expandDeepDive(text: string): string
export function reviewDeepDive(text: string): string
```

- [ ] **Step 1: Create `src/app/core/config/ai.config.ts`**
Export `AI_PROVIDER_CONFIG` as above. No implementation — pure token definition.

- [ ] **Step 2: Create `src/app/core/ai/ai-provider.service.ts`**

```typescript
import { Service, inject } from '@angular/core';
import { GoogleGenerativeAI, Type } from '@google/generative-ai';
import { AI_PROVIDER_CONFIG, type AiProviderConfig, type AiSuggestion, type AiError } from '../config/ai.config';
import { formatAnswer, rewriteAnswer, expandAnswer, reviewAnswer, generateCodeExample, type AnswerAction } from '../../shared/ai/prompts/answer-prompts';
import { formatDeepDive, rewriteDeepDive, expandDeepDive, reviewDeepDive, type DeepDiveAction } from '../../shared/ai/prompts/deep-dive-prompts';

export { type AiSuggestion, type AiError, type AnswerAction, type DeepDiveAction };

@Service()
export class AiService {
  private readonly config = inject(AI_PROVIDER_CONFIG);
  private readonly genAI = new GoogleGenerativeAI(this.config.apiKey);

  private model(model: string = 'gemini-2.0-flash') {
    return this.genAI.getGenerative({ model });
  }

  async actAnswer(
    action: AnswerAction,
    answer: string,
    question: string,
    language: string,
  ): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
    const prompts: Record<AnswerAction, () => string> = {
      format: () => formatAnswer(answer),
      rewrite: () => rewriteAnswer(answer),
      expand: () => expandAnswer(answer),
      review: () => reviewAnswer(answer),
      code: () => generateCodeExample(question, language),
    };
    const prompt = prompts[action]();
    return this._call(prompt, action);
  }

  async actDeepDive(
    action: DeepDiveAction,
    text: string,
  ): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
    const prompts: Record<DeepDiveAction, () => string> = {
      format: () => formatDeepDive(text),
      rewrite: rewriteDeepDive(text),
      expand: () => expandDeepDive(text),
      review: () => reviewDeepDive(text),
    };
    const prompt = prompts[action]();
    return this._call(prompt, action);
  }

  private async _call(prompt: string, action: string): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
    try {
      const result = await this.model().generateContent(prompt);
      const response = result.response;
      const resultText = response.text().trim();
      if (!resultText) return { error: { code: 'empty_response', message: 'AI returned no content.' } };
      return { suggestion: { original: prompt, result: resultText, action, timestamp: Date.now() } };
    } catch (e: any) {
      if (e?.status === 429) return { error: { code: 'rate_limit', message: 'Slow down — try again in a moment.' } };
      if (e?.status === 403 || e?.message?.includes('API_KEY')) return { error: { code: 'api_error', message: 'AI unavailable — check your API key.' } };
      return { error: { code: 'network', message: 'AI unavailable — try again.' } };
    }
  }
}
```

Note: `_call` strips the system prompt from `original` — it stores the user prompt, not the system prompt. The `original` field in `AiSuggestion` stores the **field's current content** before the action was applied — the page passes current content explicitly in `actAnswer`/`actDeepDive` calls. The `original` in `AiSuggestion` from `_call` stores the prompt sent — fix this: change `_call` to accept `original` as a parameter:

```typescript
private async _call(prompt: string, action: string, original: string): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
  // ... existing body, but return includes: { suggestion: { original, result: resultText, action, timestamp: Date.now() } }
}
```

Update `actAnswer` and `actDeepDive` signatures:
```typescript
async actAnswer(action: AnswerAction, currentContent: string, question: string, language: string): Promise<...>
async actDeepDive(action: DeepDiveAction, currentContent: string): Promise<...>
```

Pass `answer`/`text` as `original` in each call to `_call`.

- [ ] **Step 3: Create `src/app/shared/ai/prompts/answer-prompts.ts`**

Write exact prompt functions (copy verbatim from interfaces above). Each function takes content strings and returns a system-prompt + user-prompt string to pass to `AiService._call`. Example for `formatAnswer`:

```typescript
export function formatAnswer(answer: string): string {
  return `You are a technical content editor. Format this answer for clarity and consistency.

Rules:
- Normalise heading levels (## and ### only)
- Wrap lines at 80 characters
- Ensure code blocks use proper fences (\`\`\`) with language tags
- Add blank lines between paragraphs
- Remove redundant phrasing
- Output only the formatted content — no commentary.

Content to format:
${answer}`;
}
```

Implement all 5 functions. Keep prompts concise (under 500 words system prompt total).

- [ ] **Step 4: Create `src/app/shared/ai/prompts/deep-dive-prompts.ts`**

Same structure as answer-prompts but for deep-dive markdown content. 4 functions: `formatDeepDive`, `rewriteDeepDive`, `expandDeepDive`, `reviewDeepDive`. `reviewDeepDive` returns markdown with `[suggestion: ...]` inline markers for admin to review manually.

- [ ] **Step 5: Run build to verify types**

Run: `npx ng build --configuration=development 2>&1 | grep ERROR`
Expected: no errors from new files

---

### Task 2: Presentational Components

**Files:**
- Create: `src/app/shared/components/ai-toolbar.component.ts`
- Create: `src/app/shared/components/ai-banner.component.ts`

- [ ] **Step 1: Create `src/app/shared/components/ai-toolbar.component.ts`**

```typescript
// Inputs
loading = input(false);
disabled = input(false);
```

```html
<!-- Actions config passed via content projection or inputs — use 5 icon+label buttons -->
<!-- Lucide icons: sparkles (Review), align-left (Format), refresh-cw (Rewrite), plus-circle (Expand), code (Code) -->
<!-- Each button: type=button, [disabled]="loading() || disabled()" -->
<!-- Emit action: output<AnswerAction | DeepDiveAction>() on click -->
```

Full inline template and brutalist matching styles (sharp corners, `--color-text-primary` borders, uppercase labels, letter-spacing). Buttons use `opacity` transition for loading state. Use LucideAngularModule for icons.

```typescript
@Component({
  selector: 'app-ai-toolbar',
  imports: [LucideAngularModule],
  template: `...`,
  styles: `...`,
})
export class AiToolbarComponent {
  loading = input(false);
  disabled = input(false);
  readonly actions = [
    { id: 'review', label: 'Review', icon: 'sparkles' },
    { id: 'format', label: 'Format', icon: 'align-left' },
    { id: 'rewrite', label: 'Rewrite', icon: 'refresh-cw' },
    { id: 'expand', label: 'Expand', icon: 'plus-circle' },
    { id: 'code', label: 'Code', icon: 'code' },
  ];
  actionSelected = output<string>();
  // map id → field (pass as input or detect from context)
  // For simplicity: accept field input:
  field = input.required<'answer' | 'deepDive'>();
  // emit output with { action, field }
}
```

Add `field: 'answer' | 'deepDive'` input. Map each button id to the field-specific prompt type string ('answer' | 'deep-dive').

- [ ] **Step 2: Create `src/app/shared/components/ai-banner.component.ts`**

```typescript
@Component({
  selector: 'app-ai-banner',
  imports: [LucideAngularModule],
  template: `
    <div class="banner" role="status" aria-live="polite">
      <span class="banner-label">{{ action }} by AI</span>
      <!-- Simple line diff: split original/result by newline, show changed lines highlighted with background: var(--color-accent-soft) -->
      <!-- Accept button: solid accent fill, dismiss button: ghost -->
    </div>
  `,
  styles: `
    .banner { display:flex; align-items:center; gap:0.75rem; padding:0.5rem 0.75rem;
      background:var(--color-accent-soft); border-top:1.5px solid var(--color-accent); }
    .banner-label { font-size:0.6875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em;
      color:var(--color-accent); flex-shrink:0; }
    .diff-view { flex:1; overflow:auto; max-height:200px; font-family:var(--font-mono); font-size:0.75rem; line-height:1.6; }
    .diff-line { padding:0.125rem 0.375rem; }
    .diff-line.changed { background:var(--color-accent-soft); }
    .diff-line.added { background:var(--color-success-soft); color:var(--color-success); }
    /* accept btn: accent fill, dismiss btn: ghost */
  `,
})
export class AiBannerComponent {
  suggestion = input.required<AiSuggestion>();
  accepted = output<void>();
  dismissed = output<void>();
  actionLabel = computed(() => this.suggestion().action.toUpperCase());
  readonly diffLines = computed(() => diffLines(this.suggestion().original, this.suggestion().result));
}
```

Implement `diffLines(original: string, result: string): DiffLine[]` as a pure function:
```typescript
export interface DiffLine { text: string; type: 'unchanged' | 'added' | 'removed'; }
export function diffLines(a: string, b: string): DiffLine[]
```

Simple O(n) line-by-line LCS diff. Lines present in `b` not in `a` are 'added', lines in `a` not in `b` are 'removed', rest are 'unchanged'. Align by index.

- [ ] **Step 3: Run build to verify**

Run: `npx ng build --configuration=development 2>&1 | grep ERROR`
Expected: no errors from new components

---

### Task 3: Service Signal State & Page Integration

**Files:**
- Modify: `src/app/features/admin/pages/admin-question-edit.page.ts`
- Modify: `src/app/features/admin/pages/admin-question-edit.page.html`
- Modify: `src/app/app.config.ts` (add AI_PROVIDER_CONFIG provider)
- Modify: `src/environments/environment.ts` (add `geminiApiKey: ''`)

- [ ] **Step 1: Add `geminiApiKey` to `environment.ts`**

Add `geminiApiKey: ''` (empty string for now; user sets it). Read current environment.ts first with `cat src/environments/environment.ts`.

- [ ] **Step 2: Add `AI_PROVIDER_CONFIG` provider to `app.config.ts`**

```typescript
import { AI_PROVIDER_CONFIG } from '@core/config/ai.config';

providers: [
  // existing providers...
  { provide: AI_PROVIDER_CONFIG, useValue: { apiKey: environment.geminiApiKey } },
]
```

Add the import and provider to the `providers` array.

- [ ] **Step 3: Update `admin-question-edit.page.ts`**

Inject `AiService`. Add signals:
```typescript
readonly aiLoading = signal(false);
readonly aiError = signal<string | null>(null);
readonly aiSuggestion = signal<AiSuggestion | null>(null);
readonly aiField = signal<'answer' | 'deepDive' | null>(null);
```

Add handlers:
```typescript
async onAiAction(field: 'answer' | 'deepDive', action: string): Promise<void> {
  this.aiLoading.set(true);
  this.aiError.set(null);
  const current = field === 'answer' ? this.model().answer : this.model().deepDive ?? '';
  const result = field === 'answer'
    ? await this.ai.actAnswer(action as AnswerAction, current, this.model().question, this.model().language ?? 'typescript')
    : await this.ai.actDeepDive(action as DeepDiveAction, current);
  this.aiLoading.set(false);
  if ('error' in result) { this.aiError.set(result.error.message); return; }
  this.aiSuggestion.set(result.suggestion);
  this.aiField.set(field);
}

acceptAiSuggestion(): void {
  const s = this.aiSuggestion();
  const field = this.aiField();
  if (!s || !field) return;
  if (field === 'answer') {
    this.model.update(m => ({ ...m, answer: s.result }));
  } else {
    this.model.update(m => ({ ...m, deepDive: s.result }));
  }
  this.clearAiState();
}

clearAiState(): void { this.aiSuggestion.set(null); this.aiError.set(null); this.aiField.set(null); }
```

Wire `acceptAi`/`dismissAi` to banner events in template.

- [ ] **Step 4: Update `admin-question-edit.page.html`**

Above `app-answer-editor`, add `app-ai-toolbar`:
```html
<app-ai-toolbar
  [loading]="aiLoading()"
  field="answer"
  (action)="onAiAction('answer', $event)"
/>
```

Below toolbar and above field, conditionally render `app-ai-banner` when `aiSuggestion()` is non-null, passing `suggestion` input and binding `accepted`/`dismissed` outputs.

Same pattern for Deep Dive field. For Code field: no toolbar. For Question field: no toolbar.

Build: `npx ng build --configuration=development 2>&1 | grep ERROR` — fix until clean.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(admin): AI assist toolbar foundation — Gemini provider, prompts, toolbar, banner, page integration

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Polish & Error States

**Files:**
- Modify: `src/app/shared/components/ai-banner.component.ts`
- Modify: `src/app/features/admin/pages/admin-question-edit.page.ts`

- [ ] **Step 1: Error banner in page template**

In `admin-question-edit.page.html`, add error display when `aiError()` is non-null:
```html
@if (aiError(); as err) {
  <div class="ai-error" role="alert">
    <lucide-icon name="alert-circle" class="w-4 h-4" />
    {{ err }}
    <button type="button" class="error-dismiss" (click)="clearAiState()">Dismiss</button>
  </div>
}
```

Add `.ai-error` styles in `admin-question-edit.page.css`:
```css
.ai-error {
  display:flex; align-items:center; gap:0.5rem;
  padding:0.5rem 0.75rem; margin-bottom:1rem;
  background:var(--color-error-soft); border-left:3px solid var(--color-error);
  color:var(--color-error); font-size:0.8125rem; font-weight:600;
  animation: slideDown 200ms ease-out;
}
.error-dismiss {
  margin-left:auto; border:none; background:none; cursor:pointer;
  color:var(--color-error); font-size:0.75rem; font-weight:600; text-decoration:underline;
}
@keyframes slideDown { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:none} }
```

- [ ] **Step 2: Loading state for banner**

In `ai-banner.component.ts`, handle loading state (passed as input). When loading: show skeleton pulse animation instead of diff.

- [ ] **Step 3: Verify build clean**

Run: `npx ng build --configuration=development 2>&1 | grep ERROR` — fix until clean.

---

### Task 5: Review & Push

- [ ] **Step 1: Final build**

Run: `npx ng build --configuration=development 2>&1 | tail -5`
Expected: `Application bundle generation complete.`

- [ ] **Step 2: Git status and push**

```bash
git status
git push
```

**Spec covered by this plan:**
- [x] Provider layer with InjectionToken
- [x] Prompt library with typed functions
- [x] `AiSuggestion` model
- [x] Toolbar buttons: Review, Format, Rewrite, Expand, Code
- [x] Diff banner with Accept/Dismiss
- [x] Loading state (button disable + banner skeleton)
- [x] Error state (banner error in page)
- [x] State machine: Idle → Loading → Suggestion → Accept/Dismiss/Error
- [x] Answer and Deep Dive fields only; Question and Code excluded
- [x] No streaming / history / conversation in v1
