import React, { useState, useEffect } from 'react';
import { ScanHistoryItem, DoseLog } from '../../types';
import { getScanHistory, toggleFavoriteScan, deleteScanFromStorage } from '../../services/storageService';
import { getDoseLogs } from '../../services/inventoryService';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Filter, Bookmark, Trash2, Download, Eye, Calendar, Pill, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { AIExplanationCard } from '../explanation/AIExplanationCard';
import { exportScanAsJSON } from '../../utils/exportUtils';

export const HistoryList: React.FC<{ favoritesOnly?: boolean }> = ({ favoritesOnly = false }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'scans' | 'intake'>('scans');
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'medicine' | 'prescription'>('all');
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    const data = await getScanHistory(user?.uid || 'guest');
    setHistory(data);

    const logs = getDoseLogs();
    setDoseLogs(logs);
  };

  const handleToggleFav = async (id: string) => {
    await toggleFavoriteScan(id, user?.uid || 'guest');
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this scan history item?')) {
      await deleteScanFromStorage(id, user?.uid || 'guest');
      loadData();
    }
  };

  const filteredScans = history.filter((item) => {
    if (favoritesOnly && !item.isFavorite) return false;
    if (filterType !== 'all' && item.type !== filterType) return false;

    const medName = (item.ocrData?.medicineName || item.aiExplanation?.medicineName || '').toLowerCase();
    const generic = (item.ocrData?.genericName || item.aiExplanation?.genericName || '').toLowerCase();
    const query = searchTerm.toLowerCase();

    return medName.includes(query) || generic.includes(query);
  });

  const filteredLogs = doseLogs.filter((log) => {
    const query = searchTerm.toLowerCase();
    return log.medicineName.toLowerCase().includes(query);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {favoritesOnly ? 'Bookmarked Medicines' : 'Medicine & Intake History'}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Audit log of scan history and medicine intake events (Completed, Skipped, Missed).
          </p>
        </div>

        {!favoritesOnly && (
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('scans')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'scans'
                  ? 'gradient-bg-primary shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Scan History Archive
            </button>
            <button
              onClick={() => setActiveTab('intake')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'intake'
                  ? 'gradient-bg-primary shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Medicine Intake Logs
            </button>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/60 dark:border-slate-700/60 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by medicine name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {!favoritesOnly && activeTab === 'scans' && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 ml-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none font-semibold"
            >
              <option value="all">All Types</option>
              <option value="medicine">Medicine Strips</option>
              <option value="prescription">Prescriptions</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Scan History */}
      {(activeTab === 'scans' || favoritesOnly) && (
        <>
          {filteredScans.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center text-slate-500 text-xs">
              No scan history records found matching your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScans.map((item) => {
                const medName = item.ocrData?.medicineName || item.aiExplanation?.medicineName || 'Medicine Item';
                const generic = item.ocrData?.genericName || item.aiExplanation?.genericName || 'Active Ingredient';
                const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div
                    key={item.id}
                    className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 space-y-4 glass-card-hover flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                        <img
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'}
                          alt={medName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex gap-1">
                          <button
                            onClick={() => handleToggleFav(item.id)}
                            className={`p-2 rounded-xl text-xs backdrop-blur-md transition-colors ${
                              item.isFavorite
                                ? 'bg-amber-400 text-slate-900'
                                : 'bg-slate-900/60 text-white hover:text-amber-400'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${item.isFavorite ? 'fill-slate-900' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {medName}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{generic}</p>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedScan(item)}
                        className="px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center gap-1 hover:bg-brand-500/20 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View AI Report</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => exportScanAsJSON(item)}
                          className="p-2 rounded-xl text-slate-400 hover:text-brand-500 transition-colors"
                          title="Export JSON"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Tab 2: Medicine Intake Logs */}
      {activeTab === 'intake' && !favoritesOnly && (
        <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-brand-500" />
            <span>Medicine Intake History Log</span>
          </h3>

          {filteredLogs.length === 0 ? (
            <p className="text-xs text-slate-600 dark:text-slate-400 py-6 text-center">No medicine intake logs recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-3 px-4">Medicine</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time Taken</th>
                    <th className="py-3 px-4">Dose Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Remaining Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {filteredLogs.map((log) => {
                    const dateObj = new Date(log.timestamp);
                    const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                    const timeStr = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                    return (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{log.medicineName}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{dateStr}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{timeStr}</td>
                        <td className="py-3 px-4">{log.doseAmount} Tablet(s)</td>
                        <td className="py-3 px-4">
                          {log.status === 'taken' ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed (Taken)
                            </span>
                          ) : log.status === 'skipped' ? (
                            <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold inline-flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Skipped
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Snoozed / Missed
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-bold text-brand-500">{log.newQuantity} remaining</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedScan && selectedScan.aiExplanation && (
        <Modal
          isOpen={!!selectedScan}
          onClose={() => setSelectedScan(null)}
          title="Clinical Report View"
          maxWidth="max-w-4xl"
        >
          <AIExplanationCard
            explanation={selectedScan.aiExplanation}
            imageUrl={selectedScan.imageUrl}
            isBookmarked={selectedScan.isFavorite}
            onBookmark={() => handleToggleFav(selectedScan.id)}
          />
        </Modal>
      )}
    </div>
  );
};
