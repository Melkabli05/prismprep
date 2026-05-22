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
interface SectionGroup { id: string; title: string; questions: Row[]; }

@Component({
  selector: 'app-admin-questions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <lucide-icon name="folder-tree" class="sidebar-header-icon" />
          <span>Catégories</span>
        </div>
        @for (cat of cats(); track cat.id) {
          <button class="cat-btn" [class.active]="activeCat() === cat.id" (click)="selectCat(cat.id)">
            <span class="cat-name">{{ cat.title }}</span>
            <span class="cat-badge" [class.active]="activeCat() === cat.id">{{ count(cat.id) }}</span>
          </button>
        }
      </aside>

      <!-- Main -->
      <div class="main">
        @if (activeCat() === '') {
          <div class="empty-state">
            <div class="empty-icon">
              <lucide-icon name="arrow-left" class="h-6 w-6" />
            </div>
            <h2 class="empty-title">Choisissez une catégorie</h2>
            <p class="empty-desc">Sélectionnez une catégorie dans le panneau latéral pour éditer ses questions.</p>
          </div>
        } @else {
          <!-- Section header -->
          <div class="page-header">
            <div class="page-header-icon">
              <lucide-icon name="file-text" class="h-5 w-5" />
            </div>
            <div>
              <h2 class="page-header-title">{{ activeCatTitle() }}</h2>
              <p class="page-header-sub">{{ questions().length }} questions &middot; {{ sections().length }} sections</p>
            </div>
          </div>

          <!-- Sections -->
          @for (sec of sections(); track sec.id) {
            <div class="section">
              <h3 class="section-title">{{ sec.title }}</h3>
              <div class="section-cards">
                @for (q of sec.questions; track q.id) {
                  <div class="q-card" [class.open]="editingId() === q.id">
                    <button class="q-bar" (click)="toggleEdit(q.id)" [attr.aria-expanded]="editingId() === q.id">
                      <div class="q-bar-left">
                        <span class="q-id">{{ q.id }}</span>
                        <span class="q-question">{{ q.question }}</span>
                      </div>
                      <div class="q-bar-right">
                        <span class="q-answer-preview">{{ truncate(q.answer, 80) }}</span>
                        <lucide-icon [name]="editingId() === q.id ? 'chevron-up' : 'chevron-down'" class="q-chevron" />
                      </div>
                    </button>

                    @if (editingId() === q.id) {
                      <div class="q-editor">
                        <div class="editor-grid">
                          <label class="field">
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

                          <label class="field field-sm">
                            <span class="field-label">Langage</span>
                            <input #qLang [value]="editL()" (input)="editL.set(qLang.value)" placeholder="java, sql…" class="input" />
                          </label>

                          <label class="field span-2">
                            <span class="field-label">Deep Dive (optionnel)</span>
                            <textarea #qDd [value]="editD()" (input)="editD.set(qDd.value)" class="input textarea mono" style="min-height: 180px"></textarea>
                          </label>
                        </div>

                        <div class="editor-actions">
                          @if (savedId() === q.id) {
                            <span class="save-ok"><lucide-icon name="check-circle" class="h-4 w-4" /> Sauvegardé</span>
                          }
                          @if (saveError()) {
                            <span class="save-err">{{ saveError() }}</span>
                          }
                          <span class="spacer"></span>
                          <button class="btn-cancel" (click)="toggleEdit('')">Annuler</button>
                          <button class="btn-save" (click)="save(q)">Sauvegarder</button>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
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
    :host { display: block; height: 100%; }

    /* ── Layout ────────────────────────────────────── */
    .layout { display: flex; gap: 2rem; height: 100%; align-items: flex-start; }

    /* ── Sidebar ───────────────────────────────────── */
    .sidebar {
      width: 220px; flex-shrink: 0; position: sticky; top: 5rem;
      display: flex; flex-direction: column; gap: 0.25rem;
    }
    .sidebar-header {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0 0.5rem 0.75rem;
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--color-text-muted);
    }
    .sidebar-header-icon { width: 0.875rem; height: 0.875rem; }

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
    .cat-badge {
      min-width: 20px; height: 18px; padding: 0 5px; border-radius: var(--radius-full);
      font-size: 0.6875rem; font-weight: 600; display: flex; align-items: center; justify-content: center;
      background: var(--color-surface-hover); color: var(--color-text-muted); margin-left: 0.375rem;
    }
    .cat-badge.active { background: var(--color-accent-soft); color: var(--color-accent); }

    /* ── Main area ─────────────────────────────────── */
    .main { flex: 1; min-width: 0; padding-bottom: 4rem; }

    /* ── Empty state ───────────────────────────────── */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 6rem 2rem; text-align: center; gap: 1rem;
    }
    .empty-icon {
      width: 56px; height: 56px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: var(--color-surface-hover); color: var(--color-text-muted);
    }
    .empty-title { font-family: var(--font-display); font-size: 1.125rem; font-weight: 600; margin: 0; color: var(--color-text-primary); }
    .empty-desc { font-size: 0.875rem; color: var(--color-text-muted); margin: 0; max-width: 320px; }

    /* ── Page header (matches section-header pattern) ── */
    .page-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; }
    .page-header-icon {
      width: 44px; height: 44px; border-radius: var(--radius-lg);
      background: var(--color-accent-soft); border: 1px solid var(--color-border-subtle);
      display: flex; align-items: center; justify-content: center; color: var(--color-accent); flex-shrink: 0;
    }
    .page-header-title {
      font-family: var(--font-display); font-size: 1.25rem; font-weight: 600;
      letter-spacing: -0.01em; color: var(--color-text-primary); margin: 0 0 0.125rem;
    }
    .page-header-sub { font-size: 0.8125rem; color: var(--color-text-muted); margin: 0; }

    /* ── Sections ──────────────────────────────────── */
    .section { margin-bottom: 2.5rem; }
    .section-title {
      font-family: var(--font-display); font-size: 1rem; font-weight: 600;
      color: var(--color-text-secondary); margin: 0 0 0.75rem;
      padding-bottom: 0.5rem; border-bottom: 1px solid var(--color-border-subtle);
    }
    .section-cards { display: flex; flex-direction: column; gap: 0.5rem; }

    /* ── Question card ─────────────────────────────── */
    .q-card {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); overflow: hidden;
      box-shadow: var(--shadow-card);
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .q-card:hover { border-color: var(--color-border-strong); box-shadow: var(--shadow-card-hover); }
    .q-card.open { border-color: var(--color-accent); box-shadow: 0 0 0 1px var(--color-accent-soft), var(--shadow-card); }

    .q-bar {
      display: flex; align-items: center; gap: 1rem;
      width: 100%; padding: 0.875rem 1.25rem; border: none;
      background: transparent; color: inherit; text-align: left;
      font-family: inherit; cursor: pointer;
      transition: background 150ms ease;
    }
    .q-bar:hover { background: var(--color-surface-raised); }
    .q-bar-left { display: flex; align-items: center; gap: 0.75rem; min-width: 0; flex: 2; }
    .q-id {
      font-size: 0.6875rem; font-weight: 600; color: var(--color-accent);
      font-family: var(--font-mono); flex-shrink: 0;
    }
    .q-question { font-size: 0.875rem; font-weight: 500; color: var(--color-text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .q-bar-right { display: flex; align-items: center; gap: 0.75rem; flex: 1; justify-content: flex-end; min-width: 0; }
    .q-answer-preview { font-size: 0.75rem; color: var(--color-text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .q-chevron { width: 1rem; height: 1rem; flex-shrink: 0; color: var(--color-text-muted); }

    /* ── Editor ─────────────────────────────────────── */
    .q-editor {
      padding: 0 1.25rem 1.25rem;
      border-top: 1px solid var(--color-border-subtle);
      background: var(--color-surface-raised);
    }
    .editor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
    .span-2 { grid-column: span 2; }

    .field { display: flex; flex-direction: column; gap: 0.375rem; }
    .field-sm { max-width: 160px; }
    .field-label {
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--color-text-muted);
    }
    .input {
      width: 100%; padding: 0.625rem 0.875rem;
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-lg); color: var(--color-text-primary);
      font-size: 0.875rem; font-family: inherit; line-height: 1.6;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .input::placeholder { color: var(--color-text-placeholder); }
    .textarea { resize: vertical; min-height: 100px; }
    .mono { font-family: var(--font-mono); font-size: 0.8125rem; }

    /* ── Editor actions ─────────────────────────────── */
    .editor-actions { display: flex; align-items: center; gap: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border-subtle); }
    .spacer { flex: 1; }
    .save-ok { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 600; color: var(--color-success); }
    .save-err { font-size: 0.8125rem; color: var(--color-error); }

    .btn-cancel {
      height: 34px; padding: 0 1rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: transparent;
      color: var(--color-text-secondary); font-size: 0.8125rem; font-weight: 500;
      font-family: inherit; cursor: pointer;
      transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
    }
    .btn-cancel:hover { background: var(--color-surface-hover); border-color: var(--color-border-strong); color: var(--color-text-primary); }

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

  // Section metadata from the static data
  private sectionMap: Record<string, string> = {};

  readonly sections = computed<SectionGroup[]>(() => {
    const qs = this.questions();
    const groups: SectionGroup[] = [];
    const seen = new Set<string>();
    for (const q of qs) {
      const sid = q.section_id;
      if (!seen.has(sid)) {
        seen.add(sid);
        groups.push({ id: sid, title: this.sectionMap[sid] ?? sid, questions: [] });
      }
      const group = groups.find(g => g.id === sid)!;
      group.questions.push(q);
    }
    return groups;
  });

  readonly activeCatTitle = computed(() => {
    return this.cats().find(c => c.id === this.activeCat())?.title ?? '';
  });

  constructor() {
    this.sb = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

    // Build section title map from static data
    for (const cat of interviewCategories) {
      for (const sec of cat.sections) {
        this.sectionMap[sec.id] = sec.title;
      }
    }

    this.sb.from('questions').select('*').order('sort_order').then(({ data }) => {
      this.all = data ?? [];
    });
  }

  truncate(text: string, max: number): string {
    return text.length > max ? text.slice(0, max) + '…' : text;
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
