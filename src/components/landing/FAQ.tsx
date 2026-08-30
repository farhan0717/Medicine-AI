import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: 'How does MEDISCAN AI extract text from medicine strips?',
      a: 'We process uploaded images using HTML5 Canvas image optimization (grayscale, contrast boost, thresholding) followed by client-side Tesseract.js OCR engine to extract raw text with high precision.',
    },
    {
      q: 'How does the AI explain the medicine in simple terms?',
      a: 'Extracted text is processed by Gemini AI clinical prompts to translate complex medical terms (like "Proton Pump Inhibitor") into layman terms (like "Stomach acid reducer taken before breakfast").',
    },
    {
      q: 'Is my scanned medical data private and secure?',
      a: 'Yes. All data is processed securely with Firebase authentication and enterprise Firestore security rules. Guest Mode scans remain local to your browser session.',
    },
    {
      q: 'Can I check interactions between multiple medicines?',
      a: 'Absolutely. The Drug Interaction Checker allows you to select any combination of scanned or custom medicines to receive instant risk ratings (Safe, Minor, Moderate, Dangerous).',
    },
    {
      q: 'Which languages are supported for AI explanations?',
      a: 'MEDISCAN AI currently supports instant translation into English, Tamil (தமிழ்), and Hindi (हिंदी).',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand-500">
          Got Questions?
        </h2>
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-4">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-white/60 dark:border-slate-700/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span>{f.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-brand-500' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
