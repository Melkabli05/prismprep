import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { RouterLink } from '@angular/router';
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
  imports: [RouterLink, LucideAngularModule],
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
        <input #searchInput type="text" placeholder="Rechercher…" class="search-input"
          [value]="searchQuery()" (input)="searchQuery.set(searchInput.value)" />
        @if (searchQuery()) {
          <button class="search-clear" (click)="searchQuery.set(''); searchInput.value = ''; searchInput.focus()">
            <lucide-icon name="x" class="h-3 w-3" />
          </button>
        }
      </div>
      <span class="toolbar-count">{{ filtered().length }} / {{ all.length }}</span>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th class="col-id">ID</th>
            <th class="col-q">Question</th>
            <th class="col-cat">Catégorie</th>
            <th class="col-dd">Deep Dive</th>
            <th class="col-act"></th>
          </tr>
        </thead>
        <tbody>
          @for (q of filtered(); track q.id) {
            <tr>
              <td class="col-id"><span class="cell-id">{{ q.id }}</span></td>
              <td class="col-q">{{ q.question }}</td>
              <td class="col-cat"><span class="cell-cat">{{ catName(q.category_id) }}</span></td>
              <td class="col-dd">{{ q.deep_dive ? '✓' : '—' }}</td>
              <td class="col-act">
                <a [routerLink]="['/admin/questions', q.id]" class="edit-link">
                  <lucide-icon name="pencil" class="h-3.5 w-3.5" />
                  Éditer
                </a>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="empty-cell">
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
  `,
  styles: `
    :host { display: block; }

    .toolbar {
      display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;
      padding: 0.625rem 0.75rem; border-radius: var(--radius-lg);
      background: var(--color-surface); border: 1px solid var(--color-border);
    }
    .select {
      height: 34px; padding: 0 0.75rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: var(--color-surface-raised);
      color: var(--color-text-primary); font-size: 0.8125rem; font-family: inherit;
      cursor: pointer; min-width: 180px;
    }
    .select:focus { outline: none; border-color: var(--color-accent); }
    .search-wrap { flex: 1; position: relative; display: flex; align-items: center; }
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
    td { padding: 0.625rem 1rem; border-bottom: 1px solid var(--color-border-subtle); }
    tbody tr { transition: background 120ms ease; }
    tbody tr:hover { background: var(--color-surface-raised); }

    .col-id { width: 72px; }
    .col-q { min-width: 200px; }
    .col-cat { width: 120px; }
    .col-dd { width: 72px; text-align: center; color: var(--color-text-muted); font-family: var(--font-mono); }
    .col-act { width: 90px; text-align: right; }

    .cell-id { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; color: var(--color-accent); }
    .cell-cat {
      display: inline-block; padding: 0.125rem 0.5rem; border-radius: var(--radius-full);
      font-size: 0.6875rem; font-weight: 500;
      background: var(--color-surface-hover); color: var(--color-text-muted);
    }

    .edit-link {
      display: inline-flex; align-items: center; gap: 0.25rem;
      height: 28px; padding: 0 0.625rem; border: 1px solid var(--color-border);
      border-radius: var(--radius-full); background: var(--color-surface);
      color: var(--color-text-secondary); font-size: 0.75rem; text-decoration: none;
      transition: all 150ms ease;
    }
    .edit-link:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-accent-soft); }

    .empty-cell { text-align: center; }
    .empty { padding: 3rem 1rem; color: var(--color-text-muted); }
    .empty-icon { width: 1.5rem; height: 1.5rem; margin-bottom: 0.5rem; }
  `,
})
export class AdminQuestionsPage {
  readonly cats = signal<Cat[]>(interviewCategories.map(c => ({ id: c.id, title: c.title })));
  readonly activeCat = signal('');
  readonly searchQuery = signal('');
  all: Row[] = [];

  readonly filtered = computed(() => {
    let qs = this.all;
    const cat = this.activeCat();
    if (cat) qs = qs.filter(q => q.category_id === cat);
    const q = this.searchQuery().toLowerCase();
    if (q) qs = qs.filter(r => r.question.toLowerCase().includes(q) || r.id.includes(q) || r.answer.toLowerCase().includes(q));
    return qs;
  });

  private catMap: Record<string, string> = {};

  constructor() {
    for (const c of this.cats()) this.catMap[c.id] = c.title;
    const sb = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    sb.from('questions').select('*').order('sort_order').then(({ data }) => { this.all = data ?? []; });
  }

  catName(id: string): string { return this.catMap[id] ?? id; }
  selectCat(id: string): void { this.activeCat.set(id); }
}
