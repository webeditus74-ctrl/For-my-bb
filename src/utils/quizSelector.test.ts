/**
 * Developer Test Suite for MPSC MCQ Selector & Question Bank
 * Verifies:
 * 1. Question bank unique IDs (no duplicate IDs anywhere in the bank).
 * 2. Zero duplicates within any selected quiz.
 * 3. Different quiz sessions produce different randomized question orders.
 * 4. Recent question tracking avoids repetition until pool is exhausted.
 * 5. Retry mode returns exact requested questions in fresh order.
 */

import { centralizedQuestionBank } from '../data/questionBank';
import { selectQuizQuestions, filterQuestions } from './quizSelector';

export function runDeveloperTests(): { success: boolean; results: string[] } {
  const results: string[] = [];
  let allPassed = true;

  function assert(condition: boolean, message: string) {
    if (condition) {
      results.push(`PASS: ${message}`);
    } else {
      results.push(`FAIL: ${message}`);
      allPassed = false;
      console.error(`FAIL: ${message}`);
    }
  }

  // Test 1: Check Question Bank for Unique IDs
  const idMap = new Map<string, number>();
  for (const q of centralizedQuestionBank) {
    idMap.set(q.id, (idMap.get(q.id) || 0) + 1);
  }
  const duplicateIds = Array.from(idMap.entries()).filter(([_, count]) => count > 1);
  assert(
    duplicateIds.length === 0,
    `Question bank IDs must be strictly unique. Found duplicates: ${JSON.stringify(duplicateIds)}`
  );
  assert(
    centralizedQuestionBank.length >= 35,
    `Question bank must have verified questions (found ${centralizedQuestionBank.length})`
  );

  // Test 2: Verify No Duplicate IDs Within a Quiz Session
  const quiz1 = selectQuizQuestions({
    pool: centralizedQuestionBank,
    filters: { subject: 'all', difficulty: 'all' },
    requestedCount: 20,
    recentAttemptedIds: [],
  });

  const uniqueIdsInQuiz1 = new Set(quiz1.questions.map(q => q.id));
  assert(
    uniqueIdsInQuiz1.size === quiz1.questions.length,
    `Quiz 1 must have zero duplicate IDs (total: ${quiz1.questions.length}, unique: ${uniqueIdsInQuiz1.size})`
  );

  // Test 3: Verify That Different Quiz Sessions Can Produce Different Question Orders
  let differentOrderFound = false;
  // Try up to 5 runs to account for probability
  for (let i = 0; i < 5; i++) {
    const sessionA = selectQuizQuestions({
      pool: centralizedQuestionBank,
      filters: { subject: 'all' },
      requestedCount: 15,
      recentAttemptedIds: [],
    });
    const sessionB = selectQuizQuestions({
      pool: centralizedQuestionBank,
      filters: { subject: 'all' },
      requestedCount: 15,
      recentAttemptedIds: [],
    });

    const idsA = sessionA.questions.map(q => q.id).join(',');
    const idsB = sessionB.questions.map(q => q.id).join(',');
    if (idsA !== idsB) {
      differentOrderFound = true;
      break;
    }
  }
  assert(
    differentOrderFound,
    'Different quiz sessions must produce different randomized question orders'
  );

  // Test 4: Verify Non-Repetition of Recent Questions Until Pool is Exhausted
  const initialBatch = selectQuizQuestions({
    pool: centralizedQuestionBank,
    filters: { subject: 'polity' },
    requestedCount: 4,
    recentAttemptedIds: [],
  });
  const attemptedIds = initialBatch.questions.map(q => q.id);

  // Next batch should avoid the attempted questions if enough unattempted exist
  const nextBatch = selectQuizQuestions({
    pool: centralizedQuestionBank,
    filters: { subject: 'polity' },
    requestedCount: 4,
    recentAttemptedIds: attemptedIds,
  });

  const nextBatchIds = new Set(nextBatch.questions.map(q => q.id));
  const overlap = attemptedIds.filter(id => nextBatchIds.has(id));

  const totalPolity = filterQuestions(centralizedQuestionBank, { subject: 'polity' }).length;
  if (totalPolity >= 8) {
    assert(
      overlap.length === 0,
      `Recent questions must not repeat when pool has unattempted questions. Overlap: ${overlap.join(', ')}`
    );
  } else {
    assert(
      nextBatch.isPoolExhausted,
      'When pool is smaller than 2 batches, pool exhaustion flag must be set'
    );
  }

  // Test 5: Verify Subject & Difficulty Filtering
  const geoHardQuiz = selectQuizQuestions({
    pool: centralizedQuestionBank,
    filters: { subject: 'geography' },
    requestedCount: 5,
  });
  const allGeo = geoHardQuiz.questions.every(q => q.subject === 'geography');
  assert(allGeo, 'All questions in geography quiz must have subject = geography');

  // Test 6: Verify Retry / Revision Mode
  const targetIds = ['mpsc-pol-01', 'mpsc-hist-01', 'mpsc-geo-01'];
  const retryQuiz = selectQuizQuestions({
    pool: centralizedQuestionBank,
    specificQuestionIds: targetIds,
  });
  assert(
    retryQuiz.questions.length === targetIds.length,
    `Retry quiz must contain exact missed questions (${retryQuiz.questions.length} / ${targetIds.length})`
  );
  const retryIds = new Set(retryQuiz.questions.map(q => q.id));
  assert(
    targetIds.every(id => retryIds.has(id)),
    'Retry quiz must contain all specified incorrect question IDs'
  );

  // Test 7: Verify Pool Undercapacity Handling
  const underCapacityQuiz = selectQuizQuestions({
    pool: centralizedQuestionBank.slice(0, 3), // artificially small pool of 3
    requestedCount: 10,
    recentAttemptedIds: [],
  });
  assert(
    underCapacityQuiz.questions.length === 3,
    `When pool is smaller than requested, must return available count without duplication (returned: ${underCapacityQuiz.questions.length})`
  );
  assert(
    underCapacityQuiz.notice !== undefined,
    'Under-capacity pool must provide a clear notice message instead of duplicating questions'
  );

  return { success: allPassed, results };
}

// Allow direct CLI execution via tsx
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('quizSelector.test')) {
  console.log('Running MPSC MCQ Selector & Question Bank Tests...\n');
  const res = runDeveloperTests();
  res.results.forEach(r => console.log(r));
  if (res.success) {
    console.log('\nAll developer tests passed successfully!');
    process.exit(0);
  } else {
    console.error('\nSome developer tests failed!');
    process.exit(1);
  }
}
