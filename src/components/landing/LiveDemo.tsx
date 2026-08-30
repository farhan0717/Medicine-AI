import React, { useState } from 'react';
import { Scan, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateVerifiedMedicineExplanation } from '../../services/geminiService';
import { AIExplanation } from '../../types';

export const LiveDemo: React.FC = () => {
  const samples = [
    {
      name: 'Amoxicillin 500mg Strip',
      img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      ocrText: 'AMOXICILLIN 500mg Capsules\nBatch: B94821 Exp: 12/2027\nPfizer Inc.',
    },
    {
      name: 'Paracetamol 650mg Pack',
      img: 'https://images.unsplash.com/photo-1550572017-edd951baa74c?w=600&auto=format&fit=crop&q=80',
      ocrText: 'PARACETAMOL 650mg Tablets\nBatch: P10294 Exp: 06/2028\nGlaxoSmithKline',
    },
    {
      name: 'Pantoprazole 40mg Bottle',
      img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
      ocrText: 'PANTOPRAZOLE 40mg Gastro-resistant\nBatch: P88321 Exp: 08/2028\nAlkem Labs',
    },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [demoResult, setDemoResult] = useState<AIExplanation | null>(null);

  const handleRunDemo = async (idx: number) => {
    setSelectedIdx(idx);
    setLoading(true);
    setDemoResult(null);

    setTimeout(async () => {
      const { explanation } = await generateVerifiedMedicineExplanation(samples[idx].ocrText, undefined, 'en');
      setDemoResult(explanation);
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/60 dark:border-slate-700/60 relative overflow-hidden">
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Try A Live Scan Right Now
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click any sample medicine below to see instant OCR text extraction and Gemini AI patient explanation in action.
          </p>
        </div>

        {/* Sample Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleRunDemo(idx)}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                selectedIdx === idx
                  ? 'border-brand-500 bg-brand-500/10 shadow-md ring-2 ring-brand-500/30'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <img src={s.img} alt={s.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{s.name}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Sample #{idx + 1}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Live Output Box */}
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 space-y-4">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-brand-400 font-semibold animate-pulse">
                Parsing text with Tesseract OCR & Gemini AI...
              </p>
            </div>
          ) : demoResult ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-base font-bold text-white">{demoResult.medicineName}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  {demoResult.genericName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="bg-slate-800/80 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-brand-400 block uppercase tracking-wider text-[10px]">
                    Primary Uses
                  </span>
                  <p>{demoResult.purpose}</p>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-emerald-400 block uppercase tracking-wider text-[10px]">
                    Dosage Instructions
                  </span>
                  <p>{demoResult.dosage.general}</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 italic bg-slate-800/40 p-3 rounded-xl">
                "{demoResult.simpleSummary}"
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              Click a sample above to generate live AI explanation.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
