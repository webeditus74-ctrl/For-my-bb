import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Target, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Play, 
  Edit3, 
  BookOpen, 
  CheckSquare, 
  TrendingUp, 
  Zap,
  BookmarkCheck
} from 'lucide-react';
import { 
  Language, 
  UserProfile, 
  Task, 
  SyllabusSubject, 
  DailyStudyLog 
} from '../types';
import { translations } from '../translations';
import { motivationalQuotes } from '../data/initialData';
import { StudyTimer } from './StudyTimer';
import { PWAInstallButton } from './PWAInstallButton';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  profile: UserProfile;
  tasks: Task[];
  syllabus: SyllabusSubject[];
  dailyLogs: Record<string, DailyStudyLog>;
  onToggleTask: (taskId: string) => void;
  onNavigateTab: (tab: 'dashboard' | 'timetable' | 'syllabus' | 'mcq' | 'notes' | 'analytics') => void;
  onOpenSettings: () => void;
  onTimeLogged: (minutes: number) => void;
}

export const DashboardView: React.FC<Props> = ({
  language,
  profile,
  tasks,
  syllabus,
  dailyLogs,
  onToggleTask,
  onNavigateTab,
  onOpenSettings,
  onTimeLogged,
}) => {
  const t = translations[language];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate motivational quote
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % motivationalQuotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const activeQuote = motivationalQuotes[quoteIndex];

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greetingMorning;
    if (hour < 17) return t.greetingAfternoon;
    if (hour < 21) return t.greetingEvening;
    return t.greetingNight;
  };

  // Today's stats calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = dailyLogs[todayStr] || {
    date: todayStr,
    minutesStudied: 0,
    tasksCompleted: tasks.filter(task => task.completed).length,
    mcqsAttempted: 0,
    mcqsCorrect: 0,
  };

  const tasksCompletedCount = tasks.filter(tk => tk.completed).length;
  const totalTasksCount = tasks.length;
  const taskPercent = totalTasksCount > 0 ? Math.round((tasksCompletedCount / totalTasksCount) * 100) : 0;

  // Study time progress
  const studyHours = Math.floor(todayLog.minutesStudied / 60);
  const studyMinsRemainder = todayLog.minutesStudied % 60;
  const goalMinutes = profile.dailyGoalMinutes || 240;
  const studyTimePercent = Math.min(100, Math.round((todayLog.minutesStudied / goalMinutes) * 100));

  // Overall syllabus calculation
  let totalTopics = 0;
  let completedTopics = 0;
  syllabus.forEach(sub => {
    sub.topics.forEach(top => {
      totalTopics++;
      if (top.status === 'completed' || top.status === 'revised_1' || top.status === 'revised_2') {
        completedTopics++;
      }
    });
  });
  const syllabusPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Countdown timer to target exam date
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const examDate = new Date(profile.targetExamDate).getTime();
      const now = new Date().getTime();
      const difference = examDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        setCountdown({ days, hours, minutes });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [profile.targetExamDate]);

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-300">
      
      {/* Top Greeting & Motivational Quote Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.freeBadge}</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{getGreeting()}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 mt-2 italic max-w-xl leading-relaxed">
              {language === 'mr' ? activeQuote.quoteMr : activeQuote.quoteEn}
              <span className="not-italic font-semibold text-amber-400 block mt-1">
                — {language === 'mr' ? activeQuote.authorMr : activeQuote.authorEn}
              </span>
            </p>
          </div>

          {/* Quick Streak Flame in header */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Flame className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-black text-amber-300 flex items-baseline gap-1">
                {profile.streak} <span className="text-xs font-bold text-white uppercase">{t.activeStreak}</span>
              </div>
              <p className="text-[11px] text-slate-300">{t.streakMotivation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Exam Countdown & Target Post Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Exam Countdown Card */}
        <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-5 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  {t.targetExam}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {profile.targetExamTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'बदला' : 'Change'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5 my-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 block font-mono">
                {countdown.days}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {language === 'mr' ? 'दिवस' : 'Days'}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 block font-mono">
                {countdown.hours}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {language === 'mr' ? 'तास' : 'Hours'}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 block font-mono">
                {countdown.minutes}
              </span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {language === 'mr' ? 'मिनिटे' : 'Mins'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 font-medium">
              <Target className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.targetPost}: </span>
              <strong className="text-slate-800 dark:text-slate-200">{profile.targetPost}</strong>
            </span>
            <span className="text-[11px] text-slate-400">
              {new Date(profile.targetExamDate).toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* PWA Install Promotion or Offline Status */}
        <div className="flex flex-col justify-between">
          <PWAInstallButton language={language} variant="card" />
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* 1. Study Time Today */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.studyTimeToday}
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {studyHours}h {studyMinsRemainder}m
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${studyTimePercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              {studyTimePercent}% of {Math.floor(goalMinutes / 60)}h goal
            </span>
          </div>
        </div>

        {/* 2. Tasks Completed Today */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.tasksProgress}
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {tasksCompletedCount} / {totalTasksCount}
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${taskPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              {taskPercent}% {language === 'mr' ? 'पूर्ण' : 'completed'}
            </span>
          </div>
        </div>

        {/* 3. MCQs Solved Today */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.mcqTarget}
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {todayLog.mcqsAttempted} <span className="text-xs font-bold text-slate-400">/ {profile.dailyGoalMCQs}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, Math.round((todayLog.mcqsAttempted / (profile.dailyGoalMCQs || 30)) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              {todayLog.mcqsCorrect} {language === 'mr' ? 'अचूक उत्तरे' : 'correct answers'}
            </span>
          </div>
        </div>

        {/* 4. Syllabus Completion */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.syllabusCompletion}
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {syllabusPercent}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${syllabusPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
              {completedTopics} / {totalTopics} {language === 'mr' ? 'घटक' : 'topics covered'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Study Timer & Today's Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Integrated Study Timer */}
        <div className="lg:col-span-5 space-y-4">
          <StudyTimer language={language} onTimeLogged={onTimeLogged} />

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateTab('mcq')}
              className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/60 transition active:scale-95 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.quick10MCQs}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {language === 'mr' ? 'सराव सुरू करा' : 'Timed practice drill'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('notes')}
              className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 transition active:scale-95 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.quickRevise}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {language === 'mr' ? 'शॉर्ट ट्रिक्स व कलमे' : 'Spaced repetition'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Today's Priority Checklist */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.todayPriorities}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {tasksCompletedCount} of {totalTasksCount} tasks completed
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('timetable')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'mr' ? 'पूर्ण वेळापत्रक' : 'Full Timetable'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-10 px-4">
              <CheckSquare className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.noTasksToday}</p>
              <button
                onClick={() => onNavigateTab('timetable')}
                className="mt-3 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
              >
                {t.addTask}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {tasks.slice(0, 5).map(task => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                    task.completed
                      ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold block leading-tight ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                      {language === 'mr' && task.titleMr ? task.titleMr : task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {task.subject}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {task.estimatedMinutes}m
                      </span>
                      {task.priority === 'high' && (
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded">
                          High
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
