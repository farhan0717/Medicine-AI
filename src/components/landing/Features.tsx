import React from 'react';
import {
  Scan,
  Sparkles,
  ShieldAlert,
  GitCompare,
  MessageSquare,
  FileText,
  Globe,
  Bell,
  CheckCircle2,
} from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: Scan,
      title: 'Multi-Source OCR Recognition',
      desc: 'Scan medicine strips, syrup bottles, tube labels, or printed prescriptions via live camera, drag & drop image, or clipboard paste.',
      tag: 'OCR Engine',
      color: 'from-brand-500 to-brand-600',
    },
    {
      icon: Sparkles,
      title: 'Gemini Plain-Language AI',
      desc: 'Translates complex medical jargon into easy plain language. Learn uses, mechanism, dosages, side effects, and precautions instantly.',
      tag: 'AI Intelligence',
      color: 'from-emeraldBrand-500 to-emerald-600',
    },
    {
      icon: ShieldAlert,
      title: 'Drug Interaction Matrix',
      desc: 'Select multiple medications to detect chemical collisions and risk ratings (Safe, Minor, Moderate, Dangerous) before consumption.',
      tag: 'Safety Guard',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: FileText,
      title: 'Prescription OCR Scanner',
      desc: 'Extract doctor names, hospital details, prescribed dosage timings, frequency, and treatment durations automatically.',
      tag: 'Prescriptions',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: GitCompare,
      title: 'Medicine Comparison Tool',
      desc: 'Compare active generic ingredients, therapeutic strengths, price categories, and safety warnings side-by-side.',
      tag: 'Comparison',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Globe,
      title: 'Multi-Language Translation',
      desc: 'Seamlessly translate AI explanations and dosage instructions into English, Tamil (தமிழ்), and Hindi (हिंदी).',
      tag: 'Accessibility',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: MessageSquare,
      title: 'AI Clinical Assistant Chat',
      desc: 'Ask direct health questions ("Can I take this after food?", "Is it safe for diabetics?") and receive instant pharmacist guidance.',
      tag: 'AI Chat',
      color: 'from-rose-500 to-red-600',
    },
    {
      icon: Bell,
      title: 'Smart Medication Reminders',
      desc: 'Set daily push notifications and custom dose schedules to ensure you never miss an important medication.',
      tag: 'Reminders',
      color: 'from-amber-400 to-yellow-600',
    },
  ];

  return (
    <section className="py-20 relative bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-500">
            Enterprise Feature Suite
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need For Safer Medication Management
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Designed with clinical precision for patients, caregivers, and medical professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 glass-card-hover border border-white/60 dark:border-slate-700/60 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {f.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {f.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
