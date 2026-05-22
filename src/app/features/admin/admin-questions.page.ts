import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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
    <!-- Toolbar -->
    <div class="toolbar">
      <select #catSelect (change)="selectCat(catSelect.value)" class="select">
        <option value="">Toutes les catégories</option>
        @for (cat of cats(); track cat.id) {
          <option [value]="cat.id" [selected]="activeCat() === cat.id">{{ cat.title }}</option>
        }
      </select>
      <div class="search-wrap">
        <lucide-icon name="search" class="search-icon" />
        <input #searchInput type="text" placeholder="Rechercher une question…" class="search-input"
          [value]="searchQuery()" (input)="searchQuery.set(searchInput.value)" />
        @if (searchQuery()) {
          <button class="search-clear" (click)="searchQuery.set(''); searchInput.value = ''; searchInput.focus()">
            <lucide-icon name="x" class="h-3 w-3" />
          </button>
        }
      </div>
      <span class="toolbar-count">{{ filtered().length }} question{{ filtered().length !== 1 ? 's' : '' }}</span>
    </div>

    <!-- Data table -->
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th class="col-id">ID</th>
            <th class="col-q">Question</th>
            <th class="col-a">Réponse</th>
            <th class="col-act"></th>
          </tr>
        </thead>
        <tbody>
          @for (q of filtered(); track q.id) {
            <tr [class.editing]="editingId() === q.id">
              <td class="col-id"><span class="cell-id">{{ q.id }}</span></td>
              <td class="col-q">{{ q.question }}</td>
              <td class="col-a">{{ truncate(q.answer, 100) }}</td>
              <td class="col-act">
                <button class="edit-btn" (click)="toggleEdit(q.id)">
                  <lucide-icon [name]="editingId() === q.id ? 'x' : 'pencil'" class="h-3.5 w-3.5" />
                  {{ editingId() === q.id ? 'Fermer' : 'Éditer' }}
                </button>
              </td>
            </tr>
            @if (editingId() === q.id) {
              <tr class="editor-row">
                <td colspan="4">
                  <div class="editor">
                    <div class="editor-grid">
                      <label class="field span-2">
                        <span class="field-label">Question</span>
                        <input #qTitle [value]="editQ()" (input)="editQ.set(qTitle.value)" class="input" />
                      </label>
                      <label class="field span-2">
                        <span class="field-label">Réponse</span>
                        <textarea #qAns [value]="editA()" (input)="editA.set(qAns.value)" class="input textarea"></textarea>
                      </label>
                      <label class="field">
                        <span class="field-label">Code (optionnel)</span>
                        <textarea #qCode [value]="editC()" (input)="editC.set(qCode.value)" class="input textarea mono"></textarea>
                      </label>
                      <label class="field" style="max-width: 160px">
                        <span class="field-label">Langage</span>
                        <input #qLang [value]="editL()" (input)="editL.set(qLang.value)" placeholder="java, sql…" class="input" />
                      </label>
                      <label class="field span-2">
                        <span class="field-label">Deep Dive (optionnel)</span>
                        <textarea #qDd [value]="editD()" (input)="editD.set(qDd.value)" class="input textarea mono" style="min-height: 160px"></textarea>
                      </label>
                    </div>
                    <div class="editor-actions">
                      @if (savedId() === q.id) {
                        <span class="save-ok"><lucide-icon name="check-circle" class="h-4 w-4" /> Sauvegardé</span>
                      }
                      @if (saveError()) { <span class="save-err">{{ saveError() }}</span> }
                      <span class="spacer"></span>
                      <button class="btn-cancel" (click)="toggleEdit('')">Annuler</button>
                      <button class="btn-save" (click)="save(q)">Sauvegarder</button>
                    </div>
                  </div>
                </td>
              </tr>
            }
          } @empty {
            <tr>
              <td colspan="4" class="empty-cell">
                <div class="empty">
                  <lucide-icon name="search" class="empty-icon" />
                  <p>Aucune question trouvée</p>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (loading()) {
      <div class="loading-overlay">Sauvegarde en cours…</div>
    }
  `,
  styles: `
    :host { display: block; }

    /* ── Toolbar ────────────────────────────────────── */
    .toolbar {
      display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;
      padding: 0.75rem; border-radius: var(--radius-lg);
      background: var(--color-surface); border: 1px solid var(--color-border);
    }
    .select {
      height: 34px; padding: 0 0.75rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: var(--color-surface-raised);
      color: var(--color-text-primary); font-size: 0.8125rem; font-family: inherit;
      cursor: pointer; min-width: 180px;
    }
    .select:focus { outline: none; border-color: var(--color-accent); }
    .search-wrap {
      flex: 1; position: relative; display: flex; align-items: center;
    }
    .search-icon { position: absolute; left: 12px; width: 0.875rem; height: 0.875rem; color: var(--color-text-muted); pointer-events: none; }
    .search-input {
      width: 100%; height: 34px; padding: 0 2rem 0 2.25rem;
      border: 1px solid var(--color-border); border-radius: var(--radius-full);
      background: var(--color-surface-raised); color: var(--color-text-primary);
      font-size: 0.8125rem; font-family: inherit;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .search-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .search-input::placeholder { color: var(--color-text-placeholder); }
    .search-clear {
      position: absolute; right: 8px; display: flex; align-items: center; justify-content: center;
      width: 18px; height: 18px; border: none; border-radius: var(--radius-full);
      background: transparent; color: var(--color-text-muted); cursor: pointer;
    }
    .search-clear:hover { background: var(--color-surface-hover); color: var(--color-text-primary); }
    .toolbar-count { font-size: 0.75rem; color: var(--color-text-muted); white-space: nowrap; flex-shrink: 0; }

    /* ── Table ──────────────────────────────────────── */
    .table-wrap {
      border: 1px solid var(--color-border); border-radius: var(--radius-lg);
      overflow: hidden; background: var(--color-surface);
    }
    .table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }
    thead { position: sticky; top: 3.5rem; z-index: 10; }
    th {
      text-align: left; padding: 0.625rem 1rem;
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.06em; color: var(--color-text-muted);
      background: var(--color-surface-raised); border-bottom: 1px solid var(--color-border);
    }
    td { padding: 0.625rem 1rem; border-bottom: 1px solid var(--color-border-subtle); vertical-align: top; }
    tr:last-child td { border-bottom: none; }
    tbody tr { transition: background 120ms ease; }
    tbody tr:hover { background: var(--color-surface-raised); }
    tr.editing { background: var(--color-accent-soft); }
    tr.editing:hover { background: var(--color-accent-soft); }

    .col-id { width: 80px; white-space: nowrap; }
    .col-q { min-width: 200px; }
    .col-a { min-width: 200px; color: var(--color-text-secondary); }
    .col-act { width: 100px; text-align: right; white-space: nowrap; }

    .cell-id {
      font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600;
      color: var(--color-accent);
    }

    .edit-btn {
      display: inline-flex; align-items: center; gap: 0.25rem;
      height: 28px; padding: 0 0.625rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: var(--color-surface);
      color: var(--color-text-secondary); font-size: 0.75rem; font-family: inherit;
      cursor: pointer; transition: all 150ms ease;
    }
    .edit-btn:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-accent-soft); }

    /* ── Editor row ─────────────────────────────────── */
    .editor-row { background: var(--color-surface-raised); }
    .editor-row td { padding: 0; }
    .editor { padding: 1.25rem; border-top: 2px solid var(--color-accent); }
    .editor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .span-2 { grid-column: span 2; }

    .field { display: flex; flex-direction: column; gap: 0.375rem; }
    .field-label {
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--color-text-muted);
    }
    .input {
      width: 100%; padding: 0.5rem 0.75rem;
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); color: var(--color-text-primary);
      font-size: 0.8125rem; font-family: inherit; line-height: 1.6;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .textarea { resize: vertical; min-height: 80px; }
    .mono { font-family: var(--font-mono); font-size: 0.75rem; }

    .editor-actions { display: flex; align-items: center; gap: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border-subtle); }
    .spacer { flex: 1; }
    .save-ok { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 600; color: var(--color-success); }
    .save-err { font-size: 0.8125rem; color: var(--color-error); }
    .btn-cancel {
      height: 32px; padding: 0 0.875rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: transparent;
      color: var(--color-text-secondary); font-size: 0.75rem; font-weight: 500;
      font-family: inherit; cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease;
    }
    .btn-cancel:hover { background: var(--color-surface-hover); border-color: var(--color-border-strong); }
    .btn-save {
      height: 32px; padding: 0 0.875rem; border: none; border-radius: var(--radius-full);
      background: var(--color-accent); color: var(--color-accent-text);
      font-size: 0.75rem; font-weight: 600; font-family: inherit; cursor: pointer;
      transition: background 150ms ease;
    }
    .btn-save:hover { background: var(--color-accent-hover); }

    /* ── Empty ──────────────────────────────────────── */
    .empty-cell { text-align: center; }
    .empty { padding: 3rem 1rem; color: var(--color-text-muted); }
    .empty-icon { width: 1.5rem; height: 1.5rem; margin-bottom: 0.5rem; }

    .loading-overlay {
      position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.35); backdrop-filter: blur(4px);
      color: white; font-weight: 600; font-size: 1rem;
    }
  `,
})
export class AdminQuestionsPage {
  readonly cats = signal<Cat[]>(interviewCategories.map(c => ({ id: c.id, title: c.title })));
  readonly activeCat = signal('');
  readonly searchQuery = signal('');
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

  readonly filtered = computed(() => {
    let qs = this.all;
    const cat = this.activeCat();
    if (cat) qs = qs.filter(q => q.category_id === cat);
    const q = this.searchQuery().toLowerCase();
    if (q) qs = qs.filter(r => r.question.toLowerCase().includes(q) || r.answer.toLowerCase().includes(q) || r.id.includes(q));
    return qs;
  });

  constructor() {
    this.sb = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    this.sb.from('questions').select('*').order('sort_order').then(({ data }) => {
      this.all = data ?? [];
    });
  }

  count(catId: string): number { return this.all.filter(q => q.category_id === catId).length; }
  truncate(text: string, max: number): string { return text.length > max ? text.slice(0, max) + '…' : text; }

  selectCat(catId: string): void { this.activeCat.set(catId); this.editingId.set(''); }
  total() { return this.all.length; }

  toggleEdit(qid: string): void {
    if (this.editingId() === qid) { this.editingId.set(''); return; }
    const q = this.all.find(q => q.id === qid);
    if (!q) return;
    this.saveError.set(''); this.savedId.set('');
    this.editQ.set(q.question); this.editA.set(q.answer);
    this.editC.set(q.code ?? ''); this.editL.set(q.language ?? '');
    this.editD.set(q.deep_dive ?? '');
    this.editingId.set(qid);
  }

  async save(q: Row): Promise<void> {
    this.loading.set(true); this.saveError.set('');
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
    this.savedId.set(q.id);
    setTimeout(() => { if (this.savedId() === q.id) this.savedId.set(''); }, 2000);
  }
}
