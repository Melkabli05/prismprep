import { Component, inject, signal, effect } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { InterviewService } from '../state/interview.service';
import { SeoService } from '@core/services/seo.service';
import { interviewCategories } from '../data';
import type { InterviewSection, InterviewQuestion } from '@core/models/interview.models';
import { DeepDiveModalComponent } from '../components/deep-dive-modal/deep-dive-modal.component';

import { HeaderComponent } from '../components/header/header.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { CategoryPillsComponent } from '../components/category-pills/category-pills.component';
import { QuestionCardComponent } from '../components/question-card/question-card.component';
import { QuestionListComponent } from '../components/question-list/question-list.component';
import { SectionHeaderComponent } from '@shared/components/section-header/section-header.component';

@Component({
  selector: 'app-interview-shell',
  imports: [
    LucideAngularModule,
    HeaderComponent,
    ToolbarComponent,
    CategoryPillsComponent,
    QuestionCardComponent,
    QuestionListComponent,
    SectionHeaderComponent,
    DeepDiveModalComponent,
  ],
  templateUrl: './interview-shell.page.html',
  styleUrl: './interview-shell.page.css',
})
export class InterviewShellPage {
  /** Smart component — reads everything from the centralized service */
  readonly svc = inject(InterviewService);
  private readonly seo = inject(SeoService);
  readonly categories = interviewCategories;
  todayDate = () => new Date().toLocaleDateString('fr-FR');

  readonly deepDiveQuestion = signal<InterviewQuestion | null>(null);
  readonly showDeepDiveModal = signal(false);

  /** Typed current mock question — the @if guard in the template makes this safe */
  get mockCurrent() {
    return this.svc.mockQuestions()[this.svc.mockInterviewIdx()]!;
  }

  constructor() {
    this.seo.updatePage({
      title: 'Prism',
      description: 'Entraînez-vous aux entretiens techniques SQL et Angular avec des questions détaillées et des réponses approfondies.',
      route: '',
    });

    // Update SEO meta when active category changes
    effect(() => {
      const cat = this.svc.activeCategory();
      const catData = interviewCategories.find(c => c.id === cat);
      if (catData && !this.showDeepDiveModal()) {
        this.seo.updatePage({
          title: catData.title,
          description: catData.description,
          route: cat,
        });
      }
    });
  }

  openDeepDive(questionId: string): void {
    const flat = this.svc.allQuestionsFlat().find(q => q.question.id === questionId);
    if (flat) {
      this.deepDiveQuestion.set(flat.question);
      this.showDeepDiveModal.set(true);
      this.seo.updatePage({
        title: flat.question.question,
        description: flat.question.answer.replace(/[*#`_\n]/g, ' ').slice(0, 160),
        route: `question/${questionId}`,
      });
    }
  }

  closeDeepDive(): void {
    this.showDeepDiveModal.set(false);
    this.deepDiveQuestion.set(null);
    this.seo.updatePage({
      title: 'Prism',
      description: 'Entraînez-vous aux entretiens techniques SQL et Angular avec des questions détaillées et des réponses approfondies.',
      route: '',
    });
  }
}