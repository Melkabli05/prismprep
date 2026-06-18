import { Component, input, computed } from '@angular/core';
import { InlineTextPipe } from '../../pipes/inline-text.pipe';

@Component({
  selector: 'app-answer-paragraphs',
  imports: [InlineTextPipe],
  styles: `
    .para-first {
      font-size: 0.9375rem;
      line-height: 1.85;
      color: var(--color-text-primary);
    }
    .para-rest {
      font-size: 0.9375rem;
      line-height: 1.85;
      color: var(--color-text-secondary);
    }
  `,
  template: `
    <div class="space-y-4">
      @for (para of paragraphs(); track $index) {
        <p [class]="$first ? 'para-first' : 'para-rest'">
          <span [innerHTML]="para | inlineText"></span>
        </p>
      }
    </div>
  `,
})
export class AnswerParagraphsComponent {
  answer = input.required<string>();

  paragraphs = computed(() =>
    this.answer().split(/\n\n|\n/).filter(p => p.trim().length > 0)
  );
}