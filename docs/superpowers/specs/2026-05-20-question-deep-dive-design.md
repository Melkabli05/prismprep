---
name: question-deep-dive-design
description: Deep dive tab on question cards with Réponse / Deep Dive tabs
metadata:
  type: feature
---

# Question Deep Dive — Design Spec

## Overview

Each question card shows a **Deep Dive** button (graduation-cap icon) when deep dive content exists. Clicking it opens a focused modal with the full detailed explanation. This keeps the card readable and gives deep dive content its own space.

## Data Model

- `questions.deep_dive` column (text, nullable) — fetched via Supabase
- `InterviewQuestion.deepDive?: string` — added to the TypeScript model
- When `deepDive` is null/empty, the Deep Dive button is hidden for that card

## UX Behavior

### Deep Dive button
- Appears only in the action bar when `question.deepDive` has non-empty content
- Uses `graduation-cap` Lucide icon with "Deep Dive" label
- Styled as an `action-btn` (same visual class as the Note button)
- Clicking emits `openDeepDiveModal` output with the question id

### Modal
- Centered overlay with blur backdrop
- Max width 700px, scrolls if content overflows
- Header: icon + question text as title, close (X) button top-right
- Body: deep dive content rendered via `AnswerParagraphsComponent`
- Close on backdrop click or close button click
- No URL change, no state change outside the shell page

### Propagation
- `QuestionCardComponent` emits `openDeepDiveModal: output<string>` (question id)
- `QuestionListComponent` forwards it via `openDeepDiveModal: output<string>`
- `InterviewShellPage` handles it — finds the question from `allQuestionsFlat` and shows the modal

## Files Changed

| File | Change |
|------|--------|
| `docs/superpowers/specs/2026-05-20-question-deep-dive-design.md` | Updated to reflect modal approach |
| `src/app/core/models/interview.models.ts` | `deepDive?: string` added to `InterviewQuestion` |
| `src/app/core/services/questions.service.ts` | `deep_dive` in select + `QuestionRow` + tree builder |
| `src/app/shared/components/deep-dive-modal/deep-dive-modal.component.ts` | **NEW** — modal component |
| `src/app/features/interview/components/question-card/question-card.component.ts` | Deep dive button + output |
| `src/app/features/interview/components/question-list/question-list.component.ts` | Forward `openDeepDiveModal` output |
| `src/app/features/interview/pages/interview-shell.page.ts` | Modal state + `openDeepDive()` handler |
| `src/app/features/interview/pages/interview-shell.page.html` | `openDeepDiveModal` bindings + modal conditional |

## Out of Scope

- AI generation of deep dive content
- Deep dive editor / CMS
- Deep dive search
- Sharing deep dives