import React, { useState, useEffect } from 'react';
import { MetricsCards } from './MetricsCards';
import { RecentScans } from './RecentScans';
import { QuickActions } from './QuickActions';
import { ScanHistoryItem, InventoryItem, DoseLog } from '../../types';
import { getScanHistory, toggleFavoriteScan, deleteScanFromStorage } from '../../services/storageService';
import { getInventoryItems, getDoseLogs } from '../../services/inventoryService';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../common/Modal';
import { AIExplanationCard } from '../explanation/AIExplanationCard';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanHistoryItem[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    const userId = user?.uid || 'guest';
    const scanList = await getScanHistory(userId);
    setScans(scanList);

    const invList = await getInventoryItems(userId);
    setInventoryItems(invList);

    const logs = getDoseLogs();
    setDoseLogs(logs);
  };

  const handleFavoriteToggle = async (id: string) => {
    await toggleFavoriteScan(id, user?.uid || 'guest');
    loadDashboardData();
  };

  const handleDelete = async (id: string) => {
    await deleteScanFromStorage(id, user?.uid || 'guest');
    loadDashboardData();
  };

  // Student Dashboard Metrics Computation
  const totalMeds = inventoryItems.length;
  const runningLowMeds = inventoryItems.filter((i) => i.currentQuantity < 5).length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysTakenCount = doseLogs.filter(
    (l) => l.status === 'taken' && l.timestamp.startsWith(todayStr)
  ).length;

  const totalDailyDosesScheduled = inventoryItems.reduce((acc, i) => acc + (i.timesPerDay || 2), 0);
  const todaysRemainingDoses = Math.max(0, totalDailyDosesScheduled - todaysTakenCount);

  // Compute upcoming reminder text (e.g. 09:00 AM - Dolo 650)
  let upcomingReminder = '09:00 AM - Dolo 650';
  if (inventoryItems.length > 0) {
    const firstMed = inventoryItems[0];
    const time = firstMed.reminderTimes?.[0] || '09:00';
    upcomingReminder = `${time} - ${firstMed.medicineName}`;
  }

  // Chart data
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Scans Processed',
        data: [4, 7, 3, 8, 12, 6, 9],
        backgroundColor: 'rgba(14, 165, 233, 0.7)',
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Safe', 'Minor Caution', 'Moderate Risk', 'Dangerous'],
    datasets: [
      {
        data: [18, 5, 2, 0],
        backgroundColor: ['#10B981', '#38BDF8', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner Greeting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.displayName || 'Guest User'} 👋
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clinical Pharmacist AI Dashboard • Real-time OCR & Safety Engine
          </p>
        </div>
      </div>

      {/* 5 Required Metric Cards Grid */}
      <MetricsCards
        totalMedicines={totalMeds}
        medicinesRunningLow={runningLowMeds}
        todaysRemainingDose={todaysRemainingDoses}
        todaysCompletedDose={todaysTakenCount}
        upcomingReminderText={upcomingReminder}
      />

      {/* Quick Action Shortcuts */}
      <QuickActions />

      {/* Charts + Recent Scans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Scans */}
        <div className="lg:col-span-7 space-y-6">
          <RecentScans
            scans={scans}
            onToggleFavorite={handleFavoriteToggle}
            onDelete={handleDelete}
            onSelectScan={(s) => setSelectedScan(s)}
          />
        </div>

        {/* Right: Health Analytics Charts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Scan Volume</h3>
            <div className="h-48">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Safety Breakdown</h3>
            <div className="h-44 flex items-center justify-center">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedScan && selectedScan.aiExplanation && (
        <Modal isOpen={!!selectedScan} onClose={() => setSelectedScan(null)} title="Scan Detail Analysis" maxWidth="max-w-4xl">
          <AIExplanationCard explanation={selectedScan.aiExplanation} imageUrl={selectedScan.imageUrl} />
        </Modal>
      )}
    </div>
  );
};
