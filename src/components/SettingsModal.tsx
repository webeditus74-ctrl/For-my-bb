import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Target, 
  Globe, 
  CheckCircle2, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { translations } from '../translations';
import { storage } from '../utils/storage';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onProfileChange: (updated: UserProfile) => void;
  onOpenPublishGuide: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  language,
  isOpen,
  profile,
  onClose,
  onProfileChange,
  onOpenPublishGuide,
}) => {
  const t = translations[language];

  // Form states
  const [targetPost, setTargetPost] = useState(profile.targetPost);
  const [targetExamTitle, setTargetExamTitle] = useState(profile.targetExamTitle);
  const [targetExamDate, setTargetExamDate] = useState(
    profile.targetExamDate ? profile.targetExamDate.split('T')[0] : '2026-11-29'
  );
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(profile.dailyGoalMinutes || 240);
  const [dailyGoalMCQs, setDailyGoalMCQs] = useState(profile.dailyGoalMCQs || 30);
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled ?? true);

  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();

    const updated: UserProfile = {
      ...profile,
      targetPost,
      targetExamTitle,
      targetExamDate: new Date(targetExamDate).toISOString(),
      dailyGoalMinutes: Number(dailyGoalMinutes),
      dailyGoalMCQs: Number(dailyGoalMCQs),
      soundEnabled,
    };

    soundManager.setEnabled(soundEnabled);
    onProfileChange(updated);
    storage.saveProfile(updated);
    onClose();
  };

  // Export JSON file
  const handleExportData = () => {
    soundManager.playClick();
    const jsonStr = storage.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MPSC_Pragati_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storage.importBackup(content);
      if (success) {
        soundManager.playSuccess();
        setImportStatus(language === 'mr' ? 'माहिती यशस्वीरित्या पूर्ववत केली!' : 'Backup restored successfully! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        soundManager.playWrong();
        setImportStatus(language === 'mr' ? 'फाइल वाचण्यात त्रुटी. कृपया वैध JSON फाइल निवडा.' : 'Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Reset all
  const handleResetAll = () => {
    const confirmText = language === 'mr' 
      ? 'सावधान! यामुळे तुमच्या सर्व नोंदी, अभ्यासक्रम प्रगती आणि सोडवलेले प्रश्न रीसेट होतील. पुढे जायचे का?' 
      : 'Warning: This will reset all your tasks, syllabus progress, and test history. Continue?';
    if (confirm(confirmText)) {
      storage.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings}
            </h3>
            <span className="text-xs text-slate-500">
              {language === 'mr' ? 'लक्ष्य परीक्षा व दैनिक अभ्यास उद्दिष्टे' : 'Target exam dates & personal study goals'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
          
          {/* Target Exam Title */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.targetExam}</label>
            <input
              type="text"
              required
              value={targetExamTitle}
              onChange={(e) => setTargetExamTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">
                {language === 'mr' ? 'परीक्षेची तारीख' : 'Target Exam Date'}
              </label>
              <input
                type="date"
                required
                value={targetExamDate}
                onChange={(e) => setTargetExamDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.targetPost}</label>
              <input
                type="text"
                required
                value={targetPost}
                onChange={(e) => setTargetPost(e.target.value)}
                placeholder="Dy. Collector / PSI / STI"
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
              />
            </div>
          </div>

          {/* Daily Goals */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">
                {language === 'mr' ? 'दैनिक अभ्यास वेळ (मिनिटे)' : 'Daily Goal (Minutes)'}
              </label>
              <input
                type="number"
                min="30"
                max="900"
                step="30"
                value={dailyGoalMinutes}
                onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">
                {language === 'mr' ? 'दैनिक प्रश्न उद्दिष्ट' : 'Daily MCQs Goal'}
              </label>
              <input
                type="number"
                min="10"
                max="200"
                step="5"
                value={dailyGoalMCQs}
                onChange={(e) => setDailyGoalMCQs(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
              />
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span className="text-slate-700 dark:text-slate-300">
                {language === 'mr' ? 'अभ्यास व चाचणीचे आवाज' : 'Sound Effects'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* Backup & Restore section */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'mr' ? 'माहिती सुरक्षा व बॅकअप (Offline Backup)' : 'Data Backup & Restore'}
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'बॅकअप डाऊनलोड' : 'Export JSON'}</span>
              </button>

              <label className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'बॅकअप अपलोड' : 'Import JSON'}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 text-center font-medium">
                {importStatus}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPublishGuide();
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.publishGuide}</span>
            </button>

            <button
              type="button"
              onClick={handleResetAll}
              className="text-[11px] text-rose-500 hover:underline cursor-pointer"
            >
              {t.resetData}
            </button>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
