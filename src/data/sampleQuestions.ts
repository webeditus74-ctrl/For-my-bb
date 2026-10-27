import { MCQQuestion } from '../types';

export const sampleQuestions: MCQQuestion[] = [
  // 1. POLITY
  {
    id: 'mpsc-pol-01',
    subject: 'polity',
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

  // 2. MAHARASHTRA HISTORY
  {
    id: 'mpsc-hist-01',
    subject: 'history',
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

  // 3. MAHARASHTRA GEOGRAPHY
  {
    id: 'mpsc-geo-01',
    subject: 'geography',
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
    explanationEn: 'Thal Ghat (also known as Kasara Ghat) connects Mumbai to Nashik. Bhor Ghat connects Mumbai to Pune. Varandha Ghat connects Bhor to Mahad. Amba Ghat connects Kolhapur to Ratnagiri.',
    explanationMr: 'मुंबई ते नाशिक दरम्यान ‘थळ घाट’ (कसारा घाट) आहे. मुंबई ते पुणे दरम्यान ‘बोर घाट’, कोल्हापूर ते रत्नागिरी दरम्यान ‘आंबा घाट’ आणि भोर ते महाड दरम्यान ‘वरंधा घाट’ आहे.',
    difficulty: 'easy',
    tags: ['Sahyadri', 'Passes', 'Maharashtra Geography'],
    isSample: true,
  },
  {
    id: 'mpsc-geo-02',
    subject: 'geography',
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
    explanationEn: 'Bhandara and Gondia (along with Nagpur) contain the prime high-grade manganese ore deposits in Maharashtra. Sindhudurg also has iron ore and manganese, but Bhandara-Gondia forms the core belt (MOIL operates here).',
    explanationMr: 'महाराष्ट्रात मॅंगनीजचे सर्वाधिक उच्च प्रतीचे साठे भंडारा आणि गोंदिया (तसेच नागपूर) जिल्ह्यात आहेत. या भागात मॉइल (MOIL) ही भारत सरकारची कंपनी खाणकाम करते.',
    difficulty: 'medium',
    tags: ['Minerals', 'Manganese', 'Maharashtra Economy'],
    isSample: true,
  },

  // 4. ECONOMY
  {
    id: 'mpsc-eco-01',
    subject: 'economy',
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

  // 5. GENERAL SCIENCE
  {
    id: 'mpsc-sci-01',
    subject: 'science',
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

  // 6. MARATHI GRAMMAR
  {
    id: 'mpsc-mr-01',
    subject: 'marathi_grammar',
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

  // 7. CSAT & REASONING
  {
    id: 'mpsc-csat-01',
    subject: 'csat',
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
    explanationEn: 'Each letter is shifted forward by +2 positions in the alphabetical series:\nM (+2) -> O\nP (+2) -> Q\nS (+2) -> U\nC (+2) -> E\nApplying the same rule to GOAL:\nG (+2) -> I\nO (+2) -> Q\nA (+2) -> C\nL (+2) -> N\nResult = IQCN.',
    explanationMr: 'प्रत्येक अक्षर इंग्रजी वर्णमालेत २ स्थानांनी पुढे सरकवले आहे (+२):\nM(+2)=O, P(+2)=Q, S(+2)=U, C(+2)=E.\nत्याचप्रमाणे GOAL साठी:\nG(+2)=I, O(+2)=Q, A(+2)=C, L(+2)=N. योग्य उत्तर: IQCN.',
    difficulty: 'easy',
    tags: ['CSAT', 'Coding-Decoding', 'Reasoning'],
    isSample: true,
  },
  {
    id: 'mpsc-csat-02',
    subject: 'csat',
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

  // 8. CURRENT AFFAIRS
  {
    id: 'mpsc-ca-01',
    subject: 'current_affairs',
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
];
