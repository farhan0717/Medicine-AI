import React, { useState } from 'react';
import { ShieldAlert, Plus, Trash2, AlertTriangle, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { checkDrugInteractions } from '../../services/geminiService';
import { InteractionReport, RiskLevel } from '../../types';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const InteractionChecker: React.FC = () => {
  const [selectedMeds, setSelectedMeds] = useState<string[]>([
    'Aspirin 81mg',
    'Warfarin 5mg',
  ]);
  const [inputMed, setInputMed] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<InteractionReport | null>(null);

  const presetSuggestions = [
    'Amoxicillin 500mg',
    'Paracetamol 650mg',
    'Ibuprofen 400mg',
    'Pantoprazole 40mg',
    'Gelusil Antacid',
    'Ciprofloxacin 500mg',
  ];

  const handleAddMed = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (selectedMeds.includes(trimmed)) return;
    setSelectedMeds([...selectedMeds, trimmed]);
    setInputMed('');
  };

  const handleRemoveMed = (idx: number) => {
    setSelectedMeds(selectedMeds.filter((_, i) => i !== idx));
  };

  const handleCheck = async () => {
    if (selectedMeds.length < 2) {
      alert('Please add at least 2 medicines to verify interactions.');
      return;
    }

    setLoading(true);
    try {
      const res = await checkDrugInteractions(selectedMeds);
      setReport(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (severity: RiskLevel) => {
    switch (severity) {
      case 'Safe':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">Safe Combination</span>;
      case 'Minor':
        return <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">Minor Caution</span>;
      case 'Moderate':
        return <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">Moderate Risk</span>;
      case 'Dangerous':
        return <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold animate-pulse">Dangerous Collision</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Drug Interaction Matrix</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Drug Interaction Checker
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Verify potential chemical collisions, bleeding hazards, and absorption interference between multiple medications.
        </p>
      </div>

      <DisclaimerBanner compact />

      {/* Input Selection Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Selected Medications ({selectedMeds.length})
        </h3>

        {/* Selected Med Badges */}
        <div className="flex flex-wrap gap-2">
          {selectedMeds.map((med, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-bold"
            >
              <span>{med}</span>
              <button
                onClick={() => handleRemoveMed(idx)}
                className="hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Input & Preset Quick Add */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type medicine name (e.g. Aspirin 81mg, Omeprazole)..."
              value={inputMed}
              onChange={(e) => setInputMed(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddMed(inputMed)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
            />
            <button
              onClick={() => handleAddMed(inputMed)}
              className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Quick add preset:</span>
            {presetSuggestions.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleAddMed(preset)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-brand-500/10 hover:text-brand-500 font-medium transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Run Check Button */}
        <button
          onClick={handleCheck}
          disabled={loading || selectedMeds.length < 2}
          className="w-full gradient-bg-primary py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
        >
          {loading ? (
            <span>Evaluating Chemical Collisions...</span>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>Analyze Drug Interactions</span>
            </>
          )}
        </button>
      </div>

      {/* Results Report Card */}
      {report && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Interaction Analysis Report
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">{report.summary}</p>
            </div>
            {getRiskBadge(report.overallRisk)}
          </div>

          {report.interactions.length === 0 ? (
            <div className="p-6 text-center text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-2xl font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>No severe drug collisions detected between these medications.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {report.interactions.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    item.severity === 'Dangerous'
                      ? 'bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200'
                      : item.severity === 'Moderate'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">
                      {item.med1} ⚡ {item.med2}
                    </span>
                    {getRiskBadge(item.severity)}
                  </div>

                  <p className="text-xs leading-relaxed font-medium">
                    <strong>Mechanism:</strong> {item.description}
                  </p>

                  <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 text-xs font-semibold flex items-start gap-2">
                    <Info className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span>Actionable Advice: {item.advice}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
