import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideSupabase } from '@core/config/supabase.config';
import { AI_PROVIDER_CONFIG } from '@core/config/ai.config';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min',
  onMonacoLoad: () => {
    const monaco = (window as any).monaco;
    monaco.editor.defineTheme('prism-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '7C3AED' },
        { token: 'string', foreground: '15803D' },
        { token: 'comment', foreground: '9A9890' },
        { token: 'number', foreground: 'B45309' },
        { token: 'type', foreground: 'B45309' },
      ],
      colors: {
        'editor.background': '#1E1D1A',
        'editor.foreground': '#F4F3EF',
        'editorLineNumber.foreground': '#5C5A54',
        'editor.lineHighlightBackground': '#2A2926',
        'editorCursor.foreground': '#4444D0',
        'editor.selectionBackground': '#4444D030',
      },
    });
    monaco.editor.defineTheme('prism-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '7C3AED' },
        { token: 'string', foreground: '15803D' },
        { token: 'comment', foreground: '9A9890' },
        { token: 'number', foreground: 'B45309' },
        { token: 'type', foreground: 'B45309' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#1E1D1A',
        'editorLineNumber.foreground': '#B5B2A8',
        'editor.lineHighlightBackground': '#F4F3EF',
        'editorCursor.foreground': '#4444D0',
        'editor.selectionBackground': '#4444D020',
      },
    });
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick(icons),
      MonacoEditorModule.forRoot(monacoConfig),
    ),
    provideSupabase(environment.supabaseUrl, environment.supabaseAnonKey),
    { provide: AI_PROVIDER_CONFIG, useValue: { apiKey: environment.geminiApiKey } },
  ],
};
