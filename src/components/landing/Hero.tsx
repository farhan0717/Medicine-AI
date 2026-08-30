import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, Sparkles, ShieldCheck, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Glow background circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/15 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emeraldBrand-500/15 dark:bg-emeraldBrand-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Next-Gen Medical OCR & Gemini AI Pharmacist</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
            >
              Scan Any Medicine. <br className="hidden sm:block" />
              Understand It In{' '}
              <span className="gradient-text">Simple Plain Language.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Instant OCR text extraction for medicine strips, bottles, and prescriptions. Powered by Gemini AI to explain dosages, side effects, safety warnings, and drug interactions in English, Tamil, and Hindi.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                to="/scan"
                className="w-full sm:w-auto gradient-bg-primary px-8 py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-brand-500/25 hover:scale-105 transition-all"
              >
                <Scan className="w-5 h-5" />
                <span>Scan Medicine Now (Dolo 650)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/alarms"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl gradient-bg-emerald text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                <span>⏰ Set Daily Alarms</span>
              </Link>
            </motion.div>

            {/* Quick feature checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emeraldBrand-500" />
                <span>Client-Side Tesseract OCR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emeraldBrand-500" />
                <span>Gemini Clinical Intelligence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emeraldBrand-500" />
                <span>100% HIPAA Private</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Glass Card Scanner Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-500 to-emeraldBrand-500 rounded-3xl blur-xl opacity-30 animate-pulse-slow"></div>

              {/* Glass Card Container */}
              <div className="relative glass-card rounded-3xl p-6 shadow-2xl border border-white/60 dark:border-slate-700/80 space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Live Scan Engine
                  </span>
                </div>

                {/* Medicine Strip Image Preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
                    alt="Medicine Strip Scan Preview"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  {/* Animated Laser Scanning Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-glow animate-scan-line"></div>

                  {/* Detected OCR Bounding Boxes */}
                  <div className="absolute top-4 left-6 px-2.5 py-1 rounded-lg bg-brand-500/80 text-white text-[10px] font-bold backdrop-blur-sm animate-pulse">
                    Detected: Amoxicillin 500mg
                  </div>
                  <div className="absolute bottom-4 right-6 px-2.5 py-1 rounded-lg bg-emerald-500/80 text-white text-[10px] font-bold backdrop-blur-sm">
                    EXP: 12/2027
                  </div>
                </div>

                {/* Extracted AI Summary Widget */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Amoxicillin 500 mg
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      98% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    <strong>Primary Use:</strong> Broad-spectrum antibiotic for respiratory & throat infections.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-semibold">
                      Take After Food
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-semibold">
                      Avoid Alcohol
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
