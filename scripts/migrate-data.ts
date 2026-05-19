import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface RawQuestion {
  id: string;
  question: string;
  answer: string;
  example?: string;
  code?: string;
  language?: string;
}

interface RawSection {
  id: string;
  title: string;
  questions: RawQuestion[];
}

interface RawCategory {
  id: string;
  title: string;
  color: string;
  description: string;
  sections: RawSection[];
}

async function main() {
  const dataDir = path.resolve(__dirname, '../src/app/features/interview/data/questions');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

  const categories: Omit<RawCategory, 'sections'>[] = [];
  const sections: { id: string; category_id: string; title: string; sort_order: number }[] = [];
  const questions: {
    id: string; section_id: string; category_id: string;
    question: string; answer: string;
    example?: string; code?: string; language?: string; sort_order: number;
  }[] = [];

  let catIdx = 0;
  for (const file of files) {
    const mod = await import(path.join(dataDir, file));
    const cat: RawCategory = (Object.values(mod) as RawCategory[]).find(
      (v): v is RawCategory => v && typeof v === 'object' && 'sections' in v
    )!;
    if (!cat) continue;

    categories.push({ id: cat.id, title: cat.title, color: cat.color, description: cat.description });
    let secIdx = 0;
    for (const sec of cat.sections) {
      sections.push({ id: sec.id, category_id: cat.id, title: sec.title, sort_order: secIdx });
      let qIdx = 0;
      for (const q of sec.questions) {
        questions.push({
          id: q.id,
          section_id: sec.id,
          category_id: cat.id,
          question: q.question,
          answer: q.answer,
          example: q.example ?? null,
          code: q.code ?? null,
          language: q.language ?? null,
          sort_order: qIdx,
        });
        qIdx++;
      }
      secIdx++;
    }
    catIdx++;
  }

  console.log(`Inserting ${categories.length} categories, ${sections.length} sections, ${questions.length} questions...`);

  const { error: catErr } = await supabase.from('categories').upsert(categories);
  if (catErr) { console.error('categories error:', catErr); process.exit(1); }

  const { error: secErr } = await supabase.from('sections').upsert(sections);
  if (secErr) { console.error('sections error:', secErr); process.exit(1); }

  const { error: qErr } = await supabase.from('questions').upsert(questions);
  if (qErr) { console.error('questions error:', qErr); process.exit(1); }

  console.log(`✅ Done — ${categories.length} categories, ${sections.length} sections, ${questions.length} questions`);
}

main().catch(e => { console.error(e); process.exit(1); });