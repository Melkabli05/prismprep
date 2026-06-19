import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormField, form, required, submit } from '@angular/forms/signals';
import { LucideAngularModule } from 'lucide-angular';
import { AdminContentService } from '../data/admin-content.service';
import { MonacoEditorComponent } from '@shared/components/monaco-editor.component';
import { MarkdownEditorComponent } from '@shared/components/markdown-editor.component';
import { AnswerEditorComponent } from '@shared/components/answer-editor.component';
import { AiService } from '@core/ai/ai-provider.service';
import { AiToolbarComponent } from '@shared/components/ai-toolbar.component';
import { AiBannerComponent } from '@shared/components/ai-banner.component';
import { AiSuggestion, AnswerAction, DeepDiveAction } from '@core/ai/ai-provider.service';

interface QuestionModel {
  id: string;
  question: string;
  answer: string;
  code: string;
  language: string;
  deepDive: string;
}

const EMPTY_MODEL: QuestionModel = {
  id: '', question: '', answer: '', code: '', language: '', deepDive: '',
};

@Component({
  selector: 'app-admin-question-edit',
  imports: [
    RouterLink,
    FormField,
    LucideAngularModule,
    MonacoEditorComponent,
    MarkdownEditorComponent,
    AnswerEditorComponent,
    AiToolbarComponent,
    AiBannerComponent,
  ],
  templateUrl: './admin-question-edit.page.html',
  styleUrl: './admin-question-edit.page.css',
})
export class AdminQuestionEditPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly admin = inject(AdminContentService);
  readonly ai = inject(AiService);

  readonly aiLoading = signal(false);
  readonly aiError = signal<string | null>(null);
  readonly aiSuggestion = signal<AiSuggestion | null>(null);
  readonly aiField = signal<'answer' | 'deepDive' | null>(null);

  private readonly paramMap = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private readonly queryParamMap = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  readonly id = computed(() => this.paramMap().get('id') ?? '');
  readonly isNew = computed(() => this.id() === 'new');
  readonly newCategoryId = computed(() => this.queryParamMap().get('categoryId') ?? '');
  readonly newSectionId = computed(() => this.queryParamMap().get('sectionId') ?? '');

  readonly question = computed(() => this.admin.questions().find(q => q.id === this.id()) ?? null);
  readonly categoryTitle = computed(() =>
    this.admin.categories().find(c => c.id === this.question()?.category_id)?.title ?? '');
  readonly sectionTitle = computed(() =>
    this.admin.sections().find(s => s.id === this.question()?.section_id)?.title ?? '');

  readonly orderedIds = computed(() => this.admin.questions().map(q => q.id));
  readonly currentIndex = computed(() => this.orderedIds().indexOf(this.id()));
  readonly hasPrev = computed(() => !this.isNew() && this.currentIndex() > 0);
  readonly hasNext = computed(
    () => !this.isNew() && this.currentIndex() >= 0 && this.currentIndex() < this.orderedIds().length - 1,
  );

  readonly saving = signal(false);
  readonly savedFlash = signal(false);
  readonly saveError = signal('');

  readonly model = linkedSignal<QuestionModel>(() => {
    if (this.isNew()) return EMPTY_MODEL;
    const q = this.question();
    return q
      ? {
          id: q.id,
          question: q.question,
          answer: q.answer,
          code: q.code ?? '',
          language: q.language ?? 'typescript',
          deepDive: q.deep_dive ?? '',
        }
      : EMPTY_MODEL;
  });

  readonly qForm = form(this.model, (s) => {
    required(s.id, { message: 'ID is required' });
    required(s.question, { message: 'Question is required' });
    required(s.answer, { message: 'Answer is required' });
  });

  constructor() {
    if (!this.admin.loaded()) this.admin.load();
  }

  goPrev(): void {
    const i = this.currentIndex();
    if (i > 0) this.router.navigate(['/admin/questions', this.orderedIds()[i - 1]]);
  }

  goNext(): void {
    const i = this.currentIndex();
    if (i >= 0 && i < this.orderedIds().length - 1) {
      this.router.navigate(['/admin/questions', this.orderedIds()[i + 1]]);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.saveError.set('');
    submit(this.qForm, {
      action: async () => {
        this.saving.set(true);
        try {
          const m = this.model();
          if (this.isNew()) {
            const error = await this.admin.createQuestion({
              id: m.id,
              question: m.question,
              answer: m.answer,
              code: m.code || null,
              language: m.language || null,
              deep_dive: m.deepDive || null,
              category_id: this.newCategoryId(),
              section_id: this.newSectionId(),
              sort_order: this.nextSortOrder(),
            });
            if (error) { this.saveError.set(error.message); return; }
            this.router.navigate(['/admin/questions', m.id]);
          } else {
            const error = await this.admin.updateQuestion(m.id, {
              question: m.question,
              answer: m.answer,
              code: m.code || null,
              language: m.language || null,
              deep_dive: m.deepDive || null,
            });
            if (error) { this.saveError.set(error.message); return; }
            this.savedFlash.set(true);
            setTimeout(() => this.savedFlash.set(false), 3000);
          }
        } finally {
          this.saving.set(false);
        }
      },
    });
  }

  private nextSortOrder(): number {
    return this.admin.questions()
      .filter(q => q.section_id === this.newSectionId())
      .reduce((max, q) => Math.max(max, q.sort_order), -1) + 1;
  }

  async onAiAction(field: 'answer' | 'deepDive', action: string): Promise<void> {
    this.aiLoading.set(true);
    this.aiError.set(null);
    const current = field === 'answer' ? this.model().answer : this.model().deepDive ?? '';
    const result = field === 'answer'
      ? await this.ai.actAnswer(action as AnswerAction, current, this.model().question, this.model().language ?? 'typescript')
      : await this.ai.actDeepDive(action as DeepDiveAction, current);
    this.aiLoading.set(false);
    if ('error' in result) { this.aiError.set(result.error.message); return; }
    this.aiSuggestion.set(result.suggestion);
    this.aiField.set(field);
  }

  acceptAiSuggestion(): void {
    const s = this.aiSuggestion();
    const field = this.aiField();
    if (!s || !field) return;
    if (field === 'answer') {
      this.model.update(m => ({ ...m, answer: s.result }));
    } else {
      this.model.update(m => ({ ...m, deepDive: s.result }));
    }
    this.clearAiState();
  }

  clearAiState(): void { this.aiSuggestion.set(null); this.aiError.set(null); this.aiField.set(null); }
}
