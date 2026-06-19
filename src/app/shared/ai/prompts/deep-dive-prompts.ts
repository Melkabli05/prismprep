export type DeepDiveAction = 'format' | 'rewrite' | 'expand' | 'review';

export function formatDeepDive(text: string): string {
  return `You are a technical content editor. Format this deep-dive content for clarity and consistency.

Rules:
- Normalise heading levels (## and ### only)
- Wrap lines at 80 characters
- Ensure code blocks use proper fences (\`\`\`) with language tags
- Add blank lines between paragraphs
- Use consistent markdown styling throughout
- Remove redundant phrasing
- Output only the formatted content — no commentary.

Content to format:
${text}`;
}

export function rewriteDeepDive(text: string): string {
  return `You are a technical content editor. Rewrite this deep-dive content for clarity, flow, and reader engagement.

Guidelines:
- Lead with the most compelling insight or conclusion
- Use logical progression — build concepts step by step
- Replace complex sentences with clearer alternatives
- Maintain technical depth while improving accessibility
- Preserve all important technical details
- Keep code examples minimal and illustrative
- Output only the rewritten content — no commentary.

Content to rewrite:
${text}`;
}

export function expandDeepDive(text: string): string {
  return `You are a technical content editor. Expand this deep-dive content with more depth and context.

Guidelines:
- Add more detailed explanations of key concepts
- Include additional examples, analogies, or use cases
- Explore edge cases and nuances
- Connect concepts to broader implications or applications
- Add subheadings (## and ###) to structure the expansion
- Maintain the original voice and technical focus
- Preserve all existing content — add to it, don't replace
- Output only the expanded content — no commentary.

Content to expand:
${text}`;
}

export function reviewDeepDive(text: string): string {
  return `You are a technical content reviewer. Analyse this deep-dive content and provide inline suggestions.

Check:
- Technical accuracy and correctness
- Logical flow and organisation
- Completeness — are all aspects of the topic covered?
- Clarity and readability for the target audience
- Code correctness and best practices
- Consistency in tone and formatting

For each issue found, insert a markdown comment on the line above the problem:

[suggestion: your constructive suggestion here]

Mark up to 5 issues. Keep suggestions concise and actionable. Output the full content with inline suggestions — no summary or preamble.

Content to review:
${text}`;
}