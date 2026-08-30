import React from 'react';
import { ScanHistoryItem } from '../../types';
import { Pill, Calendar, Star, Trash2, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentScansProps {
  scans: ScanHistoryItem[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onSelectScan: (scan: ScanHistoryItem) => void;
}

export const RecentScans: React.FC<RecentScansProps> = ({
  scans,
  onToggleFavorite,
  onDelete,
  onSelectScan,
}) => {
  if (scans.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-4 border border-white/60 dark:border-slate-700/60">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
          <Pill className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white">No Scans Recorded Yet</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          Scan your first medicine strip or prescription to view instant AI analysis and dosage instructions.
        </p>
        <Link
          to="/scan"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-bg-primary text-xs font-bold shadow-md"
        >
          <span>Scan Medicine Now</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Pill className="w-5 h-5 text-brand-500" />
          <span>Recent Scans</span>
        </h3>
        <Link
          to="/history"
          className="text-xs font-bold text-brand-500 hover:underline flex items-center gap-1"
        >
          <span>View All ({scans.length})</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {scans.slice(0, 4).map((scan) => {
          const medName = scan.ocrData?.medicineName || scan.aiExplanation?.medicineName || 'Medicine Item';
          const generic = scan.ocrData?.genericName || scan.aiExplanation?.genericName || 'Active Ingredient';
          const dateStr = new Date(scan.timestamp).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={scan.id}
              className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-500/50 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={scan.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'}
                  alt={medName}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {medName}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">{generic}</p>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{dateStr}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleFavorite(scan.id)}
                  className={`p-2 rounded-xl text-xs transition-colors ${
                    scan.isFavorite
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  title="Bookmark medicine"
                >
                  <Star className={`w-4 h-4 ${scan.isFavorite ? 'fill-amber-400' : ''}`} />
                </button>
                <button
                  onClick={() => onSelectScan(scan)}
                  className="p-2 rounded-xl text-brand-500 hover:bg-brand-500/10 transition-colors"
                  title="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
