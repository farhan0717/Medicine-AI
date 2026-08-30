import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Play, CheckCircle2, ChevronRight, RefreshCw, X, Award } from 'lucide-react';

interface HackathonDemoBannerProps {
  onDismiss?: () => void;
}

export const HackathonDemoBanner: React.FC<HackathonDemoBannerProps> = ({ onDismiss }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '1. Computer Vision Scan',
      desc: 'Upload unknown tablet image for CV visual feature extraction.',
      route: '/scan',
    },
    {
      title: '2. Vision & Medical Analysis',
      desc: 'View 98% confidence explanation, visual keypoints & full dossier.',
      route: '/scan',
    },
    {
      title: '3. Dosage & Drug Safety',
      desc: 'Check multi-drug interaction severity & food warnings.',
      route: '/interactions',
    },
    {
      title: '4. Reserve at Nearby Pharmacy',
      desc: 'Locate nearby pharmacies and reserve pill in 1 click.',
      route: '/pharmacies',
    },
    {
      title: '5. Set Smart Reminder',
      desc: 'Add dosage schedule to inventory and family profile.',
      route: '/inventory',
    },
    {
      title: '6. Tele-Health Consult',
      desc: 'Share AI report with verified doctor for consultation.',
      route: '/doctors',
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    navigate(steps[index].route);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white border-b border-brand-500/30 px-4 py-3 shadow-xl relative overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 relative z-10">
        {/* Left Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/40">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">HACKATHON DEMO WALKTHROUGH</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/30 text-brand-300 border border-brand-400/30 uppercase tracking-widest">
                Interactive Mode
              </span>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block">
              Step-by-step judge evaluation flow for MedScan AI Smart Platform
            </p>
          </div>
        </div>

        {/* Steps Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-brand-500 text-white border-brand-400 shadow-md shadow-brand-500/30 scale-105'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {isActive ? (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => handleStepClick((activeStep + 1) % steps.length)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30 transition-transform active:scale-95"
          >
            <span>Next Demo Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
