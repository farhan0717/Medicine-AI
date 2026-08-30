import { useState, useEffect } from 'react';
import { Reminder } from '../types';
import { getReminders, saveReminders } from '../services/storageService';

export function useReminders() {
  const [reminders, setRemindersList] = useState<Reminder[]>(() => getReminders());

  useEffect(() => {
    // Request Browser Notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const addReminder = (rem: Omit<Reminder, 'id'>) => {
    const newRem: Reminder = {
      ...rem,
      id: 'rem-' + Date.now(),
    };
    const updated = [...reminders, newRem];
    setRemindersList(updated);
    saveReminders(updated);
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map((r) => (r.id === id ? { ...r, active: !r.active } : r));
    setRemindersList(updated);
    saveReminders(updated);
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    setRemindersList(updated);
    saveReminders(updated);
  };

  return {
    reminders,
    addReminder,
    toggleReminder,
    deleteReminder,
  };
}
