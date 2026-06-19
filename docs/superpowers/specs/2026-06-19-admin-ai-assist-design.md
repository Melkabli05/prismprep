# Admin AI Assist — Inline Toolbar

## Context

The admin question editor has three rich fields: Question, Answer (markdown), and Deep Dive (markdown). This spec adds an AI assist layer via toolbar buttons powered by Google Gemini. The admin selects a field, clicks an action, and the AI transforms or generates content in-place.

## Architecture

### Provider Layer
- Single `AiProvider` service wrapping `@google/generative-ai`
- API key via `InjectionToken` (runtime config, not hardcoded)
- Currently only Gemini, swappable
- Methods: `generate(prompt) → string`, `review(content, type) → AiSuggestion`

### Prompt Library
- Typed prompt templates in `shared/ai/prompts/`
- `reviewQuestion(q)`, `formatMarkdown(md)`, `rewriteQuestion(q, style)`, `expandAnswer(a)`, `simplifyAnswer(a)`, `generateCodeExample(topic, lang)`
- All prompts return structured markdown strings

### Suggestion Model
```typescript
interface AiSuggestion {
  original: string;
  result: string;
  action: AiAction;
  timestamp: number;
}
```
Shown in an inline diff banner below the field toolbar. Accept replaces field value; Dismiss restores original.

### AI Service
```typescript
// admin-ai.service.ts
interface AiAction { id: string; label: string; icon: string; field: 'question' | 'answer' | 'deepDive'; }
```
Reads current field value → calls provider with field-specific prompt → returns `AiSuggestion`.
Error states surface inline in the banner.

### Toolbar Button Component
`AiToolbarComponent` — receives `(action)`, emits `applied` / `dismissed`. Lives above each supported field (question, answer, deep-dive). Renders 5 buttons:
- **Review** — flags ambiguity, incompleteness, hard-to-read phrasing
- **Format** — cleans markdown, normalises headings, wraps lines
- **Rewrite** — rephrases for clarity
- **Expand** — adds detail and depth
- **Code** — generates a code example relevant to the question

Buttons are `disabled` while a request is in-flight.

**Review** — reads the current content and returns comments on clarity, completeness, and factual accuracy, with inline `[suggestion: ...]` markers in markdown. Admin reviews markers and edits manually, or accepts and the AI re-writes flagged sections.

### Diff Banner
Inline strip below the toolbar showing old → new diff with **Accept** / **Dismiss** buttons. Uses a simple line-diff algorithm (changed lines highlighted). Animates in with `slideDown`.

### Field Integration
Each editor field (MonacoEditor, MarkdownEditor, AnswerEditor) gets a `headerBar` slot (or the page wraps each field with the toolbar). The admin page passes which actions are valid for which field.

### State Machine Per Field
```
Idle → Loading (button disabled) → Suggestion(shown) → Accepted(dismissed after 2s) or Dismissed(restores original)
                                                          → Error(shown, dismissible)
```

## Components

| Component | File | Purpose |
|---|---|---|
| `AiToolbarComponent` | `shared/components/ai-toolbar.component.ts` | Toolbar with action buttons |
| `AiBannerComponent` | `shared/components/ai-banner.component.ts` | Diff view + Accept/Dismiss |
| `AiProvider` (service) | `core/ai/ai-provider.ts` | Gemini API wrapper |
| Prompt templates | `shared/ai/prompts/*.ts` | All prompt functions |

## Data Flow
```
Admin clicks "Review" on Answer field
  → reads current field value
  → calls aiProvider.review(value, 'answer')
  → Gemini returns improved markdown
  → Banner shows diff
  → Admin Accepts → field value replaced
     Dismisses → original restored
```

## Error Handling
- Network error → banner shows "AI unavailable — try again" with dismiss
- Rate limit → "Slow down — try again in a moment"
- Empty field → buttons still work (AI generates content from scratch)
- Context too long → truncate with "... (truncated)" in prompt

## Scope (v1)
- **Answer** and **Deep Dive** fields get all 5 toolbar buttons
- **Code** field gets no toolbar in v1
- **Question** field (short plain input) gets no toolbar in v1
- No streaming / partial results — wait for full response
- No persistent memory / conversation history

## Files to Create
- `src/app/core/ai/ai-provider.ts`
- `src/app/shared/ai/prompts/question-prompts.ts`
- `src/app/shared/components/ai-toolbar.component.ts`
- `src/app/shared/components/ai-banner.component.ts`
- `src/app/core/config/ai.config.ts` (InjectionToken)
- Update `admin-question-edit.page.ts/html` to host toolbar per field
- Add `AI_API_KEY` to environment / runtime config

## Out of Scope (Future)
- Bulk generation panel
- AI question scoring
- History / undo for AI actions
- Streaming partial suggestions
- Multi-step AI conversations
