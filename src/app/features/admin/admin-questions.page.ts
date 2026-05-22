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
    <div class="max-w-5xl">
      <!-- Section header -->
      <div class="flex items-start gap-4 mb-6">
        <div class="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 border border-border-subtle" style="background: var(--color-accent-soft); color: var(--color-accent)">
          <lucide-icon name="file-text" class="h-5 w-5" />
        </div>
        <div>
          <h2 class="font-display text-xl font-semibold tracking-tight m-0 mb-0.5" style="color: var(--color-text-primary)">Éditeur de questions</h2>
          <p class="text-sm m-0" style="color: var(--color-text-muted)">{{ total() }} questions · {{ cats().length }} catégories</p>
        </div>
      </div>

      <div class="flex gap-6 items-start">
        <!-- Category sidebar — pill buttons matching category-pills pattern -->
        <aside class="hidden md:flex flex-col gap-1 w-[220px] flex-shrink-0 sticky" style="top: 5rem">
          @for (cat of cats(); track cat.id) {
            <button (click)="selectCat(cat.id)"
              class="flex items-center justify-between px-3 py-2 border-none rounded-full text-sm font-medium cursor-pointer transition-all duration-180 cat-pill"
              [class.active]="activeCat() === cat.id"
              style="font-family: inherit; background: transparent; color: var(--color-text-muted)">
              <span class="truncate">{{ cat.title }}</span>
              <span class="ml-1.5 min-w-[20px] h-[18px] px-[5px] rounded-full text-[11px] font-semibold flex items-center justify-center cat-count"
                [class.active]="activeCat() === cat.id">{{ count(cat.id) }}</span>
            </button>
          }
        </aside>

        <!-- Mobile category dropdown -->
        <div class="md:hidden w-full mb-4">
          <select #sel (change)="selectCat(sel.value)" class="w-full px-3 py-2 rounded-lg border text-sm surface border-border" style="color: var(--color-text-primary)">
            <option value="">— Choisir une catégorie —</option>
            @for (cat of cats(); track cat.id) {
              <option [value]="cat.id" [selected]="activeCat() === cat.id">{{ cat.title }} ({{ count(cat.id) }})</option>
            }
          </select>
        </div>

        <!-- Question list -->
        <div class="flex-1 min-w-0 flex flex-col gap-2">
          @if (activeCat() === '') {
            <div class="hidden md:flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: var(--color-surface-hover); color: var(--color-text-muted)">
                <lucide-icon name="arrow-left" class="h-5 w-5" />
              </div>
              <p class="text-sm m-0" style="color: var(--color-text-muted)">Sélectionnez une catégorie pour afficher ses questions.</p>
            </div>
          } @else {
            @for (q of questions(); track q.id) {
              <div class="rounded-xl border overflow-hidden transition-all duration-200 surface border-border"
                [class.open]="editingId() === q.id">
                <!-- Card header -->
                <button (click)="toggleEdit(q.id)"
                  class="flex items-center gap-3 w-full px-4 py-3.5 border-none text-left cursor-pointer transition-all duration-150"
                  style="background: transparent; color: inherit; font-family: inherit"
                  [attr.aria-expanded]="editingId() === q.id">
                  <span class="text-[11px] font-semibold font-mono min-w-[3rem]" style="color: var(--color-accent)">{{ q.id }}</span>
                  <span class="flex-1 text-sm font-medium" style="color: var(--color-text-primary)">{{ q.question }}</span>
                  <lucide-icon [name]="editingId() === q.id ? 'chevron-up' : 'chevron-down'" class="h-4 w-4 flex-shrink-0" style="color: var(--color-text-muted)" />
                </button>

                <!-- Editor body -->
                @if (editingId() === q.id) {
                  <div class="flex flex-col gap-4 px-4 pb-5 pt-0 border-t border-border-subtle"
                    style="background: var(--color-surface-raised)">
                    <label class="flex flex-col gap-1.5">
                      <span class="text-[11px] font-semibold uppercase tracking-wider" style="color: var(--color-text-muted)">Question</span>
                      <input #qTitle [value]="editQ()" (input)="editQ.set(qTitle.value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 field-input" style="font-family: inherit" />
                    </label>

                    <label class="flex flex-col gap-1.5">
                      <span class="text-[11px] font-semibold uppercase tracking-wider" style="color: var(--color-text-muted)">Réponse</span>
                      <textarea #qAns [value]="editA()" (input)="editA.set(qAns.value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border text-sm resize-y min-h-[100px] transition-all duration-200 field-input" style="font-family: inherit"></textarea>
                    </label>

                    <div class="flex gap-3">
                      <label class="flex flex-col gap-1.5 flex-1">
                        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color: var(--color-text-muted)">Code (optionnel)</span>
                        <textarea #qCode [value]="editC()" (input)="editC.set(qCode.value)"
                          class="w-full px-3.5 py-2.5 rounded-xl border text-sm resize-y min-h-[100px] font-mono transition-all duration-200 field-input"></textarea>
                      </label>
                      <label class="flex flex-col gap-1.5 w-[140px]">
                        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color: var(--color-text-muted)">Langage</span>
                        <input #qLang [value]="editL()" (input)="editL.set(qLang.value)"
                          placeholder="java, sql…"
                          class="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 field-input" style="font-family: inherit" />
                      </label>
                    </div>

                    <label class="flex flex-col gap-1.5">
                      <span class="text-[11px] font-semibold uppercase tracking-wider" style="color: var(--color-text-muted)">Deep Dive (optionnel)</span>
                      <textarea #qDd [value]="editD()" (input)="editD.set(qDd.value)"
                        class="w-full px-3.5 py-2.5 rounded-xl border text-sm resize-y min-h-[160px] font-mono transition-all duration-200 field-input"></textarea>
                    </label>

                    <!-- Action bar -->
                    <div class="flex items-center gap-3 pt-2 border-t border-border-subtle">
                      @if (savedId() === q.id) {
                        <span class="flex items-center gap-1.5 text-sm font-semibold" style="color: var(--color-success)" role="status">
                          <lucide-icon name="check-circle" class="h-4 w-4" /> Sauvegardé
                        </span>
                      }
                      @if (saveError()) {
                        <span class="text-sm" style="color: var(--color-error)">{{ saveError() }}</span>
                      }
                      <span class="flex-1"></span>
                      <button (click)="toggleEdit('')"
                        class="h-[34px] px-4 rounded-full border text-sm font-medium cursor-pointer transition-all duration-150 btn-ghost"
                        style="font-family: inherit; background: transparent; color: var(--color-text-secondary); border-color: var(--color-border)">
                        Annuler
                      </button>
                      <button (click)="save(q)"
                        class="h-[34px] px-4 rounded-full border-none text-sm font-semibold cursor-pointer transition-all duration-150 btn-save"
                        style="font-family: inherit; background: var(--color-accent); color: var(--color-accent-text)">
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>

      <!-- Loading overlay -->
      @if (loading()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center font-semibold text-base text-white"
          style="background: rgba(0,0,0,0.35); backdrop-filter: blur(4px)">
          Sauvegarde en cours…
        </div>
      }
    </div>
  `,
  styles: `
    /* Category pills — interactive states using custom properties */
    .cat-pill:hover { background: var(--color-surface-hover); color: var(--color-text-secondary); }
    .cat-pill.active { background: var(--color-surface); color: var(--color-text-primary); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); }
    .cat-pill.active:hover { background: var(--color-surface-hover); }

    /* Count badges inside pills */
    .cat-count { background: var(--color-surface-hover); color: var(--color-text-muted); }
    .cat-count.active { background: var(--color-accent-soft); color: var(--color-accent); }

    /* Question card */
    .open { border-color: var(--color-accent); box-shadow: 0 0 0 1px var(--color-accent-soft); }

    /* Form inputs */
    .field-input { background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-primary); }
    .field-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-soft); }
    .field-input::placeholder { color: var(--color-text-placeholder); }

    /* Buttons */
    .btn-ghost:hover { background: var(--color-surface-hover); border-color: var(--color-border-strong); color: var(--color-text-primary); }
    .btn-save:hover { background: var(--color-accent-hover); transform: translateY(-1px); }
    .btn-save:active { transform: translateY(0); }
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
