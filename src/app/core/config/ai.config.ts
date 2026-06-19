import { InjectionToken } from '@angular/core';

export const AI_PROVIDER_CONFIG = new InjectionToken<AiProviderConfig>('ai.config');

export interface AiProviderConfig {
  apiKey: string;
}

export interface AiSuggestion {
  original: string;
  result: string;
  action: string;
  timestamp: number;
}

export interface AiError {
  code: 'network' | 'rate_limit' | 'api_error' | 'empty_response';
  message: string;
}