import { Component, computed, inject, signal, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CdkDropList, CdkDrag, CdkDragHandle, type CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LucideAngularModule } from 'lucide-angular';
import { AdminContentService, type AdminEntityKind, type CategoryRow, type SectionRow, type QuestionRow } from '../data/admin-content.service';
import { CategoryFormDialogComponent } from '../components/category-form-dialog.component';
import { SectionFormDialogComponent } from '../components/section-form-dialog.component';
import { DeleteConfirmDialogComponent } from '../components/delete-confirm-dialog.component';

interface SectionNode {
  row: SectionRow;
  questions: QuestionRow[];
}

interface CategoryNode {
  row: CategoryRow;
  sections: SectionNode[];
}

interface DeleteTarget {
  kind: AdminEntityKind;
  id: string;
  label: string;
}

type MenuKind = 'cat' | 'sec' | 'q';

@Component({
  selector: 'app-admin-browser',
  imports: [
    RouterLink,
    LucideAngularModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CategoryFormDialogComponent,
    SectionFormDialogComponent,
    DeleteConfirmDialogComponent,
  ],
  templateUrl: './admin-browser.page.html',
  styleUrl: './admin-browser.page.css',
})
export class AdminBrowserPage {
  readonly admin = inject(AdminContentService);

  // ─── Search ───────────────────────────────────────────────────────────────
  readonly searchQuery = signal('');
  readonly searchActive = computed(() => this.searchQuery().trim().length > 0);

  readonly totalQuestionCount = computed(() => this.admin.questions().length);

