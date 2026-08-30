import React from 'react';
import { CVFeatureAnalysis } from '../../types';
import {
  Ruler,
  Maximize2,
  Palette,
  FileCode2,
  CheckCircle,
  Package,
  Layers,
  Sparkles,
  Search,
  Building2
} from 'lucide-react';

interface CVFeatureMatrixProps {
  cvData: CVFeatureAnalysis;
  confidenceScore: number;
}

export const CVFeatureMatrix: React.FC<CVFeatureMatrixProps> = ({ cvData, confidenceScore }) => {
  return (
    <div className="glass-card rounded-3xl p-6 border border-brand-500/20 shadow-xl space-y-6 bg-gradient-to-br from-white/90 via-slate-50/80 to-brand-50/30 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900/90">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-700/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Computer Vision Feature Extraction
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                AI Vision Active
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-resolution geometric, morphological, and OCR extraction matrix
            </p>
          </div>
        </div>

        {/* Confidence Dial Badge */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">
              Visual Match Confidence
            </span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
              {confidenceScore}%
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-brand-500 animate-spin-slow flex items-center justify-center font-bold text-xs text-emerald-600 dark:text-emerald-400">
            ✓
          </div>
        </div>
      </div>

      {/* Grid of CV Parameters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Shape */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <Layers className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Shape & Form
            </span>
          </div>
          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 block">
            {cvData.shape}
          </span>
        </div>

        {/* Dimensions */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <Ruler className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Est. Dimensions
            </span>
          </div>
          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 block">
            {cvData.estimatedLengthMm} × {cvData.estimatedWidthMm} mm
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
            Thickness: ~{cvData.estimatedThicknessMm} mm
          </span>
        </div>

        {/* Color */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <Palette className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Color & Spectrum
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shadow-sm"
              style={{ backgroundColor: cvData.colorHex }}
            ></span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
              {cvData.primaryColor}
            </span>
          </div>
        </div>

        {/* Imprint OCR */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <FileCode2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Imprint OCR
            </span>
          </div>
          <span className="text-sm font-mono font-extrabold text-brand-600 dark:text-brand-300 block">
            "{cvData.imprintOcr}"
          </span>
        </div>

        {/* Texture & Coating */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <Maximize2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Surface Texture
            </span>
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
            {cvData.texture}
          </span>
        </div>

        {/* Score Line */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Score Line / Notch
            </span>
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
            {cvData.scoreLine}
          </span>
        </div>

        {/* Manufacturer Logo */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <Building2 className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mfr. Logo Check
            </span>
          </div>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
            {cvData.manufacturerLogoDetected ? `✓ ${cvData.detectedLogoName}` : 'None Detected'}
          </span>
        </div>

        {/* Packaging Check */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <Package className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Packaging Format
            </span>
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
            {cvData.packagingDetected ? cvData.packagingType : 'Loose Tablet'}
          </span>
        </div>
      </div>
    </div>
  );
};
