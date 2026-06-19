export type AnswerAction = 'format' | 'rewrite' | 'expand' | 'review' | 'code';

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

export function rewriteAnswer(answer: string): string {
  return `You are a technical content editor. Rewrite this answer for clarity, conciseness, and impact.

Guidelines:
- Lead with the most important information
- Use simple, direct language — avoid jargon unless technically necessary
- Break complex concepts into digestible steps
- Remove filler words and redundant phrases
- Keep code examples clean and commented
- Maintain technical accuracy
- Output only the rewritten content — no commentary.

Content to rewrite:
${answer}`;
}

export function expandAnswer(answer: string): string {
  return `You are a technical content editor. Expand this answer with more depth, context, and detail.

Guidelines:
- Add concrete examples where helpful
- Explain the "why" behind key points
- Include common use cases or edge cases
- Provide prerequisite context if relevant
- Maintain the original tone and focus
- Add subheadings (## and ###) to structure longer expansions
- Keep code examples minimal and illustrative
- Output only the expanded content — no commentary.

Content to expand:
${answer}`;
}

export function reviewAnswer(answer: string): string {
  return `You are a technical content reviewer. Analyse this answer and provide constructive feedback.

Check:
- Technical accuracy and correctness
- Completeness — are all parts of the question addressed?
- Clarity and readability
- Code correctness and best practices
- Consistency with the question asked

Provide your review as a concise summary of findings, then list specific suggestions numbered 1-5.

Content to review:
${answer}`;
}

export function generateCodeExample(question: string, language: string): string {
  return `You are a coding assistant. Generate a code example that answers the question.

Requirements:
- Language: ${language}
- Make the code complete and runnable
- Add comments explaining key sections
- Handle edge cases where appropriate
- Use modern best practices for ${language}
- Output only the code block — no preamble or explanation.

Question:
${question}`;
}