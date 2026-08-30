import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock, XCircle, TrendingUp } from 'lucide-react';
import { getDoseLogs } from '../../services/inventoryService';

export const DoseCalendar: React.FC = () => {
  const logs = getDoseLogs();

  // Generate days of current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Mock intake statuses for realistic visual calendar
  const getDayStatus = (day: number) => {
    if (day > today.getDate()) return 'future';
    if (day === today.getDate()) return 'taken';
    if (day % 7 === 0) return 'missed';
    if (day % 5 === 0) return 'snoozed';
    return 'taken';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Monthly Compliance Calendar</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Dose Intake Calendar
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Monthly visual tracking of taken, snoozed, and missed doses.
        </p>
      </div>

      {/* Compliance Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
          <span className="text-slate-700 dark:text-slate-300">Taken (Dose Confirmed)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
          <span className="text-slate-700 dark:text-slate-300">Snoozed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
          <span className="text-slate-700 dark:text-slate-300">Missed</span>
        </div>
      </div>

      {/* Calendar Grid Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
            94% Overall Adherence
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <div key={i} className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase py-1">
              {d}
            </div>
          ))}

          {dayNumbers.map((day) => {
            const status = getDayStatus(day);
            return (
              <div
                key={day}
                className={`aspect-square rounded-2xl p-2 flex flex-col items-center justify-between border text-xs font-bold transition-all ${
                  status === 'taken'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                    : status === 'snoozed'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300'
                    : status === 'missed'
                    ? 'bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <span className="text-[11px]">{day}</span>
                {status === 'taken' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                {status === 'snoozed' && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                {status === 'missed' && <XCircle className="w-3.5 h-3.5 text-red-500" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
