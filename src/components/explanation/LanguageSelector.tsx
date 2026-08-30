import React from 'react';
import { SupportedLanguage } from '../../services/translationService';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
      <Globe className="w-4 h-4 text-brand-500 ml-2" />
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          currentLang === 'en'
            ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('ta')}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          currentLang === 'ta'
            ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
        }`}
      >
        தமிழ் (Tamil)
      </button>
      <button
        onClick={() => onLanguageChange('hi')}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          currentLang === 'hi'
            ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
        }`}
      >
        हिंदी (Hindi)
      </button>
    </div>
  );
};
