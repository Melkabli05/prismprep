import { Injectable, signal, computed, inject } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface UserState {
  bookmarks: Set<string>;
  notes: Record<string, string>;
  revealed: Set<string>;
  viewed: Set<string>;
}

export interface QuestionRow {
  id: string;
  section_id: string;
  category_id: string;
  question: string;
  answer: string;
  example: string | null;
  code: string | null;
  language: string | null;
  sort_order: number;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient | null = null;

  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(true);

  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

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

  async loadQuestions(): Promise<QuestionRow[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from('questions')
      .select('id, section_id, category_id, question, answer, example, code, language, sort_order')
      .order('sort_order');
    if (error) {
      console.warn('[Prism] Failed to load questions from Supabase', error.message);
      return [];
    }
    return data ?? [];
  }

  async loadUserState(): Promise<UserState | null> {
    if (!this.client || !this._user()) return null;
    const uid = this._user()!.id;

    const [bookmarks, notes, revealed, viewed] = await Promise.all([
      this.client.from('user_bookmarks').select('question_id').eq('user_id', uid),
      this.client.from('user_notes').select('question_id, note').eq('user_id', uid),
      this.client.from('user_revealed').select('question_id').eq('user_id', uid),
      this.client.from('user_viewed').select('question_id').eq('user_id', uid),
    ]);

    return {
      bookmarks: new Set(bookmarks.data?.map(r => r.question_id) ?? []),
      notes: Object.fromEntries(notes.data?.map(r => [r.question_id, r.note]) ?? []),
      revealed: new Set(revealed.data?.map(r => r.question_id) ?? []),
      viewed: new Set(viewed.data?.map(r => r.question_id) ?? []),
    };
  }

  async toggleBookmark(questionId: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    const { data } = await this.client
      .from('user_bookmarks')
      .select('question_id')
      .eq('user_id', uid)
      .eq('question_id', questionId)
      .maybeSingle();

    if (data) {
      await this.client.from('user_bookmarks')
        .delete().eq('user_id', uid).eq('question_id', questionId);
    } else {
      await this.client.from('user_bookmarks')
        .insert({ user_id: uid, question_id: questionId });
    }
  }

  async upsertNote(questionId: string, note: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    await this.client.from('user_notes').upsert({
      user_id: uid, question_id: questionId, note,
      updated_at: new Date().toISOString(),
    });
  }

  async addRevealed(questionId: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    await this.client.from('user_revealed')
      .upsert({ user_id: uid, question_id: questionId });
  }

  async addViewed(questionId: string): Promise<void> {
    if (!this.client || !this._user()) return;
    const uid = this._user()!.id;
    await this.client.from('user_viewed')
      .upsert({ user_id: uid, question_id: questionId });
  }

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async signUp(email: string, password: string): Promise<{ error: string | null }> {
    if (!this.client) return { error: 'Client not initialized' };
    const { error } = await this.client.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signOut();
  }
}