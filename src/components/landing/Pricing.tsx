import React from 'react';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC<{ onSelectPlan?: () => void }> = ({ onSelectPlan }) => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand-500">
          Transparent Pricing
        </h2>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Choose The Right Plan For You
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Free forever for essential medicine scans. Upgrade to Pro for unlimited drug interaction history & family sharing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="glass-card rounded-3xl p-8 border border-white/60 dark:border-slate-700/60 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Community Free Tier
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                Free Forever
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Perfect for patients and families looking for quick medicine explanations.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Unlimited OCR Medicine Scanning</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Gemini Plain Language Explanations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>English, Tamil & Hindi Translation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Basic Drug Interaction Verification</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Check className="w-4 h-4 text-slate-400" />
                <span>Up to 10 Saved History items</span>
              </li>
            </ul>
          </div>

          <Link
            to="/scan"
            className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold text-center transition-colors"
          >
            Start Free Scanning
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="relative glass-card rounded-3xl p-8 border-2 border-brand-500 shadow-glow flex flex-col justify-between space-y-6">
          <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-brand-500 to-emeraldBrand-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
            Recommended
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Clinical Pro Tier
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$9.99</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For healthcare professionals, chronic care management & large families.
            </p>

            <ul className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-500" />
                <span>Everything in Free plan</span>
              </li>
              <li className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Check className="w-4 h-4 text-brand-500" />
                <span>Unlimited Prescription OCR Extraction</span>
              </li>
              <li className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Check className="w-4 h-4 text-brand-500" />
                <span>Unlimited Drug Collision History</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-500" />
                <span>PDF & JSON Report Export</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-500" />
                <span>24/7 AI Clinical Assistant Chat</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onSelectPlan}
            className="w-full gradient-bg-primary py-3 rounded-2xl text-xs font-bold text-center shadow-lg transition-transform hover:scale-[1.02]"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </section>
  );
};
