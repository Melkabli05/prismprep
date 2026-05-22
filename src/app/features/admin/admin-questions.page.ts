import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { LucideAngularModule } from 'lucide-angular';
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
  imports: [LucideAngularModule],
  template: `
    <div class="layout">
      <!-- Category sidebar -->
      <aside class="cats">
        <h3 class="cats-title">Catégories</h3>
        @for (cat of cats(); track cat.id) {
          <button class="cat-btn" [class.active]="activeCat() === cat.id" (click)="selectCat(cat.id)">
            <span class="cat-name">{{ cat.title }}</span>
            <span class="cat-count" [class.active]="activeCat() === cat.id">{{ count(cat.id) }}</span>
          </button>
        }
      </aside>

      <!-- Questions -->
      <div class="questions">
        @if (activeCat() === '') {
          <div class="empty">
            <p>Sélectionnez une catégorie pour éditer ses questions.</p>
          </div>
        } @else {
          <div class="q-header-bar">
            <span class="q-count">{{ questions().length }} questions</span>
          </div>

          @for (q of questions(); track q.id) {
            <div class="q-card" [class.open]="editingId() === q.id">
              <button class="q-toggle" (click)="toggleEdit(q.id)" [attr.aria-expanded]="editingId() === q.id">
                <span class="q-id">{{ q.id }}</span>
                <span class="q-text">{{ q.question }}</span>
                <lucide-icon [name]="editingId() === q.id ? 'chevron-up' : 'chevron-down'" class="q-chevron" />
              </button>

              @if (editingId() === q.id) {
                <div class="q-editor">
                  <label class="field">
                    <span class="field-label">Question</span>
                    <input #qTitle [value]="editQ()" (input)="editQ.set(qTitle.value)" class="field-input" />
                  </label>

                  <label class="field">
                    <span class="field-label">Réponse</span>
                    <textarea #qAns [value]="editA()" (input)="editA.set(qAns.value)" class="field-input field-ta"></textarea>
                  </label>

                  <div class="field-row">
                    <label class="field flex-1">
                      <span class="field-label">Code (optionnel)</span>
                      <textarea #qCode [value]="editC()" (input)="editC.set(qCode.value)" class="field-input field-ta field-mono"></textarea>
                    </label>
                    <label class="field" style="width: 140px">
                      <span class="field-label">Langage</span>
                      <input #qLang [value]="editL()" (input)="editL.set(qLang.value)" placeholder="java, sql…" class="field-input" />
                    </label>
                  </div>

                  <label class="field">
                    <span class="field-label">Deep Dive (optionnel)</span>
                    <textarea #qDd [value]="editD()" (input)="editD.set(qDd.value)" class="field-input field-ta field-mono" style="min-height: 160px"></textarea>
                  </label>

                  <div class="editor-bar">
                    <div class="editor-feedback">
                      @if (savedId() === q.id) { <span class="save-ok"><lucide-icon name="check-circle" class="h-4 w-4" /> Sauvegardé</span> }
                      @if (saveError()) { <span class="save-err">{{ saveError() }}</span> }
                    </div>
                    <button class="btn-ghost" (click)="toggleEdit('')">Annuler</button>
                    <button class="btn-save" (click)="save(q)">Sauvegarder</button>
                  </div>
                </div>
              }
            </div>
          }
        }
      </div>
    </div>

    @if (loading()) {
      <div class="loading-overlay">Sauvegarde en cours…</div>
    }
  `,
  styles: `
    .layout { display: flex; gap: 1.5rem; align-items: flex-start; }
    .flex-1 { flex: 1; }
    .field-row { display: flex; gap: 0.75rem; }

    /* ── Category sidebar ──────────────────────────── */
    .cats {
      width: 220px; flex-shrink: 0;
      display: flex; flex-direction: column; gap: 0.25rem;
      position: sticky; top: 5rem;
    }
    .cats-title {
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--color-text-muted);
      margin: 0 0 0.25rem 0.5rem;
    }
    .cat-btn {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.5rem 0.75rem; border: none; border-radius: var(--radius-full);
      background: transparent; color: var(--color-text-muted);
      font-size: 0.8125rem; font-weight: 500; font-family: inherit; cursor: pointer;
      transition: background 180ms ease, color 180ms ease, box-shadow 180ms ease;
    }
    .cat-btn:hover { background: var(--color-surface-hover); color: var(--color-text-secondary); }
    .cat-btn.active {
      background: var(--color-surface); color: var(--color-text-primary);
      border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);
    }
    .cat-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cat-count {
      min-width: 20px; height: 18px; padding: 0 5px; border-radius: var(--radius-full);
      font-size: 0.6875rem; font-weight: 600; display: flex; align-items: center; justify-content: center;
      background: var(--color-surface-hover); color: var(--color-text-muted);
      margin-left: 0.375rem;
    }
    .cat-count.active { background: var(--color-accent-soft); color: var(--color-accent); }

    /* ── Questions list ────────────────────────────── */
    .questions { flex: 1; min-width: 0; }
    .empty { padding: 3rem 2rem; text-align: center; }
    .empty p { color: var(--color-text-muted); font-size: 0.875rem; margin: 0; }
    .q-header-bar { margin-bottom: 0.5rem; }
    .q-count { font-size: 0.75rem; color: var(--color-text-muted); }

    /* ── Question card ─────────────────────────────── */
    .q-card {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); margin-bottom: 0.5rem; overflow: hidden;
      transition: border-color 200ms ease;
    }
    .q-card.open { border-color: var(--color-accent); }
    .q-toggle {
      display: flex; align-items: center; gap: 0.75rem;
      width: 100%; padding: 0.75rem 1rem; border: none;
      background: transparent; color: inherit; text-align: left;
      font-family: inherit; cursor: pointer;
      transition: background 150ms ease;
    }
    .q-toggle:hover { background: var(--color-surface-raised); }
    .q-id {
      font-size: 0.6875rem; font-weight: 600; color: var(--color-accent);
      font-family: var(--font-mono); min-width: 2.5rem;
    }
    .q-text { flex: 1; font-size: 0.875rem; font-weight: 500; }
    .q-chevron { width: 1rem; height: 1rem; flex-shrink: 0; color: var(--color-text-muted); }

    /* ── Editor ─────────────────────────────────────── */
    .q-editor {
      display: flex; flex-direction: column; gap: 0.875rem;
      padding: 0 1rem 1.25rem;
      border-top: 1px solid var(--color-border-subtle);
      background: var(--color-surface-raised);
    }
    .field { display: flex; flex-direction: column; gap: 0.375rem; }
    .field-label {
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--color-text-muted);
    }
    .field-input {
      width: 100%; padding: 0.625rem 0.875rem;
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); color: var(--color-text-primary);
      font-size: 0.875rem; font-family: inherit; line-height: 1.6;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .field-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .field-input::placeholder { color: var(--color-text-placeholder); }
    .field-ta { resize: vertical; min-height: 100px; }
    .field-mono { font-family: var(--font-mono); font-size: 0.8125rem; }

    /* ── Editor action bar ──────────────────────────── */
    .editor-bar {
      display: flex; align-items: center; gap: 0.75rem;
      padding-top: 0.5rem; border-top: 1px solid var(--color-border-subtle);
    }
    .editor-feedback { flex: 1; display: flex; align-items: center; gap: 0.75rem; }
    .save-ok { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 600; color: var(--color-success); }
    .save-err { font-size: 0.8125rem; color: var(--color-error); }

    .btn-ghost {
      height: 34px; padding: 0 1rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: transparent;
      color: var(--color-text-secondary); font-size: 0.8125rem; font-weight: 500;
      font-family: inherit; cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
    }
    .btn-ghost:hover { background: var(--color-surface-hover); border-color: var(--color-border-strong); color: var(--color-text-primary); }

    .btn-save {
      height: 34px; padding: 0 1rem; border: none; border-radius: var(--radius-full);
      background: var(--color-accent); color: var(--color-accent-text);
      font-size: 0.8125rem; font-weight: 600; font-family: inherit; cursor: pointer;
      transition: background 150ms ease, transform 120ms ease;
    }
    .btn-save:hover { background: var(--color-accent-hover); transform: translateY(-1px); }
    .btn-save:active { transform: translateY(0); }

    .loading-overlay {
      position: fixed; inset: 0; z-index: 100;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.35); backdrop-filter: blur(4px);
      color: white; font-weight: 600; font-size: 1rem;
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

  total() { return this.all.length; }
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
