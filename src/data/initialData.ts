import { NoteItem, Achievement, UserProfile } from '../types';

export const initialNotes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Short Trick: सह्याद्रीतील उत्तरेकडून दक्षिणेकडील घाट क्रम',
    content: 'ट्रिक: "थळ बोर वरंधा कुंभार्ली आंबा आंबोली"\n१. थळ घाट (कसारा): मुंबई - नाशिक\n२. बोर घाट: मुंबई - पुणे\n३. वरंधा घाट: भोर - महाड\n४. कुंभार्ली घाट: कराड - चिपळूण\n५. आंबा घाट: कोल्हापूर - रत्नागिरी\n६. आंबोली घाट: सावंतवाडी - बेळगाव',
    subject: 'Geography',
    tags: ['Geography', 'Trick', 'Passes'],
    isBookmarked: true,
    color: 'emerald',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionStage: 2,
    completedRevisions: 2,
  },
  {
    id: 'note-2',
    title: 'Key Constitutional Articles for MPSC Prelims (Must Revise)',
    content: '• Art 14: Equality before law\n• Art 19: Six Freedoms (Speech, Assembly, Association, Movement, Residence, Profession)\n• Art 21: Protection of life and personal liberty\n• Art 32: Constitutional Remedies (Heart & Soul of Constitution - Dr. Ambedkar)\n• Art 40: Organization of Village Panchayats\n• Art 213: Governor Ordinance power\n• Art 280: Finance Commission\n• Art 315: Public Service Commissions (UPSC & MPSC)',
    subject: 'Polity',
    tags: ['Polity', 'Articles', 'High Yield'],
    isBookmarked: true,
    color: 'indigo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionStage: 1,
    completedRevisions: 1,
  },
  {
    id: 'note-3',
    title: 'Mahatma Jyotirao Phule - Major Books & Milestones',
    content: '• १८४८: भिडे वाडा, पुणे येथे पहिली मुलींची शाळा\n• १८५५: ‘तृतीयरत्न’ हे पहिले नाटक\n• १८६९: ‘छत्रपती शिवाजीराजे भोसले यांचा पोवाडा’\n• १८७३: सत्यशोधक समाज स्थापना & ‘गुलामगिरी’ ग्रंथ प्रसिद्ध\n• १८८३: ‘शेतकऱ्यांचा असूड’\n• १८८८: मुंबईच्या जनतेतर्फे ‘महात्मा’ ही पदवी बहाल\n• १८९१: ‘सार्वजनिक सत्यधर्म पुस्तक’ (मरणोत्तर प्रकाशित)',
    subject: 'History',
    tags: ['History', 'Social Reformers', 'Phule'],
    isBookmarked: true,
    color: 'amber',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionStage: 3,
    completedRevisions: 3,
  },
];

export const motivationalQuotes = [
  {
    quoteEn: '“Be educated, be organized and be agitated.”',
    quoteMr: '“शिका, संघटित व्हा आणि संघर्ष करा!”',
    authorEn: 'Dr. B. R. Ambedkar',
    authorMr: 'डॉ. बाबासाहेब आंबेडकर',
  },
  {
    quoteEn: '“Never bend your head, always hold it high. Look the world straight in the eye.”',
    quoteMr: '“कधीही झुकू नका, मान नेहमी अभिमानाने उंच ठेवा. संकटांचा थेट नजरेला नजर भिडवून सामना करा.”',
    authorEn: 'Chhatrapati Shivaji Maharaj',
    authorMr: 'छत्रपती शिवाजी महाराज',
  },
  {
    quoteEn: '“Arise, awake, and stop not till the goal is reached.”',
    quoteMr: '“उठा, जागे व्हा आणि ध्येय सिद्धी झाल्याशिवाय थांबू नका!”',
    authorEn: 'Swami Vivekananda',
    authorMr: 'स्वामी विवेकानंद',
  },
  {
    quoteEn: '“Knowledge is the greatest power in the world. Educate yourself to liberate society.”',
    quoteMr: '“विद्येविना मती गेली, मतीविना नीती गेली, नीतीविना गती गेली! विद्येचे महत्त्व ओळखा.”',
    authorEn: 'Mahatma Jyotirao Phule',
    authorMr: 'महात्मा ज्योतिराव फुले',
  },
  {
    quoteEn: '“Small aims are a crime; have great aim.”',
    quoteMr: '“लहान स्वप्ने पाहणे हा गुन्हा आहे; नेहमी महान ध्येय बाळगा.”',
    authorEn: 'Dr. A. P. J. Abdul Kalam',
    authorMr: 'डॉ. ए. पी. जे. अब्दुल कलाम',
  },
];

export const defaultAchievements: Achievement[] = [
  {
    id: 'first_mcq',
    titleEn: 'First Step to Officer',
    titleMr: 'पहिला पाऊल',
    descEn: 'Solved your first MPSC practice question',
    descMr: 'पहिला सराव प्रश्न यशस्वीरित्या सोडवला',
    icon: 'Target',
    unlockedAt: new Date().toISOString(),
  },
  {
    id: 'streak_3',
    titleEn: 'Consistent Warrior (3-Day Streak)',
    titleMr: 'अखंड सातत्य (३ दिवस)',
    descEn: 'Studied consistently for 3 continuous days',
    descMr: 'सलग ३ दिवस अभ्यास पूर्ण केला',
    icon: 'Flame',
    unlockedAt: null,
  },
  {
    id: 'streak_7',
    titleEn: 'MPSC Champion (7-Day Streak)',
    titleMr: 'निश्चयी अभ्यासक (७ दिवस)',
    descEn: 'Completed a 7-day unbroken study streak',
    descMr: 'सलग ७ दिवसांची अभ्यासाची साखळी पूर्ण केली',
    icon: 'Award',
    unlockedAt: null,
  },
  {
    id: 'syllabus_25',
    titleEn: 'Quarter Milestone',
    titleMr: '२५% अभ्यासक्रम पूर्ण',
    descEn: 'Marked 25% of MPSC syllabus topics as completed',
    descMr: 'अभ्यासक्रमातील २५% घटक पूर्ण केले',
    icon: 'BookOpen',
    unlockedAt: null,
  },
  {
    id: 'perfect_accuracy',
    titleEn: 'Sharpshooter',
    titleMr: 'अचूकता मास्टर',
    descEn: 'Achieved 80%+ accuracy in a 10+ question test drill',
    descMr: 'चाचणीत ८०% पेक्षा जास्त अचूकता मिळवली',
    icon: 'CheckCircle2',
    unlockedAt: null,
  },
  {
    id: 'notes_master',
    titleEn: 'Revision Architect',
    titleMr: 'उजळणी शिल्पकार',
    descEn: 'Created 5+ notes and saved to revision vault',
    descMr: '५ पेक्षा जास्त महत्त्वाच्या नोंदी साठवल्या',
    icon: 'Bookmark',
    unlockedAt: null,
  },
];

export const defaultUserProfile: UserProfile = {
  name: 'MPSC Aspirant',
  targetExam: 'combine_b_c',
  targetExamTitle: 'MPSC Combined Group B & C Prelims',
  targetExamDate: '2026-11-29T09:00:00.000Z',
  targetPost: 'Dy. Collector / PSI / STI / ASO',
  dailyGoalMinutes: 240, // 4 hours
  dailyGoalMCQs: 30,
  streak: 1,
  lastStudiedDate: new Date().toISOString().split('T')[0],
  streakHistory: [new Date().toISOString().split('T')[0]],
  soundEnabled: true,
  language: 'mr', // Default Marathi for user convenience!
};
