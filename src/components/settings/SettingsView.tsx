import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Sun, Moon, Globe, Bell, Trash2, ShieldCheck, Settings as SettingsIcon } from 'lucide-react';
import { SupportedLanguage } from '../../services/translationService';

export const SettingsView: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all local scan history and reminders?')) {
      localStorage.clear();
      alert('Local data cleared successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>System Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Application Settings
        </h1>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-8">
        {/* Appearance Mode */}
        <div className="space-y-3 pb-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-brand-500" />
            <span>Theme Preference</span>
          </h3>
          <div className="grid grid-cols-3 gap-3 max-w-sm">
            {(['light', 'dark', 'system'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`py-2.5 px-4 rounded-2xl text-xs font-bold capitalize transition-all ${
                  theme === mode
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="space-y-3 pb-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span>Default Translation Language</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { code: 'en', label: 'English 🇺🇸' },
              { code: 'ta', label: 'தமிழ் (Tamil) 🇮🇳' },
              { code: 'hi', label: 'हिंदी (Hindi) 🇮🇳' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`py-2.5 px-5 rounded-2xl text-xs font-bold transition-all ${
                  language === lang.code
                    ? 'bg-emeraldBrand-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-500" />
              <span>Medication Dose Push Notifications</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Receive browser alerts for scheduled medicine timings</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              notifications ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Data & Account Deletion */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>Danger Zone & Storage Management</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clear all cached local scan history, bookmarked items, and application preferences.
          </p>
          <button
            onClick={handleClearData}
            className="px-5 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold transition-colors"
          >
            Clear Local Data & Cache
          </button>
        </div>
      </div>
    </div>
  );
};
