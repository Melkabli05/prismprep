import { InjectionToken } from '@angular/core';

/**
 * Supabase configuration tokens — injected via provideSupabase() in app.config,
 * sourced from environment variables at build time.
 *
 * Provides URL + publishable key without coupling service code to the
 * environment import, making key rotation and environment switching clean.
 */
export const SUPABASE_URL = new InjectionToken<string>('supabase.url');
export const SUPABASE_ANON_KEY = new InjectionToken<string>('supabase.anonKey');
