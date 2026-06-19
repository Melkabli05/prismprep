import { Service, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase.config';
import type { Database } from '../models/database.types';

@Service()
export class SupabaseClientService {
  private readonly url = inject(SUPABASE_URL);
  private readonly anonKey = inject(SUPABASE_ANON_KEY);

  readonly client: SupabaseClient<Database> = createClient<Database>(this.url, this.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}
