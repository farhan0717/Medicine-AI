import React, { useState } from 'react';
import { Bell, Plus, Clock, Pill, Trash2, CheckCircle2 } from 'lucide-react';
import { useReminders } from '../../hooks/useReminders';

export const ReminderManager: React.FC = () => {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useReminders();

  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('1 Tablet');
  const [time, setTime] = useState('08:00');
  const [frequency, setFrequency] = useState<'Daily' | 'Twice Daily' | 'Weekly' | 'As Needed'>('Daily');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    addReminder({
      medicineName: medicineName.trim(),
      dosage,
      time,
      frequency,
      active: true,
    });

    setMedicineName('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Bell className="w-3.5 h-3.5" />
          <span>Medication Schedule Scheduler</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Medication Reminders
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Set automated daily dosage push notifications so you never miss an important treatment dose.
        </p>
      </div>

      {/* Add New Reminder Form */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Create New Dosage Reminder</h3>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            required
            placeholder="Medicine Name (e.g. Amoxicillin)"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-brand-500"
          />

          <input
            type="text"
            required
            placeholder="Dosage (e.g. 1 Capsule)"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-brand-500"
          />

          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-brand-500"
          />

          <button
            type="submit"
            className="gradient-bg-primary px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Schedule</span>
          </button>
        </form>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Active Dosage Schedules ({reminders.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
                rem.active
                  ? 'glass-card border-brand-500/40 shadow-lg'
                  : 'bg-slate-100/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {rem.medicineName}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {rem.dosage} • {rem.time} ({rem.frequency})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReminder(rem.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    rem.active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {rem.active ? 'Active' : 'Paused'}
                </button>
                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
