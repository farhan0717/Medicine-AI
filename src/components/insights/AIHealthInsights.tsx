import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mock_ai_insights } from '../../data/medicineDatabase';
import {
  Sparkles,
  AlertTriangle,
  Calendar,
  Sun,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AIHealthInsights: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Actionable Healthcare Intelligence Feed</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Proactive AI Health Insights & Alerts
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            MedScan AI continuously monitors your scanning history, inventory depletion, adherence schedules, and storage warnings to provide actionable guidance.
          </p>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {mock_ai_insights.map((insight) => (
          <div
            key={insight.id}
            className={`glass-card rounded-3xl p-6 border transition-all space-y-3 shadow-sm ${
              insight.severity === 'critical'
                ? 'border-red-500/40 bg-gradient-to-r from-red-500/10 via-white/80 to-slate-50 dark:from-red-950/30 dark:via-slate-800 dark:to-slate-900'
                : insight.severity === 'warning'
                ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-white/80 to-slate-50 dark:from-amber-950/30 dark:via-slate-800 dark:to-slate-900'
                : 'border-slate-200 dark:border-slate-700/80'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
                    insight.severity === 'critical'
                      ? 'bg-red-500'
                      : insight.severity === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-brand-500'
                  }`}
                >
                  {insight.severity === 'critical' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : insight.severity === 'warning' ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {insight.title}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {insight.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed font-medium">
                    {insight.description}
                  </p>
                </div>
              </div>

              {insight.actionLabel && insight.actionRoute && (
                <button
                  onClick={() => navigate(insight.actionRoute!)}
                  className="px-4 py-2 rounded-xl gradient-bg-primary font-bold text-xs shadow-md whitespace-nowrap flex items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <span>{insight.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
