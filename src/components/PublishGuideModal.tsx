import React from 'react';
import { X, Globe, Terminal, CheckCircle2, ShieldCheck, ExternalLink, Sparkles, Smartphone, Code } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const PublishGuideModal: React.FC<Props> = ({ language, isOpen, onClose }) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {language === 'mr' ? '₹० विनामूल्य होस्टिंग व पब्लिश मार्गदर्शक' : '₹0 Free Hosting & Deployment Guide'}
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {language === 'mr' ? 'कोणतेही क्रेडिट कार्ड किंवा पेड डोमेन न लागता मोफत चालवा' : 'Zero budget, no credit card or paid domain required'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          {language === 'mr' 
            ? 'हे अ‍ॅप संपूर्णपणे क्लायंट-साइड (React + Vite + TypeScript) आणि PWA तंत्रज्ञानावर बनवले आहे. खालील कोणत्याही मोफत प्लॅटफॉर्मवर हे कायमस्वरूपी ₹० खर्चात चालवता येते:' 
            : 'Because this app uses client-side localStorage and standard PWA standards, it can be published to the web completely free forever on top tier cloud providers.'}
        </p>

        <div className="mt-6 space-y-4 text-xs">
          
          {/* Option 1: Vercel (Recommended - Fastest) */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                १. Vercel वर १-क्लिक मध्ये पब्लिश करा (सर्वात सोपे)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                Recommended (₹0)
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-300 pl-1">
              <li>कोड गिटहब (GitHub) वर रिपॉझिटरी तयार करून पुश करा.</li>
              <li><strong>vercel.com</strong> वर मोफत मोफत खाते (Free Hobby Tier) तयार करा.</li>
              <li>"Add New Project" निवडून गिटहब रिपॉझिटरी लिंक करा.</li>
              <li>Framework preset <strong>Vite</strong> आपोआप ओळखले जाईल. <strong>Deploy</strong> वर क्लिक करा!</li>
              <li>१ मिनिटात तुम्हाला मोफत <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">https://your-mpsc-app.vercel.app</code> लिंक मिळेल.</li>
            </ol>
          </div>

          {/* Option 2: GitHub Pages */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              २. GitHub Pages द्वारे विनामूल्य होस्टिंग
            </span>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-300 pl-1">
              <li>गिटहब रिपॉझिटरीच्या <strong>Settings</strong> &gt; <strong>Pages</strong> मध्ये जा.</li>
              <li>Build and deployment स्त्रोत म्हणून <strong>GitHub Actions</strong> निवडा.</li>
              <li>Vite साठी डिफॉल्ट GitHub Pages ॲक्शन निवडून सेव्ह करा. तुमचे अ‍ॅप <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">https://username.github.io/mpsc-app/</code> वर लाइव्ह होईल.</li>
            </ol>
          </div>

          {/* Option 3: Local Testing & Building */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <Terminal className="w-4 h-4 text-amber-500" />
              ३. संगणकावर / लॅपटॉपवर चालवण्यासाठी आणि चाचणीसाठी कमांड्स
            </span>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] space-y-1 overflow-x-auto">
              <p><span className="text-slate-400"># १. लायब्ररी इन्स्टॉल करा:</span></p>
              <p className="text-emerald-400">npm install</p>
              <p className="mt-2"><span className="text-slate-400"># २. स्थानिक डेव्हलपमेंट सर्व्हर सुरू करा:</span></p>
              <p className="text-emerald-400">npm run dev</p>
              <p className="mt-2"><span className="text-slate-400"># ३. प्रॉडक्शनसाठी बिल्ड तयार करा:</span></p>
              <p className="text-emerald-400">npm run build</p>
            </div>
          </div>

          {/* Offline & Data Security Guarantee */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5 text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <strong className="block font-bold">डेटा सुरक्षिततेची १००% हमी</strong>
              <span>
                विद्यार्थ्यांचा अभ्यासक्रम, गुण, सोडवलेले प्रश्न आणि नोट्स कोणत्याही बाह्य सर्व्हरवर जात नाहीत; ते विद्यार्थ्याच्या स्वतःच्या फोनमध्ये (localStorage) पूर्णपणे सुरक्षित राहतात.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow hover:opacity-90 transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
