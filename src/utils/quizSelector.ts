import { MCQQuestion, ExamStream } from '../types';

export interface QuizFilters {
  subject?: string;
  topic?: string;
  difficulty?: string;
  stream?: ExamStream | 'all';
}

export interface QuizSelectionOptions {
  pool: MCQQuestion[];
  filters?: QuizFilters;
  requestedCount?: number;
  recentAttemptedIds?: string[];
  specificQuestionIds?: string[]; // Used strictly for Retry Incorrect mode
}

export interface QuizSelectionResult {
  questions: MCQQuestion[];
  totalEligibleCount: number;
  unattemptedCount: number;
  isPoolExhausted: boolean;
  notice?: string;
}

/**
 * Fisher-Yates unbiased shuffle algorithm.
 * Returns a new shuffled array without mutating the original.
 */
export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Filter questions based on subject, difficulty, topic, and exam stream.
 */
export function filterQuestions(questions: MCQQuestion[], filters: QuizFilters = {}): MCQQuestion[] {
  const { subject = 'all', topic = 'all', difficulty = 'all', stream = 'all' } = filters;

  return questions.filter(q => {
    if (subject !== 'all' && q.subject !== subject) return false;
    if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
    if (topic !== 'all' && q.topic && q.topic !== topic) return false;
    if (stream !== 'all') {
      if (q.stream !== 'both' && q.stream !== stream) return false;
    }
    return true;
  });
}

/**
 * Core Quiz Selection Engine:
 * 1. Selects questions randomly without duplicates within the quiz.
 * 2. Prioritizes unattempted questions from the eligible pool.
 * 3. Does not repeat questions from recent quizzes until the pool is exhausted.
 * 4. Never creates fake duplicates or repeats IDs.
 * 5. Returns a clear notice if the question pool is smaller than requested.
 */
export function selectQuizQuestions(options: QuizSelectionOptions): QuizSelectionResult {
  const {
    pool,
    filters = {},
    requestedCount = 10,
    recentAttemptedIds = [],
    specificQuestionIds,
  } = options;

  // Mode: Retry specific questions (e.g. incorrect questions from a previous test)
  if (specificQuestionIds && specificQuestionIds.length > 0) {
    const idSet = new Set(specificQuestionIds);
    // Find matching questions from pool, ensure uniqueness
    const seen = new Set<string>();
    const matching: MCQQuestion[] = [];
    for (const q of pool) {
      if (idSet.has(q.id) && !seen.has(q.id)) {
        seen.add(q.id);
        matching.push(q);
      }
    }

    const shuffled = shuffleArray(matching);
    return {
      questions: shuffled,
      totalEligibleCount: matching.length,
      unattemptedCount: 0,
      isPoolExhausted: false,
      notice: undefined,
    };
  }

  // 1. Filter pool by category/subject/difficulty/topic
  const eligibleQuestions = filterQuestions(pool, filters);

  // Guarantee uniqueness of eligible questions by ID
  const uniqueEligibleMap = new Map<string, MCQQuestion>();
  for (const q of eligibleQuestions) {
    if (!uniqueEligibleMap.has(q.id)) {
      uniqueEligibleMap.set(q.id, q);
    }
  }
  const uniqueEligible = Array.from(uniqueEligibleMap.values());
  const totalEligibleCount = uniqueEligible.length;

  if (totalEligibleCount === 0) {
    return {
      questions: [],
      totalEligibleCount: 0,
      unattemptedCount: 0,
      isPoolExhausted: true,
      notice: 'या विषयासाठी अद्याप प्रश्न उपलब्ध नाहीत. कृपया इतर विषय किंवा काठिण्य पातळी निवडा.',
    };
  }

  // 2. Partition into unattempted vs recently attempted
  const recentSet = new Set(recentAttemptedIds);
  const unattempted: MCQQuestion[] = [];
  const recentlyAttempted: MCQQuestion[] = [];

  for (const q of uniqueEligible) {
    if (recentSet.has(q.id)) {
      recentlyAttempted.push(q);
    } else {
      unattempted.push(q);
    }
  }

  const unattemptedCount = unattempted.length;
  let selected: MCQQuestion[] = [];
  let isPoolExhausted = false;
  let notice: string | undefined = undefined;

  // Desired target count
  const targetCount = Math.min(requestedCount, totalEligibleCount);

  if (unattemptedCount >= targetCount) {
    // We have plenty of fresh, unattempted questions!
    const shuffledUnattempted = shuffleArray(unattempted);
    selected = shuffledUnattempted.slice(0, targetCount);
    isPoolExhausted = false;
  } else if (unattemptedCount > 0) {
    // Take all unattempted questions first
    selected = [...shuffleArray(unattempted)];
    const needed = targetCount - selected.length;
    // Fill remaining from shuffled recently attempted questions without duplicating any selected ID
    const shuffledRecent = shuffleArray(recentlyAttempted);
    const filler = shuffledRecent.slice(0, needed);
    selected.push(...filler);
    isPoolExhausted = true;
  } else {
    // All questions in this category have been attempted in recent quizzes!
    // The pool is exhausted, so restart the cycle by selecting fresh random questions from the pool
    isPoolExhausted = true;
    const shuffledAll = shuffleArray(uniqueEligible);
    selected = shuffledAll.slice(0, targetCount);
  }

  // If the available pool has fewer questions than the quiz normally asks for
  if (totalEligibleCount < requestedCount) {
    notice = `या फिल्टरसाठी उपलब्ध असलेले सर्व ${totalEligibleCount} प्रश्न समाविष्ट केले आहेत (कोणतीही पुनरावृत्ती नाही).`;
  }

  // Final sanity check: ensure strictly zero duplicate IDs in the selected list
  const finalSeen = new Set<string>();
  const strictlyUniqueSelected: MCQQuestion[] = [];
  for (const q of selected) {
    if (!finalSeen.has(q.id)) {
      finalSeen.add(q.id);
      strictlyUniqueSelected.push(q);
    }
  }

  return {
    questions: strictlyUniqueSelected,
    totalEligibleCount,
    unattemptedCount,
    isPoolExhausted,
    notice,
  };
}
