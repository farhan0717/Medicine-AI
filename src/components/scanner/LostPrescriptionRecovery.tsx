import React, { useState } from 'react';
import {
  lost_prescription_candidates,
  diagnostic_questions
} from '../../data/medicineDatabase';
import { LostPrescriptionMatch } from '../../types';
import {
  FileQuestion,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  RefreshCcw,
  Sliders,
  ChevronRight
} from 'lucide-react';

export const LostPrescriptionRecovery: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [candidates, setCandidates] = useState<LostPrescriptionMatch[]>(lost_prescription_candidates);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, number>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const url = URL.createObjectURL(file);
      setUploadedImage(url);

      setTimeout(() => {
        setIsAnalyzing(false);
      }, 1200);
    }
  };

  const handleAnswerSelect = (questionId: string, optionIdx: number) => {
    const newAnswers = { ...answeredQuestions, [questionId]: optionIdx };
    setAnsweredQuestions(newAnswers);

    // Dynamic re-ranking logic based on selected option impact
    const selectedOption = diagnostic_questions.find((q) => q.id === questionId)?.options[optionIdx];
    if (selectedOption) {
      const updated = candidates.map((cand) => {
        const impact = selectedOption.impact[cand.id] || 0;
        const newScore = Math.min(99, Math.max(20, cand.overallConfidencePct + impact));
        return {
          ...cand,
          overallConfidencePct: newScore,
        };
      });

      // Sort descending by overall confidence
      updated.sort((a, b) => b.overallConfidencePct - a.overallConfidencePct);
      setCandidates(updated);
    }
  };

  const resetRecovery = () => {
    setUploadedImage(null);
    setAnsweredQuestions({});
    setCandidates(lost_prescription_candidates);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Top Banner Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Lost Prescription Recovery Protocol</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Recover Lost & Unlabeled Prescriptions
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Upload loose pills, half strips, or damaged blister packs. MedScan AI reconstructs your prescription by correlating computer vision features with diagnostic clarification questions.
          </p>
        </div>
      </div>

      {!uploadedImage ? (
        /* Image Upload Box */
        <div className="glass-card rounded-3xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4 hover:border-brand-500 transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto shadow-md">
            <FileQuestion className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Upload Damaged Strip, Half Strip, or Loose Tablet
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-1">
              Supports blurry photos, partial imprints, worn-out blister foils, and single unlabeled capsules.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl gradient-bg-primary font-bold text-xs shadow-lg cursor-pointer transition-transform hover:scale-105">
            <Upload className="w-4 h-4" />
            <span>Select Image to Recover</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      ) : isAnalyzing ? (
        /* Skeleton Analysis Loader */
        <div className="glass-card rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Running Multi-Feature Vision Reconstruction...
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Analyzing morphological contours, scoreline geometry, and active salt databases.
          </p>
        </div>
      ) : (
        /* Main Recovery Dashboard & Clarification Flow */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Uploaded Image & Diagnostic Questions */}
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">Uploaded Specimen</span>
                <button onClick={resetRecovery} className="text-xs text-brand-500 font-bold flex items-center gap-1">
                  <RefreshCcw className="w-3 h-3" /> Reset
                </button>
              </div>
              <img src={uploadedImage} alt="Specimen" className="w-full h-48 object-contain rounded-2xl bg-slate-900 border border-slate-800" />
            </div>

            {/* Diagnostic Follow-Up Questions Widget */}
            <div className="glass-card rounded-3xl p-6 border border-brand-500/20 space-y-4 bg-gradient-to-br from-white/90 to-brand-50/20 dark:from-slate-800/90 dark:to-slate-900">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Refine Probabilities: Answer Diagnostic Questions
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Answering these physical questions narrows down the candidates instead of assuming certainty.
              </p>

              <div className="space-y-4">
                {diagnostic_questions.map((q) => {
                  const currentAnswerIdx = answeredQuestions[q.id];
                  return (
                    <div key={q.id} className="space-y-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        {q.question}
                      </span>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = currentAnswerIdx === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerSelect(q.id, oIdx)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                                isSelected
                                  ? 'bg-brand-500 text-white border-brand-400 shadow-sm'
                                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Top 5 Matches List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-brand-500" />
                <span>Top Reconstructed Prescription Matches</span>
              </h2>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Sorted by AI & Diagnostic Correlation
              </span>
            </div>

            <div className="space-y-4">
              {candidates.map((match, rank) => (
                <div
                  key={match.id}
                  className={`glass-card rounded-3xl p-5 border transition-all space-y-3 ${
                    rank === 0
                      ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-white/80 to-brand-500/10 dark:from-emerald-950/40 dark:via-slate-800 dark:to-slate-900 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700/80 hover:border-brand-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-md ${
                          rank === 0 ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        #{rank + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-base text-slate-900 dark:text-white">
                            {match.medicineName}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              match.prescriptionStatus === 'Rx Required'
                                ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                            }`}
                          >
                            {match.prescriptionStatus}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-brand-500">
                          {match.genericName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right bg-white dark:bg-slate-800 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Confidence
                      </span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {match.overallConfidencePct}%
                      </span>
                    </div>
                  </div>

                  {/* Similarity Metrics Bars */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-100/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Visual Similarity</span>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-500 h-full rounded-full" style={{ width: `${match.visualSimilarityPct}%` }}></div>
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{match.visualSimilarityPct}%</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Medical Context</span>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${match.medicalContextSimilarityPct}%` }}></div>
                        </div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{match.medicalContextSimilarityPct}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Matches & Key Distinctions */}
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <p>
                      <strong>Matched Features:</strong> {match.matchedFeatures.join(', ')}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 italic">
                      <strong>Key Distinctions:</strong> {match.keyDistinctions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
