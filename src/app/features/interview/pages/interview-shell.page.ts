import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { InterviewService } from '../../../core/services/interview.service';
import { interviewCategories } from '../data';
import type { InterviewSection, InterviewQuestion } from '../../../core/models/interview.models';
import { DeepDiveModalComponent } from '../../../shared/components/deep-dive-modal/deep-dive-modal.component';

import { HeaderComponent } from '../components/header/header.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { CategoryPillsComponent } from '../components/category-pills/category-pills.component';
import { QuestionCardComponent } from '../components/question-card/question-card.component';
import { QuestionListComponent } from '../components/question-list/question-list.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-interview-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  readonly categories = interviewCategories;
  todayDate = () => new Date().toLocaleDateString('fr-FR');

  readonly deepDiveQuestion = signal<InterviewQuestion | null>(null);
  readonly showDeepDiveModal = signal(false);

  openDeepDive(questionId: string): void {
    const flat = this.svc.allQuestionsFlat().find(q => q.question.id === questionId);
    if (flat) {
      this.deepDiveQuestion.set(flat.question);
      this.showDeepDiveModal.set(true);
    }
  }

  closeDeepDive(): void {
    this.showDeepDiveModal.set(false);
    this.deepDiveQuestion.set(null);
  }
}