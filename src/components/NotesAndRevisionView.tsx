import React, { useState } from 'react';
import { 
  Bookmark, 
  Plus, 
  Search, 
  Trash2, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  RotateCw, 
  FileText, 
  BookmarkCheck,
  Tag,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NoteItem, Language, MCQQuestion } from '../types';
import { translations } from '../translations';
import { soundManager } from '../utils/sound';

interface Props {
  language: Language;
  notes: NoteItem[];
  bookmarkedQuestions: MCQQuestion[];
  onNotesChange: (notes: NoteItem[]) => void;
  onRemoveBookmarkMCQ: (questionId: string) => void;
}

export const NotesAndRevisionView: React.FC<Props> = ({
  language,
  notes,
  bookmarkedQuestions,
  onNotesChange,
  onRemoveBookmarkMCQ,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'notes' | 'revision' | 'bookmarks'>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // New Note Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteSubject, setNoteSubject] = useState('Polity');
  const [noteColor, setNoteColor] = useState('indigo');

  // Filter notes
  const filteredNotes = notes.filter(n => {
    if (selectedSubject !== 'all' && n.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchTag = n.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchTag) return false;
    }
    return true;
  });

  // Revision stage intervals in days: 1, 3, 7, 15, 30
  const revisionIntervals = [1, 3, 7, 15, 30];

  // Mark note as revised today
  const handleMarkRevised = (noteId: string) => {
    soundManager.playSuccess();
    const today = new Date();

    const updated = notes.map(n => {
      if (n.id === noteId) {
        const nextStage = Math.min(n.revisionStage + 1, revisionIntervals.length - 1);
        const daysToAdd = revisionIntervals[nextStage];
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + daysToAdd);

        return {
          ...n,
          revisionStage: nextStage,
          completedRevisions: (n.completedRevisions || 0) + 1,
          lastRevisedDate: today.toISOString().split('T')[0],
          nextRevisionDate: nextDate.toISOString().split('T')[0],
        };
      }
      return n;
    });

    onNotesChange(updated);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  // Delete note
  const handleDeleteNote = (noteId: string) => {
    if (confirm(language === 'mr' ? 'ही नोंद हटवायची आहे का?' : 'Delete this note?')) {
      soundManager.playClick();
      onNotesChange(notes.filter(n => n.id !== noteId));
    }
  };

  // Add new note
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    soundManager.playSuccess();
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: noteTitle.trim(),
      content: noteContent.trim(),
      subject: noteSubject,
      tags: [noteSubject, 'MPSC'],
      isBookmarked: true,
      color: noteColor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      revisionStage: 0,
      completedRevisions: 0,
      nextRevisionDate: new Date().toISOString().split('T')[0],
    };

    onNotesChange([newNote, ...notes]);
    setIsAddModalOpen(false);
    setNoteTitle('');
    setNoteContent('');
  };

  // Helper for color card borders & accents
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20';
      case 'amber':
        return 'border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20';
      case 'rose':
        return 'border-rose-200 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20';
      default:
        return 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20';
    }
  };

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Tab Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t.notesTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.notesSubtitle}
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addNewNote}</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-1.5 px-3 rounded-lg transition cursor-pointer ${activeTab === 'notes' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t.tabQuickNotes} ({notes.length})
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`py-1.5 px-3 rounded-lg transition cursor-pointer ${activeTab === 'revision' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t.tabRevisionVault}
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`py-1.5 px-3 rounded-lg transition cursor-pointer ${activeTab === 'bookmarks' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t.tabBookmarks} ({bookmarkedQuestions.length})
            </button>
          </div>

          {/* Search bar */}
          {activeTab === 'notes' && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'नोंदी शोधा...' : 'Search notes & tricks...'}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-indigo-500 w-full sm:w-56"
              />
            </div>
          )}
        </div>
      </div>

      {/* Tab 1: Notes Cards */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 text-center">
              <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500">{language === 'mr' ? 'कोणतीही नोंद सापडली नाही. नवीन नोंद तयार करा!' : 'No notes found. Create your first note!'}</p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${getColorClasses(note.color)}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/50">
                      {note.subject}
                    </span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                      title={t.deleteNote}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-2">
                    {note.title}
                  </h3>

                  <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-normal">
                    {note.content}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3 h-3 text-indigo-500" />
                    <span>{note.completedRevisions || 0} {language === 'mr' ? 'वेळा उजळणी' : 'revisions'}</span>
                  </span>

                  <button
                    onClick={() => handleMarkRevised(note.id)}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'उजळणी पूर्ण' : 'Revise'}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Spaced Revision Vault */}
      {activeTab === 'revision' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">
                {language === 'mr' ? 'वैज्ञानिक स्पॅस्ड रिव्हिजन पद्धत:' : 'Scientific Spaced Repetition:'}
              </strong>
              <span>
                {language === 'mr'
                  ? 'अभ्यास केलेले मुद्दे १ दिवस, ३ दिवस, ७ दिवस आणि १५ दिवसांनी उजळणी केल्यास कायमस्वरूपी स्मरणात राहतात.'
                  : 'Revising high-yield topics at 1-day, 3-day, 7-day, and 15-day intervals converts short-term knowledge into permanent recall.'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {notes.map(note => {
              const stage = note.revisionStage || 0;
              const nextDays = revisionIntervals[stage] || 30;

              return (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                        {note.subject}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        Stage {stage + 1} / {revisionIntervals.length}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {note.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Stage dots */}
                    <div className="flex items-center gap-1">
                      {revisionIntervals.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i <= stage ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => handleMarkRevised(note.id)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.markRevised}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Bookmarked MCQs */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedQuestions.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 text-center">
              <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500">
                {language === 'mr' ? 'कोणतेही प्रश्न बुकमार्क केलेले नाहीत. सराव करताना महत्त्वाचे प्रश्न बुकमार्क करा!' : 'No questions bookmarked yet. Bookmark tricky questions during practice!'}
              </p>
            </div>
          ) : (
            bookmarkedQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {q.subject.toUpperCase()} #{idx + 1}
                  </span>
                  <button
                    onClick={() => onRemoveBookmarkMCQ(q.id)}
                    className="text-xs text-rose-500 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'बुकमार्क काढा' : 'Remove'}</span>
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                  {language === 'mr' ? q.questionMr : q.questionEn}
                </h4>

                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-200 block mb-1">
                    {language === 'mr' ? 'योग्य उत्तर:' : 'Correct Answer:'} {language === 'mr' ? q.optionsMr[q.correctIndex] : q.optionsEn[q.correctIndex]}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {language === 'mr' ? q.explanationMr : q.explanationEn}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Note Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <h3 className="text-base font-bold mb-3">{t.addNewNote}</h3>

            <form onSubmit={handleSaveNote} className="space-y-3.5 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.noteTitle}</label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. मूलभूत कर्तव्ये - कलम ५१अ ट्रिक' : 'e.g. Fundamental Duties Art 51A Trick'}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal focus:outline-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Subject</label>
                  <select
                    value={noteSubject}
                    onChange={(e) => setNoteSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value="Polity">Polity (राज्यघटना)</option>
                    <option value="History">History (इतिहास)</option>
                    <option value="Geography">Geography (भूगोल)</option>
                    <option value="Economy">Economy (अर्थव्यवस्था)</option>
                    <option value="Science">Science (विज्ञान)</option>
                    <option value="CSAT">CSAT (बुद्धिमत्ता)</option>
                    <option value="Marathi">Marathi Grammar (मराठी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Theme Accent</label>
                  <select
                    value={noteColor}
                    onChange={(e) => setNoteColor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-normal"
                  >
                    <option value="indigo">Indigo (Classic)</option>
                    <option value="emerald">Emerald (Green)</option>
                    <option value="amber">Amber (Golden)</option>
                    <option value="rose">Rose (Red)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.noteContent}</label>
                <textarea
                  required
                  rows={4}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder={language === 'mr' ? 'येथे महत्त्वाचे मुद्दे, सांख्यिकी, किंवा स्मरण युक्त्या लिहा...' : 'Write formulas, articles, mnemonics or high-yield data...'}
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
                  {t.saveNote}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
