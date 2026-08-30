import React from 'react';
import {
  Activity,
  TrendingUp,
  DollarSign,
  HeartPulse,
  Package,
  Calendar,
  Sparkles,
  PieChart,
  BarChart3,
  Award
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Executive Healthcare Analytics & AI Metrics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Patient Health Score & Analytics Intelligence
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Real-time visual telemetry tracking medication adherence, health score progression, healthcare expenditure, and disease incidence trends.
          </p>
        </div>

        {/* Overall Health Score Dial */}
        <div className="bg-gradient-to-tr from-brand-600 to-emerald-500 p-0.5 rounded-3xl shadow-xl flex-shrink-0">
          <div className="bg-slate-900 px-6 py-4 rounded-[23px] text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
              Patient Health Index
            </span>
            <span className="text-4xl font-black gradient-text">94 / 100</span>
            <span className="text-[10px] font-bold text-emerald-400 block">
              ★ Excellent Health Rating
            </span>
          </div>
        </div>
      </div>

      {/* Metric Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Monthly Adherence
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            94.2%
          </span>
          <span className="text-xs font-bold text-emerald-500 block">
            ↑ +2.8% vs Previous Month
          </span>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Monthly Spending
            </span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            $42.50
          </span>
          <span className="text-xs font-bold text-brand-500 block">
            Saved $14.00 using Generic Match
          </span>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Regimens
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            4 Medicines
          </span>
          <span className="text-xs font-bold text-purple-500 block">
            0 Interaction Conflicts
          </span>
        </div>

        {/* Metric 4 */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              AI Refill Forecast
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-black text-amber-600 dark:text-amber-400 block">
            Refill in 4 Days
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
            Dolo 650 Low Stock
          </span>
        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Adherence Trends Bar Chart */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-500" />
              <span>Weekly Dose Compliance Breakdown</span>
            </h3>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Target: 95%</span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="space-y-3 pt-2">
            {[
              { day: 'Mon', pct: 100, taken: '3/3' },
              { day: 'Tue', pct: 100, taken: '3/3' },
              { day: 'Wed', pct: 66, taken: '2/3' },
              { day: 'Thu', pct: 100, taken: '3/3' },
              { day: 'Fri', pct: 100, taken: '3/3' },
              { day: 'Sat', pct: 100, taken: '3/3' },
              { day: 'Sun', pct: 66, taken: '2/3' },
            ].map((d) => (
              <div key={d.day} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{d.day}</span>
                  <span>{d.taken} Doses ({d.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      d.pct === 100 ? 'bg-gradient-to-r from-brand-500 to-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${d.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Used Medicines Breakdown */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-500" />
              <span>Most Used Medicines Distribution</span>
            </h3>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">30-Day Volume</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { name: 'Metformin 500mg', count: 60, pct: 50, color: 'bg-brand-500' },
              { name: 'Dolo 650mg', count: 30, pct: 25, color: 'bg-emerald-500' },
              { name: 'Cetirizine 10mg', count: 20, pct: 17, color: 'bg-purple-500' },
              { name: 'Amoxicillin 500mg', count: 10, pct: 8, color: 'bg-amber-500' },
            ].map((m) => (
              <div key={m.name} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${m.color}`}></div>
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">{m.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">{m.count} Tablets ({m.pct}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
