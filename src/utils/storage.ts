import { 
  UserProfile, 
  Task, 
  SyllabusSubject, 
  MCQQuestion, 
  TestSession, 
  NoteItem, 
  DailyStudyLog, 
  Achievement 
} from '../types';
import { initialSyllabusData } from '../data/syllabusData';
import { sampleQuestions } from '../data/sampleQuestions';
import { initialTasks } from '../data/timetableTemplates';
import { initialNotes, defaultAchievements, defaultUserProfile } from '../data/initialData';

const STORAGE_KEYS = {
  PROFILE: 'mpsc_user_profile_v1',
  TASKS: 'mpsc_tasks_v1',
  SYLLABUS: 'mpsc_syllabus_v1',
  CUSTOM_MCQS: 'mpsc_custom_mcqs_v1',
  TEST_HISTORY: 'mpsc_test_history_v1',
  NOTES: 'mpsc_notes_v1',
  BOOKMARKED_MCQ_IDS: 'mpsc_bookmarked_mcqs_v1',
  DAILY_LOGS: 'mpsc_daily_logs_v1',
  ACHIEVEMENTS: 'mpsc_achievements_v1',
};

// Safe JSON parser
function safeGet<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export const storage = {
  // Profile
  getProfile: (): UserProfile => {
    return safeGet<UserProfile>(STORAGE_KEYS.PROFILE, defaultUserProfile);
  },
  saveProfile: (profile: UserProfile): void => {
    safeSet(STORAGE_KEYS.PROFILE, profile);
  },

  // Tasks
  getTasks: (): Task[] => {
    return safeGet<Task[]>(STORAGE_KEYS.TASKS, initialTasks);
  },
  saveTasks: (tasks: Task[]): void => {
    safeSet(STORAGE_KEYS.TASKS, tasks);
  },

  // Syllabus
  getSyllabus: (): SyllabusSubject[] => {
    return safeGet<SyllabusSubject[]>(STORAGE_KEYS.SYLLABUS, initialSyllabusData);
  },
  saveSyllabus: (syllabus: SyllabusSubject[]): void => {
    safeSet(STORAGE_KEYS.SYLLABUS, syllabus);
  },

  // Custom MCQs (merged with sample questions)
  getCustomMCQs: (): MCQQuestion[] => {
    return safeGet<MCQQuestion[]>(STORAGE_KEYS.CUSTOM_MCQS, []);
  },
  saveCustomMCQs: (mcqs: MCQQuestion[]): void => {
    safeSet(STORAGE_KEYS.CUSTOM_MCQS, mcqs);
  },
  getAllQuestions: (): MCQQuestion[] => {
    const custom = storage.getCustomMCQs();
    return [...sampleQuestions, ...custom];
  },

  // Bookmarked Question IDs
  getBookmarkedMCQIds: (): string[] => {
    return safeGet<string[]>(STORAGE_KEYS.BOOKMARKED_MCQ_IDS, ['mpsc-pol-01', 'mpsc-geo-01']);
  },
  saveBookmarkedMCQIds: (ids: string[]): void => {
    safeSet(STORAGE_KEYS.BOOKMARKED_MCQ_IDS, ids);
  },
  toggleBookmarkMCQ: (questionId: string): boolean => {
    const ids = storage.getBookmarkedMCQIds();
    const exists = ids.includes(questionId);
    let newIds: string[];
    if (exists) {
      newIds = ids.filter(id => id !== questionId);
    } else {
      newIds = [...ids, questionId];
    }
    storage.saveBookmarkedMCQIds(newIds);
    return !exists;
  },

  // Test History
  getTestHistory: (): TestSession[] => {
    return safeGet<TestSession[]>(STORAGE_KEYS.TEST_HISTORY, []);
  },
  saveTestSession: (session: TestSession): void => {
    const history = storage.getTestHistory();
    const updated = [session, ...history].slice(0, 50); // Keep last 50 tests
    safeSet(STORAGE_KEYS.TEST_HISTORY, updated);
  },

  // Notes
  getNotes: (): NoteItem[] => {
    return safeGet<NoteItem[]>(STORAGE_KEYS.NOTES, initialNotes);
  },
  saveNotes: (notes: NoteItem[]): void => {
    safeSet(STORAGE_KEYS.NOTES, notes);
  },

  // Daily Study Logs
  getDailyLogs: (): Record<string, DailyStudyLog> => {
    return safeGet<Record<string, DailyStudyLog>>(STORAGE_KEYS.DAILY_LOGS, {});
  },
  saveDailyLogs: (logs: Record<string, DailyStudyLog>): void => {
    safeSet(STORAGE_KEYS.DAILY_LOGS, logs);
  },

  // Record study minutes for today
  recordStudyTime: (minutes: number): void => {
    const today = new Date().toISOString().split('T')[0];
    const logs = storage.getDailyLogs();
    const current = logs[today] || {
      date: today,
      minutesStudied: 0,
      tasksCompleted: 0,
      mcqsAttempted: 0,
      mcqsCorrect: 0,
    };
    current.minutesStudied += minutes;
    logs[today] = current;
    storage.saveDailyLogs(logs);

    // Update streak if not already updated today
    const profile = storage.getProfile();
    const lastDate = profile.lastStudiedDate;
    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yesterdayStr) {
        profile.streak += 1;
      } else if (!lastDate) {
        profile.streak = 1;
      } else {
        profile.streak = 1; // Restart streak
      }
      profile.lastStudiedDate = today;
      if (!profile.streakHistory.includes(today)) {
        profile.streakHistory.push(today);
      }
      storage.saveProfile(profile);
    }
  },

  // Achievements
  getAchievements: (): Achievement[] => {
    return safeGet<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
  },
  saveAchievements: (achievements: Achievement[]): void => {
    safeSet(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  },

  // Export full JSON backup
  exportBackup: (): string => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      profile: storage.getProfile(),
      tasks: storage.getTasks(),
      syllabus: storage.getSyllabus(),
      customMCQs: storage.getCustomMCQs(),
      bookmarkedMCQIds: storage.getBookmarkedMCQIds(),
      testHistory: storage.getTestHistory(),
      notes: storage.getNotes(),
      dailyLogs: storage.getDailyLogs(),
      achievements: storage.getAchievements(),
    };
    return JSON.stringify(data, null, 2);
  },

  // Import full JSON backup
  importBackup: (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) storage.saveProfile(data.profile);
      if (data.tasks) storage.saveTasks(data.tasks);
      if (data.syllabus) storage.saveSyllabus(data.syllabus);
      if (data.customMCQs) storage.saveCustomMCQs(data.customMCQs);
      if (data.bookmarkedMCQIds) storage.saveBookmarkedMCQIds(data.bookmarkedMCQIds);
      if (data.testHistory) safeSet(STORAGE_KEYS.TEST_HISTORY, data.testHistory);
      if (data.notes) storage.saveNotes(data.notes);
      if (data.dailyLogs) storage.saveDailyLogs(data.dailyLogs);
      if (data.achievements) storage.saveAchievements(data.achievements);
      return true;
    } catch (e) {
      console.error('Failed to parse and import backup', e);
      return false;
    }
  },

  // Reset to clean default state
  resetAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(k => {
      localStorage.removeItem(k);
    });
  },
};
