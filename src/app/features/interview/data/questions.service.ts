import { Service, signal, computed, inject } from '@angular/core';
import type { InterviewCategory, InterviewSection } from '@core/models/interview.models';
import { SupabaseClientService } from '@core/services/supabase-client.service';

export interface QuestionRow {
  id: string; section_id: string; category_id: string;
  question: string; answer: string; example: string | null;
  code: string | null; language: string | null; sort_order: number;
  deep_dive: string | null;
}

interface SectionRow { id: string; category_id: string; title: string; sort_order: number; }
interface CategoryRow { id: string; title: string; color: string; description: string; sort_order: number; }

@Service()
export class QuestionsService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly _questions = signal<QuestionRow[]>([]);
  private readonly _loaded = signal(false);

  private sectionRows: SectionRow[] = [];
  private categoryRows: CategoryRow[] = [];

  readonly questions = this._questions.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  readonly categoryTree = computed<InterviewCategory[]>(() =>
    this.buildTreeInternal(this._questions())
  );

  init(): void {
    this.load();
  }

  async load(): Promise<void> {
    try {
      const client = this.supabase.client;
      const [questionsRes, sectionsRes, categoriesRes] = await Promise.all([
        client.from('questions').select('id, section_id, category_id, question, answer, example, code, language, sort_order, deep_dive').order('sort_order'),
        client.from('sections').select('id, category_id, title, sort_order').order('sort_order'),
        client.from('categories').select('id, title, color, description, sort_order').order('sort_order'),
      ]);
      if (questionsRes.error) { console.error('[QuestionsService] Questions error:', questionsRes.error); return; }
      this.sectionRows = sectionsRes.data ?? [];
      this.categoryRows = categoriesRes.data ?? [];
      console.log('[QuestionsService] Loaded', questionsRes.data?.length ?? 0, 'questions,', this.sectionRows.length, 'sections,', this.categoryRows.length, 'categories');
      this._questions.set(questionsRes.data ?? []);
      this._loaded.set(true);
    } catch (e) {
      console.error('[QuestionsService] Load exception:', e);
    }
  }

  private buildTreeInternal(questions: QuestionRow[]): InterviewCategory[] {
    const catMap = new Map<string, InterviewCategory>();
    const secMap = new Map<string, InterviewSection>();

    for (const s of this.sectionRows) {
      secMap.set(s.id, { id: s.id, title: s.title, questions: [] });
    }
    for (const c of this.categoryRows) {
      catMap.set(c.id, { id: c.id, title: c.title, color: c.color, description: c.description, sections: [] });
    }

    for (const q of questions) {
      if (!secMap.has(q.section_id)) secMap.set(q.section_id, { id: q.section_id, title: '', questions: [] });
      if (!catMap.has(q.category_id)) catMap.set(q.category_id, { id: q.category_id, title: '', color: '', description: '', sections: [] });
      secMap.get(q.section_id)!.questions.push({
        id: q.id, question: q.question, answer: q.answer,
        example: q.example ?? undefined, code: q.code ?? undefined, language: q.language ?? undefined,
        deepDive: q.deep_dive ?? undefined,
      });
    }

    for (const cat of catMap.values()) {
      cat.sections = Array.from(secMap.values()).filter(sec => {
        const sectionRow = this.sectionRows.find(s => s.id === sec.id);
        return sectionRow && sectionRow.category_id === cat.id;
      });
    }
    return Array.from(catMap.values());
  }
}
