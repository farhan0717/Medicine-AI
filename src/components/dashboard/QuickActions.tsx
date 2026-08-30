import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, FileText, ShieldAlert, GitCompare, MessageSquare, Bell } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    { title: 'Quick Scan', path: '/scan', icon: Scan, color: 'bg-brand-500 text-white' },
    { title: 'Prescription OCR', path: '/prescriptions', icon: FileText, color: 'bg-blue-500 text-white' },
    { title: 'Interaction Check', path: '/interactions', icon: ShieldAlert, color: 'bg-amber-500 text-white' },
    { title: 'Compare Meds', path: '/compare', icon: GitCompare, color: 'bg-purple-500 text-white' },
    { title: 'AI Assistant', path: '/chat', icon: MessageSquare, color: 'bg-emerald-500 text-white' },
    { title: 'Reminders', path: '/reminders', icon: Bell, color: 'bg-rose-500 text-white' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              to={act.path}
              className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 text-center group"
            >
              <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{act.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
