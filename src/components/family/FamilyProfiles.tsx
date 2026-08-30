import React, { useState } from 'react';
import { mock_family_profiles } from '../../data/medicineDatabase';
import { FamilyProfileItem } from '../../types';
import {
  Users,
  UserPlus,
  Heart,
  ShieldCheck,
  Bell,
  Activity,
  AlertCircle,
  CheckCircle2,
  Plus
} from 'lucide-react';

export const FamilyProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<FamilyProfileItem[]>(mock_family_profiles);
  const [selectedProfile, setSelectedProfile] = useState<FamilyProfileItem>(mock_family_profiles[0]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>Family & Caregiver Intelligence Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Multi-Profile Family Medication Oversight
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Manage prescriptions, track dosage adherence, and receive shared refill reminders for elderly parents, children, and family dependents.
          </p>
        </div>

        <button className="px-5 py-3 rounded-2xl gradient-bg-primary font-bold text-xs shadow-lg flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Profiles Cards Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {profiles.map((p) => {
          const isSelected = selectedProfile.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProfile(p)}
              className={`glass-card rounded-3xl p-5 border text-left transition-all space-y-3 ${
                isSelected
                  ? 'border-brand-500 bg-brand-500/10 dark:bg-brand-950/40 shadow-xl scale-102 ring-2 ring-brand-500/50'
                  : 'border-slate-200 dark:border-slate-700/80 hover:border-brand-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl ${p.avatarColor} text-white flex items-center justify-center font-extrabold text-sm shadow-md`}>
                  {p.name[0]}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {p.relation}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                  {p.name}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
                  {p.activeMedicationsCount} Active Meds • Age {p.age}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Adherence:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{p.adherenceRatePct}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Profile Caregiver Dashboard */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-700/60 pb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-3xl ${selectedProfile.avatarColor} text-white flex items-center justify-center font-black text-xl shadow-lg`}>
              {selectedProfile.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {selectedProfile.name}'s Health Profile
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-500 border border-brand-500/20">
                  {selectedProfile.relation}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
                Caregiver Monitoring Enabled • Age {selectedProfile.age}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Configure Caregiver Alerts</span>
            </button>
          </div>
        </div>

        {/* Health Metrics & Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-500 block">
              Active Prescriptions ({selectedProfile.activeMedicationsCount})
            </span>
            <ul className="space-y-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                <span>Dolo 650mg</span>
                <span className="text-emerald-500 font-bold">1 Daily</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                <span>Metformin 500mg</span>
                <span className="text-emerald-500 font-bold">2 Daily</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-500 block">
              Documented Allergies
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedProfile.allergies.length > 0 ? (
                selectedProfile.allergies.map((alg, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-600 border border-red-500/20">
                    ⚠️ {alg}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400 italic">No known drug allergies reported</span>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-500 block">
              Chronic Medical Conditions
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedProfile.conditions.map((cond, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  🩺 {cond}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
