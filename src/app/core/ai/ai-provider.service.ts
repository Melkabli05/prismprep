import { Service, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_PROVIDER_CONFIG, type AiProviderConfig, type AiSuggestion, type AiError } from '../config/ai.config';
import { formatAnswer, rewriteAnswer, expandAnswer, reviewAnswer, generateCodeExample, type AnswerAction } from '../../shared/ai/prompts/answer-prompts';
import { formatDeepDive, rewriteDeepDive, expandDeepDive, reviewDeepDive, type DeepDiveAction } from '../../shared/ai/prompts/deep-dive-prompts';

export { type AiSuggestion, type AiError, type AnswerAction, type DeepDiveAction };

@Service()
export class AiService {
  private readonly config = inject(AI_PROVIDER_CONFIG);
  private readonly genAI = new GoogleGenerativeAI(this.config.apiKey);

  private model(model: string = 'gemini-2.0-flash') {
    return this.genAI.getGenerativeModel({ model });
  }

  async actAnswer(
    action: AnswerAction,
    currentContent: string,
    question: string,
    language: string,
  ): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
    const prompts: Record<AnswerAction, () => string> = {
      format: () => formatAnswer(currentContent),
      rewrite: () => rewriteAnswer(currentContent),
      expand: () => expandAnswer(currentContent),
      review: () => reviewAnswer(currentContent),
      code: () => generateCodeExample(question, language),
    };
    const prompt = prompts[action]();
    return this._call(prompt, action, currentContent);
  }

  async actDeepDive(
    action: DeepDiveAction,
    currentContent: string,
  ): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
    const prompts: Record<DeepDiveAction, () => string> = {
      format: () => formatDeepDive(currentContent),
      rewrite: () => rewriteDeepDive(currentContent),
      expand: () => expandDeepDive(currentContent),
      review: () => reviewDeepDive(currentContent),
    };
    const prompt = prompts[action]();
    return this._call(prompt, action, currentContent);
  }

  private async _call(prompt: string, action: string, original: string): Promise<{ suggestion: AiSuggestion } | { error: AiError }> {
    try {
      const result = await this.model().generateContent(prompt);
      const response = result.response;
      const resultText = response.text().trim();
      if (!resultText) return { error: { code: 'empty_response', message: 'AI returned no content.' } };
      return { suggestion: { original, result: resultText, action, timestamp: Date.now() } };
    } catch (e: any) {
      if (e?.status === 429) return { error: { code: 'rate_limit', message: 'Slow down — try again in a moment.' } };
      if (e?.status === 403 || e?.message?.includes('API_KEY')) return { error: { code: 'api_error', message: 'AI unavailable — check your API key.' } };
      return { error: { code: 'network', message: 'AI unavailable — try again.' } };
    }
  }
}