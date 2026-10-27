import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  AlertCircle, 
  BarChart3, 
  Filter, 
  Eye, 
  EyeOff,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MCQQuestion, Language, TestSession, QuestionAnswerRecord } from '../types';
import { translations } from '../translations';
import { soundManager } from '../utils/sound';
import { storage } from '../utils/storage';

interface Props {
  language: Language;
  questions: MCQQuestion[];
  bookmarkedIds: string[];
  onToggleBookmark: (questionId: string) => void;
  onAddCustomQuestion: (question: MCQQuestion) => void;
  onTestComplete: (session: TestSession) => void;
}

export const MCQPracticeView: React.FC<Props> = ({
  language,
  questions,
  bookmarkedIds,
  onToggleBookmark,
  onAddCustomQuestion,
  onTestComplete,
}) => {
  const t = translations[language];

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [mode, setMode] = useState<'practice' | 'mock'>('practice');

  // Filtered pool of questions
  const filteredQuestions = questions.filter(q => {
    if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Current session states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // User answers map for the test session
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});

  // Mock test timer
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testTimeRemaining, setTestTimeRemaining] = useState(15 * 60); // 15 mins default
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [completedSession, setCompletedSession] = useState<TestSession | null>(null);
  const [reviewOnlyIncorrect, setReviewOnlyIncorrect] = useState(false);

  // Add Custom Question Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customQuestionEn, setCustomQuestionEn] = useState('');
  const [customQuestionMr, setCustomQuestionMr] = useState('');
  const [opt1En, setOpt1En] = useState('');
  const [opt2En, setOpt2En] = useState('');
  const [opt3En, setOpt3En] = useState('');
  const [opt4En, setOpt4En] = useState('');
  const [opt1Mr, setOpt1Mr] = useState('');
  const [opt2Mr, setOpt2Mr] = useState('');
  const [opt3Mr, setOpt3Mr] = useState('');
  const [opt4Mr, setOpt4Mr] = useState('');
  const [correctOptionIdx, setCorrectOptionIdx] = useState(0);
  const [customExplEn, setCustomExplEn] = useState('');
  const [customExplMr, setCustomExplMr] = useState('');
  const [customSubject, setCustomSubject] = useState('polity');

  // Current active question
  const activeQuestions = reviewOnlyIncorrect && completedSession
    ? questions.filter(q => {
        const record = completedSession.answers.find(a => a.questionId === q.id);
        return record && !record.isCorrect;
      })
    : filteredQuestions;

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];

  // Timer countdown for Mock Test
  useEffect(() => {
    let interval: number;
    if (isTestStarted && !isTestSubmitted && testTimeRemaining > 0) {
      interval = window.setInterval(() => {
        setTestTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, isTestSubmitted, testTimeRemaining]);

  // Option selection handler
  const handleSelectOption = (idx: number) => {
    if (mode === 'practice') {
      if (selectedOption !== null) return; // Already chosen
      setSelectedOption(idx);
      setShowExplanation(true);

      const isCorrect = idx === currentQuestion.correctIndex;
      if (isCorrect) {
        soundManager.playSuccess();
      } else {
        soundManager.playWrong();
      }

      // Record to answers map
      setSessionAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: idx,
      }));
    } else {
      // In Mock Test Mode, allow switching answers until submission
      soundManager.playClick();
      setSessionAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: idx,
      }));
    }
  };

  // Navigation handlers
  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      if (mode === 'practice') {
        const nextQ = activeQuestions[currentIndex + 1];
        const prevAnswer = sessionAnswers[nextQ?.id];
        setSelectedOption(prevAnswer !== undefined ? prevAnswer : null);
        setShowExplanation(prevAnswer !== undefined);
      }
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      if (mode === 'practice') {
        const prevQ = activeQuestions[currentIndex - 1];
        const prevAnswer = sessionAnswers[prevQ?.id];
        setSelectedOption(prevAnswer !== undefined ? prevAnswer : null);
        setShowExplanation(prevAnswer !== undefined);
      }
    }
  };

  // Start a new mock test
  const startMockExam = () => {
    soundManager.playClick();
    setIsTestStarted(true);
    setIsTestSubmitted(false);
    setCompletedSession(null);
    setSessionAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTestTimeRemaining(15 * 60);
    setReviewOnlyIncorrect(false);
  };

  // Submit test and compute scores
  const handleSubmitTest = () => {
    soundManager.playTimerFinish();
    setIsTestSubmitted(true);
    setIsTestStarted(false);

    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    const answerRecords: QuestionAnswerRecord[] = activeQuestions.map(q => {
      const selected = sessionAnswers[q.id];
      if (selected === undefined || selected === null) {
        skipped++;
        return { questionId: q.id, selectedOption: null, isCorrect: false };
      }
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) {
        correct++;
      } else {
        incorrect++;
      }
      return { questionId: q.id, selectedOption: selected, isCorrect };
    });

    const total = activeQuestions.length;
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const timeSpent = 15 * 60 - testTimeRemaining;

    const session: TestSession = {
      id: `test-${Date.now()}`,
      date: new Date().toISOString(),
      subject: selectedSubject,
      mode: 'mock',
      totalQuestions: total,
      correctCount: correct,
      incorrectCount: incorrect,
      skippedCount: skipped,
      timeSpentSeconds: Math.max(1, timeSpent),
      answers: answerRecords,
      scorePercentage: scorePct,
    };

    setCompletedSession(session);
    storage.saveTestSession(session);
    onTestComplete(session);

    if (scorePct >= 70) {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  // Retry only incorrect questions
  const handleRetryIncorrect = () => {
    if (!completedSession) return;
    soundManager.playClick();
    setReviewOnlyIncorrect(false);
    setIsTestSubmitted(false);
    setIsTestStarted(true);
    setSessionAnswers({});
    setCurrentIndex(0);
    setTestTimeRemaining(10 * 60);
  };

  // Add custom question submission
  const handleSaveCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestionEn.trim() && !customQuestionMr.trim()) return;

    soundManager.playSuccess();
    const newQ: MCQQuestion = {
      id: `custom-mcq-${Date.now()}`,
      subject: customSubject,
      stream: 'both',
      questionEn: customQuestionEn.trim() || customQuestionMr.trim(),
      questionMr: customQuestionMr.trim() || customQuestionEn.trim(),
      optionsEn: [
        opt1En.trim() || opt1Mr.trim() || 'Option A',
        opt2En.trim() || opt2Mr.trim() || 'Option B',
        opt3En.trim() || opt3Mr.trim() || 'Option C',
        opt4En.trim() || opt4Mr.trim() || 'Option D',
      ],
      optionsMr: [
        opt1Mr.trim() || opt1En.trim() || 'पर्याय १',
        opt2Mr.trim() || opt2En.trim() || 'पर्याय २',
        opt3Mr.trim() || opt3En.trim() || 'पर्याय ३',
        opt4Mr.trim() || opt4En.trim() || 'पर्याय ४',
      ],
      correctIndex: Number(correctOptionIdx),
      explanationEn: customExplEn.trim() || 'Custom user question.',
      explanationMr: customExplMr.trim() || 'वापरकर्त्याने जोडलेला सराव प्रश्न.',
      difficulty: 'medium',
      tags: ['Custom', customSubject],
      isSample: false,
    };

    onAddCustomQuestion(newQ);
    setIsAddModalOpen(false);
    // Reset inputs
    setCustomQuestionEn('');
    setCustomQuestionMr('');
    setOpt1En(''); setOpt2En(''); setOpt3En(''); setOpt4En('');
    setOpt1Mr(''); setOpt2Mr(''); setOpt3Mr(''); setOpt4Mr('');
    setCustomExplEn(''); setCustomExplMr('');
  };

  // Timer format
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-300">
      
      {/* Sample Data Notice Badge */}
      <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs">
        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">{t.sampleDataNotice}</span>
      </div>

      {/* Header & Mode Selector */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t.mcqTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.mcqSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addCustomMCQ}</span>
            </button>
          </div>
        </div>

        {/* Mode Toggle & Subject Filters */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Mode Pill Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold max-w-sm">
            <button
              onClick={() => {
                setMode('practice');
                setIsTestStarted(false);
                setIsTestSubmitted(false);
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg transition text-center cursor-pointer ${mode === 'practice' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t.practiceMode}
            </button>
            <button
              onClick={() => {
                setMode('mock');
                setCurrentIndex(0);
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg transition text-center cursor-pointer ${mode === 'mock' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t.mockExamMode}
            </button>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">{t.allSubjects}</option>
              <option value="polity">Polity (राज्यघटना)</option>
              <option value="history">History (इतिहास)</option>
              <option value="geography">Geography (भूगोल)</option>
              <option value="economy">Economy (अर्थव्यवस्था)</option>
              <option value="science">General Science (विज्ञान)</option>
              <option value="csat">CSAT (बुद्धिमत्ता व अंकगणित)</option>
              <option value="marathi_grammar">Marathi Grammar (मराठी)</option>
              <option value="current_affairs">Current Affairs (चालू घडामोडी)</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentIndex(0);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="all">{t.allDifficulties}</option>
              <option value="easy">{t.diffEasy}</option>
              <option value="medium">{t.diffMedium}</option>
              <option value="hard">{t.diffHard}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mock Test Welcome Screen if mode is mock and test hasn't started */}
      {mode === 'mock' && !isTestStarted && !isTestSubmitted && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {t.startMockTest}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {language === 'mr' 
              ? 'आयोगाच्या परीक्षेप्रमाणे वेळेचे व्यवस्थापन शिकण्यासाठी ही मॉक टेस्ट द्या. एकूण प्रश्न, वेळ मर्यादा व शेवटी अचूकता अहवाल मिळेल.' 
              : 'Simulate official exam pressure with a timed countdown, question palette, and detailed performance breakdown.'}
          </p>

          <div className="grid grid-cols-3 gap-3 my-6 text-center text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="font-extrabold text-indigo-600 text-lg block">{activeQuestions.length}</span>
              <span className="text-slate-400">{t.question}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 text-lg block">15 min</span>
              <span className="text-slate-400">{language === 'mr' ? 'वेळ' : 'Duration'}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="font-extrabold text-amber-500 text-lg block">100%</span>
              <span className="text-slate-400">{language === 'mr' ? 'मोफत' : 'Free'}</span>
            </div>
          </div>

          <button
            onClick={startMockExam}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer"
          >
            {language === 'mr' ? 'मॉक परीक्षा सुरू करा' : 'Start Mock Test Now'}
          </button>
        </div>
      )}

      {/* Mock Test Score Report Screen if submitted */}
      {isTestSubmitted && completedSession && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mx-auto animate-in zoom-in-95 duration-200">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-2">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t.testResults}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'mr' ? 'तुमची चाचणी कामगिरी खालीलप्रमाणे आहे:' : 'Here is your detailed test scorecard:'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center">
            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 block font-mono">
                {completedSession.scorePercentage}%
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{t.accuracy}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/60 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block font-mono">
                {completedSession.correctCount}
              </span>
              <span className="text-[11px] font-bold text-emerald-600/80 uppercase">{language === 'mr' ? 'बरोबर' : 'Correct'}</span>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/60 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400 block font-mono">
                {completedSession.incorrectCount}
              </span>
              <span className="text-[11px] font-bold text-rose-600/80 uppercase">{language === 'mr' ? 'चूक' : 'Incorrect'}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl">
              <span className="text-2xl font-black text-slate-600 dark:text-slate-300 block font-mono">
                {completedSession.skippedCount}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">{language === 'mr' ? 'सोडवले नाही' : 'Skipped'}</span>
            </div>
          </div>

          <div className="space-y-3">
            {completedSession.incorrectCount > 0 && (
              <button
                onClick={() => {
                  setReviewOnlyIncorrect(true);
                  setIsTestSubmitted(false);
                  setMode('practice');
                  setCurrentIndex(0);
                  setShowExplanation(true);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-800 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>{t.reviewIncorrect} ({completedSession.incorrectCount})</span>
              </button>
            )}

            <button
              onClick={startMockExam}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.takeAnotherTest}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main MCQ Card for Practice Mode or Running Mock Test */}
      {(!isTestSubmitted || reviewOnlyIncorrect) && (mode === 'practice' || isTestStarted) && currentQuestion && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Top metadata & bookmark row */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                {t.question} {currentIndex + 1} {t.of} {activeQuestions.length}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {currentQuestion.subject.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Mock timer if running */}
              {isTestStarted && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold border border-amber-200 dark:border-amber-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(testTimeRemaining)}</span>
                </div>
              )}

              {/* Bookmark button */}
              <button
                onClick={() => onToggleBookmark(currentQuestion.id)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  bookmarkedIds.includes(currentQuestion.id)
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                }`}
                title={t.bookmarkQuestion}
              >
                {bookmarkedIds.includes(currentQuestion.id) ? (
                  <BookmarkCheck className="w-4 h-4 fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Question Text (Bilingual presentation) */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {language === 'mr' ? currentQuestion.questionMr : currentQuestion.questionEn}
            </h3>
            {/* Secondary language display for clear comprehension */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
              {language === 'mr' ? currentQuestion.questionEn : currentQuestion.questionMr}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {[0, 1, 2, 3].map((idx) => {
              const optionText = language === 'mr' ? currentQuestion.optionsMr[idx] : currentQuestion.optionsEn[idx];
              const isSelected = mode === 'practice'
                ? selectedOption === idx
                : sessionAnswers[currentQuestion.id] === idx;

              const isCorrectAnswer = currentQuestion.correctIndex === idx;

              // Practice mode colors
              let optionStyle = 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

              if (mode === 'practice' && selectedOption !== null) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 font-semibold';
                }
              } else if (mode === 'mock' && isSelected) {
                optionStyle = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-snug">{optionText}</span>
                  </div>

                  {mode === 'practice' && selectedOption !== null && (
                    <div className="shrink-0">
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice mode detailed explanation box */}
          {mode === 'practice' && showExplanation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 animate-in fade-in duration-200 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.explanation}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {language === 'mr' ? currentQuestion.explanationMr : currentQuestion.explanationEn}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1 border-t border-indigo-200/50 dark:border-indigo-800/40">
                {language === 'mr' ? currentQuestion.explanationEn : currentQuestion.explanationMr}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.previous}</span>
            </button>

            {/* In mock test mode: Submit button */}
            {isTestStarted && (
              <button
                onClick={handleSubmitTest}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition cursor-pointer"
              >
                {t.submitExam}
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={currentIndex === activeQuestions.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 shadow transition cursor-pointer"
            >
              <span>{t.next}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Custom MCQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 my-8">
            <h3 className="text-base font-bold mb-3">{t.addCustomMCQ}</h3>

            <form onSubmit={handleSaveCustomQuestion} className="space-y-3.5 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Subject</label>
                  <select
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value="polity">Polity (राज्यघटना)</option>
                    <option value="history">History (इतिहास)</option>
                    <option value="geography">Geography (भूगोल)</option>
                    <option value="economy">Economy (अर्थव्यवस्था)</option>
                    <option value="science">Science (विज्ञान)</option>
                    <option value="csat">CSAT (बुद्धिमत्ता)</option>
                    <option value="marathi_grammar">Marathi (मराठी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Correct Option</label>
                  <select
                    value={correctOptionIdx}
                    onChange={(e) => setCorrectOptionIdx(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value={0}>Option A (पर्याय १)</option>
                    <option value={1}>Option B (पर्याय २)</option>
                    <option value={2}>Option C (पर्याय ३)</option>
                    <option value={3}>Option D (पर्याय ४)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Question in Marathi (मराठीत प्रश्न)</label>
                <textarea
                  required
                  value={customQuestionMr}
                  onChange={(e) => setCustomQuestionMr(e.target.value)}
                  placeholder="उदा. कोणत्या कलमानुसार उच्च न्यायालयाला प्राधिकृत आदेश काढण्याचा अधिकार आहे?"
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Question in English (Optional)</label>
                <textarea
                  value={customQuestionEn}
                  onChange={(e) => setCustomQuestionEn(e.target.value)}
                  placeholder="e.g. Under which article does the High Court issue writs?"
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal focus:outline-indigo-500"
                />
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Option A (मराठी)</label>
                  <input
                    type="text"
                    required
                    value={opt1Mr}
                    onChange={(e) => setOpt1Mr(e.target.value)}
                    placeholder="पर्याय १"
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-normal text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Option B (मराठी)</label>
                  <input
                    type="text"
                    required
                    value={opt2Mr}
                    onChange={(e) => setOpt2Mr(e.target.value)}
                    placeholder="पर्याय २"
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-normal text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Option C (मराठी)</label>
                  <input
                    type="text"
                    required
                    value={opt3Mr}
                    onChange={(e) => setOpt3Mr(e.target.value)}
                    placeholder="पर्याय ३"
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-normal text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Option D (मराठी)</label>
                  <input
                    type="text"
                    required
                    value={opt4Mr}
                    onChange={(e) => setOpt4Mr(e.target.value)}
                    placeholder="पर्याय ४"
                    className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-normal text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Explanation (स्पष्टीकरण)</label>
                <textarea
                  value={customExplMr}
                  onChange={(e) => setCustomExplMr(e.target.value)}
                  placeholder="योग्य उत्तराचे सविस्तर कारण व संदर्भ..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal focus:outline-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
