import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { interviewCategories } from '../interview/data';

interface Cat { id: string; title: string; }
interface Row {
  id: string; section_id: string; category_id: string;
  question: string; answer: string; example: string | null;
  code: string | null; language: string | null; sort_order: number;
  deep_dive: string | null;
}

@Component({
  selector: 'app-admin-questions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="questions-layout">
      <aside class="cat-sidebar">
        <h3>Catégories</h3>
        @for (cat of cats(); track cat.id) {
          <button class="cat-btn" [class.active]="activeCat() === cat.id"
            (click)="selectCat(cat.id)">{{ cat.title }} ({{ count(cat.id) }})</button>
        }
      </aside>

      <div class="editor-panel">
        @if (activeCat() === '') {
          <p class="empty">Sélectionnez une catégorie pour voir ses questions.</p>
        } @else {
          @for (q of questions(); track q.id) {
            <div class="q-card" [class.open]="editingId() === q.id">
              <div class="q-header" (click)="toggleEdit(q.id)"
                (keydown.enter)="toggleEdit(q.id)" tabindex="0" role="button"
                [attr.aria-expanded]="editingId() === q.id">
                <span class="q-id">{{ q.id }}</span>
                <span class="q-text">{{ q.question }}</span>
                <span class="q-chevron">{{ editingId() === q.id ? '▾' : '▸' }}</span>
              </div>

              @if (editingId() === q.id) {
                <div class="q-editor">
                  <label><span>Question</span>
                    <input #qTitle [value]="editQ()" (input)="editQ.set(qTitle.value)" class="field" />
                  </label>
                  <label><span>Réponse</span>
                    <textarea #qAns [value]="editA()" (input)="editA.set(qAns.value)" class="field large"></textarea>
                  </label>
                  <label><span>Code (optionnel)</span>
                    <textarea #qCode [value]="editC()" (input)="editC.set(qCode.value)" class="field code"></textarea>
                  </label>
                  <label><span>Langage</span>
                    <input #qLang [value]="editL()" (input)="editL.set(qLang.value)" class="field" placeholder="java, sql, typescript..." />
                  </label>
                  <label><span>Deep Dive (optionnel)</span>
                    <textarea #qDd [value]="editD()" (input)="editD.set(qDd.value)" class="field large code"></textarea>
                  </label>

                  <div class="editor-actions">
                    @if (savedId() === q.id) { <span class="save-success" role="status">✓ Sauvegardé</span> }
                    @if (saveError()) { <span class="save-error">{{ saveError() }}</span> }
                    <button class="btn-cancel" (click)="toggleEdit('')">Annuler</button>
                    <button class="btn-save" (click)="save(q)">Sauvegarder</button>
                  </div>
                </div>
              }
            </div>
          }
        }
      </div>

      @if (loading()) { <div class="loading-overlay">Sauvegarde…</div> }
    </div>
  `,
  styles: `
    :host { display: block; height: 100%; }
    .questions-layout { display: flex; height: 100%; }
    .cat-sidebar {
      width: 220px; flex-shrink: 0; overflow-y: auto; padding: 1rem;
      border-right: 1px solid var(--color-border); background: var(--color-surface);
    }
    h3 { margin: 0 0 0.75rem; font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.05em; }
    .cat-btn {
      display: block; width: 100%; text-align: left; padding: 0.4rem 0.5rem;
      border: none; border-radius: var(--radius-sm); background: transparent;
      color: var(--color-text); font-size: 0.8rem; cursor: pointer; transition: background 150ms ease;
    }
    .cat-btn:hover { background: var(--color-surface-hover); }
    .cat-btn.active { background: var(--color-accent-soft); color: var(--color-accent); font-weight: 600; }
    .editor-panel { flex: 1; overflow-y: auto; padding: 1.5rem; }
    .empty { color: var(--color-text-muted); font-style: italic; padding: 2rem; text-align: center; }

    .q-card { border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-bottom: 0.5rem; background: var(--color-surface); overflow: hidden; }
    .q-card.open { border-color: var(--color-accent); }
    .q-header {
      display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem;
      cursor: pointer; user-select: none; transition: background 150ms ease;
    }
    .q-header:hover { background: var(--color-surface-hover); }
    .q-id { font-size: 0.7rem; font-weight: 600; color: var(--color-accent); font-family: var(--font-mono); min-width: 3rem; }
    .q-text { flex: 1; font-size: 0.875rem; }
    .q-chevron { font-size: 0.75rem; color: var(--color-text-muted); }

    .q-editor { padding: 0 1rem 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
    label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; color: var(--color-text-muted); }
    .field {
      width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-sm); background: var(--color-bg);
      color: var(--color-text); font-size: 0.875rem; font-family: inherit;
      resize: vertical; transition: border-color 150ms ease;
    }
    .field:focus { outline: none; border-color: var(--color-accent); }
    .field.large { min-height: 120px; }
    .field.code { font-family: var(--font-mono, monospace); font-size: 0.8rem; }

    .editor-actions { display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
    .btn-cancel, .btn-save { padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
    .btn-cancel { background: var(--color-surface-hover); color: var(--color-text); }
    .btn-save { background: var(--color-accent); color: var(--color-accent-text); }
    .btn-cancel:hover, .btn-save:hover { opacity: 0.85; }
    .save-success { color: var(--color-success, #22c55e); font-size: 0.8rem; font-weight: 600; }
    .save-error { color: var(--color-error, #ef4444); font-size: 0.8rem; }
    .loading-overlay {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.3); color: white; font-weight: 600; z-index: 10;
    }
  `,
})
export class AdminQuestionsPage {
  readonly cats = signal<Cat[]>(interviewCategories.map(c => ({ id: c.id, title: c.title })));
  readonly activeCat = signal('');
  readonly questions = signal<Row[]>([]);
  readonly editingId = signal('');
  readonly loading = signal(false);
  readonly savedId = signal('');
  readonly saveError = signal('');

  readonly editQ = signal('');
  readonly editA = signal('');
  readonly editC = signal('');
  readonly editL = signal('');
  readonly editD = signal('');

  private sb: SupabaseClient;
  private all: Row[] = [];

  constructor() {
    this.sb = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    this.sb.from('questions').select('*').order('sort_order').then(({ data }) => {
      this.all = data ?? [];
    });
  }

  count(catId: string): number { return this.all.filter(q => q.category_id === catId).length; }

  selectCat(catId: string): void {
    this.activeCat.set(catId);
    this.editingId.set('');
    this.questions.set(this.all.filter(q => q.category_id === catId));
  }

  toggleEdit(qid: string): void {
    if (this.editingId() === qid) { this.editingId.set(''); return; }
    const q = this.questions().find(q => q.id === qid);
    if (!q) return;
    this.saveError.set('');
    this.savedId.set('');
    this.editQ.set(q.question);
    this.editA.set(q.answer);
    this.editC.set(q.code ?? '');
    this.editL.set(q.language ?? '');
    this.editD.set(q.deep_dive ?? '');
    this.editingId.set(qid);
  }

  async save(q: Row): Promise<void> {
    this.loading.set(true);
    this.saveError.set('');
    const { error } = await this.sb.from('questions').update({
      question: this.editQ(), answer: this.editA(),
      code: this.editC() || null, language: this.editL() || null,
      deep_dive: this.editD() || null,
    }).eq('id', q.id);

    this.loading.set(false);
    if (error) { this.saveError.set(error.message); return; }

    const idx = this.all.findIndex(x => x.id === q.id);
    if (idx >= 0) {
      this.all[idx] = { ...this.all[idx], question: this.editQ(), answer: this.editA(), code: this.editC() || null, language: this.editL() || null, deep_dive: this.editD() || null };
    }
    this.selectCat(this.activeCat());
    this.savedId.set(q.id);
    setTimeout(() => { if (this.savedId() === q.id) this.savedId.set(''); }, 2000);
  }
}
