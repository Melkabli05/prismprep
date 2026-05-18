export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  example?: string;
  code?: string;
  language?: string;
}

export interface InterviewSection {
  id: string;
  title: string;
  questions: InterviewQuestion[];
}

export interface InterviewCategory {
  id: string;
  title: string;
  color: string;
  description: string;
  sections: InterviewSection[];
}