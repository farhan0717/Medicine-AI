import React from 'react';
import { Pill, AlertTriangle, Clock, CheckCircle2, Bell, TrendingUp } from 'lucide-react';

interface MetricsCardsProps {
  totalMedicines: number;
  medicinesRunningLow: number;
  todaysRemainingDose: number;
  todaysCompletedDose: number;
  upcomingReminderText: string;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  totalMedicines,
  medicinesRunningLow,
  todaysRemainingDose,
  todaysCompletedDose,
  upcomingReminderText,
}) => {
  const metrics = [
    {
      title: 'Total Medicines',
      value: totalMedicines,
      icon: Pill,
      color: 'from-brand-500 to-brand-600',
      change: 'Active in stock',
    },
    {
      title: 'Medicines Running Low',
      value: medicinesRunningLow,
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-600',
      change: medicinesRunningLow > 0 ? '⚠ Stock low (< 5 tablets)' : 'All stocks healthy',
    },
    {
      title: "Today's Remaining Dose",
      value: todaysRemainingDose,
      icon: Clock,
      color: 'from-purple-500 to-indigo-600',
      change: 'Doses left today',
    },
    {
      title: "Today's Completed Dose",
      value: todaysCompletedDose,
      icon: CheckCircle2,
      color: 'from-emeraldBrand-500 to-emerald-600',
      change: 'Taken today',
    },
    {
      title: 'Upcoming Reminder',
      value: upcomingReminderText,
      icon: Bell,
      color: 'from-cyan-500 to-blue-600',
      change: 'Scheduled alarm',
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 shadow-lg space-y-3 glass-card-hover flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {m.title}
              </span>
              <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className={m.isText ? "text-base font-extrabold text-slate-900 dark:text-white truncate" : "text-3xl font-black text-slate-900 dark:text-white"}>
              {m.value}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span className="truncate">{m.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
