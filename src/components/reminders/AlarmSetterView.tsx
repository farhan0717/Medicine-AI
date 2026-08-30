import React, { useState, useEffect } from 'react';
import { Clock, Bell, CheckCircle2, Pill, AlertCircle, Sparkles, Volume2, Plus, Trash2 } from 'lucide-react';
import { InventoryItem } from '../../types';
import { getInventoryItems, logDoseIntake, saveInventoryItem } from '../../services/inventoryService';
import { useAuth } from '../../contexts/AuthContext';

export const AlarmSetterView: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedMedId, setSelectedMedId] = useState<string>('');
  const [alarmTimes, setAlarmTimes] = useState<string[]>(['08:00', '14:00', '20:00']);
  const [newTimeInput, setNewTimeInput] = useState('12:00');
  const [alarmsActive, setAlarmsActive] = useState(true);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    const data = await getInventoryItems(user?.uid || 'guest');
    setItems(data);
    if (data.length > 0) {
      // Default to Dolo 650 if available, else first item
      const dolo = data.find((i) => i.medicineName.toLowerCase().includes('dolo')) || data[0];
      setSelectedMedId(dolo.id);
      if (dolo.reminderTimes && dolo.reminderTimes.length > 0) {
        setAlarmTimes(dolo.reminderTimes);
      }
    }
  };

  const selectedMed = items.find((i) => i.id === selectedMedId);

  // Web Audio Alarm Synthesizer
  const playBeepAlarm = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now + i * 0.35); // 880Hz pitch
        gain.gain.setValueAtTime(0.4, now + i * 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.35 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.35);
        osc.stop(now + i * 0.35 + 0.22);
      }
    } catch (e) {
      console.warn('Web Audio alarm error:', e);
    }
  };

  const handleAddAlarmTime = () => {
    if (!newTimeInput || alarmTimes.includes(newTimeInput)) return;
    const updated = [...alarmTimes, newTimeInput].sort();
    setAlarmTimes(updated);
    saveAlarmTimes(updated);
  };

  const handleRemoveAlarmTime = (timeToRemove: string) => {
    const updated = alarmTimes.filter((t) => t !== timeToRemove);
    setAlarmTimes(updated);
    saveAlarmTimes(updated);
  };

  const saveAlarmTimes = async (times: string[]) => {
    if (!selectedMed) return;
    const updatedMed: InventoryItem = {
      ...selectedMed,
      reminderTimes: times,
    };
    await saveInventoryItem(updatedMed);
    setItems((prev) => prev.map((i) => (i.id === selectedMed.id ? updatedMed : i)));
    setStatusNotice(`✅ Alarm times updated for ${selectedMed.medicineName}`);
    setTimeout(() => setStatusNotice(null), 3000);
  };

  // Handler: "I Took Medicine" -> Deduct count in inventory immediately!
  const handleTakeMedicine = async () => {
    if (!selectedMed) return;
    const updatedItem = await logDoseIntake(selectedMed.id, user?.uid || 'guest', 'taken');
    if (updatedItem) {
      setItems((prev) => prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
      playBeepAlarm();
      setStatusNotice(`🎉 Took 1 dose of ${selectedMed.medicineName}! Remaining inventory count reduced to ${updatedItem.currentQuantity} tablets.`);
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-extrabold uppercase tracking-wider">
          <Clock className="w-4 h-4 text-brand-500" />
          <span>National Healthcare AI Suite</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Daily Medicine Alarm Setter
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Configure daily dosage alarms with audible sound beeps and automatic stock reduction tracking.
        </p>
      </div>

      {/* Status Notice Toast */}
      {statusNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs shadow-xl animate-in fade-in zoom-in duration-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{statusNotice}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Alarm Setter Configuration */}
        <div className="lg:col-span-7 space-y-6">
          {/* Medicine Selector Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-4">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
              1. Select Target Medicine:
            </label>
            <select
              value={selectedMedId}
              onChange={(e) => {
                setSelectedMedId(e.target.value);
                const match = items.find((i) => i.id === e.target.value);
                if (match?.reminderTimes) setAlarmTimes(match.reminderTimes);
              }}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500"
            >
              {items.map((med) => (
                <option key={med.id} value={med.id}>
                  💊 {med.medicineName} ({med.strength}) — Remaining Stock: {med.currentQuantity} Tablets
                </option>
              ))}
            </select>
          </div>

          {/* Alarm Schedule Manager Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Daily Alarm Schedule
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Daily recurring alarm times for {selectedMed?.medicineName || 'selected medicine'}
                </p>
              </div>

              {/* Master Alarm Toggle */}
              <button
                onClick={() => setAlarmsActive(!alarmsActive)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                  alarmsActive
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {alarmsActive ? '🔔 Alarms Active' : '🔕 Alarms Paused'}
              </button>
            </div>

            {/* Add Alarm Time Input */}
            <div className="flex gap-3">
              <input
                type="time"
                value={newTimeInput}
                onChange={(e) => setNewTimeInput(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none"
              />
              <button
                onClick={handleAddAlarmTime}
                className="px-5 py-3 rounded-2xl gradient-bg-primary text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Time</span>
              </button>
            </div>

            {/* Configured Alarm Times List */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Active Daily Reminders:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {alarmTimes.map((time, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brand-500" />
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        {time}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveAlarmTime(time)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove alarm time"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Alarm Beep Action */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={playBeepAlarm}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>🔔 Test Sound Alarm Beep</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Inventory & Instant Dose Intake Action */}
        <div className="lg:col-span-5 space-y-6">
          {selectedMed && (
            <div className="glass-card rounded-3xl p-6 border border-brand-500/30 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-wider">
                  Live Stock Tracker
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Auto-Deduct Active
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedMed.medicineName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Strength: <strong>{selectedMed.strength}</strong> • Brand: <strong>{selectedMed.brand}</strong>
                </p>
              </div>

              {/* Big Quantity Indicator */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-2 border border-slate-800 shadow-inner">
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-slate-400 block">
                  Remaining Stock Count
                </span>
                <div className="text-5xl font-black text-brand-400 tracking-tight">
                  {selectedMed.currentQuantity} <span className="text-base font-normal text-slate-300">Tablets</span>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  Dose per intake: <strong>{selectedMed.dosePerIntake} Tablet(s)</strong>
                </p>
              </div>

              {/* Direct "I Took Medicine" Inventory Deduct Action Button */}
              <button
                onClick={handleTakeMedicine}
                disabled={selectedMed.currentQuantity <= 0}
                className="w-full py-4 px-5 rounded-2xl gradient-bg-emerald text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>I Took Medicine (Reduce Count -1)</span>
              </button>

              {selectedMed.currentQuantity <= selectedMed.refillThreshold && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2 animate-pulse">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Low Stock Warning: Consider refilling soon!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
