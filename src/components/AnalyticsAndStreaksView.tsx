import React from 'react';
import { 
  Flame, 
  Award, 
  BarChart3, 
  Clock, 
  Target, 
  CheckCircle2, 
  Zap, 
  Calendar, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { UserProfile, DailyStudyLog, TestSession, Achievement, Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  profile: UserProfile;
  dailyLogs: Record<string, DailyStudyLog>;
  testHistory: TestSession[];
  achievements: Achievement[];
}

export const AnalyticsAndStreaksView: React.FC<Props> = ({
  language,
  profile,
  dailyLogs,
  testHistory,
  achievements,
}) => {
  const t = translations[language];

  // Calculate past 7 days for the study chart
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const log = dailyLogs[dateStr] || { minutesStudied: 0, mcqsAttempted: 0 };
    const dayName = d.toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-US', { weekday: 'short' });
    return {
      dateStr,
      dayName,
      minutes: log.minutesStudied,
      hours: Math.round((log.minutesStudied / 60) * 10) / 10,
    };
  });

  const maxMinutes = Math.max(120, ...past7Days.map(d => d.minutes));

  // Past 14 days activity dots
  const past14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toISOString().split('T')[0];
    const hasStudied = profile.streakHistory.includes(dateStr) || !!dailyLogs[dateStr]?.minutesStudied;
    return { dateStr, hasStudied };
  });

  // Aggregated totals
  let totalMinutes = 0;
  let totalMCQs = 0;
  Object.values(dailyLogs).forEach(log => {
    totalMinutes += log.minutesStudied || 0;
    totalMCQs += log.mcqsAttempted || 0;
  });

  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  // Average test accuracy
  const avgAccuracy = testHistory.length > 0
    ? Math.round(testHistory.reduce((acc, curr) => acc + curr.scorePercentage, 0) / testHistory.length)
    : 0;

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          {t.analyticsTitle}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {language === 'mr' ? 'तुमच्या अभ्यासाचे तपशीलवार विश्लेषण आणि सातत्य' : 'Detailed performance tracking and streak analytics'}
        </p>
      </div>

      {/* Streak Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white p-6 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Flame className="w-10 h-10 text-amber-200 fill-current animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                {t.streakTitle}
              </span>
              <div className="text-3xl sm:text-4xl font-black">
                {profile.streak} <span className="text-lg font-bold text-white">{t.activeStreak}</span>
              </div>
              <p className="text-xs text-amber-100 mt-1 max-w-md">
                {t.streakDesc}
              </p>
            </div>
          </div>

          {/* Past 14-day streak grid */}
          <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-amber-200 block mb-2">
              {language === 'mr' ? 'मागील १४ दिवसांचे सातत्य' : 'Last 14 Days Activity'}
            </span>
            <div className="grid grid-cols-7 gap-2">
              {past14Days.map((day, idx) => (
                <div
                  key={idx}
                  title={day.dateStr}
                  className={`w-4 h-4 rounded-md transition-all ${
                    day.hasStudied ? 'bg-amber-300 ring-2 ring-white/50' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{t.totalStudyHours}</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalHours} <span className="text-sm font-semibold text-slate-400">hours</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{t.totalMCQsSolved}</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalMCQs} <span className="text-sm font-semibold text-slate-400">questions</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{t.overallAccuracy}</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {avgAccuracy}% <span className="text-sm font-semibold text-slate-400">avg</span>
          </div>
        </div>
      </div>

      {/* Weekly Study Hours Bar Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.weeklyHours}
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {language === 'mr' ? 'दैनिक लक्ष: ४ तास' : 'Daily Goal: 4 hrs'}
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
          {past7Days.map((day, idx) => {
            const barHeightPct = Math.min(100, Math.max(12, Math.round((day.minutes / maxMinutes) * 100)));
            const isToday = idx === past7Days.length - 1;

            return (
              <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                  {day.hours}h
                </span>
                <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-xl h-full flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-md'
                        : 'bg-indigo-300 dark:bg-indigo-800 group-hover:bg-indigo-500'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                  />
                </div>
                <span className={`text-[11px] font-bold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                  {day.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t.achievements}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {achievements.map(ach => {
            const isUnlocked = !!ach.unlockedAt;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 text-slate-900 dark:text-white'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60 text-slate-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isUnlocked ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">
                    {language === 'mr' ? ach.titleMr : ach.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {language === 'mr' ? ach.descMr : ach.descEn}
                  </p>
                  {isUnlocked && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1.5">
                      <Sparkles className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
