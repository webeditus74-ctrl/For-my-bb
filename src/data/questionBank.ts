import { MCQQuestion } from '../types';

/**
 * Centralized MPSC MCQ Question Bank
 * Each question has a unique, persistent ID.
 * Organized by Subject, Topic, Difficulty, and Exam Stream (Category).
 * Real verified questions reflecting official MPSC State Services (Rajyaseva) & Combined (Group B & C) standards.
 */
export const centralizedQuestionBank: MCQQuestion[] = [
  // ==========================================
  // 1. INDIAN POLITY & GOVERNANCE (राज्यघटना व शासन)
  // ==========================================
  {
    id: 'mpsc-pol-01',
    subject: 'polity',
    topic: 'State Executive',
    stream: 'both',
    questionEn: 'Under which article of the Indian Constitution is the Governor empowered to promulgate Ordinances during the recess of the State Legislature?',
    questionMr: 'भारतीय राज्यघटनेच्या कोणत्या कलमानुसार राज्यपालांना राज्य विधिमंडळाचे अधिवेशन चालू नसताना वटहुकूम (Ordinance) काढण्याचा अधिकार आहे?',
    optionsEn: [
      'Article 123',
      'Article 213',
      'Article 163',
      'Article 200'
    ],
    optionsMr: [
      'कलम १२३',
      'कलम २१३',
      'कलम १६३',
      'कलम २००'
    ],
    correctIndex: 1, // Article 213
    explanationEn: 'Article 213 gives the Governor the power to promulgate ordinances when the state legislature is not in session. Article 123 confers similar power to the President at the Union level.',
    explanationMr: 'कलम २१३ नुसार राज्यपालांना राज्य विधिमंडळाचे अधिवेशन सुरू नसताना वटहुकूम काढण्याचा अधिकार आहे. (टीप: कलम १२३ हे राष्ट्रपतींच्या वटहुकूम अधिकाराशी संबंधित आहे).',
    difficulty: 'easy',
    tags: ['Governor', 'Ordinance', 'Constitution'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-02',
    subject: 'polity',
    topic: 'Panchayati Raj',
    stream: 'both',
    questionEn: 'Which Constitutional Amendment Act granted Constitutional status and protection to the Panchayati Raj institutions under Part IX of the Constitution?',
    questionMr: 'कोणत्या घटनादुरुस्ती कायद्यान्वये पंचायत राज संस्थांना भाग ९ अंतर्गत घटनात्मक दर्जा आणि संरक्षण देण्यात आले?',
    optionsEn: [
      '71st Constitutional Amendment Act, 1992',
      '73rd Constitutional Amendment Act, 1992',
      '74th Constitutional Amendment Act, 1992',
      '86th Constitutional Amendment Act, 2002'
    ],
    optionsMr: [
      '७१ वी घटनादुरुस्ती कायदा, १९९२',
      '७३ वी घटनादुरुस्ती कायदा, १९९२',
      '७४ वी घटनादुरुस्ती कायदा, १९९२',
      '८६ वी घटनादुरुस्ती कायदा, २००२'
    ],
    correctIndex: 1, // 73rd
    explanationEn: 'The 73rd Constitutional Amendment Act of 1992 added Part IX and the 11th Schedule containing 29 functional items to the Constitution for rural local governance (Panchayati Raj).',
    explanationMr: '७३ व्या घटनादुरुस्ती कायदा, १९९२ अन्वये राज्यघटनेत ‘भाग ९’ आणि ‘११ वी अनुसूची’ समाविष्ट करून पंचायत राज संस्थांना घटनात्मक दर्जा प्रदान करण्यात आला, ज्यामध्ये २९ विषयांचा समावेश आहे.',
    difficulty: 'easy',
    tags: ['Panchayati Raj', '73rd Amendment'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-03',
    subject: 'polity',
    topic: 'Fundamental Rights & Writs',
    stream: 'both',
    questionEn: 'Which writ is issued by the High Court or Supreme Court to quash the order already passed by an inferior court or tribunal in excess of jurisdiction?',
    questionMr: 'कनिष्ठ न्यायालयाने अथवा न्यायाधिकरणाने आपल्या अधिकार क्षेत्राबाहेर जाऊन दिलेला आदेश रद्दबातल (Quash) करण्यासाठी उच्च किंवा सर्वोच्च न्यायालयातर्फे कोणता प्राधिकृत आदेश (Writ) काढला जातो?',
    optionsEn: [
      'Mandamus (परमादेश)',
      'Certiorari (उत्प्रेषण)',
      'Prohibition (प्रतिषेध)',
      'Quo-Warranto (अधिकार पृच्छा)'
    ],
    optionsMr: [
      'परमादेश (Mandamus)',
      'उत्प्रेषण (Certiorari)',
      'प्रतिषेध (Prohibition)',
      'अधिकार पृच्छा (Quo-Warranto)'
    ],
    correctIndex: 1, // Certiorari
    explanationEn: 'Certiorari is corrective in nature. It is issued to quash an order already passed by an inferior court or tribunal that acted without jurisdiction or in excess of jurisdiction. Prohibition is preventive (issued before final order).',
    explanationMr: '‘उत्प्रेषण’ (Certiorari) ही उपचारात्मक स्वरूपाची याचिका असते. कनिष्ठ न्यायालयाने दिलेल्या चुकीच्या अथवा अधिकार क्षेत्राबाहेरील अंतिम निर्णयाला रद्दबातल करण्यासाठी हा आदेश दिला जातो.',
    difficulty: 'medium',
    tags: ['Fundamental Rights', 'Writs', 'Article 32 & 226'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-04',
    subject: 'polity',
    topic: 'Constitutional Bodies',
    stream: 'both',
    questionEn: 'Under which Article of the Constitution of India is the Election Commission of India established?',
    questionMr: 'भारतीय राज्यघटनेच्या कोणत्या कलमान्वये ‘भारतीय निवडणूक आयोगाची’ (Election Commission of India) तरतूद करण्यात आली आहे?',
    optionsEn: [
      'Article 315',
      'Article 324',
      'Article 280',
      'Article 352'
    ],
    optionsMr: [
      'कलम ३१५',
      'कलम ३२४',
      'कलम २८०',
      'कलम ३५२'
    ],
    correctIndex: 1, // 324
    explanationEn: 'Article 324 provides for the superintendence, direction, and control of elections to Parliament, State Legislatures, and the offices of President and Vice-President to be vested in the Election Commission.',
    explanationMr: 'कलम ३२४ अन्वये संसद, राज्य विधिमंडळे, राष्ट्रपती व उपराष्ट्रपती यांच्या निवडणुकांचे संचालन, दिशा व नियंत्रण यासाठी स्वतंत्र निवडणूक आयोगाची स्थापना करण्यात आली आहे.',
    difficulty: 'easy',
    tags: ['Election Commission', 'Constitutional Bodies'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-05',
    subject: 'polity',
    topic: 'Directive Principles',
    stream: 'both',
    questionEn: 'Which Article of the Directive Principles of State Policy directs the State to take steps to organize Village Panchayats as units of self-government?',
    questionMr: 'मार्गदर्शक तत्त्वांपैकी कोणत्या कलमात ग्रामपंचायतींचे संघटन करून त्यांना स्वशासनाचे घटक म्हणून कार्य करण्यास सक्षम करण्याचे निर्देश दिले आहेत?',
    optionsEn: [
      'Article 39A',
      'Article 40',
      'Article 44',
      'Article 48'
    ],
    optionsMr: [
      'कलम ३९-अ',
      'कलम ४०',
      'कलम ४४',
      'कलम ४८'
    ],
    correctIndex: 1, // 40
    explanationEn: 'Article 40 (Gandhian Principle) states that the State shall take steps to organize village panchayats and endow them with powers and authority necessary to enable them to function as units of self-government.',
    explanationMr: 'कलम ४० हे गांधीवादी तत्त्व असून त्यानुसार राज्याने ग्रामपंचायतींचे संघटन करावे व त्यांना स्थानिक स्वशासनाची एकके म्हणून अधिकार द्यावेत असे नमूद केले आहे.',
    difficulty: 'easy',
    tags: ['DPSP', 'Village Panchayat', 'Article 40'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-06',
    subject: 'polity',
    topic: 'Judiciary',
    stream: 'both',
    questionEn: 'How many permanent benches does the Bombay High Court have outside its principal seat in Mumbai?',
    questionMr: 'मुंबई उच्च न्यायालयाची मुंबई या मुख्य पीठाव्यतिरिक्त एकूण किती कायमस्वरूपी खंडपीठे (Benches) आहेत?',
    optionsEn: [
      'Two (Nagpur & Aurangabad/Chhatrapati Sambhajinagar)',
      'Three (Nagpur, Aurangabad/Chhatrapati Sambhajinagar, and Panaji)',
      'Four (Nagpur, Aurangabad, Panaji, and Kolhapur)',
      'One (Only Nagpur)'
    ],
    optionsMr: [
      'दोन (नागपूर व औरंगाबाद)',
      'तीन (नागपूर, छत्रपती संभाजीनगर व पणजी)',
      'चार (नागपूर, औरंगाबाद, पणजी व कोल्हापूर)',
      'केवळ एक (नागपूर)'
    ],
    correctIndex: 1, // Three
    explanationEn: 'The Bombay High Court has its principal seat in Mumbai and three permanent benches at Nagpur, Chhatrapati Sambhajinagar (Aurangabad), and Panaji (Goa). It has jurisdiction over Maharashtra, Goa, Dadra & Nagar Haveli and Daman & Diu.',
    explanationMr: 'मुंबई उच्च न्यायालयाची मुंबई व्यतिरिक्त नागपूर, छत्रपती संभाजीनगर आणि गोवा राज्यातील पणजी अशी तीन अधिकृत खंडपीठे आहेत.',
    difficulty: 'medium',
    tags: ['Bombay High Court', 'Judiciary', 'Maharashtra'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-07',
    subject: 'polity',
    topic: 'Fundamental Duties',
    stream: 'both',
    questionEn: 'By which Constitutional Amendment were Fundamental Duties incorporated into Part IV-A (Article 51A) on the recommendation of the Swaran Singh Committee?',
    questionMr: 'स्वर्णसिंग समितीच्या शिफारशीनुसार कोणत्या घटनादुरुस्तीने भारतीय राज्यघटनेत भाग ४-अ (कलम ५१-अ) द्वारे मूलभूत कर्तव्यांचा समावेश करण्यात आला?',
    optionsEn: [
      '42nd Constitutional Amendment Act, 1976',
      '44th Constitutional Amendment Act, 1978',
      '52nd Constitutional Amendment Act, 1985',
      '86th Constitutional Amendment Act, 2002'
    ],
    optionsMr: [
      '४२ वी घटनादुरुस्ती कायदा, १९७६',
      '४४ वी घटनादुरुस्ती कायदा, १९७८',
      '५२ वी घटनादुरुस्ती कायदा, १९८५',
      '८६ वी घटनादुरुस्ती कायदा, २००२'
    ],
    correctIndex: 0, // 42nd
    explanationEn: 'The 42nd Amendment (1976) added 10 Fundamental Duties upon the recommendation of the Swaran Singh Committee. The 11th duty was added by the 86th Amendment in 2002.',
    explanationMr: '४२ व्या घटनादुरुस्तीने (१९७६) स्वर्णसिंग समितीच्या शिफारशीवरून १० मूलभूत कर्तव्ये समाविष्ट केली. त्यानंतर ८६ व्या घटनादुरुस्तीने (२००२) ११ वे कर्तव्य जोडले गेले.',
    difficulty: 'easy',
    tags: ['Fundamental Duties', '42nd Amendment', 'Article 51A'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-08',
    subject: 'polity',
    topic: 'Constitutional Bodies',
    stream: 'both',
    questionEn: 'Under Article 280 of the Constitution, who appoints the Finance Commission of India every five years?',
    questionMr: 'राज्यघटनेच्या कलम २८० नुसार दर पाच वर्षांनी केंद्रीय वित्त आयोगाची (Finance Commission) नियुक्ती कोणाद्वारे केली जाते?',
    optionsEn: [
      'Prime Minister of India',
      'President of India',
      'Speaker of the Lok Sabha',
      'Union Finance Minister'
    ],
    optionsMr: [
      'भारताचे पंतप्रधान',
      'भारताचे राष्ट्रपती',
      'लोकसभा अध्यक्ष',
      'केंद्रीय अर्थमंत्री'
    ],
    correctIndex: 1, // President
    explanationEn: 'Article 280 mandates that the President shall constitute a Finance Commission consisting of a Chairman and four other members every fifth year or earlier.',
    explanationMr: 'कलम २८० नुसार भारताचे राष्ट्रपती दर पाच वर्षांनी किंवा आवश्यकतेनुसार त्यापूर्वी एक अध्यक्ष व चार सदस्य असलेल्या वित्त आयोगाची स्थापना करतात.',
    difficulty: 'easy',
    tags: ['Finance Commission', 'Article 280', 'President'],
    isSample: true,
  },

  // ==========================================
  // 2. MAHARASHTRA & MODERN INDIAN HISTORY (इतिहास)
  // ==========================================
  {
    id: 'mpsc-hist-01',
    subject: 'history',
    topic: 'Social Reformers',
    stream: 'both',
    questionEn: 'On 24th September 1873, Mahatma Jyotirao Phule founded the Satyashodhak Samaj at Pune. What was its primary motto?',
    questionMr: '२४ सप्टेंबर १८७३ रोजी महात्मा ज्योतिराव फुले यांनी पुण्यात सत्यशोधक समाजाची स्थापना केली. त्याचे मुख्य ब्रीदवाक्य कोणते होते?',
    optionsEn: [
      '"Karmanye Vadhikaraste Ma Phaleshu Kadachana"',
      '"Sarva Sakshi Jagatpati, Tyasi Nakocha Madhyasthi" (सर्वसाक्षी जगत्पती, त्यासी नकोच मध्यस्थी)',
      '"Satyam Vada, Dharmam Chara"',
      '"Shikshan he Dudh ahe Waghiniche"'
    ],
    optionsMr: [
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
      'सर्वसाक्षी जगत्पती, त्यासी नकोच मध्यस्थी',
      'सत्यं वद, धर्मं चर',
      'विद्या हे वाघिणीचे दूध आहे'
    ],
    correctIndex: 1, // Sarva Sakshi Jagatpati
    explanationEn: 'Satyashodhak Samaj was founded by Mahatma Phule on 24 Sept 1873 with the motto "सर्वसाक्षी जगत्पती, त्यासी नकोच मध्यस्थी" (God is the witness of all, there is no need for any intermediary or priest between human and God).',
    explanationMr: 'सत्यशोधक समाजाची स्थापना २४ सप्टेंबर १८७३ रोजी महात्मा फुले यांनी केली. "सर्वसाक्षी जगत्पती, त्यासी नकोच मध्यस्थी" हे या समाजाचे ब्रीदवाक्य होते, ज्याने ईश्वर व मानवामधील पुरोहितांची मध्यस्थी नाकारली.',
    difficulty: 'easy',
    tags: ['Social Reformers', 'Mahatma Phule', 'Satyashodhak Samaj'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-02',
    subject: 'history',
    topic: 'Social Reformers',
    stream: 'both',
    questionEn: 'In 1902, Chhatrapati Rajarshi Shahu Maharaj made a historic declaration providing what percentage of reservation in Kolhapur princely state administration for backward classes?',
    questionMr: '१९०२ मध्ये छत्रपती राजर्षी शाहू महाराजांनी कोल्हापूर संस्थानातील प्रशासनात मागासवर्गीयांसाठी किती टक्के आरक्षणाची ऐतिहासिक घोषणा केली होती?',
    optionsEn: [
      '25%',
      '33%',
      '50%',
      '60%'
    ],
    optionsMr: [
      '२५%',
      '३३%',
      '५०%',
      '६०%'
    ],
    correctIndex: 2, // 50%
    explanationEn: 'On 26th July 1902, Rajarshi Shahu Maharaj issued a gazette notification granting 50% reservations for backward classes in state administration and education in Kolhapur, earning him the title of the Father of Indian Affirmative Action.',
    explanationMr: '२६ जुलै १९०२ रोजी राजर्षी शाहू महाराजांनी कोल्हापूर संस्थानात मागासलेल्या व बहुजन घटकांसाठी ५०% आरक्षणाची ऐतिहासिक घोषणा केली. म्हणूनच २६ जुलै हा दिवस महाराष्ट्रात ‘सामाजिक न्याय दिन’ म्हणून साजरा केला जातो.',
    difficulty: 'medium',
    tags: ['Shahu Maharaj', 'Social Reformers', 'Reservations'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-03',
    subject: 'history',
    topic: 'Samyukta Maharashtra',
    stream: 'both',
    questionEn: 'Who presided over the historic Belgaum Maharashtra Sahitya Sammelan in 1946 where the first formal resolution for "Samyukta Maharashtra" was passed?',
    questionMr: '१९४६ च्या बेळगाव येथील महाराष्ट्र साहित्य संमेलनात संयुक्त महाराष्ट्राचा ऐतिहासिक ठराव संमत झाला, त्या संमेलनाचे अध्यक्ष कोण होते?',
    optionsEn: [
      'Acharya P. K. Atre',
      'G. T. Madkholkar',
      'Senapati Bapat',
      'Shankarrao Deo'
    ],
    optionsMr: [
      'आचार्य प्र. के. अत्रे',
      'ग. त्र्यं. माडखोलकर',
      'सेनापती बापट',
      'शंकरराव देव'
    ],
    correctIndex: 1, // G. T. Madkholkar
    explanationEn: 'The 1946 Belgaum Maharashtra Sahitya Sammelan was presided over by prominent journalist and writer G. T. Madkholkar, where the historic resolution demanding an undivided Maharashtra with Mumbai was unanimously passed.',
    explanationMr: '१९४६ मध्ये बेळगाव येथे भरलेल्या महाराष्ट्र साहित्य संमेलनाचे अध्यक्ष ग. त्र्यं. माडखोलकर होते. या संमेलनात संयुक्त महाराष्ट्राची मागणी करणारा अधिकृत ठराव एकमुखाने मंजूर करण्यात आला होता.',
    difficulty: 'hard',
    tags: ['Samyukta Maharashtra', 'Literature', 'Modern Maharashtra'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-04',
    subject: 'history',
    topic: '1857 Revolt in Maharashtra',
    stream: 'both',
    questionEn: 'During the 1857 Revolt, who organized the underground uprising in Satara to restore the Chhatrapati Pratapsingh throne?',
    questionMr: '१८५७ च्या उठावादरम्यान सातारा छत्रपतींच्या गादीच्या पुनर्स्थापनेसाठी ब्रिटिशांविरुद्ध गुप्त कट कोणी रचला होता?',
    optionsEn: [
      'Rango Bapuji Gupte',
      'Babasaheb Bhave of Nargund',
      'Chimasaheb of Kolhapur',
      'Bhagoji Naik'
    ],
    optionsMr: [
      'रंगो बापूजी गुप्ते',
      'नरगुंदचे बाबासाहेब भावे',
      'कोल्हापूरचे चिमासाहेब',
      'भागोजी नाईक'
    ],
    correctIndex: 0, // Rango Bapuji Gupte
    explanationEn: 'Rango Bapuji Gupte traveled to London for 14 years to plead for Chhatrapati Pratapsingh. Returning empty-handed, he actively organized an armed revolt in Satara and Kolhapur in 1857.',
    explanationMr: 'रंगो बापूजी गुप्ते यांनी छत्रपती प्रतापसिंहांचे राज्य परत मिळवण्यासाठी लंडनमध्ये दीर्घ लढा दिला व परत आल्यावर १८५७ मध्ये सातारा भागात सशस्त्र उठावाची योजना आखली.',
    difficulty: 'medium',
    tags: ['1857 Revolt', 'Satara', 'Rango Bapuji'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-05',
    subject: 'history',
    topic: 'National Movement',
    stream: 'both',
    questionEn: 'During the 1942 Quit India Movement, who established the famous parallel government (Prati Sarkar) in Satara district?',
    questionMr: '१९४२ च्या ‘भारत छोडो’ आंदोलनादरम्यान सातारा जिल्ह्यात प्रसिद्ध ‘प्रति सरकार’ (क्रांतिसिंह नाना पाटील यांच्या नेतृत्वाखाली) कोणाद्वारे स्थापन करण्यात आले?',
    optionsEn: [
      'Krantisinh Nana Patil',
      'Senapati Bapat',
      'Sane Guruji',
      'Achutrao Patwardhan'
    ],
    optionsMr: [
      'क्रांतिसिंह नाना पाटील',
      'सेनापती बापट',
      'साने गुरुजी',
      'अच्युतराव पटवर्धन'
    ],
    correctIndex: 0, // Krantisinh Nana Patil
    explanationEn: 'Krantisinh Nana Patil and GD Bapu Lad spearheaded the Satara Prati Sarkar (parallel government) in 1942, establishing volunteer corps (Toofan Sena), village courts (Nyayadan Mandals), and market regulations.',
    explanationMr: 'क्रांतिसिंह नाना पाटील यांच्या नेतृत्वाखाली १९४२ च्या आंदोलनात साताऱ्यात ‘प्रति सरकार’ चालवले गेले, ज्याने तुफान सेनेच्या माध्यमातून ब्रिटिश सत्तेला उघड आव्हान दिले.',
    difficulty: 'easy',
    tags: ['Quit India', 'Satara Prati Sarkar', 'Nana Patil'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-06',
    subject: 'history',
    topic: 'Social Reformers',
    stream: 'both',
    questionEn: 'Dr. B. R. Ambedkar launched which historic satyagraha on 20th March 1927 for public drinking water rights at Mahad?',
    questionMr: 'डॉ. बाबासाहेब आंबेडकरांनी २० मार्च १९२७ रोजी सार्वजनिक पाणवठ्यावर पिण्याच्या पाण्याचा हक्क मिळवण्यासाठी कोणता ऐतिहासिक सत्याग्रह केला?',
    optionsEn: [
      'Kalaram Temple Satyagraha',
      'Chavadar Tale Satyagraha, Mahad',
      'Parvati Temple Satyagraha',
      'Mukhed Satyagraha'
    ],
    optionsMr: [
      'काळाराम मंदिर सत्याग्रह',
      'महाडचा चवदार तळे सत्याग्रह',
      'पार्वती मंदिर सत्याग्रह',
      'मुखेड सत्याग्रह'
    ],
    correctIndex: 1, // Mahad
    explanationEn: 'The Mahad Satyagraha took place on 20 March 1927 at Chavadar Tale. Hence, 20th March is commemorated as Social Empowerment Day (सामाजिक सबलीकरण दिन).',
    explanationMr: '२० मार्च १९२७ रोजी महाड येथील चवदार तळ्यावर डॉ. बाबासाहेब आंबेडकरांनी अस्पृश्यांना पाण्याचा मानवी हक्क मिळवून देण्यासाठी सत्याग्रह केला. हा दिवस ‘सामाजिक सक्षमीकरण दिन’ म्हणून साजरा केला जातो.',
    difficulty: 'easy',
    tags: ['Dr. Ambedkar', 'Mahad Satyagraha', 'Social Equality'],
    isSample: true,
  },

  // ==========================================
  // 3. MAHARASHTRA & INDIAN GEOGRAPHY (भूगोल)
  // ==========================================
  {
    id: 'mpsc-geo-01',
    subject: 'geography',
    topic: 'Sahyadri Passes',
    stream: 'both',
    questionEn: 'Which mountain pass (Ghat) connects Mumbai to Nashik through the Western Ghats (Sahyadri)?',
    questionMr: 'खालीलपैकी कोणता घाट मुंबई ते नाशिक या मार्गावर सह्याद्री पर्वतात स्थित आहे?',
    optionsEn: [
      'Bhor Ghat (बोर घाट)',
      'Thal Ghat / Kasara Ghat (थळ घाट / कसारा घाट)',
      'Varandha Ghat (वरंधा घाट)',
      'Amba Ghat (आंबा घाट)'
    ],
    optionsMr: [
      'बोर घाट (Bhor Ghat)',
      'थळ घाट / कसारा घाट (Thal Ghat)',
      'वरंधा घाट (Varandha Ghat)',
      'आंबा घाट (Amba Ghat)'
    ],
    correctIndex: 1, // Thal Ghat
    explanationEn: 'Thal Ghat (Kasara Ghat) connects Mumbai to Nashik. Bhor Ghat connects Mumbai to Pune. Varandha Ghat connects Bhor to Mahad. Amba Ghat connects Kolhapur to Ratnagiri.',
    explanationMr: 'मुंबई ते नाशिक दरम्यान ‘थळ घाट’ (कसारा घाट) आहे. मुंबई ते पुणे दरम्यान ‘बोर घाट’, कोल्हापूर ते रत्नागिरी दरम्यान ‘आंबा घाट’ आणि भोर ते महाड दरम्यान ‘वरंधा घाट’ आहे.',
    difficulty: 'easy',
    tags: ['Sahyadri', 'Passes', 'Maharashtra Geography'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-02',
    subject: 'geography',
    topic: 'Mountain Peaks',
    stream: 'both',
    questionEn: 'What is the highest mountain peak in Maharashtra, situated in the Kalsubai Harishchandragad Wildlife Sanctuary?',
    questionMr: 'महाराष्ट्रातील सर्वोच्च पर्वतशिखर कोणते असून त्याची उंची किती आहे?',
    optionsEn: [
      'Salher - 1,567 m',
      'Mahabaleshwar - 1,438 m',
      'Kalsubai - 1,646 m',
      'Torna - 1,405 m'
    ],
    optionsMr: [
      'साल्हेर - १५६७ मीटर',
      'महाबळेश्वर - १४३८ मीटर',
      'कळसुबाई - १६४६ मीटर',
      'तोरणा - १४०५ मीटर'
    ],
    correctIndex: 2, // Kalsubai 1646m
    explanationEn: 'Mount Kalsubai in the Akole taluka of Ahmednagar district is the highest point in Maharashtra at an elevation of 1,646 metres (5,400 ft). Salher (1,567 m) in Nashik is the second highest.',
    explanationMr: 'महाराष्ट्रातील सर्वोच्च शिखर ‘कळसुबाई’ असून त्याची उंची १६४६ मीटर आहे. हे शिखर अहमदनगर जिल्ह्यातील अकोले तालुक्यात आहे. दुसऱ्या क्रमांकाचे शिखर साल्हेर (१५६७ मी) आहे.',
    difficulty: 'easy',
    tags: ['Peaks', 'Physical Geography', 'Maharashtra'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-03',
    subject: 'geography',
    topic: 'Minerals',
    stream: 'both',
    questionEn: 'Which district in Maharashtra has the highest deposits and production of Manganese ore in the state?',
    questionMr: 'महाराष्ट्रात मॅंगनीज खनिजाचे सर्वाधिक साठे व उत्पादन प्रामुख्याने कोणत्या जिल्ह्यात आढळतात?',
    optionsEn: [
      'Ratnagiri & Sindhudurg',
      'Bhandara & Gondia',
      'Kolhapur & Sangli',
      'Solapur & Osmanabad'
    ],
    optionsMr: [
      'रत्नागिरी व सिंधुदुर्ग',
      'भंडारा व गोंदिया',
      'कोल्हापूर व सांगली',
      'सोलापूर व उस्मानाबाद'
    ],
    correctIndex: 1, // Bhandara & Gondia
    explanationEn: 'Bhandara and Gondia (along with Nagpur) contain the prime high-grade manganese ore deposits in Maharashtra. MOIL operates mines in this belt.',
    explanationMr: 'महाराष्ट्रात मॅंगनीजचे सर्वाधिक उच्च प्रतीचे साठे भंडारा आणि गोंदिया (तसेच नागपूर) जिल्ह्यात आहेत. या भागात मॉइल (MOIL) ही भारत सरकारची कंपनी खाणकाम करते.',
    difficulty: 'medium',
    tags: ['Minerals', 'Manganese', 'Maharashtra Economy'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-04',
    subject: 'geography',
    topic: 'River Drainage Systems',
    stream: 'both',
    questionEn: 'At which place in Maharashtra does the Godavari River originate?',
    questionMr: 'महाराष्ट्राची जीवनदायिनी असलेली गोदावरी नदी कोणत्या ठिकाणी उगम पावते?',
    optionsEn: [
      'Mahabaleshwar (Satara)',
      'Trimbakeshwar (Nashik)',
      'Bhimashankar (Pune)',
      'Multai (Betul)'
    ],
    optionsMr: [
      'महाबळेश्वर (सातारा)',
      'त्र्यंबकेश्वर (नाशिक)',
      'भीमाशंकर (पुणे)',
      'मुलताई (म.प्र.)'
    ],
    correctIndex: 1, // Trimbakeshwar
    explanationEn: 'The Godavari River originates at Brahmagiri near Trimbakeshwar in Nashik district of Maharashtra and flows eastwards into the Bay of Bengal.',
    explanationMr: 'गोदावरी नदीचा उगम नाशिक जिल्ह्यातील त्र्यंबकेश्वर येथील ब्रह्मगिरी पर्वतावर होतो. ही महाराष्ट्रातील सर्वाधिक लांबीची नदी आहे.',
    difficulty: 'easy',
    tags: ['Godavari', 'Rivers', 'Trimbakeshwar'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-05',
    subject: 'geography',
    topic: 'Soils of Maharashtra',
    stream: 'both',
    questionEn: 'Which soil type, formed from the weathering of Deccan basalt rock, covers the largest area in Maharashtra and is ideal for cotton cultivation?',
    questionMr: 'दख्खनच्या बेसाल्ट खडकाच्या विदारणातून तयार झालेली आणि कापसाच्या पिकासाठी अत्यंत उपयुक्त अशी कोणती मृदा महाराष्ट्रात सर्वाधिक आढळते?',
    optionsEn: [
      'Laterite Soil (जांभी मृदा)',
      'Regur / Black Cotton Soil (रेगूर / काळी कापसाची मृदा)',
      'Alluvial Soil (गाळाची मृदा)',
      'Red and Yellow Soil (तांबडी मृदा)'
    ],
    optionsMr: [
      'जांभी मृदा',
      'रेगूर / काळी कापसाची मृदा',
      'गाळाची मृदा',
      'तांबडी-पिवळसर मृदा'
    ],
    correctIndex: 1, // Regur
    explanationEn: 'Regur soil (Black Cotton Soil) covers nearly 80% of Maharashtra’s land. It is rich in calcium carbonate, magnesium, potash and lime with high moisture-retention capacity.',
    explanationMr: 'महाराष्ट्राच्या एकूण क्षेत्रापैकी बहुतांश भूभागावर बेसाल्टपासून तयार झालेली काळी कापसाची रेगूर मृदा आढळते. हिची पाणी धरून ठेवण्याची क्षमता उत्कृष्ट असते.',
    difficulty: 'easy',
    tags: ['Soils', 'Regur', 'Basalt'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-06',
    subject: 'geography',
    topic: 'Demography & Census 2011',
    stream: 'both',
    questionEn: 'According to the 2011 Census of India, what was the official literacy rate of Maharashtra?',
    questionMr: 'भारताच्या जनगणना २०११ च्या आकडेवारीनुसार महाराष्ट्राचा साक्षरता दर (Literacy Rate) किती टक्के होता?',
    optionsEn: [
      '74.04%',
      '82.34%',
      '86.50%',
      '93.91%'
    ],
    optionsMr: [
      '७४.०४%',
      '८२.३४%',
      '८६.५०%',
      '९३.९१%'
    ],
    correctIndex: 1, // 82.34%
    explanationEn: 'According to Census 2011, Maharashtra’s literacy rate was 82.34% (Male: 88.38%, Female: 75.87%). The national average was 74.04%.',
    explanationMr: 'जनगणना २०११ नुसार महाराष्ट्राचा साक्षरता दर ८२.३४% होता (पुरुष: ८८.३८%, महिला: ७५.८७%). भारताचा सरासरी साक्षरता दर ७४.०४% होता.',
    difficulty: 'medium',
    tags: ['Census 2011', 'Demography', 'Literacy'],
    isSample: true,
  },

  // ==========================================
  // 4. INDIAN ECONOMY & PLANNING (अर्थव्यवस्था)
  // ==========================================
  {
    id: 'mpsc-eco-01',
    subject: 'economy',
    topic: 'Poverty & Committees',
    stream: 'both',
    questionEn: 'According to the Suresh Tendulkar Committee recommendations (2009), which approach was used to determine the official Poverty Line in India?',
    questionMr: 'सुरेश तेंडुलकर समितीच्या (२००९) शिफारशीनुसार भारतातील दारिद्र्यरेषा निश्चित करण्यासाठी कोणत्या पद्धतीचा वापर करण्यात आला?',
    optionsEn: [
      'Only minimum Calorie intake (2400 rural / 2100 urban)',
      'Monthly Per Capita Consumption Expenditure (MPCE) including Education and Health',
      'Annual agricultural landholding size',
      'Gold asset holdings per household'
    ],
    optionsMr: [
      'केवळ किमान उष्मांक (कॅलरी) प्रमाण (ग्रामीण २४०० / शहरी २१००)',
      'मासिक दरडोई उपभोग खर्च (MPCE), ज्यामध्ये शिक्षण व आरोग्यावरील खर्चाचा समावेश',
      'कुटुंबाकडील शेतजमिनीचे क्षेत्रफळ',
      'कुटुंबाकडील सोन्याची मालमत्ता'
    ],
    correctIndex: 1, // MPCE with edu and health
    explanationEn: 'The Tendulkar Committee moved away from purely calorie-anchored poverty lines to Monthly Per Capita Consumption Expenditure (MPCE), factoring in private expenditure on health and education.',
    explanationMr: 'तेंडुलकर समितीने केवळ उष्मांक (कॅलरी) मोजण्याच्या जुन्या पद्धतीऐवजी ‘मासिक दरडोई उपभोग खर्च’ (MPCE) ही पद्धत स्वीकारली आणि त्यात आरोग्य व शिक्षणावरील खर्चाचा समावेश केला.',
    difficulty: 'medium',
    tags: ['Poverty', 'Tendulkar Committee', 'Indian Economy'],
    isSample: true,
  },
  {
    id: 'mpsc-eco-02',
    subject: 'economy',
    topic: 'Monetary Policy & RBI',
    stream: 'both',
    questionEn: 'What happens to the money supply in the Indian economy when the Reserve Bank of India (RBI) decreases the Cash Reserve Ratio (CRR)?',
    questionMr: 'जेव्हा भारतीय रिझर्व्ह बँक (RBI) रोख राखीव प्रमाण (CRR) कमी करते, तेव्हा अर्थव्यवस्थेतील पतपुरवठ्यावर (Money Supply) काय परिणाम होतो?',
    optionsEn: [
      'Money supply decreases sharply',
      'Money supply increases as commercial banks have more lendable funds',
      'Money supply remains unaffected',
      'Commercial banks are forced to shut down lending'
    ],
    optionsMr: [
      'अर्थव्यवस्थेतील पतपुरवठा मोठ्या प्रमाणात घटतो',
      'पतपुरवठा वाढतो, कारण व्यापारी बँकांकडे कर्ज देण्यासाठी जास्त निधी उपलब्ध होतो',
      'पतपुरवठ्यावर कोणताही परिणाम होत नाही',
      'व्यापारी बँकांना कर्ज देणे बंद करावे लागते'
    ],
    correctIndex: 1, // Money supply increases
    explanationEn: 'Decreasing CRR leaves commercial banks with a higher proportion of their net demand and time liabilities (NDTL) to lend out into the economy, thereby boosting money supply and liquidity.',
    explanationMr: 'CRR चे प्रमाण कमी केल्यास व्यापारी बँकांना रिझर्व्ह बँकेकडे कमी रोख रक्कम ठेवावी लागते, ज्यामुळे बँकांकडे बाजारात कर्ज देण्यासाठी अधिक निधी उपलब्ध होतो व बाजारात तरलता/पतपुरवठा वाढतो.',
    difficulty: 'medium',
    tags: ['RBI', 'Monetary Policy', 'CRR'],
    isSample: true,
  },
  {
    id: 'mpsc-eco-03',
    subject: 'economy',
    topic: 'Planning & NITI Aayog',
    stream: 'both',
    questionEn: 'On which date was NITI Aayog (National Institution for Transforming India) officially established, replacing the Planning Commission?',
    questionMr: 'नियोजन मंडळाच्या जागी ‘नीति आयोगाची’ (NITI Aayog) अधिकृत स्थापना कोणत्या तारखेला करण्यात आली?',
    optionsEn: [
      '15th August 2014',
      '1st January 2015',
      '1st April 2015',
      '26th January 2016'
    ],
    optionsMr: [
      '१५ ऑगस्ट २०१४',
      '१ जानेवारी २०१५',
      '१ एप्रिल २०१५',
      '२६ जानेवारी २०१६'
    ],
    correctIndex: 1, // 1 Jan 2015
    explanationEn: 'NITI Aayog was established via a Union Cabinet resolution on 1st January 2015, replacing the 65-year-old Planning Commission of India. The Prime Minister is its ex-officio Chairman.',
    explanationMr: '१ जानेवारी २०१५ रोजी केंद्रीय मंत्रिमंडळाच्या ठरावाद्वारे नियोजन आयोग बरखास्त करून ‘नीति आयोगाची’ स्थापना करण्यात आली. भारताचे पंतप्रधान हे नीति आयोगाचे पदसिद्ध अध्यक्ष असतात.',
    difficulty: 'easy',
    tags: ['NITI Aayog', 'Planning', 'Economy'],
    isSample: true,
  },
  {
    id: 'mpsc-eco-04',
    subject: 'economy',
    topic: 'Taxation & GST',
    stream: 'both',
    questionEn: 'Under which Article of the Constitution was the Goods and Services Tax (GST) Council constituted?',
    questionMr: 'कोणत्या घटनात्मक कलमान्वये ‘वस्तू आणि सेवा कर परिषदेची’ (GST Council) स्थापना करण्यात आली?',
    optionsEn: [
      'Article 246A',
      'Article 269A',
      'Article 279A',
      'Article 280'
    ],
    optionsMr: [
      'कलम २४६-अ',
      'कलम २६९-अ',
      'कलम २७९-अ',
      'कलम २८०'
    ],
    correctIndex: 2, // Article 279A
    explanationEn: 'The 101st Constitutional Amendment Act, 2016 inserted Article 279A, empowering the President to constitute the GST Council, chaired by the Union Finance Minister.',
    explanationMr: '१०१ व्या घटनादुरुस्ती कायदा, २०१६ अन्वये राज्यघटनेत कलम २७९-अ समाविष्ट करून राष्ट्रपतींना जीएसटी परिषद स्थापन करण्याचा अधिकार देण्यात आला. केंद्रीय अर्थमंत्री या परिषदेचे अध्यक्ष असतात.',
    difficulty: 'medium',
    tags: ['GST Council', 'Article 279A', 'Taxation'],
    isSample: true,
  },

  // ==========================================
  // 5. GENERAL SCIENCE & TECHNOLOGY (विज्ञान)
  // ==========================================
  {
    id: 'mpsc-sci-01',
    subject: 'science',
    topic: 'Physics - Optics',
    stream: 'both',
    questionEn: 'Which optical phenomenon is primarily responsible for the sparkling brilliance of a cut diamond?',
    questionMr: 'पैलू पाडलेला हिरा लखलखीत चमकण्यासाठी प्रामुख्याने कोणती प्रकाशीय घटना कारणीभूत असते?',
    optionsEn: [
      'Total Internal Reflection (पूर्ण अंतर्गत परावर्तन)',
      'Dispersion of light (प्रकाशाचे अपस्करण)',
      'Diffraction of light (प्रकाशाचे विवर्तन)',
      'Polarization of light (प्रकाशाचे ध्रुवीकरण)'
    ],
    optionsMr: [
      'पूर्ण अंतर्गत परावर्तन (Total Internal Reflection)',
      'प्रकाशाचे अपस्करण (Dispersion)',
      'प्रकाशाचे विवर्तन (Diffraction)',
      'प्रकाशाचे ध्रुवीकरण (Polarization)'
    ],
    correctIndex: 0, // Total Internal Reflection
    explanationEn: 'The critical angle for diamond-air interface is very small (~24.4°). Once light enters the diamond, it suffers multiple total internal reflections before exiting, creating dazzling brilliance.',
    explanationMr: 'हिऱ्याचा क्रांतिक कोन (Critical angle) अत्यंत कमी (सुमारे २४.४ अंश) असतो. त्यामुळे हिऱ्यात प्रवेश केलेला प्रकाश बाहेर पडण्यापूर्वी त्याचे आत अनेकदा ‘पूर्ण अंतर्गत परावर्तन’ होते व हिरा चमकतो.',
    difficulty: 'easy',
    tags: ['Physics', 'Optics', 'Light'],
    isSample: true,
  },
  {
    id: 'mpsc-sci-02',
    subject: 'science',
    topic: 'Biology - Vitamins',
    stream: 'both',
    questionEn: 'Which vitamin is synthesized in the human skin upon exposure to solar ultraviolet-B (UVB) rays?',
    questionMr: 'सूर्याच्या अतिनील किरणांच्या (UVB) संपर्कात आल्यावर मानवी त्वचेमध्ये कोणत्या जीवनसत्त्वाची निर्मिती होते?',
    optionsEn: [
      'Vitamin A (Retinol)',
      'Vitamin C (Ascorbic Acid)',
      'Vitamin D (Cholecalciferol)',
      'Vitamin K (Phylloquinone)'
    ],
    optionsMr: [
      'जीवनसत्त्व ‘अ’ (रेटिनॉल)',
      'जीवनसत्त्व ‘क’ (एस्कॉर्बिक आम्ल)',
      'जीवनसत्त्व ‘ड’ (कोलकेल्सिफेरॉल)',
      'जीवनसत्त्व ‘के’ (फायलोक्विनोन)'
    ],
    correctIndex: 2, // Vitamin D
    explanationEn: 'Exposure to sunlight causes the 7-dehydrocholesterol compound in the skin to convert into pre-vitamin D3, which then becomes Vitamin D3 (Cholecalciferol). Deficiency leads to Rickets in children and Osteomalacia in adults.',
    explanationMr: 'सूर्यप्रकाशातील अतिनील किरणांमुळे त्वचेतील कोलेस्टेरॉलपासून ‘जीवनसत्त्व ड’ तयार होते. याच्या अभावामुळे लहान मुलांमध्ये मुडदूस (Rickets) आणि प्रौढांमध्ये अस्थिमृदुता (Osteomalacia) हा आजार होतो.',
    difficulty: 'easy',
    tags: ['Biology', 'Vitamins', 'Health'],
    isSample: true,
  },
  {
    id: 'mpsc-sci-03',
    subject: 'science',
    topic: 'Chemistry - Acids & Bases',
    stream: 'both',
    questionEn: 'What is the pH value of pure water at 25°C, representing a completely neutral solution?',
    questionMr: '२५ अंश सेल्सिअस तापमानाला शुद्ध पाण्याचे सामू (pH) मूल्य किती असते, जे उदासीन द्रावण दर्शवते?',
    optionsEn: [
      'pH = 0',
      'pH = 7',
      'pH = 14',
      'pH = 5.6'
    ],
    optionsMr: [
      'pH = ०',
      'pH = ७',
      'pH = १४',
      'pH = ५.६'
    ],
    correctIndex: 1, // pH = 7
    explanationEn: 'On the pH scale (0 to 14), a pH of 7 represents a neutral solution where concentration of H+ equals OH-. Values below 7 are acidic, while values above 7 are basic.',
    explanationMr: 'pH मोजपट्टीवर (० ते १४) ७ हे मूल्य उदासीन (Neutral) द्रावण दर्शवते. ७ पेक्षा कमी सामू आम्लधर्मी आणि ७ पेक्षा जास्त सामू आम्लारीधर्मी असतो.',
    difficulty: 'easy',
    tags: ['Chemistry', 'pH Scale', 'Acids'],
    isSample: true,
  },
  {
    id: 'mpsc-sci-04',
    subject: 'science',
    topic: 'Space Technology',
    stream: 'both',
    questionEn: 'On 23rd August 2023, ISRO’s Chandrayaan-3 lander module (Vikram) successfully touched down on which celestial region, leading to National Space Day designation?',
    questionMr: '२३ ऑगस्ट २०२३ रोजी इस्रोच्या चांद्रयान-३ मोहिमेच्या विक्रम लँडरने चंद्राच्या कोणत्या भागावर ऐतिहासिक यशस्वी सॉफ्ट लँडिंग केले?',
    optionsEn: [
      'Lunar Equator (विषुववृत्त भाग)',
      'Lunar South Pole region (चंद्राचा दक्षिण ध्रुव भाग)',
      'Sea of Tranquility',
      'Lunar North Pole'
    ],
    optionsMr: [
      'चंद्राचे विषुववृत्त',
      'चंद्राचा दक्षिण ध्रुव परिसर',
      'शांततेचा समुद्र (Sea of Tranquility)',
      'चंद्राचा उत्तर ध्रुव'
    ],
    correctIndex: 1, // South Pole
    explanationEn: 'India became the first nation in history to land a spacecraft near the lunar south pole region on 23rd August 2023. The landing spot was named "Shiv Shakti Point", and 23 August was declared National Space Day.',
    explanationMr: 'भारताने चंद्राच्या दक्षिण ध्रुवावर यशस्वी लँडिंग करणारा पहिला देश होण्याचा जागतिक विक्रम केला. या जागेला ‘शिवशक्ती पॉईंट’ नाव दिले गेले व २३ ऑगस्ट हा ‘राष्ट्रीय अंतराळ दिन’ घोषित झाला.',
    difficulty: 'easy',
    tags: ['Space Tech', 'Chandrayaan 3', 'ISRO'],
    isSample: true,
  },

  // ==========================================
  // 6. CURRENT AFFAIRS & SCHEMES (चालू घडामोडी)
  // ==========================================
  {
    id: 'mpsc-ca-01',
    subject: 'current_affairs',
    topic: 'Maharashtra Schemes',
    stream: 'both',
    questionEn: 'Under the "Mukhyamantri Majhi Ladki Bahin Yojana" launched by the Government of Maharashtra, what monthly financial assistance is directly credited to eligible women?',
    questionMr: 'महाराष्ट्र शासनाने सुरू केलेल्या ‘मुख्यमंत्री माझी लाडकी बहीण योजने’ अंतर्गत पात्र महिलांच्या बँक खात्यात दरमहा किती रुपयांची आर्थिक मदत थेट जमा केली जाते?',
    optionsEn: [
      '₹1,000 per month',
      '₹1,500 per month',
      '₹2,000 per month',
      '₹2,500 per month'
    ],
    optionsMr: [
      '₹१,००० प्रतिमहिना',
      '₹१,५०० प्रतिमहिना',
      '₹२,००० प्रतिमहिना',
      '₹२,५०० प्रतिमहिना'
    ],
    correctIndex: 1, // ₹1,500
    explanationEn: 'The Maharashtra state government provides ₹1,500 per month directly into the Aadhaar-linked bank accounts of eligible women aged 21 to 65 years whose family annual income is below ₹2.5 Lakhs.',
    explanationMr: 'महाराष्ट्र शासनाच्या मुख्यमंत्री माझी लाडकी बहीण योजनेअंतर्गत २१ ते ६५ वयोगटातील पात्र महिलांना दरमहा ₹१,५०० ची थेट आर्थिक मदत बँक खात्यात दिली जाते (कौटुंबिक उत्पन्न मर्यादा ₹२.५ लाख).',
    difficulty: 'easy',
    tags: ['Maharashtra Schemes', 'Current Affairs', 'Women Welfare'],
    isSample: true,
  },
  {
    id: 'mpsc-ca-02',
    subject: 'current_affairs',
    topic: 'World Heritage & Culture',
    stream: 'both',
    questionEn: 'In 2024, which UNESCO World Heritage nomination from Maharashtra was officially submitted under the category "Maratha Military Landscapes of India"?',
    questionMr: 'भारताकडून २०२४-२५ वर्षासाठी युनेस्को (UNESCO) जागतिक वारसा नामांकनासाठी सादर करण्यात आलेल्या ‘मराठा लष्करी भूप्रदेश’ (Maratha Military Landscapes) मध्ये महाराष्ट्रातील किती ऐतिहासिक किल्ल्यांचा समावेश आहे?',
    optionsEn: [
      '7 Forts',
      '11 Forts (along with Gingee in Tamil Nadu = total 12)',
      '15 Forts',
      '21 Forts'
    ],
    optionsMr: [
      '७ किल्ले',
      'महाराष्ट्रातील ११ किल्ले (व तामिळनाडूतील जिंजी = एकूण १२)',
      '१५ किल्ले',
      '२१ किल्ले'
    ],
    correctIndex: 1, // 11 in MH + Gingee in TN = 12
    explanationEn: 'The "Maratha Military Landscapes of India" comprises 12 components: 11 forts in Maharashtra (Salher, Shivneri, Lohagad, Khanderi, Raigad, Rajgad, Pratapgad, Suvarnadurg, Panhala, Vijaydurg, Sindhudurg) and Gingee Fort in Tamil Nadu.',
    explanationMr: '‘मराठा लष्करी भूप्रदेश’ या नामांकनात १२ घटकांचा समावेश आहे: महाराष्ट्रातील ११ किल्ले (साल्हेर, शिवनेरी, लोहगड, खांदेरी, रायगड, राजगड, प्रतापगड, सुवर्णदुर्ग, पन्हाळा, विजयदुर्ग, सिंधुदुर्ग) आणि तामिळनाडूतील जिंजी किल्ला.',
    difficulty: 'medium',
    tags: ['UNESCO', 'Current Affairs', 'Maratha History'],
    isSample: true,
  },
  {
    id: 'mpsc-ca-03',
    subject: 'current_affairs',
    topic: 'Awards & Honors',
    stream: 'both',
    questionEn: 'In 2024, who was conferred the prestigious Maharashtra Bhushan Award, the highest civilian award of the state government?',
    questionMr: 'महाराष्ट्र शासनाचा सर्वोच्च नागरी पुरस्कार ‘महाराष्ट्र भूषण’ २०२३-२४ साठी कोणाला प्रदान करण्यात आला?',
    optionsEn: [
      'Pradeep Rawat',
      'Ashok Saraf (Veteran Actor)',
      'Asha Bhosle',
      'Dr. Appasaheb Dharmadhikari'
    ],
    optionsMr: [
      'प्रदीप रावत',
      'अशोक सराफ (ज्येष्ठ अभिनेते)',
      'आशा भोसले',
      'डॉ. आप्पासाहेब धर्माधिकारी'
    ],
    correctIndex: 1, // Ashok Saraf
    explanationEn: 'Veteran Marathi and Hindi actor Ashok Saraf was conferred the prestigious Maharashtra Bhushan Award for 2023 for his distinguished contribution to cinema and theatre. (Dr. Appasaheb Dharmadhikari received it in 2022).',
    explanationMr: 'मराठी व हिंदी चित्रपटसृष्टीतील अतुलनीय योगदानाबद्दल ज्येष्ठ अभिनेते अशोक सराफ यांना ‘महाराष्ट्र भूषण’ पुरस्काराने गौरवण्यात आले.',
    difficulty: 'medium',
    tags: ['Maharashtra Bhushan', 'Awards', 'Current Affairs'],
    isSample: true,
  },

  // ==========================================
  // 7. CSAT & REASONING (बुद्धिमत्ता व अंकगणित)
  // ==========================================
  {
    id: 'mpsc-csat-01',
    subject: 'csat',
    topic: 'Coding-Decoding',
    stream: 'both',
    questionEn: 'In a certain code language, if "MPSC" is written as "OQUE", then how will "GOAL" be written in that code?',
    questionMr: 'एका विशिष्ट सांकेतिक भाषेत जर "MPSC" हा शब्द "OQUE" असा लिहिला जात असेल, तर त्याच भाषेत "GOAL" हा शब्द कसा लिहिला जाईल?',
    optionsEn: [
      'IQCN',
      'HQCN',
      'IQCM',
      'IPCN'
    ],
    optionsMr: [
      'IQCN',
      'HQCN',
      'IQCM',
      'IPCN'
    ],
    correctIndex: 0, // IQCN (+2 letters)
    explanationEn: 'Each letter is shifted forward by +2 positions in the alphabetical series:\nM (+2) -> O, P (+2) -> Q, S (+2) -> U, C (+2) -> E.\nApplying the same rule to GOAL:\nG (+2) -> I, O (+2) -> Q, A (+2) -> C, L (+2) -> N.\nResult = IQCN.',
    explanationMr: 'प्रत्येक अक्षर इंग्रजी वर्णमालेत २ स्थानांनी पुढे सरकवले आहे (+२):\nM(+2)=O, P(+2)=Q, S(+2)=U, C(+2)=E.\nत्याचप्रमाणे GOAL साठी:\nG(+2)=I, O(+2)=Q, A(+2)=C, L(+2)=N. योग्य उत्तर: IQCN.',
    difficulty: 'easy',
    tags: ['CSAT', 'Coding-Decoding', 'Reasoning'],
    isSample: true,
  },
  {
    id: 'mpsc-csat-02',
    subject: 'csat',
    topic: 'Time and Distance',
    stream: 'both',
    questionEn: 'A train 180 metres long is running at a uniform speed of 54 km/hr. How much time will it take to completely cross an electric pole beside the railway track?',
    questionMr: '१८० मीटर लांबीची आगगाडी ५४ किमी/तास या एकसमान वेगाने धावत आहे. रेल्वे रुळाशेजारी असलेला विजेचा खांब ओलांडण्यासाठी त्या गाडीला किती सेकंद वेळ लागेल?',
    optionsEn: [
      '10 seconds',
      '12 seconds',
      '15 seconds',
      '18 seconds'
    ],
    optionsMr: [
      '१० सेकंद',
      '१२ सेकंद',
      '१५ सेकंद',
      '१८ सेकंद'
    ],
    correctIndex: 1, // 12 seconds
    explanationEn: 'Speed in m/s = 54 × (5/18) = 15 m/s.\nDistance to cross a pole = Length of train = 180 metres.\nTime = Distance / Speed = 180 / 15 = 12 seconds.',
    explanationMr: 'गाडीचा वेग मीटर/सेकंद मध्ये रूपांतरित करू:\n५४ × (५/१८) = १५ मीटर/सेकंद.\nखांब ओलांडण्याचे अंतर = गाडीची लांबी = १८० मीटर.\nवेळ = अंतर / वेग = १८० / १५ = १२ सेकंद.',
    difficulty: 'medium',
    tags: ['Aptitude', 'Time and Distance', 'CSAT'],
    isSample: true,
  },
  {
    id: 'mpsc-csat-03',
    subject: 'csat',
    topic: 'Blood Relations',
    stream: 'both',
    questionEn: 'Pointing to a photograph, Ramesh said, "She is the only daughter of my mother’s husband." Who is the woman in the photograph to Ramesh?',
    questionMr: 'एका छायाचित्राकडे बोट दाखवत रमेश म्हणाला, "ही माझ्या आईच्या पतीची एकुलती एक मुलगी आहे." तर छायाचित्रातील व्यक्ती रमेशची कोण असेल?',
    optionsEn: [
      'Mother',
      'Daughter',
      'Sister',
      'Wife'
    ],
    optionsMr: [
      'आई',
      'मुलगी',
      'बहीण',
      'पत्नी'
    ],
    correctIndex: 2, // Sister
    explanationEn: 'Ramesh’s mother’s husband is Ramesh’s father. The only daughter of his father is Ramesh’s sister.',
    explanationMr: 'रमेशच्या आईचा पती म्हणजे त्याचे वडील. वडिलांची एकुलती एक मुलगी म्हणजे रमेशची सख्खी बहीण होय.',
    difficulty: 'easy',
    tags: ['Reasoning', 'Blood Relations', 'CSAT'],
    isSample: true,
  },

  // ==========================================
  // 8. MARATHI GRAMMAR & VOCABULARY (मराठी व्याकरण)
  // ==========================================
  {
    id: 'mpsc-mr-01',
    subject: 'marathi_grammar',
    topic: 'संधी व प्रकार',
    stream: 'both',
    questionEn: 'खालीलपैकी ‘सदाचार’ या शब्दाचा योग्य संधी-विग्रह कोणता आहे?',
    questionMr: 'खालीलपैकी ‘सदाचार’ या शब्दाचा योग्य संधी-विग्रह कोणता आहे?',
    optionsEn: [
      'सदा + चार',
      'सत् + आचार',
      'सद + आचार',
      'स + दाचार'
    ],
    optionsMr: [
      'सदा + चार',
      'सत् + आचार',
      'सद + आचार',
      'स + दाचार'
    ],
    correctIndex: 1, // सत् + आचार
    explanationEn: '"सदाचार = सत् + आचार" is an example of first consonant sandhi (प्रथम व्यंजन संधी / व्यंजनादेश) where the hard consonant \'त्\' transforms into the third consonant of its class \'द्\'.',
    explanationMr: '‘सदाचार = सत् + आचार’. हे तृतीय व्यंजन संधीचे उदाहरण आहे. पहिल्या पदाच्या शेवटी त् आल्यास त्याच्या जागी त्याच वर्गातील तिसरे व्यंजन ‘द्’ येते (त् + आ = दा).',
    difficulty: 'medium',
    tags: ['संधी', 'मराठी व्याकरण', 'व्यंजन संधी'],
    isSample: true,
  },
  {
    id: 'mpsc-mr-02',
    subject: 'marathi_grammar',
    topic: 'समास',
    stream: 'both',
    questionEn: 'ज्या सामासिक शब्दातील पहिले पद संख्याविशेषण असून त्यावरून एका समूहाचा बोध होतो, त्या समासाला काय म्हणतात?',
    questionMr: 'ज्या सामासिक शब्दातील पहिले पद संख्याविशेषण असून त्यावरून एका समूहाचा बोध होतो, त्या समासाला काय म्हणतात?',
    optionsEn: [
      'द्विगु समास (Dvigu Samas)',
      'अव्ययीभाव समास (Avyayibhav)',
      'मध्यमपदलोपी समास (Madhyampad Lopi)',
      'इतरेतर द्वंद्व समास (Itaretar Dvandva)'
    ],
    optionsMr: [
      'द्विगु समास',
      'अव्ययीभाव समास',
      'मध्यमपदलोपी समास',
      'इतरेतर द्वंद्व समास'
    ],
    correctIndex: 0, // Dvigu
    explanationEn: 'When the first member of a compound word is a numeral adjective and the compound denotes a collection/group, it is called Dvigu Samas (e.g. नवरात्र = नऊ रात्रींचा समूह, त्रिभुवन, पंचवटी).',
    explanationMr: 'द्विगु समासात पहिले पद संख्याविशेषण असते व त्या सामासिक शब्दावरून एका समूहाचा बोध होतो. उदा. नवरात्र (नऊ रात्रींचा समूह), पंचवटी, त्रिभुवन, चातुर्मास.',
    difficulty: 'easy',
    tags: ['समास', 'द्विगु समास', 'मराठी व्याकरण'],
    isSample: true,
  },
  {
    id: 'mpsc-mr-03',
    subject: 'marathi_grammar',
    topic: 'प्रयोग',
    stream: 'both',
    questionEn: '‘रामाने रावणास मारले.’ या वाक्यातील प्रयोग ओळखा.',
    questionMr: '‘रामाने रावणास मारले.’ या वाक्यातील प्रयोग ओळखा.',
    optionsEn: [
      'सकर्मक कर्तरी प्रयोग',
      'कर्मणी प्रयोग',
      'भावे प्रयोग (सकर्मक भावे)',
      'मिश्र प्रयोग'
    ],
    optionsMr: [
      'सकर्मक कर्तरी प्रयोग',
      'कर्मणी प्रयोग',
      'भावे प्रयोग (सकर्मक भावे)',
      'मिश्र प्रयोग'
    ],
    correctIndex: 2, // Bhave prayog
    explanationEn: 'In "रामाने रावणास मारले", the subject \'रामाने\' has instrumental suffix (ने) and the object \'रावणास\' has accusative suffix (स). The verb \'मारले\' is neuter, 3rd person singular and does not change with subject or object. Hence it is Sakarmak Bhave Prayog.',
    explanationMr: 'या वाक्यात कर्त्याला (रामाने) व कर्मालाही (रावणास) प्रत्यय जोडलेला असून क्रियापद (मारले) हे तृतीयपुरुषी, नपुंसकलिंगी, एकाच रूपाचे राहते. म्हणून हा ‘सकर्मक भावे प्रयोग’ आहे.',
    difficulty: 'medium',
    tags: ['प्रयोग', 'भावे प्रयोग', 'मराठी'],
    isSample: true,
  },
  {
    id: 'mpsc-mr-04',
    subject: 'marathi_grammar',
    topic: 'शब्दसंग्रह व म्हणी',
    stream: 'both',
    questionEn: '‘अचाट खाणे, मसणात जाणे’ या म्हणीचा योग्य अर्थ कोणता आहे?',
    questionMr: '‘अचाट खाणे, मसणात जाणे’ या म्हणीचा योग्य अर्थ कोणता आहे?',
    optionsEn: [
      'प्रचंड भूक लागणे',
      'अति खादाडपणा करणे',
      'अतिरेक किंवा अति हावरटपणा विनाशाकडे नेतो',
      'फार वाईट अन्न खाणे'
    ],
    optionsMr: [
      'प्रचंड भूक लागणे',
      'अति खादाडपणा करणे',
      'अतिरेक किंवा अति हावरटपणा विनाशाकडे नेतो',
      'फार वाईट अन्न खाणे'
    ],
    correctIndex: 2, // अतिरेक विनाशाकडे नेतो
    explanationEn: 'The Marathi proverb "अचाट खाणे मसणात जाणे" conveys that uncontrolled greed or going to extremes in any habit inevitably leads to disastrous consequences.',
    explanationMr: 'कोणत्याही गोष्टीचा अमर्याद अतिरेक अथवा हाव केल्यास त्याचे अत्यंत वाईट परिणाम भोगावे लागतात, असा या म्हणीचा अर्थ आहे.',
    difficulty: 'easy',
    tags: ['म्हणी', 'मराठी व्याकरण', 'शब्दसंग्रह'],
    isSample: true,
  },
  {
    id: 'mpsc-mr-05',
    subject: 'marathi_grammar',
    topic: 'शब्दसंग्रह - विरुद्धार्थी शब्द',
    stream: 'both',
    questionEn: '‘कृपण’ या शब्दाचा योग्य विरुद्धार्थी शब्द खालीलपैकी कोणता आहे?',
    questionMr: '‘कृपण’ या शब्दाचा योग्य विरुद्धार्थी शब्द खालीलपैकी कोणता आहे?',
    optionsEn: [
      'कंजूष',
      'उदार',
      'लोभी',
      'दरिद्री'
    ],
    optionsMr: [
      'कंजूष',
      'उदार',
      'लोभी',
      'दरिद्री'
    ],
    correctIndex: 1, // उदार
    explanationEn: '‘कृपण’ म्हणजे कंजूष किंवा हात आखडता घेणारा व्यक्ती. त्याचा अचूक विरुद्धार्थी शब्द ‘उदार’ (दानशूर किंवा सढळ हाताने देणारा) हा आहे.',
    explanationMr: '‘कृपण’ या शब्दाचा अर्थ कंजूष असा होतो, तर त्याचा योग्य विरुद्धार्थी शब्द ‘उदार’ हा आहे.',
    difficulty: 'easy',
    tags: ['विरुद्धार्थी शब्द', 'मराठी व्याकरण'],
    isSample: true,
  },
  {
    id: 'mpsc-mr-06',
    subject: 'marathi_grammar',
    topic: 'अलंकार',
    stream: 'both',
    questionEn: '‘चाफा बोलेना, चाफा चालेना, चाफा खंत करी काही केल्या फुलेना.’ या काव्यपंक्तीत कोणता अलंकार आढळतो?',
    questionMr: '‘चाफा बोलेना, चाफा चालेना, चाफा खंत करी काही केल्या फुलेना.’ या काव्यपंक्तीत कोणता अलंकार आढळतो?',
    optionsEn: [
      'यमक अलंकार',
      'चेतनागुणोक्ती अलंकार',
      'श्लेष अलंकार',
      'दृष्टांत अलंकार'
    ],
    optionsMr: [
      'यमक अलंकार',
      'चेतनागुणोक्ती अलंकार',
      'श्लेष अलंकार',
      'दृष्टांत अलंकार'
    ],
    correctIndex: 1, // चेतनागुणोक्ती
    explanationEn: 'In Chetana-Gunokti Alankar, inanimate or natural objects are described as behaving like living humans with human emotions and consciousness.',
    explanationMr: 'निसर्गातील निर्जीव वस्तूंवर सजीव प्राण्यांप्रमाणे किंवा मानवाप्रमाणे भावना व कृतींचे आरोपण केले जाते तेव्हा ‘चेतनागुणोक्ती अलंकार’ होतो.',
    difficulty: 'medium',
    tags: ['अलंकार', 'चेतनागुणोक्ती', 'मराठी व्याकरण'],
    isSample: true,
  },
  {
    id: 'mpsc-mr-07',
    subject: 'marathi_grammar',
    topic: 'संधी - विसर्ग संधी',
    stream: 'both',
    questionEn: '‘मनोराज्य’ या शब्दाची योग्य संधी फोड कोणती आहे?',
    questionMr: '‘मनोराज्य’ या शब्दाची योग्य संधी फोड कोणती आहे?',
    optionsEn: [
      'मनो + राज्य',
      'मनः + राज्य',
      'मन + राज्य',
      'मनोर् + राज्य'
    ],
    optionsMr: [
      'मनो + राज्य',
      'मनः + राज्य',
      'मन + राज्य',
      'मनोर् + राज्य'
    ],
    correctIndex: 1, // मनः + राज्य
    explanationEn: '‘मनः + राज्य = मनोराज्य’ is an example of Visarga-Ukt Sandhi (विसर्ग उकार संधी), where visarga preceded by \'अ\' and followed by a soft consonant transforms into \'ओ\'.',
    explanationMr: '‘मनः + राज्य = मनोराज्य’. हे विसर्ग उकार संधीचे उदाहरण आहे. विसर्गाच्या मागे ‘अ’ आणि पुढे मृदु व्यंजन आल्यास विसर्गाचा ‘उ’ होऊन मागील ‘अ’ मध्ये मिसळून ‘ओ’ होतो.',
    difficulty: 'medium',
    tags: ['विसर्ग संधी', 'मराठी व्याकरण'],
    isSample: true,
  },

  // Additional Polity questions
  {
    id: 'mpsc-pol-09',
    subject: 'polity',
    topic: 'Emergency Provisions',
    stream: 'both',
    questionEn: 'Under Article 356 of the Constitution, what is the maximum permissible period for which President’s Rule can remain in force in a State with parliamentary approval every 6 months?',
    questionMr: 'घटनेच्या कलम ३५६ अन्वये एखाद्या राज्यात संसदेच्या दर सहा महिन्यांच्या मान्यतेने राष्ट्रपती राजवट जास्तीत जास्त किती कालावधीसाठी लागू ठेवता येऊ शकते?',
    optionsEn: [
      '1 Year',
      '2 Years',
      '3 Years',
      'Indefinite period'
    ],
    optionsMr: [
      '१ वर्ष',
      '२ वर्षे',
      '३ वर्षे',
      'अनिर्दिष्ट कालावधी'
    ],
    correctIndex: 2, // 3 Years
    explanationEn: 'Article 356 allows President’s Rule initially for 6 months, extendable up to a maximum of 3 years with parliamentary approval every six months (subject to conditions under 44th Amendment beyond 1 year).',
    explanationMr: 'कलम ३५६ नुसार राष्ट्रपती राजवट संसदेच्या मान्यतेने दर सहा महिन्यांनी वाढवून जास्तीत जास्त ३ वर्षांपर्यंत लागू ठेवता येते.',
    difficulty: 'medium',
    tags: ['Article 356', 'Presidents Rule', 'Emergency'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-10',
    subject: 'polity',
    topic: 'Constitutional Bodies - CAG',
    stream: 'both',
    questionEn: 'Under Article 148 of the Indian Constitution, the Comptroller and Auditor General (CAG) holds office for a term of:',
    questionMr: 'भारतीय राज्यघटनेच्या कलम १४८ नुसार भारताचे नियंत्रक व महालेखापरीक्षक (CAG) यांचा कार्यकाळ किती वर्षांचा असतो?',
    optionsEn: [
      '5 years or up to 62 years of age',
      '6 years or up to 65 years of age',
      '5 years or up to 65 years of age',
      'During the pleasure of the President'
    ],
    optionsMr: [
      '५ वर्षे किंवा वयाची ६२ वर्षे',
      '६ वर्षे किंवा वयाची ६५ वर्षे पूर्ण होईपर्यंत',
      '५ वर्षे किंवा वयाची ६५ वर्षे',
      'राष्ट्रपतींची मर्जी असेपर्यंत'
    ],
    correctIndex: 1, // 6 yrs or 65
    explanationEn: 'The CAG holds office for a term of 6 years or until the age of 65 years, whichever is earlier, and can be removed only on grounds and in the manner prescribed for a Supreme Court judge.',
    explanationMr: 'भारताचे नियंत्रक व महालेखापरीक्षक (CAG) ६ वर्षे किंवा वयाची ६५ वर्षे (जे आधी घडेल ते) पदावर राहू शकतात.',
    difficulty: 'easy',
    tags: ['CAG', 'Article 148', 'Audit'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-11',
    subject: 'polity',
    topic: 'Anti-Defection Law',
    stream: 'both',
    questionEn: 'Which schedule of the Indian Constitution contains provisions regarding the disqualification of legislators on grounds of defection (Anti-Defection Law)?',
    questionMr: 'भारतीय राज्यघटनेतील कोणत्या अनुसूचीमध्ये पक्षांतरबंदी कायद्यान्वये (Anti-Defection Law) विधिमंडळ सदस्यांच्या अपात्रतेसंबंधी तरतुदी आहेत?',
    optionsEn: [
      '8th Schedule',
      '9th Schedule',
      '10th Schedule',
      '11th Schedule'
    ],
    optionsMr: [
      '८ वी अनुसूची',
      '९ वी अनुसूची',
      '१० वी अनुसूची',
      '११ वी अनुसूची'
    ],
    correctIndex: 2, // 10th Schedule
    explanationEn: 'The 10th Schedule was added by the 52nd Constitutional Amendment Act, 1985 to curb political defections. Disqualification questions are decided by the Speaker/Chairman.',
    explanationMr: '५२ व्या घटनादुरुस्ती कायदा, १९८५ अन्वये राज्यघटनेत ‘१० वी अनुसूची’ समाविष्ट करून पक्षांतरबंदी कायदा लागू करण्यात आला.',
    difficulty: 'easy',
    tags: ['Anti Defection', '10th Schedule', 'Polity'],
    isSample: true,
  },
  {
    id: 'mpsc-pol-12',
    subject: 'polity',
    topic: 'State Legislature',
    stream: 'both',
    questionEn: 'What is the minimum age prescribed by the Constitution to become a member of the State Legislative Council (Vidhan Parishad) in Maharashtra?',
    questionMr: 'महाराष्ट्रातील विधान परिषदेचे (Legislative Council) सदस्यत्व मिळवण्यासाठी राज्यघटनेने निश्चित केलेली किमान वयोमर्यादा किती आहे?',
    optionsEn: [
      '21 years',
      '25 years',
      '30 years',
      '35 years'
    ],
    optionsMr: [
      '२१ वर्षे',
      '२५ वर्षे',
      '३० वर्षे',
      '३५ वर्षे'
    ],
    correctIndex: 2, // 30 years
    explanationEn: 'Under Article 173 of the Constitution, the minimum age to be elected to the Legislative Council (and Rajya Sabha) is 30 years, whereas for the Legislative Assembly (and Lok Sabha) it is 25 years.',
    explanationMr: 'कलम १७३ नुसार विधान परिषद (व राज्यसभा) सदस्यत्वासाठी किमान ३० वर्षे वय पूर्ण असणे आवश्यक आहे (विधानसभेसाठी किमान वय २५ वर्षे आहे).',
    difficulty: 'easy',
    tags: ['Vidhan Parishad', 'State Legislature', 'Age criteria'],
    isSample: true,
  },

  // Additional History questions
  {
    id: 'mpsc-hist-07',
    subject: 'history',
    topic: 'Press & Education',
    stream: 'both',
    questionEn: 'Who started the first Marathi newspaper "Darpan" on 6th January 1832, known as the Father of Marathi Journalism?',
    questionMr: '६ जानेवारी १८३२ रोजी ‘दर्पण’ हे मराठीतील पहिले वृत्तपत्र कोणी सुरू केले, ज्यांना ‘मराठी वृत्तपत्रसृष्टीचे जनक’ मानले जाते?',
    optionsEn: [
      'Balshastri Jambhekar',
      'Gopal Ganesh Agarkar',
      'Bhau Mahajan',
      'Krishnarao Bhalekar'
    ],
    optionsMr: [
      'बाळशास्त्री जांभेकर',
      'गोपाळ गणेश आगरकर',
      'भाऊ महाजन',
      'कृष्णराव भालेकर'
    ],
    correctIndex: 0, // Balshastri Jambhekar
    explanationEn: 'Balshastri Jambhekar founded the bilingual newspaper "Darpan" in Mumbai on 6 January 1832. Consequently, 6th January is observed as Journalist Day (पत्रकार दिन) in Maharashtra.',
    explanationMr: 'बाळशास्त्री जांभेकर यांनी ६ जानेवारी १८३२ रोजी ‘दर्पण’ वृत्तपत्र सुरू केले. म्हणून ६ जानेवारी हा दिवस महाराष्ट्रात ‘पत्रकार दिन’ म्हणून साजरा केला जातो.',
    difficulty: 'easy',
    tags: ['Darpan', 'Balshastri Jambhekar', 'Press History'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-08',
    subject: 'history',
    topic: 'Social Reformers',
    stream: 'both',
    questionEn: 'In 1848, who established the first indigenous school for girls in Pune at Bhide Wada?',
    questionMr: '१८४८ मध्ये पुण्यातील भिडे वाड्यात मुलींची पहिली देशी शाळा कोणाद्वारे सुरू करण्यात आली?',
    optionsEn: [
      'Mahatma Jyotirao Phule and Savitribai Phule',
      'Maharshi Dhondo Keshav Karve',
      'Pandita Ramabai',
      'Justice Mahadev Govind Ranade'
    ],
    optionsMr: [
      'महात्मा ज्योतिराव फुले व सावित्रीबाई फुले',
      'महर्षी धोंडो केशव कर्वे',
      'पंडिता रमाबाई',
      'न्यायमूर्ती महादेव गोविंद रानडे'
    ],
    correctIndex: 0, // Phule couple
    explanationEn: 'Mahatma Jyotirao Phule, with his wife Savitribai Phule as the first headmistress, founded the pioneering school for girls at Bhide Wada, Pune in August 1848.',
    explanationMr: 'ऑगस्ट १८४८ मध्ये महात्मा फुले आणि सावित्रीबाई फुले यांनी पुण्याच्या बुधवार पेठेतील भिडे वाड्यात मुलींची पहिली शाळा स्थापन केली.',
    difficulty: 'easy',
    tags: ['Savitribai Phule', 'Mahatma Phule', 'Girls Education'],
    isSample: true,
  },
  {
    id: 'mpsc-hist-09',
    subject: 'history',
    topic: 'Social Reformers - Karve',
    stream: 'both',
    questionEn: 'Which social reformer established the Hingne Stree Shikshan Samstha and India’s first Women’s University (SNDT) in 1916, receiving the Bharat Ratna on his 100th birthday in 1958?',
    questionMr: 'हिंगणे येथे महिला शिक्षण संस्था व १९१६ मध्ये भारतातील पहिले महिला विद्यापीठ (SNDT) स्थापन करणारे आणि १९५८ मध्ये वयाच्या १०० व्या वर्षी भारतरत्न मिळालेले समाजसुधारक कोण?',
    optionsEn: [
      'Maharshi Vitthal Ramji Shinde',
      'Maharshi Dhondo Keshav Karve',
      'Gopal Krishna Gokhale',
      'Karmaveer Bhaurao Patil'
    ],
    optionsMr: [
      'महर्षी विठ्ठल रामजी शिंदे',
      'महर्षी धोंडो केशव कर्वे',
      'गोपाळ कृष्ण गोखले',
      'कर्मवीर भाऊराव पाटील'
    ],
    correctIndex: 1, // Maharshi Karve
    explanationEn: 'Maharshi Dhondo Keshav Karve pioneered widow remarriage and female education, founding SNDT Women\'s University in 1916. He was awarded the Bharat Ratna on his centenary in 1958.',
    explanationMr: 'महर्षी धोंडो केशव कर्वे यांनी महिला शिक्षणासाठी आयुष्य वेचले. त्यांच्या १०० व्या वाढदिवशी (१९५८) त्यांना भारतरत्न पुरस्काराने सन्मानित करण्यात आले.',
    difficulty: 'medium',
    tags: ['Maharshi Karve', 'Bharat Ratna', 'Women Education'],
    isSample: true,
  },

  // Additional Geography questions
  {
    id: 'mpsc-geo-07',
    subject: 'geography',
    topic: 'Dams and Reservoirs',
    stream: 'both',
    questionEn: 'The reservoir formed behind the Koyna Dam in Satara district of Maharashtra is officially known as:',
    questionMr: 'सातारा जिल्ह्यातील कोयना धरणाच्या जलाशयाला काय नाव देण्यात आले आहे?',
    optionsEn: [
      'Shivajisagar (शिवाजीसागर)',
      'Nathsagar (नाथसागर)',
      'Yashwantsagar (यशवंतसागर)',
      'Vasant Sagar (वसंतसागर)'
    ],
    optionsMr: [
      'शिवाजीसागर (Shivajisagar)',
      'नाथसागर (Nathsagar)',
      'यशवंतसागर (Yashwantsagar)',
      'वसंतसागर (Vasant Sagar)'
    ],
    correctIndex: 0, // Shivajisagar
    explanationEn: 'The Koyna Dam reservoir is named Shivajisagar. (Jayakwadi reservoir is Nathsagar, Ujani reservoir is Yashwantsagar).',
    explanationMr: 'कोयना धरणाच्या जलाशयास ‘शिवाजीसागर’ म्हणतात. (पैठणच्या जायकवाडी जलाशयास ‘नाथसागर’ व उजनी धरणाच्या जलाशयास ‘यशवंतसागर’ म्हणतात).',
    difficulty: 'easy',
    tags: ['Koyna Dam', 'Shivajisagar', 'Lakes'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-08',
    subject: 'geography',
    topic: 'Rainfall & Hill Stations',
    stream: 'both',
    questionEn: 'Which hill station located in the Sawantwadi taluka of Sindhudurg district records the highest annual rainfall in Maharashtra?',
    questionMr: 'सिंधुदुर्ग जिल्ह्यातील सावंतवाडी तालुक्यातील कोणत्या थंड हवेच्या ठिकाणी महाराष्ट्रातील सर्वाधिक वार्षिक पर्जन्यमानाची नोंद होते?',
    optionsEn: [
      'Mahabaleshwar (महाबळेश्वर)',
      'Amboli (आंबोली)',
      'Matheran (माथेरान)',
      'Chikhaldara (चिखलदरा)'
    ],
    optionsMr: [
      'महाबळेश्वर',
      'आंबोली',
      'माथेरान',
      'चिखलदरा'
    ],
    correctIndex: 1, // Amboli
    explanationEn: 'Amboli in Sindhudurg receives approximately 750 cm of annual rainfall, making it the wettest place in Maharashtra, often referred to as the Cherrapunji of Maharashtra.',
    explanationMr: 'आंबोली (जि. सिंधुदुर्ग) येथे महाराष्ट्रातील सर्वाधिक पर्जन्यमान (सुमारे ७५० सेमी) होते. याला महाराष्ट्राचे चेरापुंजी म्हटले जाते.',
    difficulty: 'easy',
    tags: ['Amboli', 'Rainfall', 'Sindhudurg'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-09',
    subject: 'geography',
    topic: 'Crater Lake',
    stream: 'both',
    questionEn: 'The world-famous hypersaline Lonar Crater Lake, created by a hyper-velocity meteor impact in basalt rock, is located in which district of Maharashtra?',
    questionMr: 'दख्खनच्या बेसाल्ट खडकावर उल्कापातामुळे निर्माण झालेले जगप्रसिद्ध खाऱ्या पाण्याचे लोणार सरोवर महाराष्ट्रातील कोणत्या जिल्ह्यात आहे?',
    optionsEn: [
      'Akola (अकोला)',
      'Buldhana (बुलढाणा)',
      'Washim (वाशीम)',
      'Jalna (जालना)'
    ],
    optionsMr: [
      'अकोला',
      'बुलढाणा',
      'वाशीम',
      'जालना'
    ],
    correctIndex: 1, // Buldhana
    explanationEn: 'Lonar Crater Lake in Buldhana district was created around 52,000 years ago by a meteorite collision. It is a notified National Geo-heritage Monument and a Ramsar wetland site.',
    explanationMr: 'लोणार सरोवर बुलढाणा जिल्ह्यातील लोणार तालुक्यात असून ते उल्कापातामुळे बेसाल्ट खडकात तयार झालेले जगातील दुर्मीळ खारे सरोवर आहे (रामसार क्षेत्र).',
    difficulty: 'easy',
    tags: ['Lonar Lake', 'Buldhana', 'Ramsar Site'],
    isSample: true,
  },

  // Additional Economy questions
  {
    id: 'mpsc-eco-05',
    subject: 'economy',
    topic: 'Employment Schemes',
    stream: 'both',
    questionEn: 'The nationwide MGNREGA scheme was inspired by the pioneer Employment Guarantee Scheme (EGS) launched in Maharashtra in 1972 by which visionary leader?',
    questionMr: 'देशव्यापी मनरेगा (MGNREGA) योजनेची प्रेरणा ठरलेली १९७२ मधील महाराष्ट्राची ‘रोजगार हमी योजना’ (EGS) कोणाच्या संकल्पनेतून साकार झाली?',
    optionsEn: [
      'V. S. Page (वि. स. पागे)',
      'Yashwantrao Chavan (यशवंतराव चव्हाण)',
      'Vasantrao Naik (वसंतराव नाईक)',
      'Sharad Pawar (शरद पवार)'
    ],
    optionsMr: [
      'वि. स. पागे (V. S. Page)',
      'यशवंतराव चव्हाण',
      'वसंतराव नाईक',
      'शरद पवार'
    ],
    correctIndex: 0, // V. S. Page
    explanationEn: 'Vitthal Sakharam Page (V. S. Page) conceived the Maharashtra Employment Guarantee Scheme in 1972, which legally guaranteed the right to work for rural labor and served as the blueprint for MGNREGA 2005.',
    explanationMr: 'वि. स. पागे यांना रोजगार हमी योजनेचे जनक मानले जाते. १९७२ मध्ये महाराष्ट्रात सुरू झालेल्या या योजनेच्या धर्तीवर पुढे केंद्र सरकारने राष्ट्रीय स्तरावर मनरेगा योजना लागू केली.',
    difficulty: 'medium',
    tags: ['EGS', 'V S Page', 'MGNREGA'],
    isSample: true,
  },
  {
    id: 'mpsc-eco-06',
    subject: 'economy',
    topic: 'Agriculture Schemes',
    stream: 'both',
    questionEn: 'Under the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN), what is the total annual income support provided to eligible farmer families?',
    questionMr: 'प्रधानमंत्री किसान सन्मान निधी (PM-KISAN) योजनेअंतर्गत पात्र शेतकरी कुटुंबांना दरवर्षी एकूण किती रुपयांचे थेट आर्थिक साहाय्य दिले जाते?',
    optionsEn: [
      '₹4,000 in two installments',
      '₹6,000 in three equal installments of ₹2,000',
      '₹8,000 in four installments',
      '₹10,000 in one lump sum'
    ],
    optionsMr: [
      '₹४,००० दोन हप्त्यांत',
      '₹६,००० प्रत्येकी ₹२,००० च्या तीन समान हप्त्यांत',
      '₹८,००० चार हप्त्यांत',
      '₹१०,००० एकरकमी'
    ],
    correctIndex: 1, // 6000
    explanationEn: 'Under PM-KISAN, the central government transfers ₹6,000 per year directly into farmers’ Aadhaar-seeded bank accounts in three four-monthly installments of ₹2,000 each.',
    explanationMr: 'पीएम किसान योजनेअंतर्गत पात्र शेतकरी कुटुंबांना वर्षाला ₹६,००० ची रक्कम ₹२,००० च्या तीन समान हप्त्यांमध्ये थेट बँक खात्यात दिली जाते.',
    difficulty: 'easy',
    tags: ['PM KISAN', 'Agriculture', 'Economy'],
    isSample: true,
  },

  // Additional Science questions
  {
    id: 'mpsc-sci-05',
    subject: 'science',
    topic: 'Biology - Circulatory System',
    stream: 'both',
    questionEn: 'Which human blood group is known as the "Universal Donor" because its red blood cells lack both A and B surface antigens?',
    questionMr: 'कोणत्या मानवी रक्तगटाला ‘सर्वयोग्य दाता’ (Universal Donor) म्हटले जाते, कारण त्याच्या तांबड्या रक्तपेशींवर A आणि B हे दोन्ही प्रतिजन (Antigens) नसतात?',
    optionsEn: [
      'Blood Group A',
      'Blood Group B',
      'Blood Group AB',
      'Blood Group O'
    ],
    optionsMr: [
      'रक्तगट A',
      'रक्तगट B',
      'रक्तगट AB',
      'रक्तगट O (विशेषतः O Negative)'
    ],
    correctIndex: 3, // Group O
    explanationEn: 'Blood Group O (specifically O Negative) lacks A and B antigens on RBCs, preventing antigen-antibody agglutination in recipients, making it the universal donor blood group.',
    explanationMr: 'रक्तगट ‘O’ च्या तांबड्या पेशींवर कोणतेही प्रतिजन नसल्यामुळे हा रक्तगट कोणत्याही व्यक्तीला चालू शकतो. म्हणून याला सर्वयोग्य दाता म्हणतात (AB हा सर्वयोग्य ग्राहक आहे).',
    difficulty: 'easy',
    tags: ['Biology', 'Blood Groups', 'Antigens'],
    isSample: true,
  },
  {
    id: 'mpsc-sci-06',
    subject: 'science',
    topic: 'Physics - Laws of Motion',
    stream: 'both',
    questionEn: 'The launching of a space rocket operates primarily on which fundamental law of Physics?',
    questionMr: 'अवकाशात रॉकेटचे प्रक्षेपण भौतिकशास्त्राच्या कोणत्या मूलभूत नियमावर प्रामुख्याने कार्य करते?',
    optionsEn: [
      'Newton\'s First Law of Motion',
      'Newton\'s Second Law of Motion',
      'Newton\'s Third Law of Motion & Conservation of Momentum',
      'Archimedes Principle'
    ],
    optionsMr: [
      'न्यूटनचा पहिला नियम',
      'न्यूटनचा दुसरा नियम',
      'न्यूटनचा तिसरा नियम आणि संवेग अक्षय्यतेचा सिद्धांत',
      'आर्किमिडीजचे तत्त्व'
    ],
    correctIndex: 2, // Newton 3rd
    explanationEn: 'Rocket propulsion is an application of Newton\'s Third Law of Motion (Every action has an equal and opposite reaction) and the Law of Conservation of Linear Momentum.',
    explanationMr: 'रॉकेटचे उड्डाण हे ‘न्यूटनचा गतीविषयक तिसरा नियम’ (प्रत्येक क्रियेला समान व विरुद्ध प्रतिक्रिया असते) आणि रेषीय संवेग अक्षय्यतेच्या नियमावर आधारित असते.',
    difficulty: 'easy',
    tags: ['Physics', 'Newton Laws', 'Rocket'],
    isSample: true,
  },

  // Additional Current Affairs questions
  {
    id: 'mpsc-ca-04',
    subject: 'current_affairs',
    topic: 'Infrastructure - Atal Setu',
    stream: 'both',
    questionEn: 'In January 2024, Prime Minister Narendra Modi inaugurated the "Atal Bihari Vajpayee Sewri-Nhava Sheva Atal Setu" (MTHL). What is its total length, making it India’s longest sea bridge?',
    questionMr: 'जानेवारी २०२४ मध्ये उद्घाटन झालेला मुंबई ते नवी मुंबई जोडणारा ‘अटल सेतू’ (MTHL) हा भारतातील सर्वात लांब सागरी पूल असून त्याची एकूण लांबी किती आहे?',
    optionsEn: [
      '14.5 km',
      '18.2 km',
      '21.8 km',
      '25.4 km'
    ],
    optionsMr: [
      '१४.५ किमी',
      '१८.२ किमी',
      '२१.८ किमी',
      '२५.४ किमी'
    ],
    correctIndex: 2, // 21.8 km
    explanationEn: 'The Atal Setu (Mumbai Trans Harbour Link) spans approximately 21.8 km in total length (16.5 km over sea and 5.5 km on land), connecting Sewri in South Mumbai to Chirle near Nhava Sheva.',
    explanationMr: 'अटल सेतू (MTHL) ची एकूण लांबी सुमारे २१.८ किमी (सागरावरील लांबी १६.५ किमी) आहे. हा भारतातील सर्वात लांब सागरी पूल आहे.',
    difficulty: 'medium',
    tags: ['Atal Setu', 'MTHL', 'Infrastructure'],
    isSample: true,
  },
  {
    id: 'mpsc-ca-05',
    subject: 'current_affairs',
    topic: 'Sports - National Games',
    stream: 'both',
    questionEn: 'In the 37th National Games held in Goa, which state finished at the top of the medal tally, winning the prestigious Raja Bhalindra Singh Trophy with over 200 medals?',
    questionMr: 'गोवा येथे पार पडलेल्या ३७ व्या राष्ट्रीय क्रीडा स्पर्धेत (National Games) २०० हून अधिक पदके जिंकून ‘राजा भालिंद्र सिंग ट्रॉफी’ पटकावत अव्वल स्थान कोणत्या राज्याने मिळवले?',
    optionsEn: [
      'Haryana',
      'Maharashtra',
      'Services Sports Control Board (SSCB)',
      'Kerala'
    ],
    optionsMr: [
      'हरियाणा',
      'महाराष्ट्र',
      'सर्व्हिसेस (SSCB)',
      'केरळ'
    ],
    correctIndex: 1, // Maharashtra
    explanationEn: 'Maharashtra dominated the 37th National Games in Goa, finishing at the top of the medal table with 228 medals (80 Gold, 69 Silver, 79 Bronze) to claim the Raja Bhalindra Singh Trophy.',
    explanationMr: 'महाराष्ट्राने ३७ व्या राष्ट्रीय क्रीडा स्पर्धेत ८० सुवर्णांसह एकूण २२८ पदके पटकावून २९ वर्षांनंतर प्रतिष्ठित ‘राजा भालिंद्र सिंग ट्रॉफी’ जिंकत अव्वल स्थान प्राप्त केले.',
    difficulty: 'medium',
    tags: ['National Games', 'Maharashtra', 'Sports'],
    isSample: true,
  },

  // Additional CSAT questions
  {
    id: 'mpsc-csat-04',
    subject: 'csat',
    topic: 'Clock & Angles',
    stream: 'both',
    questionEn: 'What is the angle between the hour hand and the minute hand of a clock when the time is exactly 3:30?',
    questionMr: 'घड्याळात दुपारी ३ वाजून ३० मिनिटे झाली असताना तास काटा आणि मिनिट काटा यांच्यामध्ये किती अंशांचा कोन तयार होतो?',
    optionsEn: [
      '70°',
      '75°',
      '80°',
      '90°'
    ],
    optionsMr: [
      '७० अंश',
      '७५ अंश',
      '८० अंश',
      '९० अंश'
    ],
    correctIndex: 1, // 75 degrees
    explanationEn: 'Angle formula: |30H - (11/2)M|.\nFor H = 3 and M = 30:\nAngle = |30(3) - (11/2)(30)| = |90 - 165| = 75 degrees.',
    explanationMr: 'कोनाचे सूत्र = |३० × तास - (११/२) × मिनिटे|.\n= |३० × ३ - (११/२) × ३०| = |९० - १६५| = ७५ अंश.',
    difficulty: 'medium',
    tags: ['Clock', 'Reasoning', 'CSAT'],
    isSample: true,
  },
  {
    id: 'mpsc-csat-05',
    subject: 'csat',
    topic: 'Percentages & Arithmetic',
    stream: 'both',
    questionEn: 'If the price of petrol increases by 25%, by what percentage must a person reduce their petrol consumption so that their total expenditure remains unchanged?',
    questionMr: 'जर पेट्रोलच्या दरात २५% ने वाढ झाली, तर पेट्रोलवरील मासिक खर्च स्थिर ठेवण्यासाठी एका व्यक्तीला पेट्रोलच्या वापरात किती टक्के घट करावी लागेल?',
    optionsEn: [
      '20%',
      '25%',
      '16.66%',
      '30%'
    ],
    optionsMr: [
      '२०%',
      '२५%',
      '१६.६६%',
      '३०%'
    ],
    correctIndex: 0, // 20%
    explanationEn: 'Formula: [R / (100 + R)] × 100% = [25 / (100 + 25)] × 100% = (25 / 125) × 100% = 20%.',
    explanationMr: 'खर्च स्थिर ठेवण्यासाठी वापरातील घट = [वाढ / (१०० + वाढ)] × १००\n= [२५ / १२५] × १०० = २०%. योग्य उत्तर: २०%.',
    difficulty: 'medium',
    tags: ['Percentage', 'Arithmetic', 'CSAT'],
    isSample: true,
  },
];

// Helper to provide backwards compatibility with any existing imports of sampleQuestions
export const sampleQuestions: MCQQuestion[] = centralizedQuestionBank;

