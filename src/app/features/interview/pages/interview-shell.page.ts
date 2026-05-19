import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { InterviewService } from '../../../core/services/interview.service';
import { interviewCategories } from '../data';
import type { InterviewSection, InterviewQuestion } from '../../../core/models/interview.models';

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
  ],
  templateUrl: './interview-shell.page.html',
  styleUrl: './interview-shell.page.css',
})
export class InterviewShellPage {
  readonly svc = inject(InterviewService);

  readonly isSearching = computed(() => this.svc.searchQuery().trim().length > 0);
  readonly totalQuestions = computed(() => this.svc.allQuestionsFlat().length);
  readonly categoryCount = interviewCategories.length;

  todayDate(): string { return new Date().toLocaleDateString('fr-FR'); }

  getOrderedQuestions = (section: InterviewSection): InterviewQuestion[] => this.svc.getOrderedQuestions(section);

  getFilteredQuestions = (section: InterviewSection): InterviewQuestion[] => {
    const questions = this.getOrderedQuestions(section);
    return this.svc.showBookmarksOnly() ? questions.filter(q => this.svc.bookmarks().has(q.id)) : questions;
  };

  toQuestionList = (questions: InterviewQuestion[]) =>
    questions.map(q => ({ category: this.svc.category(), question: q }));

  onFlashcardModeChange(v: boolean): void { this.svc.setFlashcardMode(v); if (v) this.svc.resetRevealedCards(); }
  prevMock(): void { this.svc.setMockInterviewIdx(Math.max(0, this.svc.mockInterviewIdx() - 1)); this.svc.resetRevealedCards(); }
  nextMock(): void { this.svc.setMockInterviewIdx(this.svc.mockInterviewIdx() + 1); this.svc.resetRevealedCards(); }
  finishMock(): void { this.svc.setShowMockInterview(false); this.svc.setMockRunning(false); this.svc.setMockTimer(0); }
}