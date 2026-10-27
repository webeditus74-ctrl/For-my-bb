import React, { useState } from 'react';
import { Download, Smartphone, X, Check, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  variant?: 'header' | 'card';
}

export const PWAInstallButton: React.FC<Props> = ({ language, variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const t = translations[language];

  if (isInstalled) {
    if (variant === 'card') {
      return (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-medium">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{t.pwaInstalled}</span>
        </div>
      );
    }
    return null;
  }

  // Handle direct click
  const handleTrigger = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {variant === 'header' ? (
        <button
          onClick={handleTrigger}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-sm transition active:scale-95 cursor-pointer"
          title={t.pwaInstallApp}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.pwaInstallApp}</span>
          <span className="sm:hidden">{language === 'mr' ? 'अ‍ॅप' : 'Install'}</span>
        </button>
      ) : (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-md border border-indigo-500/30">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{t.pwaInstallApp}</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t.pwaInstallDesc}</p>
              </div>
            </div>
          </div>
          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={handleTrigger}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition active:scale-98 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isInstallable ? (language === 'mr' ? 'आता इन्स्टॉल करा' : 'Install Now') : (language === 'mr' ? 'इन्स्टॉल कृती पहा' : 'View Install Guide')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Guided Modal for iOS Safari and other browsers without beforeinstallprompt */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'mr' ? 'मोबाईलवर अ‍ॅप कसे चालवाल?' : 'Install MPSC Pragati on Mobile'}
            </h3>
            
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">
              {language === 'mr' 
                ? 'हे अ‍ॅप १००% मोफत व ऑफलाइन चालते. गुगल प्ले स्टोअरच्या आवश्यकतेशिवाय थेट होम स्क्रीनवर जोडा:' 
                : 'This app is 100% free and works fully offline without requiring any app store downloads.'}
            </p>

            {isIOS ? (
              <div className="mt-4 space-y-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">
                      {language === 'mr' ? '१. Safari मधील Share वर टॅप करा' : '1. Tap Share in Safari'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {language === 'mr' ? 'तळाशी असलेला शेअर आयकॉन दाबा.' : 'Tap the share button at bottom of Safari.'}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">
                      {language === 'mr' ? '२. "Add to Home Screen" निवडा' : '2. Select "Add to Home Screen"'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {language === 'mr' ? 'खाली स्क्रोल करा व \'होम स्क्रीनवर जोडा\' निवडा.' : 'Scroll down and tap Add to Home Screen.'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">
                      {language === 'mr' ? 'Chrome मेनू उघडा (तीन ठिपके ⋮)' : 'Open Chrome Menu (3 Dots ⋮)'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {language === 'mr' ? 'उजव्या कोपऱ्यातील तीन ठिपक्यांवर टॅप करा.' : 'Tap the top-right corner menu.'}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-900 dark:text-white">
                      {language === 'mr' ? '"Install App" किंवा "Add to Home screen"' : 'Select "Install app"'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {language === 'mr' ? 'पर्याय निवडून खात्री करा. अ‍ॅप फोनमध्ये जोडले जाईल.' : 'Click to install directly on your device.'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow hover:opacity-90 transition cursor-pointer"
            >
              {language === 'mr' ? 'समजले, बंद करा' : 'Got it, Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
