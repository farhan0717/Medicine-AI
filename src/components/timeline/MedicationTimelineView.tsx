import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Filter,
  Check,
  XCircle,
  PauseCircle,
  PackageCheck
} from 'lucide-react';

export const MedicationTimelineView: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const timelineLogs = [
    {
      id: 'log-1',
      date: 'Today, 8:00 AM',
      medicineName: 'Dolo 650',
      dosage: '650mg - 1 Tablet',
      status: 'taken',
      profile: 'Self',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
    },
    {
      id: 'log-2',
      date: 'Yesterday, 9:00 PM',
      medicineName: 'Metformin 500',
      dosage: '500mg - 1 Tablet',
      status: 'missed',
      profile: 'Self',
      badgeColor: 'bg-red-500/10 text-red-600 border-red-500/30'
    },
    {
      id: 'log-3',
      date: 'Yesterday, 8:00 PM',
      medicineName: 'Cetirizine 10',
      dosage: '10mg - 1 Tablet',
      status: 'taken',
      profile: 'Self',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
    },
    {
      id: 'log-4',
      date: '02 Aug 2026',
      medicineName: 'Amoxicillin 500',
      dosage: '500mg - Course Completed',
      status: 'completed',
      profile: 'Self',
      badgeColor: 'bg-brand-500/10 text-brand-600 border-brand-500/30'
    },
    {
      id: 'log-5',
      date: '01 Aug 2026',
      medicineName: 'Apollo Pharmacy Refill',
      dosage: 'Purchased 30 Tablets of Metformin',
      status: 'refilled',
      profile: 'Self',
      badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/30'
    },
    {
      id: 'log-6',
      date: '28 Jul 2026',
      medicineName: 'Voveran 50',
      dosage: 'Course Paused by Dr. Sharma',
      status: 'paused',
      profile: 'Self',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/30'
    }
  ];

  const filteredLogs = filterStatus === 'all'
    ? timelineLogs
    : timelineLogs.filter((l) => l.status === filterStatus);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Top Banner Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Digital Timeline & AI Adherence Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Medication Timeline & Compliance Trends
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Track historical intake events, missed doses, refills, and course completions. AI models analyze trends to forecast long-term adherence.
          </p>
        </div>

        {/* Adherence Score Gauge Widget */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center flex-shrink-0">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300 block">
            Adherence Rating
          </span>
          <span className="text-3xl font-black text-emerald-400">92%</span>
          <span className="text-[10px] font-bold text-emerald-300 block mt-0.5">
            ↑ +4% vs Last Month
          </span>
        </div>
      </div>

      {/* AI Adherence Trend Prediction Panel */}
      <div className="glass-card rounded-3xl p-6 border border-brand-500/20 shadow-lg space-y-4 bg-gradient-to-br from-white/90 via-slate-50/80 to-brand-50/20 dark:from-slate-800/90 dark:to-slate-900">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <h3 className="font-extrabold text-sm uppercase tracking-wider">
            AI Adherence Trend Analysis & Forecast
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Optimal Time Slot
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white text-sm block">
              Morning Doses (98% Success)
            </span>
            <p className="text-slate-600 dark:text-slate-400">Highest adherence recorded between 8:00 AM - 9:00 AM.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Vulnerability Pattern
            </span>
            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm block">
              Sunday Evenings (65% Missed)
            </span>
            <p className="text-slate-600 dark:text-slate-400">Missed doses spike during weekend transitions.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Predicted 30-Day Score
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm block">
              96% Forecast
            </span>
            <p className="text-slate-600 dark:text-slate-400">Smart reminders are predicted to improve evening compliance.</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'taken', 'missed', 'completed', 'refilled', 'paused'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              filterStatus === st
                ? 'bg-brand-500 text-white border-brand-400 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredLogs.map((log) => (
          <div key={log.id} className="relative flex items-start gap-4 pl-12 group">
            {/* Dot Node */}
            <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-brand-500 border-4 border-white dark:border-slate-900 shadow-md -translate-x-1/2"></div>

            <div className="glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-700/80 hover:border-brand-500/40 transition-all flex-1 space-y-2 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {log.medicineName}
                  </h4>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{log.dosage}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${log.badgeColor}`}>
                    {log.status}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{log.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
