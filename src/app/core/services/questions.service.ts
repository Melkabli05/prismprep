import { Injectable, signal, computed } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import type { InterviewCategory, InterviewSection } from '../models/interview.models';

export interface QuestionRow {
  id: string; section_id: string; category_id: string;
  question: string; answer: string; example: string | null;
  code: string | null; language: string | null; sort_order: number;
}

interface SectionRow { id: string; category_id: string; title: string; sort_order: number; }
interface CategoryRow { id: string; title: string; color: string; description: string; sort_order: number; }

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private client: SupabaseClient | null = null;
  private readonly _questions = signal<QuestionRow[]>([]);
  private readonly _loaded = signal(false);

  readonly questions = this._questions.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  /** Tree recomputes whenever _questions changes */
  readonly categoryTree = computed<InterviewCategory[]>(() =>
    this.buildTreeInternal(this._questions())
  );

  init(): void {
    this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    this.load();
  }

  getClient(): SupabaseClient | null { return this.client; }

  async load(): Promise<void> {
    if (!this.client) { console.warn('[QuestionsService] Client not initialized'); return; }
    try {
      const [questionsRes, sectionsRes, categoriesRes] = await Promise.all([
        this.client.from('questions').select('id, section_id, category_id, question, answer, example, code, language, sort_order').order('sort_order'),
        this.client.from('sections').select('id, category_id, title, sort_order').order('sort_order'),
        this.client.from('categories').select('id, title, color, description, sort_order').order('sort_order'),
      ]);
      if (questionsRes.error) { console.error('[QuestionsService] Questions error:', questionsRes.error); return; }
      const sections: SectionRow[] = sectionsRes.data ?? [];
      const categories: CategoryRow[] = categoriesRes.data ?? [];
      console.log('[QuestionsService] Loaded', questionsRes.data?.length ?? 0, 'questions,', sections.length, 'sections,', categories.length, 'categories');
      this._questions.set(questionsRes.data ?? []);
      this._loaded.set(true);
      // Store metadata for tree building
      (this as any)._sections = sections;
      (this as any)._categories = categories;
    } catch (e) {
      console.error('[QuestionsService] Load exception:', e);
    }
  }

  private get sections(): SectionRow[] { return (this as any)._sections ?? []; }
  private get categories(): CategoryRow[] { return (this as any)._categories ?? []; }

  private buildTreeInternal(questions: QuestionRow[]): InterviewCategory[] {
    const catMap = new Map<string, InterviewCategory>();
    const secMap = new Map<string, InterviewSection>();

    // Pre-populate sections and categories with their metadata
    for (const s of this.sections) {
      secMap.set(s.id, { id: s.id, title: s.title, questions: [] });
    }
    for (const c of this.categories) {
      catMap.set(c.id, { id: c.id, title: c.title, color: c.color, description: c.description, sections: [] });
    }

    // Assign questions to their sections
    for (const q of questions) {
      if (!secMap.has(q.section_id)) secMap.set(q.section_id, { id: q.section_id, title: '', questions: [] });
      if (!catMap.has(q.category_id)) catMap.set(q.category_id, { id: q.category_id, title: '', color: '', description: '', sections: [] });
      secMap.get(q.section_id)!.questions.push({
        id: q.id, question: q.question, answer: q.answer,
        example: q.example ?? undefined, code: q.code ?? undefined, language: q.language ?? undefined,
      });
    }

    // Assign sections to their categories
    for (const cat of catMap.values()) {
      const catSections = secMap.values();
      cat.sections = Array.from(catSections).filter(sec => {
        const sectionRow = this.sections.find(s => s.id === sec.id);
        return sectionRow && sectionRow.category_id === cat.id;
      });
    }
    return Array.from(catMap.values());
  }
}