import { InjectionToken, Provider } from '@angular/core';

/**
 * Supabase configuration tokens — injected via provideSupabase() in app.config,
 * sourced from environment variables at build time.
 *
 * Provides URL + publishable key without coupling service code to the
 * environment import, making key rotation and environment switching clean.
 */
export const SUPABASE_URL = new InjectionToken<string>('supabase.url');
export const SUPABASE_ANON_KEY = new InjectionToken<string>('supabase.anonKey');

/** Convenience provider factory — use in app.config and in tests with fake values. */
export function provideSupabase(url: string, anonKey: string): Provider[] {
  return [
    { provide: SUPABASE_URL, useValue: url },
    { provide: SUPABASE_ANON_KEY, useValue: anonKey },
  ];
}
