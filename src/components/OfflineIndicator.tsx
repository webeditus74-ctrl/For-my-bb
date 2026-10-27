import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
}

export const OfflineIndicator: React.FC<Props> = ({ language }) => {
  const isOnline = useOnlineStatus();
  const t = translations[language];

  if (isOnline) return null;

  return (
    <div className="fixed bottom-18 sm:bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 rounded-xl bg-amber-600/95 backdrop-blur-md px-3.5 py-2.5 text-xs font-semibold text-white shadow-xl border border-amber-400/30">
      <span className="flex h-2.5 w-2.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-100"></span>
      </span>
      <WifiOff className="w-4 h-4 shrink-0" />
      <span className="leading-tight">{t.offlineStatus}</span>
    </div>
  );
};
