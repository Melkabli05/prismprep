export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      categories: {
        Row: { color: string; description: string; id: string; sort_order: number; title: string };
        Insert: { color: string; description: string; id: string; sort_order?: number; title: string };
        Update: { color?: string; description?: string; id?: string; sort_order?: number; title?: string };
        Relationships: [];
      };
      profiles: {
        Row: { created_at: string; id: string; role: string };
        Insert: { created_at?: string; id: string; role?: string };
        Update: { created_at?: string; id?: string; role?: string };
        Relationships: [];
      };
      questions: {
        Row: {
          answer: string; category_id: string; code: string | null; deep_dive: string | null;
          example: string | null; id: string; language: string | null; question: string;
          section_id: string; sort_order: number;
        };
        Insert: {
          answer: string; category_id: string; code?: string | null; deep_dive?: string | null;
          example?: string | null; id: string; language?: string | null; question: string;
          section_id: string; sort_order?: number;
        };
        Update: {
          answer?: string; category_id?: string; code?: string | null; deep_dive?: string | null;
          example?: string | null; id?: string; language?: string | null; question?: string;
          section_id?: string; sort_order?: number;
        };
        Relationships: [
          { foreignKeyName: 'questions_category_id_fkey'; columns: ['category_id']; isOneToOne: false; referencedRelation: 'categories'; referencedColumns: ['id'] },
          { foreignKeyName: 'questions_section_id_fkey'; columns: ['section_id']; isOneToOne: false; referencedRelation: 'sections'; referencedColumns: ['id'] },
        ];
      };
      sections: {
        Row: { category_id: string; id: string; sort_order: number; title: string };
        Insert: { category_id: string; id: string; sort_order?: number; title: string };
        Update: { category_id?: string; id?: string; sort_order?: number; title?: string };
        Relationships: [
          { foreignKeyName: 'sections_category_id_fkey'; columns: ['category_id']; isOneToOne: false; referencedRelation: 'categories'; referencedColumns: ['id'] },
        ];
      };
      user_bookmarks: {
        Row: { created_at: string; question_id: string; user_id: string };
        Insert: { created_at?: string; question_id: string; user_id: string };
        Update: { created_at?: string; question_id?: string; user_id?: string };
        Relationships: [
          { foreignKeyName: 'user_bookmarks_question_id_fkey'; columns: ['question_id']; isOneToOne: false; referencedRelation: 'questions'; referencedColumns: ['id'] },
        ];
      };
      user_notes: {
        Row: { note: string; question_id: string; updated_at: string; user_id: string };
        Insert: { note?: string; question_id: string; updated_at?: string; user_id: string };
        Update: { note?: string; question_id?: string; updated_at?: string; user_id?: string };
        Relationships: [
          { foreignKeyName: 'user_notes_question_id_fkey'; columns: ['question_id']; isOneToOne: false; referencedRelation: 'questions'; referencedColumns: ['id'] },
        ];
      };
      user_revealed: {
        Row: { created_at: string; question_id: string; user_id: string };
        Insert: { created_at?: string; question_id: string; user_id: string };
        Update: { created_at?: string; question_id?: string; user_id?: string };
        Relationships: [
          { foreignKeyName: 'user_revealed_question_id_fkey'; columns: ['question_id']; isOneToOne: false; referencedRelation: 'questions'; referencedColumns: ['id'] },
        ];
      };
      user_viewed: {
        Row: { created_at: string; question_id: string; user_id: string };
        Insert: { created_at?: string; question_id: string; user_id: string };
        Update: { created_at?: string; question_id?: string; user_id?: string };
        Relationships: [
          { foreignKeyName: 'user_viewed_question_id_fkey'; columns: ['question_id']; isOneToOne: false; referencedRelation: 'questions'; referencedColumns: ['id'] },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      admin_count_dependents: {
        Args: { p_question_ids: string[] };
        Returns: { bookmarks: number; notes: number; revealed: number; viewed: number }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

type PublicSchema = Database['public'];

export type Tables<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Row'];
export type TablesInsert<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Update'];
