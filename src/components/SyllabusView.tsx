import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  BookOpen, 
  Scale, 
  Compass, 
  TrendingUp, 
  Atom, 
  Cpu, 
  Languages, 
  Newspaper, 
  RotateCcw,
  Sparkles,
  FileText
} from 'lucide-react';
import { SyllabusSubject, SyllabusTopic, TopicStatus, ExamStream, Language } from '../types';
import { translations } from '../translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  syllabus: SyllabusSubject[];
  onSyllabusChange: (updated: SyllabusSubject[]) => void;
}

export const SyllabusView: React.FC<Props> = ({ language, syllabus, onSyllabusChange }) => {
  const t = translations[language];

  const [activeStream, setActiveStream] = useState<ExamStream | 'all'>('all');
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    polity: true,
    history: true,
  });
  const [editingTopicNotesId, setEditingTopicNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  // Add custom topic modal state
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [targetSubjectId, setTargetSubjectId] = useState('polity');
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicDetails, setNewTopicDetails] = useState('');

  // Toggle subject accordion
  const toggleSubject = (subjectId: string) => {
    soundManager.playClick();
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  // Change topic status cyclically:
  // not_started -> in_progress -> completed -> revised_1 -> revised_2 -> not_started
  const cycleStatus = (subjectId: string, topicId: string) => {
    const statusCycle: TopicStatus[] = ['not_started', 'in_progress', 'completed', 'revised_1', 'revised_2'];

    const updated = syllabus.map(subj => {
      if (subj.id === subjectId) {
        const newTopics = subj.topics.map(top => {
          if (top.id === topicId) {
            const currentIdx = statusCycle.indexOf(top.status);
            const nextStatus = statusCycle[(currentIdx + 1) % statusCycle.length];
            if (nextStatus === 'completed' || nextStatus === 'revised_1' || nextStatus === 'revised_2') {
              soundManager.playSuccess();
            } else {
              soundManager.playClick();
            }
            return {
              ...top,
              status: nextStatus,
              lastRevised: (nextStatus === 'revised_1' || nextStatus === 'revised_2') ? new Date().toISOString() : top.lastRevised,
            };
          }
          return top;
        });
        return { ...subj, topics: newTopics };
      }
      return subj;
    });

    onSyllabusChange(updated);
  };

  // Save topic note
  const handleSaveNotes = (subjectId: string, topicId: string) => {
    const updated = syllabus.map(subj => {
      if (subj.id === subjectId) {
        const newTopics = subj.topics.map(top => {
          if (top.id === topicId) {
            return { ...top, notes: notesText };
          }
          return top;
        });
        return { ...subj, topics: newTopics };
      }
      return subj;
    });
    onSyllabusChange(updated);
    setEditingTopicNotesId(null);
    soundManager.playClick();
  };

  // Add custom sub-topic
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    const newTopic: SyllabusTopic = {
      id: `top-custom-${Date.now()}`,
      subjectId: targetSubjectId,
      nameEn: newTopicName.trim(),
      nameMr: newTopicName.trim(),
      detailsEn: newTopicDetails.trim(),
      detailsMr: newTopicDetails.trim(),
      status: 'not_started',
      isCustom: true,
    };

    const updated = syllabus.map(subj => {
      if (subj.id === targetSubjectId) {
        return { ...subj, topics: [...subj.topics, newTopic] };
      }
      return subj;
    });

    onSyllabusChange(updated);
    setNewTopicName('');
    setNewTopicDetails('');
    setIsAddTopicModalOpen(false);
    soundManager.playSuccess();
  };

  // Icon mapping helper
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return <Scale className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Atom': return <Atom className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Languages': return <Languages className="w-5 h-5" />;
      case 'Newspaper': return <Newspaper className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: TopicStatus) => {
    switch (status) {
      case 'not_started':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
            <Circle className="w-3 h-3" />
            {t.statusNotStarted}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {t.statusInProgress}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3" />
            {t.statusCompleted}
          </span>
        );
      case 'revised_1':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3 h-3" />
            {t.statusRevised1}
          </span>
        );
      case 'revised_2':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3 h-3" />
            {t.statusRevised2}
          </span>
        );
    }
  };

  // Filtered subjects
  const filteredSubjects = syllabus.filter(subj => {
    if (activeStream === 'all') return true;
    if (activeStream === 'rajyaseva') return subj.stream === 'rajyaseva' || subj.stream === 'both';
    if (activeStream === 'combine_b_c') return subj.stream === 'combine_b_c' || subj.stream === 'both';
    return true;
  });

  // Overall calculation
  let totalAll = 0;
  let completedAll = 0;
  filteredSubjects.forEach(s => {
    s.topics.forEach(t => {
      totalAll++;
      if (t.status === 'completed' || t.status === 'revised_1' || t.status === 'revised_2') {
        completedAll++;
      }
    });
  });
  const overallPercent = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-300">
      
      {/* Header & Overall Progress */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t.syllabusTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.syllabusSubtitle}
            </p>
          </div>

          <button
            onClick={() => setIsAddTopicModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addCustomTopic}</span>
          </button>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span>{t.overallProgress}</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{overallPercent}% ({completedAll}/{totalAll})</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 text-xs font-semibold">
          <button
            onClick={() => setActiveStream('all')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${activeStream === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setActiveStream('combine_b_c')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${activeStream === 'combine_b_c' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
          >
            {t.filterCombine}
          </button>
          <button
            onClick={() => setActiveStream('rajyaseva')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${activeStream === 'rajyaseva' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
          >
            {t.filterRajyaseva}
          </button>
        </div>
      </div>

      {/* Subject Accordions */}
      <div className="space-y-4">
        {filteredSubjects.map(subject => {
          const completedCount = subject.topics.filter(tp => 
            tp.status === 'completed' || tp.status === 'revised_1' || tp.status === 'revised_2'
          ).length;
          const subjectPercent = Math.round((completedCount / subject.topics.length) * 100);
          const isExpanded = !!expandedSubjects[subject.id];

          return (
            <div
              key={subject.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              {/* Subject Header Bar */}
              <div
                onClick={() => toggleSubject(subject.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    {getSubjectIcon(subject.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {language === 'mr' ? subject.titleMr : subject.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-slate-400">
                        {completedCount}/{subject.topics.length} {t.subjectTotal} ({subjectPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mini radial or pill percentage */}
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${subjectPercent === 100 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                    {subjectPercent}%
                  </span>
                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1">
                <div
                  className="bg-indigo-600 h-1 transition-all duration-300"
                  style={{ width: `${subjectPercent}%` }}
                />
              </div>

              {/* Topics List */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-3 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
                  {subject.topics.map(topic => (
                    <div
                      key={topic.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {language === 'mr' ? topic.nameMr : topic.nameEn}
                          </h4>

                          {(topic.detailsMr || topic.detailsEn) && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              {language === 'mr' ? topic.detailsMr : topic.detailsEn}
                            </p>
                          )}

                          {topic.notes && (
                            <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200">
                              <span className="font-semibold block text-[10px] uppercase text-amber-600">
                                {language === 'mr' ? 'माझ्या नोंदी:' : 'My Notes:'}
                              </span>
                              {topic.notes}
                            </div>
                          )}
                        </div>

                        {/* Interactive Status Cycler Button */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <button
                            onClick={() => cycleStatus(subject.id, topic.id)}
                            className="cursor-pointer transition active:scale-95"
                            title={language === 'mr' ? 'स्थिती बदलण्यासाठी क्लिक करा' : 'Click to cycle status'}
                          >
                            {getStatusBadge(topic.status)}
                          </button>

                          <button
                            onClick={() => {
                              setEditingTopicNotesId(topic.id);
                              setNotesText(topic.notes || '');
                            }}
                            className="text-[11px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>{topic.notes ? (language === 'mr' ? 'संपादित करा' : 'Edit note') : (language === 'mr' ? 'नोंद जोडा' : 'Add note')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Notes edit drawer */}
                      {editingTopicNotesId === topic.id && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
                          <textarea
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            placeholder={t.topicNotesPlaceholder}
                            rows={3}
                            className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                          />
                          <div className="flex items-center justify-end gap-2 mt-2">
                            <button
                              onClick={() => setEditingTopicNotesId(null)}
                              className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              {t.cancel}
                            </button>
                            <button
                              onClick={() => handleSaveNotes(subject.id, topic.id)}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white cursor-pointer"
                            >
                              {t.save}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Topic Modal */}
      {isAddTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <h3 className="text-base font-bold mb-3">{t.addCustomTopic}</h3>

            <form onSubmit={handleAddTopic} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Select Subject</label>
                <select
                  value={targetSubjectId}
                  onChange={(e) => setTargetSubjectId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                >
                  {syllabus.map(s => (
                    <option key={s.id} value={s.id}>
                      {language === 'mr' ? s.titleMr : s.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Topic Name</label>
                <input
                  type="text"
                  required
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. महसूल प्रशासन व तलाठी अधिकार' : 'e.g. Revenue Administration & Powers'}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Key Sub-points / Details</label>
                <textarea
                  value={newTopicDetails}
                  onChange={(e) => setNewTopicDetails(e.target.value)}
                  placeholder={language === 'mr' ? 'महत्त्वाचे कायदे, संदर्भ पुस्तके किंवा कलम तपशील...' : 'Key articles, reference books, core concepts...'}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal focus:outline-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTopicModalOpen(false)}
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