  readonly filteredQuestionCount = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.totalQuestionCount();
    return this.filteredTree().reduce(
      (sum, cat) => sum + cat.sections.reduce((s2, sec) => s2 + sec.questions.length, 0),
      0,
    );
  });

  readonly searchHasQuery = computed(() => this.searchQuery().trim().length > 0);

  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  focusSearch(): void {
    this.searchInputRef?.nativeElement.focus();
  }

  // ─── Dialog state ──────────────────────────────────────────────────────────
  readonly categoryDialogOpen = signal(false);
  readonly categoryBeingEdited = signal<CategoryRow | null>(null);

  readonly sectionDialogOpen = signal(false);
  readonly sectionBeingEdited = signal<SectionRow | null>(null);
  readonly sectionDialogCategoryId = signal('');

  readonly deleteTarget = signal<DeleteTarget | null>(null);

  // ─── Inline edit ─────────────────────────────────────────────────────────
  readonly editingSectionId = signal<string | null>(null);
  readonly editingSectionTitle = signal('');
  readonly editingQuestionId = signal<string | null>(null);
  readonly editingQuestionText = signal('');

  // ─── Shortcuts help ───────────────────────────────────────────────────────
  readonly showShortcutsHelp = signal(false);

  // ─── Custom menu state ───────────────────────────────────────────────────
  // Which menu is open: { kind, id, rect }
  readonly openMenu = signal<{ kind: MenuKind; id: string; rect: DOMRect } | null>(null);

  openActionMenu(kind: MenuKind, id: string, buttonEl: HTMLButtonElement): void {
    if (this.openMenu()?.id === id && this.openMenu()?.kind === kind) {
      this.openMenu.set(null);
    } else {
      this.openMenu.set({ kind, id, rect: buttonEl.getBoundingClientRect() });
    }
  }

  closeMenu(): void {
    this.openMenu.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.action-menu')) {
      this.closeMenu();
    }
  }

  // ─── Menu helpers ────────────────────────────────────────────────────────
  findCategory(id: string): CategoryRow | undefined {
    return this.filteredTree().find(c => c.row.id === id)?.row;
  }

  findSection(id: string): SectionRow | undefined {
    return this.filteredTree().flatMap(c => c.sections).find(s => s.row.id === id)?.row;
  }

  // ─── Menu actions ────────────────────────────────────────────────────────
  onMenuAction(action: string, cat?: CategoryRow, sec?: SectionRow, q?: QuestionRow): void {
    this.closeMenu();
    switch (action) {
      case 'add-section':    if (cat) this.openNewSection(cat.id); break;
      case 'edit-category':  if (cat) this.openEditCategory(cat); break;
      case 'delete-category': if (cat) this.requestDeleteCategory(cat); break;
      case 'rename-section': if (sec) this.startEditSection(sec); break;
      case 'delete-section': if (sec) this.requestDeleteSection(sec); break;
    }
  }

  // ─── Tree ─────────────────────────────────────────────────────────────────
  private readonly tree = computed<CategoryNode[]>(() => {
    const sections = this.admin.sections();
    const questions = this.admin.questions();
    return this.admin.categories().map(cat => ({
      row: cat,
      sections: sections
        .filter(s => s.category_id === cat.id)
        .map(sec => ({ row: sec, questions: questions.filter(q => q.section_id === sec.id) })),
    }));
  });

  readonly filteredTree = computed<CategoryNode[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.tree();
    return this.tree()
      .map(cat => ({
        row: cat.row,
        sections: cat.sections
          .map(sec => ({
            row: sec.row,
            questions: sec.questions.filter(
              qq => qq.question.toLowerCase().includes(q) || qq.id.toLowerCase().includes(q),
            ),
          }))
          .filter(sec => sec.questions.length > 0 || sec.row.title.toLowerCase().includes(q)),
      }))
      .filter(cat => cat.sections.length > 0 || cat.row.title.toLowerCase().includes(q));
  });

  constructor() {
    if (!this.admin.loaded()) this.admin.load();

    window.addEventListener('keydown', this.onGlobalKeydown.bind(this));
  }

  private onGlobalKeydown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    if (
      this.categoryDialogOpen() ||
      this.sectionDialogOpen() ||
      this.deleteTarget() ||
      this.showShortcutsHelp() ||
      this.editingSectionId() !== null ||
      this.editingQuestionId() !== null
    ) {
      return;
    }

    if (e.key === '/') {
      e.preventDefault();
      this.focusSearch();
    }
    if (e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      this.openNewCategory();
    }
  }

  // ─── Expand/collapse ──────────────────────────────────────────────────────
  isCategoryExpanded(id: string): boolean {
    return this.searchActive() || this.admin.expandedCategories().has(id);
  }

  isSectionExpanded(id: string): boolean {
    return this.searchActive() || this.admin.expandedSections().has(id);
  }

  toggleCategory(id: string): void {
    this.admin.toggleCategoryExpanded(id);
  }

  toggleSection(id: string): void {
    this.admin.toggleSectionExpanded(id);
  }

  // ─── Category dialog ────────────────────────────────────────────────────────
  openNewCategory(): void {
    this.categoryBeingEdited.set(null);
    this.categoryDialogOpen.set(true);
  }

  openEditCategory(row: CategoryRow): void {
    this.categoryBeingEdited.set(row);
    this.categoryDialogOpen.set(true);
  }

  closeCategoryDialog(): void {
    this.categoryDialogOpen.set(false);
  }

  // ─── Section dialog ────────────────────────────────────────────────────────
  openNewSection(categoryId: string): void {
    this.sectionBeingEdited.set(null);
    this.sectionDialogCategoryId.set(categoryId);
    this.sectionDialogOpen.set(true);
  }

  openEditSection(row: SectionRow): void {
    this.sectionBeingEdited.set(row);
    this.sectionDialogCategoryId.set(row.category_id);
    this.sectionDialogOpen.set(true);
  }

  closeSectionDialog(): void {
    this.sectionDialogOpen.set(false);
  }

  // ─── Inline section edit ──────────────────────────────────────────────────
  startEditSection(row: SectionRow): void {
    this.editingSectionId.set(row.id);
    this.editingSectionTitle.set(row.title);
  }

  async saveInlineSection(): Promise<void> {
    const id = this.editingSectionId();
    const title = this.editingSectionTitle().trim();
    if (!id || !title) {
      this.editingSectionId.set(null);
      return;
    }
    await this.admin.updateSection(id, { title });
    this.editingSectionId.set(null);
  }

  cancelInlineSection(): void {
    this.editingSectionId.set(null);
  }

  // ─── Inline question edit ─────────────────────────────────────────────────
  startEditQuestion(row: QuestionRow): void {
    this.editingQuestionId.set(row.id);
    this.editingQuestionText.set(row.question);
  }

  async saveInlineQuestion(): Promise<void> {
    const id = this.editingQuestionId();
    const question = this.editingQuestionText().trim();
    if (!id || !question) {
      this.editingQuestionId.set(null);
      return;
    }
    await this.admin.updateQuestion(id, { question });
    this.editingQuestionId.set(null);
  }

  cancelInlineQuestion(): void {
    this.editingQuestionId.set(null);
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  requestDeleteCategory(row: CategoryRow): void {
    this.deleteTarget.set({ kind: 'category', id: row.id, label: row.title });
  }

  requestDeleteSection(row: SectionRow): void {
    this.deleteTarget.set({ kind: 'section', id: row.id, label: row.title });
  }

  requestDeleteQuestion(row: QuestionRow): void {
    this.deleteTarget.set({ kind: 'question', id: row.id, label: row.question });
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  async confirmDelete(): Promise<void> {
    const target = this.deleteTarget();
    if (!target) return;
    if (target.kind === 'category') await this.admin.deleteCategory(target.id);
    else if (target.kind === 'section') await this.admin.deleteSection(target.id);
    else await this.admin.deleteQuestion(target.id);
    this.deleteTarget.set(null);
  }

  // ─── Reorder ──────────────────────────────────────────────────────────────
  moveCategory(id: string, direction: -1 | 1): void {
    const ids = this.admin.categories().map(c => c.id);
    swapAdjacent(ids, id, direction);
    this.admin.reorder('categories', ids);
  }

  onCategoryDropped(event: CdkDragDrop<CategoryNode[]>): void {
    const ids = this.admin.categories().map(c => c.id);
    moveItemInArray(ids, event.previousIndex, event.currentIndex);
    this.admin.reorder('categories', ids);
  }

  moveSection(categoryId: string, id: string, direction: -1 | 1): void {
    const ids = this.admin.sections().filter(s => s.category_id === categoryId).map(s => s.id);
    swapAdjacent(ids, id, direction);
    this.admin.reorder('sections', ids);
  }

  onSectionDropped(categoryId: string, event: CdkDragDrop<SectionNode[]>): void {
    const ids = this.admin.sections().filter(s => s.category_id === categoryId).map(s => s.id);
    moveItemInArray(ids, event.previousIndex, event.currentIndex);
    this.admin.reorder('sections', ids);
  }

  moveQuestion(sectionId: string, id: string, direction: -1 | 1): void {
    const ids = this.admin.questions().filter(q => q.section_id === sectionId).map(q => q.id);
    swapAdjacent(ids, id, direction);
    this.admin.reorder('questions', ids);
  }

  onQuestionDropped(sectionId: string, event: CdkDragDrop<QuestionRow[]>): void {
    const ids = this.admin.questions().filter(q => q.section_id === sectionId).map(q => q.id);
    moveItemInArray(ids, event.previousIndex, event.currentIndex);
    this.admin.reorder('questions', ids);
  }
}

function swapAdjacent(ids: string[], id: string, direction: -1 | 1): void {
  const index = ids.indexOf(id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= ids.length) return;
  [ids[index]!, ids[target]!] = [ids[target]!, ids[index]!];
}
