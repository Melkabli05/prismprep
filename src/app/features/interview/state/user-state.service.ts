import { Service, inject } from '@angular/core';
import { localStorageSignal } from '@core/services/local-storage.service';
import { SupabaseClientService } from '@core/services/supabase-client.service';
import { AuthService } from '@core/services/auth.service';

@Service()
export class UserStateService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly auth = inject(AuthService);

  readonly bookmarks = localStorageSignal<Set<string>>('bookmarks', new Set());
  readonly notes = localStorageSignal<Record<string, string>>('notes', {});
  readonly revealed = localStorageSignal<Set<string>>('revealed', new Set());
  readonly viewed = localStorageSignal<Set<string>>('viewed', new Set());

  toggleBookmark(id: string): void {
    const next = new Set(this.bookmarks());
    next.has(id) ? next.delete(id) : next.add(id);
    this.bookmarks.set(next);
    this.syncBookmark(id);
  }

  toggleRevealed(id: string): void {
    const next = new Set(this.revealed());
    next.add(id);
    this.revealed.set(next);
    this.syncRevealed(id);
  }

  resetRevealed(): void { this.revealed.set(new Set()); }

  updateNote(id: string, note: string): void {
    this.notes.set({ ...this.notes(), [id]: note });
    this.syncNote(id, note);
  }

  markViewed(id: string): void {
    const next = new Set(this.viewed());
    next.add(id);
    this.viewed.set(next);
    this.syncViewed(id);
  }

  async loadRemote(): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    const client = this.supabase.client;
    const [b, n, r, v] = await Promise.all([
      client.from('user_bookmarks').select('question_id').eq('user_id', uid),
      client.from('user_notes').select('question_id, note').eq('user_id', uid),
      client.from('user_revealed').select('question_id').eq('user_id', uid),
      client.from('user_viewed').select('question_id').eq('user_id', uid),
    ]);
    this.bookmarks.set(new Set([...this.bookmarks(), ...(b.data?.map(x => x.question_id) ?? [])]));
    this.notes.set({ ...this.notes(), ...Object.fromEntries(n.data?.map(x => [x.question_id, x.note]) ?? []) });
    this.revealed.set(new Set([...this.revealed(), ...(r.data?.map(x => x.question_id) ?? [])]));
    this.viewed.set(new Set([...this.viewed(), ...(v.data?.map(x => x.question_id) ?? [])]));
  }

  private async syncBookmark(id: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    const client = this.supabase.client;
    try {
      const { data } = await client.from('user_bookmarks').select('question_id').eq('user_id', uid).eq('question_id', id).maybeSingle();
      if (data) {
        await client.from('user_bookmarks').delete().eq('user_id', uid).eq('question_id', id);
      } else {
        await client.from('user_bookmarks').insert({ user_id: uid, question_id: id });
      }
    } catch (e) {
      console.warn('[UserState] syncBookmark failed:', e);
    }
  }

  private async syncNote(id: string, note: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    try {
      await this.supabase.client.from('user_notes').upsert({ user_id: uid, question_id: id, note, updated_at: new Date().toISOString() });
    } catch (e) {
      console.warn('[UserState] syncNote failed:', e);
    }
  }

  private async syncRevealed(id: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    try {
      await this.supabase.client.from('user_revealed').upsert({ user_id: uid, question_id: id });
    } catch (e) {
      console.warn('[UserState] syncRevealed failed:', e);
    }
  }

  private async syncViewed(id: string): Promise<void> {
    const uid = this.auth.uid;
    if (!uid) return;
    try {
      await this.supabase.client.from('user_viewed').upsert({ user_id: uid, question_id: id });
    } catch (e) {
      console.warn('[UserState] syncViewed failed:', e);
    }
  }
}
