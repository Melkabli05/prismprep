import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { LucideAngularModule } from 'lucide-angular';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { environment } from '../../../environments/environment';
import { interviewCategories } from '../interview/data';

interface Row {
  id: string; section_id: string; category_id: string;
  question: string; answer: string; example: string | null;
  code: string | null; language: string | null; sort_order: number;
  deep_dive: string | null;
}

@Component({
  selector: 'app-admin-question-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule, MarkdownPipe],
  template: `
    @if (question(); as q) {
      <!-- Breadcrumb + nav -->
      <div class="top-bar">
        <div class="breadcrumb">
          <a routerLink="/admin" class="bc-link">Admin</a>
          <lucide-icon name="chevron-right" class="bc-arrow" />
          <a routerLink="/admin" class="bc-link">Questions</a>
          <lucide-icon name="chevron-right" class="bc-arrow" />
          <span class="bc-current">{{ editQ() || q.id }}</span>
        </div>
        <div class="top-actions">
          <button class="nav-btn" (click)="goPrev()" [disabled]="!hasPrev()">
            <lucide-icon name="chevron-left" class="h-4 w-4" /> Précédent
          </button>
          <button class="nav-btn" (click)="goNext()" [disabled]="!hasNext()">
            Suivant <lucide-icon name="chevron-right" class="h-4 w-4" />
          </button>
          <button class="save-btn" (click)="save()">
            <lucide-icon name="check" class="h-4 w-4" /> Sauvegarder
          </button>
        </div>
      </div>

      <!-- Status -->
      @if (saved()) { <div class="status-ok"><lucide-icon name="check-circle" class="h-4 w-4" /> Modifications sauvegardées</div> }
      @if (saveError()) { <div class="status-err">{{ saveError() }}</div> }

      <!-- Editor grid -->
      <div class="editor-layout">
        <!-- Left: form fields -->
        <div class="editor-form">
          <div class="meta-row">
            <span class="meta-id">{{ q.id }}</span>
            <span class="meta-cat">{{ catName(q.category_id) }}</span>
            <span class="meta-section">{{ q.section_id }}</span>
          </div>

          <label class="field">
            <span class="field-label">Question</span>
            <input #qTitle [value]="editQ()" (input)="editQ.set(qTitle.value)" class="input" />
          </label>

          <label class="field">
            <span class="field-label">Réponse</span>
            <textarea #qAns [value]="editA()" (input)="editA.set(qAns.value)" class="input textarea" rows="6"></textarea>
          </label>

          <div class="field-row">
            <label class="field flex-1">
              <span class="field-label">Code (optionnel)</span>
              <textarea #qCode [value]="editC()" (input)="editC.set(qCode.value)" class="input textarea mono" rows="4"></textarea>
            </label>
            <label class="field field-sm">
              <span class="field-label">Langage</span>
              <input #qLang [value]="editL()" (input)="editL.set(qLang.value)" class="input" placeholder="java" />
            </label>
          </div>

          <label class="field">
            <span class="field-label">Deep Dive — Markdown</span>
            <div class="tabs">
              <button class="tab" [class.active]="ddTab() === 'edit'" (click)="ddTab.set('edit')">Éditer</button>
              <button class="tab" [class.active]="ddTab() === 'preview'" (click)="ddTab.set('preview')">Aperçu</button>
              <button class="tab" [class.active]="ddTab() === 'split'" (click)="ddTab.set('split')">Côte à côte</button>
            </div>

            @if (ddTab() === 'edit') {
              <textarea #qDd [value]="editD()" (input)="editD.set(qDd.value)" class="input textarea mono" rows="20"></textarea>
            } @else if (ddTab() === 'preview') {
              <div class="preview" [innerHTML]="editD() | markdown"></div>
            } @else {
              <div class="split-view">
                <textarea #qDdSplit [value]="editD()" (input)="editD.set(qDdSplit.value)" class="input textarea mono split-left" rows="20"></textarea>
                <div class="preview split-right" [innerHTML]="editD() | markdown"></div>
              </div>
            }
          </label>
        </div>
      </div>
    } @else {
      <div class="loading">Chargement…</div>
    }

    @if (saving()) {
      <div class="loading-overlay">Sauvegarde en cours…</div>
    }
  `,
  styles: `
    :host { display: block; max-width: 64rem; margin: 0 auto; }

    /* ── Top bar ────────────────────────────────────── */
    .top-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem; }
    .breadcrumb { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; }
    .bc-link { color: var(--color-text-muted); text-decoration: none; }
    .bc-link:hover { color: var(--color-accent); }
    .bc-arrow { width: 0.75rem; height: 0.75rem; color: var(--color-text-muted); }
    .bc-current { color: var(--color-text-primary); font-weight: 500; }
    .top-actions { display: flex; align-items: center; gap: 0.5rem; }

    .nav-btn {
      display: inline-flex; align-items: center; gap: 0.25rem;
      height: 34px; padding: 0 0.875rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: var(--color-surface);
      color: var(--color-text-secondary); font-size: 0.8125rem; font-weight: 500;
      font-family: inherit; cursor: pointer; transition: all 150ms ease;
    }
    .nav-btn:hover:not(:disabled) { border-color: var(--color-border-strong); background: var(--color-surface-hover); }
    .nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }
    .save-btn {
      display: inline-flex; align-items: center; gap: 0.375rem;
      height: 34px; padding: 0 1rem; border: none; border-radius: var(--radius-full);
      background: var(--color-accent); color: var(--color-accent-text);
      font-size: 0.8125rem; font-weight: 600; font-family: inherit; cursor: pointer;
      transition: background 150ms ease;
    }
    .save-btn:hover { background: var(--color-accent-hover); }

    /* ── Status ─────────────────────────────────────── */
    .status-ok {
      display: flex; align-items: center; gap: 0.375rem; margin-bottom: 1rem;
      padding: 0.625rem 1rem; border-radius: var(--radius-md);
      background: var(--color-success-soft); color: var(--color-success);
      font-size: 0.8125rem; font-weight: 600;
    }
    .status-err {
      margin-bottom: 1rem; padding: 0.625rem 1rem; border-radius: var(--radius-md);
      background: var(--color-error-soft); color: var(--color-error);
      font-size: 0.8125rem; font-weight: 600;
    }

    /* ── Meta ───────────────────────────────────────── */
    .editor-layout { display: flex; flex-direction: column; gap: 1.5rem; }
    .editor-form { display: flex; flex-direction: column; gap: 1rem; }
    .meta-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
    .meta-id { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; color: var(--color-accent); }
    .meta-cat {
      padding: 0.125rem 0.5rem; border-radius: var(--radius-full);
      font-size: 0.6875rem; font-weight: 500;
      background: var(--color-accent-soft); color: var(--color-accent);
    }
    .meta-section { font-size: 0.75rem; color: var(--color-text-muted); }

    /* ── Fields ─────────────────────────────────────── */
    .field { display: flex; flex-direction: column; gap: 0.375rem; }
    .field-sm { width: 140px; flex-shrink: 0; }
    .field-row { display: flex; gap: 0.75rem; align-items: flex-start; }
    .flex-1 { flex: 1; }
    .field-label {
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--color-text-muted);
    }
    .input {
      width: 100%; padding: 0.625rem 0.875rem;
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: var(--radius-md); color: var(--color-text-primary);
      font-size: 0.875rem; font-family: inherit; line-height: 1.6;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .textarea { resize: vertical; }
    .mono { font-family: var(--font-mono); font-size: 0.8125rem; }

    /* ── Deep Dive tabs ─────────────────────────────── */
    .tabs { display: flex; gap: 0.25rem; margin-bottom: 0.5rem; }
    .tab {
      padding: 0.375rem 0.75rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: transparent;
      color: var(--color-text-muted); font-size: 0.75rem; font-family: inherit; cursor: pointer;
      transition: all 150ms ease;
    }
    .tab:hover { background: var(--color-surface-hover); color: var(--color-text-secondary); }
    .tab.active { background: var(--color-accent-soft); color: var(--color-accent); border-color: var(--color-accent); }

    /* ── Preview ───────────────────────────────────── */
    .preview {
      padding: 1.25rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);
      background: var(--color-surface); min-height: 200px; max-height: 600px; overflow-y: auto;
      font-size: 0.875rem; line-height: 1.75;
    }
    .split-view { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .split-left, .split-right { min-height: 400px; }
    .split-right { max-height: 600px; overflow-y: auto; }

    .loading { padding: 3rem; text-align: center; color: var(--color-text-muted); }
    .loading-overlay {
      position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.35); backdrop-filter: blur(4px);
      color: white; font-weight: 600; font-size: 1rem;
    }
  `,
})
export class AdminQuestionEditPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly question = signal<Row | null>(null);
  readonly editQ = signal('');
  readonly editA = signal('');
  readonly editC = signal('');
  readonly editL = signal('');
  readonly editD = signal('');
  readonly ddTab = signal<'edit' | 'preview' | 'split'>('edit');
  readonly saved = signal(false);
  readonly saveError = signal('');
  readonly saving = signal(false);

  private allIds: string[] = [];
  private catMap: Record<string, string> = {};

  readonly hasPrev = computed(() => {
    const idx = this.allIds.indexOf(this.question()?.id ?? '');
    return idx > 0;
  });
  readonly hasNext = computed(() => {
    const idx = this.allIds.indexOf(this.question()?.id ?? '');
    return idx >= 0 && idx < this.allIds.length - 1;
  });

  constructor() {
    for (const c of interviewCategories) this.catMap[c.id] = c.title;

    const sb = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    sb.from('questions').select('id').order('sort_order').then(({ data }) => {
      this.allIds = (data ?? []).map(r => r.id);
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      sb.from('questions').select('*').eq('id', id).single().then(({ data }) => {
        if (!data) return;
        this.question.set(data);
        this.editQ.set(data.question);
        this.editA.set(data.answer);
        this.editC.set(data.code ?? '');
        this.editL.set(data.language ?? '');
        this.editD.set(data.deep_dive ?? '');
        this.saved.set(false);
        this.saveError.set('');
      });
    });
  }

  catName(id: string): string { return this.catMap[id] ?? id; }

  goPrev(): void {
    const idx = this.allIds.indexOf(this.question()?.id ?? '');
    if (idx > 0) this.router.navigate(['/admin/questions', this.allIds[idx - 1]]);
  }
  goNext(): void {
    const idx = this.allIds.indexOf(this.question()?.id ?? '');
    if (idx >= 0 && idx < this.allIds.length - 1) this.router.navigate(['/admin/questions', this.allIds[idx + 1]]);
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.saveError.set('');
    const sb = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    const { error } = await sb.from('questions').update({
      question: this.editQ(), answer: this.editA(),
      code: this.editC() || null, language: this.editL() || null,
      deep_dive: this.editD() || null,
    }).eq('id', this.question()!.id);

    this.saving.set(false);
    if (error) { this.saveError.set(error.message); return; }

    const q = this.question()!;
    this.question.set({ ...q, question: this.editQ(), answer: this.editA(), code: this.editC() || null, language: this.editL() || null, deep_dive: this.editD() || null });
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
