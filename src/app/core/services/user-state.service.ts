import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { localStorageSignal } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  readonly bookmarks = localStorageSignal<Set<string>>('bookmarks', new Set());
  readonly notes = localStorageSignal<Record<string, string>>('notes', {});
  readonly revealed = localStorageSignal<Set<string>>('revealed', new Set());
  readonly viewed = localStorageSignal<Set<string>>('viewed', new Set());

  toggleBookmark(id: string): void {
    const next = new Set(this.bookmarks());
    next.has(id) ? next.delete(id) : next.add(id);
    this.bookmarks.set(next);
  }

  toggleRevealed(id: string): void {
    const next = new Set(this.revealed());
    next.add(id);
    this.revealed.set(next);
  }

  resetRevealed(): void { this.revealed.set(new Set()); }

  updateNote(id: string, note: string): void {
    this.notes.set({ ...this.notes(), [id]: note });
  }

  markViewed(id: string): void {
    const next = new Set(this.viewed());
    next.add(id);
    this.viewed.set(next);
  }

  async loadRemote(client: SupabaseClient, uid: string): Promise<void> {
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

  async syncBookmark(client: SupabaseClient, uid: string, id: string): Promise<void> {
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

  async syncNote(client: SupabaseClient, uid: string, id: string, note: string): Promise<void> {
    try {
      await client.from('user_notes').upsert({ user_id: uid, question_id: id, note, updated_at: new Date().toISOString() });
    } catch (e) {
      console.warn('[UserState] syncNote failed:', e);
    }
  }

  async syncRevealed(client: SupabaseClient, uid: string, id: string): Promise<void> {
    try {
      await client.from('user_revealed').upsert({ user_id: uid, question_id: id });
    } catch (e) {
      console.warn('[UserState] syncRevealed failed:', e);
    }
  }

  async syncViewed(client: SupabaseClient, uid: string, id: string): Promise<void> {
    try {
      await client.from('user_viewed').upsert({ user_id: uid, question_id: id });
    } catch (e) {
      console.warn('[UserState] syncViewed failed:', e);
    }
  }
}