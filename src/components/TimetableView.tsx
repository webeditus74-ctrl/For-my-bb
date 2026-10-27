import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Sun, 
  CloudSun, 
  Sunset, 
  Moon,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Task, TaskTimeSlot, TaskPriority, Language } from '../types';
import { translations } from '../translations';
import { timetableTemplates } from '../data/timetableTemplates';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  tasks: Task[];
  onTasksChange: (newTasks: Task[]) => void;
}

export const TimetableView: React.FC<Props> = ({ language, tasks, onTasksChange }) => {
  const t = translations[language];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Form states for new task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('Polity');
  const [timeSlot, setTimeSlot] = useState<TaskTimeSlot>('morning');
  const [estimatedMinutes, setEstimatedMinutes] = useState(60);
  const [priority, setPriority] = useState<TaskPriority>('high');

  const completedCount = tasks.filter(tk => tk.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Toggle single task completed status
  const handleToggle = (taskId: string) => {
    const updated = tasks.map(task => {
      if (task.id === taskId) {
        const nextState = !task.completed;
        if (nextState) {
          soundManager.playSuccess();
        } else {
          soundManager.playClick();
        }
        return {
          ...task,
          completed: nextState,
          completedAt: nextState ? new Date().toISOString() : undefined,
        };
      }
      return task;
    });

    onTasksChange(updated);

    // If all tasks are completed, burst confetti
    const newlyCompleted = updated.filter(tk => tk.completed).length;
    if (newlyCompleted === updated.length && updated.length > 0) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  // Delete task
  const handleDelete = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    onTasksChange(tasks.filter(tk => tk.id !== taskId));
  };

  // Add new task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    soundManager.playClick();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskTitle.trim(),
      titleMr: taskTitle.trim(),
      subject: taskSubject,
      timeSlot,
      estimatedMinutes: Number(estimatedMinutes) || 45,
      completed: false,
      priority,
    };

    onTasksChange([...tasks, newTask]);
    setTaskTitle('');
    setIsAddModalOpen(false);
  };

  // Reset timetable for tomorrow
  const handleReset = () => {
    if (confirm(language === 'mr' ? 'उद्याच्या अभ्यासासाठी सर्व कामे अनचेक करायची आहेत का?' : 'Reset all tasks for tomorrow’s study session?')) {
      soundManager.playClick();
      const reset = tasks.map(tk => ({ ...tk, completed: false, completedAt: undefined }));
      onTasksChange(reset);
    }
  };

  // Load a template
  const handleLoadTemplate = (type: 'fullTime' | 'working') => {
    soundManager.playSuccess();
    const template = timetableTemplates[type];
    onTasksChange(template);
    setIsTemplateModalOpen(false);
  };

  // Slots helper
  const slots: { key: TaskTimeSlot; title: string; icon: React.ReactNode; color: string }[] = [
    { key: 'morning', title: t.timeSlotMorning, icon: <Sun className="w-4 h-4 text-amber-500" />, color: 'amber' },
    { key: 'afternoon', title: t.timeSlotAfternoon, icon: <CloudSun className="w-4 h-4 text-orange-500" />, color: 'orange' },
    { key: 'evening', title: t.timeSlotEvening, icon: <Sunset className="w-4 h-4 text-rose-500" />, color: 'rose' },
    { key: 'night', title: t.timeSlotNight, icon: <Moon className="w-4 h-4 text-indigo-500" />, color: 'indigo' },
  ];

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {t.timetableTitle}
          </h2>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {completedCount} / {totalCount} {language === 'mr' ? 'कार्ये पूर्ण' : 'tasks done'} ({progressPercent}%)
            </span>
            <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.loadTemplate}</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            title={t.resetTimetable}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'mr' ? 'रीसेट' : 'Reset'}</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addTask}</span>
          </button>
        </div>
      </div>

      {/* Time Slots Sections */}
      <div className="space-y-5">
        {slots.map(slot => {
          const slotTasks = tasks.filter(task => task.timeSlot === slot.key);

          return (
            <div key={slot.key} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {slot.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {slot.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {slotTasks.filter(t => t.completed).length}/{slotTasks.length}
                </span>
              </div>

              {slotTasks.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                  {language === 'mr' ? 'या सत्रात कोणतेही कार्य नाही.' : 'No tasks scheduled in this slot.'}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {slotTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleToggle(task.id)}
                      className={`group flex items-start justify-between gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                        task.completed
                          ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                          : 'bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => {}}
                          className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs sm:text-sm font-semibold block leading-tight ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                            {language === 'mr' && task.titleMr ? task.titleMr : task.title}
                          </span>
                          <div className="flex items-center flex-wrap gap-2 mt-1.5">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {task.subject}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.estimatedMinutes} min
                            </span>
                            {task.priority === 'high' && (
                              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded">
                                {t.priorityHigh}
                              </span>
                            )}
                            {task.completedAt && (
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDelete(task.id, e)}
                        className="opacity-60 hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <h3 className="text-base font-bold mb-4">{t.addTask}</h3>
            
            <form onSubmit={handleAddTask} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.taskTitle}</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. पंचायत राज ७३ वी घटनादुरुस्ती वाचन' : 'e.g. Read Fundamental Rights Art 14-19'}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-indigo-500 font-normal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.taskSubject}</label>
                  <select
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value="Polity">Polity (राज्यघटना)</option>
                    <option value="History">History (इतिहास)</option>
                    <option value="Geography">Geography (भूगोल)</option>
                    <option value="Economy">Economy (अर्थव्यवस्था)</option>
                    <option value="Science">General Science (विज्ञान)</option>
                    <option value="CSAT">CSAT (बुद्धिमत्ता व अंकगणित)</option>
                    <option value="Current Affairs">Current Affairs (चालू घडामोडी)</option>
                    <option value="Marathi">Marathi Grammar (मराठी)</option>
                    <option value="Revision">Revision (उजळणी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value as TaskTimeSlot)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value="morning">{t.timeSlotMorning}</option>
                    <option value="afternoon">{t.timeSlotAfternoon}</option>
                    <option value="evening">{t.timeSlotEvening}</option>
                    <option value="night">{t.timeSlotNight}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.taskEstimatedMinutes}</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    step="5"
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.taskPriority}</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value="high">{t.priorityHigh}</option>
                    <option value="medium">{t.priorityMedium}</option>
                    <option value="low">{t.priorityLow}</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition cursor-pointer"
                >
                  {t.addTask}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pre-made Templates Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <h3 className="text-base font-bold mb-1.5">{t.loadTemplate}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {language === 'mr' 
                ? 'अभ्यास सुरू करण्यासाठी खालीलपैकी एक सिद्ध नमुना वेळापत्रक निवडा:' 
                : 'Select an MPSC expert-designed schedule to load instantly:'}
            </p>

            <div className="space-y-3">
              <div 
                onClick={() => handleLoadTemplate('fullTime')}
                className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 hover:border-indigo-500 cursor-pointer transition active:scale-98"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-indigo-900 dark:text-indigo-200">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t.templateFullTime}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {language === 'mr' 
                    ? 'सकाळचे चालू घडामोडी, जीएस १ व २ सखोल वाचन, दुपारचे CSAT आणि रात्री ५० प्रश्न सराव.' 
                    : 'Balanced 8-10 hour routine covering Core GS, CSAT, Newspaper, and 50 MCQs.'}
                </p>
              </div>

              <div 
                onClick={() => handleLoadTemplate('working')}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-500 cursor-pointer transition active:scale-98"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>{t.templateWorking}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {language === 'mr' 
                    ? 'पहाटेचा १.५ तास सखोल अभ्यास, दुपारच्या ब्रेकमध्ये प्रश्न सराव व रात्री १.५ तास उजळणी.' 
                    : 'Targeted 3-4 hours for working aspirants: Early morning deep work + evening drill.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
