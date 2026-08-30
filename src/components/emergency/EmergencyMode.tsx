import React, { useState } from 'react';
import { medicine_database } from '../../data/medicineDatabase';
import {
  Siren,
  PhoneCall,
  AlertTriangle,
  Flame,
  Activity,
  CheckCircle2,
  Search,
  ShieldAlert,
  Hospital,
  Heart
} from 'lucide-react';

export const EmergencyMode: React.FC = () => {
  const [selectedMedId, setSelectedMedId] = useState('med-dolo-650');
  const medicine = medicine_database.find((m) => m.id === selectedMedId) || medicine_database[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* High Alert Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-red-500/80 shadow-2xl bg-gradient-to-r from-red-950 via-rose-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/30 text-red-200 text-xs font-extrabold border border-red-400/40 uppercase tracking-widest">
            <Siren className="w-4 h-4 text-red-400 animate-spin-slow" />
            <span>Emergency Medical Guidance Protocol</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Emergency Toxicity & Poison First-Aid Mode
          </h1>

          <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-100 text-xs sm:text-sm font-semibold leading-relaxed">
            <strong className="block font-black text-red-300 text-base mb-1">
              ⚠️ CRITICAL EMERGENCY DISCLAIMER:
            </strong>
            If the patient is experiencing severe life-threatening symptoms (difficulty breathing, chest pain, loss of consciousness, or anaphylaxis), CALL EMERGENCY SERVICES IMMEDIATELY!
          </div>
        </div>
      </div>

      {/* 1-Tap Speed Dial Hotlines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="tel:911"
          className="p-5 rounded-3xl bg-red-600 hover:bg-red-700 text-white font-extrabold shadow-xl flex items-center justify-between transition-transform hover:scale-105"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-200 block">
              Immediate Response
            </span>
            <span className="text-xl">Call 911 / 112</span>
          </div>
          <PhoneCall className="w-7 h-7" />
        </a>

        <a
          href="tel:18002221222"
          className="p-5 rounded-3xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow-xl flex items-center justify-between transition-transform hover:scale-105"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-200 block">
              Poison Control Center
            </span>
            <span className="text-base">1-800-222-1222</span>
          </div>
          <ShieldAlert className="w-7 h-7" />
        </a>

        <button
          onClick={() => alert("Dispatching location to nearest emergency ER unit...")}
          className="p-5 rounded-3xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-extrabold shadow-xl flex items-center justify-between border border-slate-700 transition-transform hover:scale-105"
        >
          <div className="space-y-0.5 text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-brand-300 block">
              Hospital ER Finder
            </span>
            <span className="text-base">Dispatch ER Unit</span>
          </div>
          <Hospital className="w-7 h-7 text-emerald-400" />
        </button>
      </div>

      {/* Select Medicine to View Emergency Specs */}
      <div className="glass-card rounded-3xl p-6 border border-red-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            <span>Select Medicine for Toxicity & First-Aid Info</span>
          </h2>

          <select
            value={selectedMedId}
            onChange={(e) => setSelectedMedId(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-red-500/30 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
          >
            {medicine_database.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.generic_name})
              </option>
            ))}
          </select>
        </div>

        {/* Medicine Emergency Specs Card */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block">
              Maximum Recommended Daily Dose (General Info):
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block">
              {medicine.max_daily_dose}
            </span>
            <p className="text-xs text-slate-500">
              Exceeding this quantity poses acute toxicity hazards to vital organs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 block flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Overdose & Poison Risk Symptoms
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {medicine.emergency_advice}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block flex items-center gap-1.5">
                <Heart className="w-4 h-4" /> Immediate First-Aid Precautions
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Do NOT induce vomiting unless instructed by Poison Control.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Keep the medicine container/strip handy for paramedic inspection.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Keep patient seated or lying on side if nauseous.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
