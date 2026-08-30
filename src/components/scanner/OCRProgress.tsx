import React from 'react';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface OCRProgressProps {
  statusMessage: string;
  progress: number;
}

export const OCRProgress: React.FC<OCRProgressProps> = ({ statusMessage, progress }) => {
  return (
    <div className="w-full glass-card rounded-3xl p-8 border border-white/60 dark:border-slate-700/60 text-center space-y-6">
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-brand-500/20 animate-ping"></div>
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-500 to-emeraldBrand-500 text-white flex items-center justify-center shadow-xl shadow-brand-500/30">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Clinical AI Pipeline Processing
        </h3>
        <p className="text-xs text-brand-500 font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{statusMessage || 'Analyzing image...'}</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 max-w-md mx-auto">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <span>Processing</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-emeraldBrand-500 rounded-full transition-all duration-300 shadow-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
