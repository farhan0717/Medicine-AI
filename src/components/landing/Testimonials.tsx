import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Dr. Ramesh Kumar, MD',
      role: 'Consultant Physician',
      text: 'MEDISCAN AI has been an invaluable asset for my elderly patients. The simple plain-language explanations of side effects and clear food timing guidelines help prevent dangerous medication errors.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Priya Sundaram',
      role: 'Family Caregiver',
      text: 'Scanning my parents daily medicine strips takes seconds now. The Tamil language translation makes it so easy for my mother to read dosage instructions herself!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Michael Vance',
      role: 'Chronic Care Patient',
      text: 'The drug interaction checker caught a conflict between my antacids and prescribed antibiotics before I took them together. Absolutely essential tool.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-brand-500">
          User Feedback
        </h2>
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Trusted By Healthcare Professionals & Caregivers
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-8 shadow-xl border border-white/60 dark:border-slate-700/60 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-brand-500/20" />
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{r.text}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{r.name}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
