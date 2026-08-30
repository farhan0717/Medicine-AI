import React from 'react';
import { User, Stethoscope, Store, ShieldCheck } from 'lucide-react';

export type RolePortal = 'patient' | 'doctor' | 'pharmacy' | 'admin';

interface PortalSwitcherProps {
  currentPortal: RolePortal;
  onPortalChange: (portal: RolePortal) => void;
}

export const PortalSwitcher: React.FC<PortalSwitcherProps> = ({ currentPortal, onPortalChange }) => {
  const portals: { id: RolePortal; label: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    { id: 'patient', label: 'Patient Hub', icon: User, color: 'text-brand-500 bg-brand-500/10' },
    { id: 'doctor', label: 'Doctor Portal', icon: Stethoscope, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 'pharmacy', label: 'Pharmacy Desk', icon: Store, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'admin', label: 'Admin Console', icon: ShieldCheck, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
      {portals.map((p) => {
        const Icon = p.icon;
        const active = currentPortal === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onPortalChange(p.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              active
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm scale-102 border border-slate-200/50 dark:border-slate-600/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            <div className={`p-1 rounded-lg ${p.color}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">{p.label}</span>
          </button>
        );
      })}
    </div>
  );
};
