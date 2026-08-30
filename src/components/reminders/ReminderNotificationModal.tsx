import React, { useState, useEffect } from 'react';
import { Pill, Bell, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../../types';
import { getInventoryItems, logDoseIntake } from '../../services/inventoryService';
import { useAuth } from '../../contexts/AuthContext';

export const ReminderNotificationModal: React.FC = () => {
  const { user } = useAuth();
  const [activeReminderMed, setActiveReminderMed] = useState<InventoryItem | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [lowStockNotice, setLowStockNotice] = useState<string | null>(null);

  useEffect(() => {
    // Check reminders periodically (every 10 seconds or on mount)
    const checkReminders = async () => {
      const items = await getInventoryItems(user?.uid || 'guest');
      if (items.length > 0) {
        // Pick first active inventory item for active reminder popup demo
        const firstMed = items[0];
        setActiveReminderMed(firstMed);
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Web Audio API Synthesizer Beep Alarm
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
        osc.frequency.setValueAtTime(880, now + i * 0.35); // High pitch alarm tone
        gain.gain.setValueAtTime(0.4, now + i * 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.35 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.35);
        osc.stop(now + i * 0.35 + 0.22);
      }
    } catch (e) {
      console.warn("Web Audio alarm playback error:", e);
    }
  };

  useEffect(() => {
    let intervalId: any = null;
    if (showNotification) {
      playBeepAlarm();
      intervalId = setInterval(playBeepAlarm, 1500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showNotification]);

  // Handler: "Take Medicine" / "I Took Medicine"
  const handleTakeMedicine = async () => {
    if (!activeReminderMed) return;

    const updatedItem = await logDoseIntake(activeReminderMed.id, user?.uid || 'guest', 'taken');
    setShowNotification(false);

    if (updatedItem && updatedItem.currentQuantity < 5) {
      setLowStockNotice(`⚠ Only ${updatedItem.currentQuantity} tablets remaining. Consider buying this medicine.`);
    }
  };

  // Handler: "Skip"
  const handleSkipMedicine = async () => {
    if (!activeReminderMed) return;
    await logDoseIntake(activeReminderMed.id, user?.uid || 'guest', 'skipped');
    setShowNotification(false);
  };

  // Handler: "Snooze 10 min"
  const handleSnooze = async () => {
    if (!activeReminderMed) return;
    await logDoseIntake(activeReminderMed.id, user?.uid || 'guest', 'snoozed');
    setShowNotification(false);
  };

  if (!activeReminderMed && !lowStockNotice) return null;

  return (
    <>
      {/* Floating Demo Trigger Pill at bottom right */}
      {!showNotification && !lowStockNotice && activeReminderMed && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              playBeepAlarm();
              setShowNotification(true);
            }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl gradient-bg-primary text-xs font-extrabold shadow-2xl hover:scale-105 transition-all animate-bounce"
          >
            <Bell className="w-4 h-4 text-white" />
            <span>🔔 Alarm Beep Alert: {activeReminderMed.medicineName}</span>
          </button>
        </div>
      )}

      {/* Low Stock Toast Warning Banner */}
      {lowStockNotice && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50 p-4 rounded-3xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl border border-amber-300 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{lowStockNotice}</span>
          </div>
          <button
            onClick={() => setLowStockNotice(null)}
            className="p-1 text-slate-900 hover:text-black font-extrabold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Reminder Notification Modal */}
      {showNotification && activeReminderMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="w-full max-w-md glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-3xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto shadow-inner">
              <Pill className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-500 block">
                ⏰ Scheduled Dosage Reminder
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {activeReminderMed.medicineName}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Dose: <strong>{activeReminderMed.dosePerIntake} Tablet(s)</strong> • Remaining Stock: <strong>{activeReminderMed.currentQuantity} Tablets</strong>
              </p>
            </div>

            {/* Notification Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleTakeMedicine}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I Took Medicine (Decrease Count)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSnooze}
                  className="py-3 px-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Clock className="w-4 h-4" />
                  <span>Snooze 10 min</span>
                </button>

                <button
                  onClick={handleSkipMedicine}
                  className="py-3 px-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Skip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
