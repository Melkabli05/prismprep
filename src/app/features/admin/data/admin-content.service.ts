import { Service, signal, inject } from '@angular/core';
import { SupabaseClientService } from '@core/services/supabase-client.service';
import type { Tables, TablesInsert, TablesUpdate } from '@core/models/database.types';

export type CategoryRow = Tables<'categories'>;
export type SectionRow = Tables<'sections'>;
export type QuestionRow = Tables<'questions'>;

export type AdminEntityKind = 'category' | 'section' | 'question';

export interface DependentCounts {
  sections: number;
  questions: number;
  bookmarks: number;
  notes: number;
  revealed: number;
  viewed: number;
}

export type AdminErrorKind = 'forbidden' | 'conflict' | 'unknown';
export interface AdminError {
  kind: AdminErrorKind;
  message: string;
}

function mapError(error: { code?: string; message: string } | null): AdminError | null {
  if (!error) return null;
  if (error.code === '42501') return { kind: 'forbidden', message: "You don't have permission to do this." };
  if (error.code === '23505') return { kind: 'conflict', message: 'That ID is already in use.' };
  return { kind: 'unknown', message: error.message };
}

const EMPTY_USER_COUNTS = { bookmarks: 0, notes: 0, revealed: 0, viewed: 0 };

@Service()
export class AdminContentService {
  private readonly supabase = inject(SupabaseClientService);
  private get client() { return this.supabase.client; }

  private readonly _categories = signal<CategoryRow[]>([]);
  private readonly _sections = signal<SectionRow[]>([]);
  private readonly _questions = signal<QuestionRow[]>([]);
  private readonly _loading = signal(false);
  private readonly _loaded = signal(false);
  private readonly _error = signal<AdminError | null>(null);

  readonly categories = this._categories.asReadonly();
  readonly sections = this._sections.asReadonly();
  readonly questions = this._questions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly loaded = this._loaded.asReadonly();
  readonly error = this._error.asReadonly();

  /**
   * Tree expand/collapse state lives here rather than on the browser page component —
   * that page is destroyed and recreated on every navigation to/from the question
   * editor, which would otherwise collapse the whole tree each time you save and go back.
   */
  private readonly _expandedCategories = signal<ReadonlySet<string>>(new Set());
  private readonly _expandedSections = signal<ReadonlySet<string>>(new Set());

  readonly expandedCategories = this._expandedCategories.asReadonly();
  readonly expandedSections = this._expandedSections.asReadonly();

  toggleCategoryExpanded(id: string): void {
    this._expandedCategories.update(set => toggled(set, id));
  }

  toggleSectionExpanded(id: string): void {
    this._expandedSections.update(set => toggled(set, id));
  }

  async load(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    try {
      const [cats, secs, qs] = await Promise.all([
        this.client.from('categories').select('*').order('sort_order'),
        this.client.from('sections').select('*').order('sort_order'),
        this.client.from('questions').select('*').order('sort_order'),
      ]);
      const err = mapError(cats.error) ?? mapError(secs.error) ?? mapError(qs.error);
      if (err) { this._error.set(err); return; }
      this._categories.set(cats.data ?? []);
      this._sections.set(secs.data ?? []);
      this._questions.set(qs.data ?? []);
      this._loaded.set(true);
    } finally {
      this._loading.set(false);
    }
  }

  async createCategory(row: TablesInsert<'categories'>): Promise<AdminError | null> {
    const { error } = await this.client.from('categories').insert(row);
    return this.afterWrite(error);
  }

  async updateCategory(id: string, patch: TablesUpdate<'categories'>): Promise<AdminError | null> {
    const { error } = await this.client.from('categories').update(patch).eq('id', id);
    return this.afterWrite(error);
  }

  async deleteCategory(id: string): Promise<AdminError | null> {
    const { error } = await this.client.from('categories').delete().eq('id', id);
    return this.afterWrite(error);
  }

  async createSection(row: TablesInsert<'sections'>): Promise<AdminError | null> {
    const { error } = await this.client.from('sections').insert(row);
    return this.afterWrite(error);
  }

  async updateSection(id: string, patch: TablesUpdate<'sections'>): Promise<AdminError | null> {
    const { error } = await this.client.from('sections').update(patch).eq('id', id);
    return this.afterWrite(error);
  }

  async deleteSection(id: string): Promise<AdminError | null> {
    const { error } = await this.client.from('sections').delete().eq('id', id);
    return this.afterWrite(error);
  }

  async createQuestion(row: TablesInsert<'questions'>): Promise<AdminError | null> {
    const { error } = await this.client.from('questions').insert(row);
    return this.afterWrite(error);
  }

  async updateQuestion(id: string, patch: TablesUpdate<'questions'>): Promise<AdminError | null> {
    const { error } = await this.client.from('questions').update(patch).eq('id', id);
    return this.afterWrite(error);
  }

  async deleteQuestion(id: string): Promise<AdminError | null> {
    const { error } = await this.client.from('questions').delete().eq('id', id);
    return this.afterWrite(error);
  }

  /** Persists a new sort_order (array index) for every row in `orderedIds`. */
  async reorder(table: 'categories' | 'sections' | 'questions', orderedIds: string[]): Promise<AdminError | null> {
    const results = await Promise.all(
      orderedIds.map((id, index) => this.client.from(table).update({ sort_order: index }).eq('id', id))
    );
    const error = results.map(r => r.error).find((e) => e !== null) ?? null;
    return this.afterWrite(error);
  }

  /** Blast-radius preview for the delete confirmation dialog. */
  async countDependents(kind: AdminEntityKind, id: string): Promise<DependentCounts> {
    if (kind === 'question') {
      const userCounts = await this.countUserRowsFor([id]);
      return { sections: 0, questions: 0, ...userCounts };
    }
    if (kind === 'section') {
      const questionIds = this._questions().filter(q => q.section_id === id).map(q => q.id);
      const userCounts = await this.countUserRowsFor(questionIds);
      return { sections: 0, questions: questionIds.length, ...userCounts };
    }
    const sectionCount = this._sections().filter(s => s.category_id === id).length;
    const questionIds = this._questions().filter(q => q.category_id === id).map(q => q.id);
    const userCounts = await this.countUserRowsFor(questionIds);
    return { sections: sectionCount, questions: questionIds.length, ...userCounts };
  }

  /**
   * RLS restricts user_* tables to each user's own rows, so a direct count from the
   * client would only ever see the admin's own data. admin_count_dependents is a
   * security-definer RPC that checks the admin role itself and returns counts only
   * (never row content), letting the confirmation dialog show the real blast radius.
   */
  private async countUserRowsFor(questionIds: string[]): Promise<typeof EMPTY_USER_COUNTS> {
    if (questionIds.length === 0) return EMPTY_USER_COUNTS;
    const { data, error } = await this.client.rpc('admin_count_dependents', { p_question_ids: questionIds });
    if (error || !data?.[0]) return EMPTY_USER_COUNTS;
    const row = data[0];
    return { bookmarks: row.bookmarks, notes: row.notes, revealed: row.revealed, viewed: row.viewed };
  }

  private async afterWrite(error: { code?: string; message: string } | null): Promise<AdminError | null> {
    const mapped = mapError(error);
    if (mapped) { this._error.set(mapped); return mapped; }
    await this.load();
    return null;
  }
}

function toggled(set: ReadonlySet<string>, id: string): ReadonlySet<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}
