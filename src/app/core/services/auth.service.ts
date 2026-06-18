import { Service, signal, computed, inject } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client.service';

@Service()
export class AuthService {
  private readonly supabase = inject(SupabaseClientService);
  private get client() { return this.supabase.client; }

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

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
    this.client.auth.getSession().then(({ data }) => {
      this._user.set(data.session?.user ?? null);
      this._loading.set(false);
    });
    this.client.auth.onAuthStateChange((_event, session) => {
      this._user.set(session?.user ?? null);
    });
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    this.cleanQueryParams();
    return { error: error?.message ?? null };
  }

  async signUp(email: string, password: string, name: string): Promise<{ error: string | null }> {
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
    const { error } = await this.client.auth.updateUser({ data: { name, stack } });
    return { error: error?.message ?? null };
  }

  async updateTheme(theme: string): Promise<{ error: string | null }> {
    const { error } = await this.client.auth.updateUser({ data: { theme } });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }

  get uid(): string | null { return this._user()?.id ?? null; }
}
