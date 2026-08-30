import React from 'react';
import { Activity, ShieldCheck, Zap, Globe2 } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    { icon: Zap, value: '99.4%', label: 'OCR Text Accuracy', desc: 'Preprocessed HTML5 Canvas Engine' },
    { icon: Activity, value: '50,000+', label: 'Scans Analyzed', desc: 'Trusted by Patients & Caregivers' },
    { icon: ShieldCheck, value: '< 2.5s', label: 'AI Processing Speed', desc: 'Powered by Gemini 1.5 Flash' },
    { icon: Globe2, value: '3', label: 'Languages Supported', desc: 'English, Tamil, and Hindi' },
  ];

  return (
    <section className="py-16 border-y border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="text-center space-y-2 p-6 glass-card rounded-3xl border border-white/60 dark:border-slate-800">
                <div className="w-10 h-10 mx-auto rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
