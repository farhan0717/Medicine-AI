import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 rounded-xl text-xs">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500" />
        <p className="line-clamp-2">{t.disclaimerText}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-amber-500/10 dark:bg-amber-500/15 border-y border-amber-500/20 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
        <div className="p-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg flex-shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
          <strong className="font-semibold text-amber-900 dark:text-amber-100">Medical Disclaimer: </strong>
          {t.disclaimerText}
        </div>
      </div>
    </div>
  );
};
