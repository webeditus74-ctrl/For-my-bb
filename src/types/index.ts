export type Language = 'mr' | 'en';

export type ExamStream = 'rajyaseva' | 'combine_b_c' | 'both';

export type TaskTimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  titleMr?: string;
  subject: string;
  timeSlot: TaskTimeSlot;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: string;
  priority: TaskPriority;
  notes?: string;
}

export type TopicStatus = 'not_started' | 'in_progress' | 'completed' | 'revised_1' | 'revised_2';

export interface SyllabusTopic {
  id: string;
  subjectId: string;
  nameEn: string;
  nameMr: string;
  detailsEn?: string;
  detailsMr?: string;
  status: TopicStatus;
  lastRevised?: string;
  notes?: string;
  isCustom?: boolean;
}

export interface SyllabusSubject {
  id: string;
  titleEn: string;
  titleMr: string;
  category: 'gs_pre' | 'csat' | 'mains' | 'language';
  stream: ExamStream;
  iconName: string;
  color: string;
  topics: SyllabusTopic[];
}

export interface MCQQuestion {
  id: string;
  subject: string;
  stream: ExamStream;
  questionEn: string;
  questionMr: string;
  optionsEn: [string, string, string, string];
  optionsMr: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanationEn: string;
  explanationMr: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
  tags: string[];
  isSample: boolean;
}

export interface QuestionAnswerRecord {
  questionId: string;
  selectedOption: number | null; // null if skipped
  isCorrect: boolean;
}

export interface TestSession {
  id: string;
  date: string;
  subject: string;
  mode: 'practice' | 'mock';
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  timeSpentSeconds: number;
  answers: QuestionAnswerRecord[];
  scorePercentage: number;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  isBookmarked: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
  revisionStage: number; // 0, 1, 2, 3, 4 (Spaced Repetition: 1d, 3d, 7d, 15d, 30d)
  nextRevisionDate?: string;
  completedRevisions: number;
}

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  minutesStudied: number;
  tasksCompleted: number;
  mcqsAttempted: number;
  mcqsCorrect: number;
}

export interface UserProfile {
  name: string;
  targetExam: 'rajyaseva' | 'combine_b_c' | 'custom';
  targetExamTitle: string;
  targetExamDate: string; // ISO date string
  targetPost: string;
  dailyGoalMinutes: number;
  dailyGoalMCQs: number;
  streak: number;
  lastStudiedDate: string | null;
  streakHistory: string[]; // YYYY-MM-DD strings
  soundEnabled: boolean;
  language: Language;
}

export interface Achievement {
  id: string;
  titleEn: string;
  titleMr: string;
  descEn: string;
  descMr: string;
  icon: string;
  unlockedAt: string | null;
}
