import { Injectable, signal, computed } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private client: SupabaseClient | null = null;

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  /** Admins are identified by user_metadata.is_admin === true */
  readonly isAdmin = computed(() => this._user()?.user_metadata?.['is_admin'] === true);

  readonly stack = computed(() => {
    const meta = this._user()?.user_metadata;
    return Array.isArray(meta?.['stack']) ? meta['stack'] as string[] : [];
  });

  /** Exposes theme preference from backend for ThemeService consumption */
  readonly theme = computed(() => {
    const meta = this._user()?.user_metadata;
    return (meta?.['theme'] as string) ?? 'system';
  });

  init(): void {
    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
    this.client.auth.getSession().then(({ data }) => {
      this._user.set(data.session?.user ?? null);
      this._loading.set(false);
    });
    this.client.auth.onAuthStateChange((_event, session) => {
      this._user.set(session?.user ?? null);
    });
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    this.cleanQueryParams();
    return { error: error?.message ?? null };
  }

  async signUp(email: string, password: string, name: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.signUp({ email, password, options: { data: { name } } });
    this.cleanQueryParams();
    return { error: error?.message ?? null };
  }

  private cleanQueryParams(): void {
    if (window.location.search.includes('ng.')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  async updateProfile(name: string, stack: string[] = []): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.updateUser({ data: { name, stack } });
    return { error: error?.message ?? null };
  }

  async updateTheme(theme: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.updateUser({ data: { theme } });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signOut();
  }

  get uid(): string | null { return this._user()?.id ?? null; }
}