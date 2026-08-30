import React, { useState } from 'react';
import { GitCompare, CheckCircle2, ShieldAlert, DollarSign, Award, Plus, Trash2 } from 'lucide-react';
import { MedicineComparisonItem } from '../../types';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const ComparisonTable: React.FC = () => {
  const [selectedList, setSelectedList] = useState<MedicineComparisonItem[]>([
    {
      name: 'Amoxicillin 500mg',
      genericName: 'Amoxicillin Trihydrate',
      purpose: 'Bacterial respiratory & throat infection treatment',
      strength: '500 mg',
      priceCategory: 'Low-cost Generic',
      manufacturer: 'Pfizer Inc.',
      sideEffectsSummary: 'Mild nausea, diarrhea, skin rash',
      safetyRating: 'FDA Approved Category B',
    },
    {
      name: 'Azithromycin 500mg',
      genericName: 'Azithromycin Dihydrate',
      purpose: 'Short 3-day course bacterial antibiotic',
      strength: '500 mg',
      priceCategory: 'Standard Generic',
      manufacturer: 'Teva Pharma',
      sideEffectsSummary: 'Stomach upset, mild headache',
      safetyRating: 'FDA Approved Category B',
    },
  ]);

  const [inputName, setInputName] = useState('');

  const handleAddCustom = () => {
    if (!inputName.trim()) return;
    const newItem: MedicineComparisonItem = {
      name: inputName.trim(),
      genericName: inputName.trim() + ' Active Salt',
      purpose: 'Therapeutic treatment for specified condition',
      strength: '500 mg',
      priceCategory: 'Standard Brand',
      manufacturer: 'Pharma Industry',
      sideEffectsSummary: 'Consult doctor for individual side effects',
      safetyRating: 'Clinical Grade',
    };
    setSelectedList([...selectedList, newItem]);
    setInputName('');
  };

  const handleRemove = (idx: number) => {
    setSelectedList(selectedList.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Side-by-Side Comparison Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Medicine Comparison Tool
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Compare active generic ingredients, therapeutic purpose, price tier, side effect profiles, and safety ratings.
        </p>
      </div>

      <DisclaimerBanner compact />

      {/* Add Custom Medicine */}
      <div className="glass-card rounded-2xl p-4 flex gap-2 border border-white/60 dark:border-slate-700/60">
        <input
          type="text"
          placeholder="Type medicine name to add to comparison..."
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none"
        />
        <button
          onClick={handleAddCustom}
          className="px-4 py-2.5 rounded-xl gradient-bg-primary text-xs font-bold flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Comparison Grid Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/60 dark:border-slate-700/60 shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60">
              <th className="p-4 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider w-1/4">
                Comparison Field
              </th>
              {selectedList.map((m, idx) => (
                <th key={idx} className="p-4 text-sm font-extrabold text-brand-600 dark:text-brand-400">
                  <div className="flex items-center justify-between">
                    <span>{m.name}</span>
                    {selectedList.length > 2 && (
                      <button
                        onClick={() => handleRemove(idx)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Generic Ingredient
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4 font-semibold text-brand-500">{m.genericName}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Primary Purpose
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4">{m.purpose}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Therapeutic Strength
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4 font-bold">{m.strength}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Price Category
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {m.priceCategory}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Manufacturer
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4">{m.manufacturer}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Side Effects Profile
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4 text-slate-600 dark:text-slate-400">{m.sideEffectsSummary}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30">
                Safety Rating
              </td>
              {selectedList.map((m, i) => (
                <td key={i} className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                  {m.safetyRating}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
