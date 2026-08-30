import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, ShieldCheck, Heart, Sparkles, Cpu, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold">
                <Scan className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">MEDISCAN AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise clinical intelligence platform powering instant OCR medicine recognition, AI explanation, drug interaction verification, and prescription scanning.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 font-semibold pt-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Powered by Gemini AI 1.5 Flash</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/scan" className="hover:text-brand-400 transition-colors">Medicine Strip Scanner</Link></li>
              <li><Link to="/prescriptions" className="hover:text-brand-400 transition-colors">Prescription OCR Reader</Link></li>
              <li><Link to="/interactions" className="hover:text-brand-400 transition-colors">Drug Interaction Checker</Link></li>
              <li><Link to="/compare" className="hover:text-brand-400 transition-colors">Medicine Comparison Tool</Link></li>
              <li><Link to="/chat" className="hover:text-brand-400 transition-colors">AI Clinical Pharmacist Assistant</Link></li>
            </ul>
          </div>

          {/* Security & Tech */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Security & Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Privacy First Local Architecture</li>
              <li className="flex items-center gap-2"><Cpu className="w-4 h-4 text-brand-400" /> Verified Medical Registries (OpenFDA / DailyMed)</li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> Multilingual Support (EN / TA / HI)</li>
              <li>Smart Audio Dosage Alarms</li>
            </ul>
          </div>

          {/* Contact & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Medical Notice</h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              {t.disclaimerText}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MEDISCAN AI. All Rights Reserved. Enterprise Edition.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for healthcare safety.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
