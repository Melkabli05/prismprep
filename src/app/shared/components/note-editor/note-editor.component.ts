import { Component, input, output, signal, effect, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-note-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  styles: `
    textarea {
      width: 100%;
      min-height: 88px;
      padding: 0.875rem 1rem;
      border: 1px dashed var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface-raised);
      color: var(--color-text-primary);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      line-height: 1.6;
      resize: none;
      transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
      box-sizing: border-box;
    }
    textarea::placeholder {
      color: var(--color-text-placeholder);
    }
    textarea:focus {
      outline: none;
      border-style: solid;
      border-color: var(--color-accent);
      background: var(--color-surface);
      box-shadow: 0 0 0 3px var(--color-accent-soft);
    }
  `,
  template: `
    <textarea
      [formField]="noteForm.content"
      (input)="onNoteChange($event)"
      placeholder="Ajoutez vos notes personnelles...">
    </textarea>
  `,
})
export class NoteEditorComponent implements OnDestroy {
  note = input<string>('');
  noteChange = output<string>();

  noteModel = signal({ content: '' });
  noteForm = form(this.noteModel);

  private userIsTyping = signal(false);
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    if (this.typingTimer !== null) clearTimeout(this.typingTimer);
  }

  constructor() {
    effect(() => {
      if (!this.userIsTyping()) {
        this.noteModel.update(m => ({ ...m, content: this.note() }));
      }
    });
  }

  onNoteChange(event: Event): void {
    this.userIsTyping.set(true);
    this.noteChange.emit((event.target as HTMLTextAreaElement).value);
    if (this.typingTimer !== null) clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.userIsTyping.set(false);
      this.typingTimer = null;
    }, 500);
  }
}