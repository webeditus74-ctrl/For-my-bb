import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  BookOpenCheck, 
  Brain, 
  BookmarkCheck, 
  BarChart3, 
  Settings, 
  Languages, 
  Sparkles,
  HelpCircle,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { 
  Language, 
  UserProfile, 
  Task, 
  SyllabusSubject, 
  MCQQuestion, 
  NoteItem, 
  DailyStudyLog, 
  TestSession, 
  Achievement 
} from './types';
import { translations } from './translations';
import { storage } from './utils/storage';
import { soundManager } from './utils/sound';

// Components
import { DashboardView } from './components/DashboardView';
import { TimetableView } from './components/TimetableView';
import { SyllabusView } from './components/SyllabusView';
import { MCQPracticeView } from './components/MCQPracticeView';
import { NotesAndRevisionView } from './components/NotesAndRevisionView';
import { AnalyticsAndStreaksView } from './components/AnalyticsAndStreaksView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SettingsModal } from './components/SettingsModal';
import { PublishGuideModal } from './components/PublishGuideModal';

type ActiveTab = 'dashboard' | 'timetable' | 'syllabus' | 'mcq' | 'notes' | 'analytics';

export default function App() {
  // Global persisted states
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());
  const [language, setLanguage] = useState<Language>(() => storage.getProfile().language || 'mr');
  const [tasks, setTasks] = useState<Task[]>(() => storage.getTasks());
  const [syllabus, setSyllabus] = useState<SyllabusSubject[]>(() => storage.getSyllabus());
  const [questions, setQuestions] = useState<MCQQuestion[]>(() => storage.getAllQuestions());
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => storage.getBookmarkedMCQIds());
  const [notes, setNotes] = useState<NoteItem[]>(() => storage.getNotes());
  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyStudyLog>>(() => storage.getDailyLogs());
  const [testHistory, setTestHistory] = useState<TestSession[]>(() => storage.getTestHistory());
  const [achievements, setAchievements] = useState<Achievement[]>(() => storage.getAchievements());

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);

  const t = translations[language];

  // Initialize sound manager preference
  useEffect(() => {
    soundManager.setEnabled(profile.soundEnabled ?? true);
  }, [profile.soundEnabled]);

  // Toggle language (Marathi <-> English)
  const toggleLanguage = () => {
    soundManager.playClick();
    const nextLang: Language = language === 'mr' ? 'en' : 'mr';
    setLanguage(nextLang);
    const updated = { ...profile, language: nextLang };
    setProfile(updated);
    storage.saveProfile(updated);
  };

  // Task check toggle
  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map(tk => {
      if (tk.id === taskId) {
        const nextDone = !tk.completed;
        if (nextDone) {
          soundManager.playSuccess();
        } else {
          soundManager.playClick();
        }
        return { ...tk, completed: nextDone, completedAt: nextDone ? new Date().toISOString() : undefined };
      }
      return tk;
    });

    setTasks(updated);
    storage.saveTasks(updated);

    // Update daily study log
    const today = new Date().toISOString().split('T')[0];
    const logs = storage.getDailyLogs();
    const curr = logs[today] || {
      date: today,
      minutesStudied: 0,
      tasksCompleted: 0,
      mcqsAttempted: 0,
      mcqsCorrect: 0,
    };
    curr.tasksCompleted = updated.filter(tk => tk.completed).length;
    logs[today] = curr;
    setDailyLogs(logs);
    storage.saveDailyLogs(logs);
  };

  // Tasks change
  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
    storage.saveTasks(newTasks);
  };

  // Syllabus change
  const handleSyllabusChange = (updated: SyllabusSubject[]) => {
    setSyllabus(updated);
    storage.saveSyllabus(updated);

    // Check achievement: 25% completed
    let total = 0;
    let completed = 0;
    updated.forEach(s => s.topics.forEach(tp => {
      total++;
      if (tp.status === 'completed' || tp.status === 'revised_1' || tp.status === 'revised_2') completed++;
    }));
    if (total > 0 && (completed / total) >= 0.25) {
      unlockAchievement('syllabus_25');
    }
  };

  // Bookmark question toggle
  const handleToggleBookmark = (questionId: string) => {
    soundManager.playClick();
    const isAdded = storage.toggleBookmarkMCQ(questionId);
    setBookmarkedIds(storage.getBookmarkedMCQIds());
  };

  // Add custom MCQ
  const handleAddCustomQuestion = (newQuestion: MCQQuestion) => {
    const customList = storage.getCustomMCQs();
    const updated = [newQuestion, ...customList];
    storage.saveCustomMCQs(updated);
    setQuestions(storage.getAllQuestions());
  };

  // Notes change
  const handleNotesChange = (updated: NoteItem[]) => {
    setNotes(updated);
    storage.saveNotes(updated);
    if (updated.length >= 5) {
      unlockAchievement('notes_master');
    }
  };

  // Test session complete
  const handleTestComplete = (session: TestSession) => {
    setTestHistory(storage.getTestHistory());
    unlockAchievement('first_mcq');

    if (session.scorePercentage >= 80 && session.totalQuestions >= 10) {
      unlockAchievement('perfect_accuracy');
    }

    // Record daily log
    const today = new Date().toISOString().split('T')[0];
    const logs = storage.getDailyLogs();
    const curr = logs[today] || {
      date: today,
      minutesStudied: 0,
      tasksCompleted: 0,
      mcqsAttempted: 0,
      mcqsCorrect: 0,
    };
    curr.mcqsAttempted += session.totalQuestions;
    curr.mcqsCorrect += session.correctCount;
    logs[today] = curr;
    setDailyLogs(logs);
    storage.saveDailyLogs(logs);
  };

  // Study time logged callback
  const handleTimeLogged = (minutes: number) => {
    setDailyLogs(storage.getDailyLogs());
    setProfile(storage.getProfile());

    if (profile.streak >= 3) unlockAchievement('streak_3');
    if (profile.streak >= 7) unlockAchievement('streak_7');
  };

  // Unlock achievement helper
  const unlockAchievement = (id: string) => {
    const curr = storage.getAchievements();
    const target = curr.find(a => a.id === id);
    if (target && !target.unlockedAt) {
      target.unlockedAt = new Date().toISOString();
      storage.saveAchievements(curr);
      setAchievements([...curr]);
    }
  };

  // Bookmarked questions array
  const bookmarkedQuestions = questions.filter(q => bookmarkedIds.includes(q.id));

  // Navigation items config
  const navItems = [
    { key: 'dashboard' as ActiveTab, label: t.navDashboard, icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: 'timetable' as ActiveTab, label: t.navTimetable, icon: <CalendarCheck className="w-5 h-5" /> },
    { key: 'syllabus' as ActiveTab, label: t.navSyllabus, icon: <BookOpenCheck className="w-5 h-5" /> },
    { key: 'mcq' as ActiveTab, label: t.navMCQ, icon: <Brain className="w-5 h-5" /> },
    { key: 'notes' as ActiveTab, label: t.navNotes, icon: <BookmarkCheck className="w-5 h-5" /> },
    { key: 'analytics' as ActiveTab, label: t.navAnalytics, icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-2xl bg-indigo-900 text-amber-400 flex items-center justify-center font-black shadow-md border border-amber-500/30">
              <span className="text-xs tracking-wider">MPSC</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  ₹0 Free
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 hidden sm:block">
                {t.appSubtitle}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.key);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === item.key
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            
            {/* PWA Install Button */}
            <PWAInstallButton language={language} variant="header" />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title={language === 'mr' ? 'Switch to English' : 'मराठीत बदला'}
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'mr' ? 'English' : 'मराठी'}</span>
            </button>

            {/* ₹0 Deployment Guide */}
            <button
              onClick={() => setIsPublishGuideOpen(true)}
              className="hidden sm:inline-flex p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t.publishGuide}
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Settings Gear */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t.settings}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-5">
        {activeTab === 'dashboard' && (
          <DashboardView
            language={language}
            profile={profile}
            tasks={tasks}
            syllabus={syllabus}
            dailyLogs={dailyLogs}
            onToggleTask={handleToggleTask}
            onNavigateTab={setActiveTab}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onTimeLogged={handleTimeLogged}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableView
            language={language}
            tasks={tasks}
            onTasksChange={handleTasksChange}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusView
            language={language}
            syllabus={syllabus}
            onSyllabusChange={handleSyllabusChange}
          />
        )}

        {activeTab === 'mcq' && (
          <MCQPracticeView
            language={language}
            questions={questions}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onAddCustomQuestion={handleAddCustomQuestion}
            onTestComplete={handleTestComplete}
          />
        )}

        {activeTab === 'notes' && (
          <NotesAndRevisionView
            language={language}
            notes={notes}
            bookmarkedQuestions={bookmarkedQuestions}
            onNotesChange={handleNotesChange}
            onRemoveBookmarkMCQ={handleToggleBookmark}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsAndStreaksView
            language={language}
            profile={profile}
            dailyLogs={dailyLogs}
            testHistory={testHistory}
            achievements={achievements}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map(item => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(item.key);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-slate-400 dark:text-slate-500 font-medium'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.key === 'timetable' && tasks.filter(t => !t.completed).length > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[62px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Offline Status Alert */}
      <OfflineIndicator language={language} />

      {/* Settings Modal */}
      <SettingsModal
        language={language}
        isOpen={isSettingsOpen}
        profile={profile}
        onClose={() => setIsSettingsOpen(false)}
        onProfileChange={(updated) => setProfile(updated)}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
      />

      {/* ₹0 Deployment Instructions Modal */}
      <PublishGuideModal
        language={language}
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
      />
    </div>
  );
}
