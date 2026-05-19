---
name: question-deep-dive-design
description: Deep dive tab on question cards with Réponse / Deep Dive tabs
metadata:
  type: feature
---

# Question Deep Dive — Design Spec

## Overview

Each question card gains a **Deep Dive** tab alongside the standard answer. When a question has deep dive content in the DB, the user can switch between a short "Réponse" and a richer "Deep Dive" explanation — both rendered in the same card.

## Data Model

- `questions.deep_dive` column (text, nullable) — fetched via Supabase
- `InterviewQuestion.deepDive?: string` — added to the TypeScript model
- When `deepDive` is null/empty, the Deep Dive tab is hidden for that card

## UX Behavior

### Tab bar
- Appears only when `question.deepDive` has non-empty content
- Two tabs: **Réponse** (default, active on load) and **Deep Dive**
- Tabs styled with pill-style tab pattern matching the app's design language
- Active tab: accent color text + surface background
- Inactive tab: muted text + transparent background
- Tab state is **local to each card** — scrolling to a new card does not preserve the previous card's tab

### Tab content
- **Réponse tab**: renders `question.answer` via `AnswerParagraphsComponent`
- **Deep Dive tab**: renders `question.deepDive` via `AnswerParagraphsComponent`
- Code blocks (`question.code`) and examples (`question.example`) render below the active tab content — same as today

### Flashcard mode
- Both tabs remain available while card is in hidden/reveal state
- The flashcard reveal wraps the active tab content

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/models/interview.models.ts` | `deepDive?: string` added to `InterviewQuestion` |
| `src/app/core/services/questions.service.ts` | `deep_dive` in select + `QuestionRow` + tree builder |
| `src/app/features/interview/components/question-card/question-card.component.ts` | Tab bar, `activeTab` signal, conditional deep dive rendering |

## Out of Scope

- AI generation of deep dive content
- Deep dive editor / CMS
- Deep dive search
- Sharing deep dives