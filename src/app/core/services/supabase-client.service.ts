import { Service, inject } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase.config';

@Service()
export class SupabaseClientService {
  private readonly url = inject(SUPABASE_URL);
  private readonly anonKey = inject(SUPABASE_ANON_KEY);

  readonly client: SupabaseClient = createClient(this.url, this.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}
