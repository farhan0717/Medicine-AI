import React from 'react';
import { Stethoscope, FileText, CheckCircle2, AlertCircle, Clock, Video, User } from 'lucide-react';

export const DoctorPortalView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
            <span>Healthcare Professional Clinical Desk</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Doctor Clinical Portal & Patient Consult Queue
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Review shared AI medicine identification reports, verify patient drug interaction safety, and conduct live video consultations.
          </p>
        </div>

        <div className="bg-emerald-500/20 px-4 py-3 rounded-2xl border border-emerald-400/30 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 block">
            Incoming Consults
          </span>
          <span className="text-xl font-black text-white">3 Patients Waiting</span>
        </div>
      </div>

      {/* Patient Consult Requests List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
          Shared AI Reports & Pending Consultations
        </h3>

        {[
          {
            name: 'Alex Morgan',
            time: '10 mins ago',
            medicineScanned: 'Dolo 650 (Paracetamol 650mg)',
            confidence: 98,
            notes: 'Patient requested verification for dosage adjustment due to mild fever.',
            risk: 'Safe'
          },
          {
            name: 'Eleanor Morgan',
            time: '25 mins ago',
            medicineScanned: 'Voveran 50 (Diclofenac 50mg)',
            confidence: 86,
            notes: 'Patient asked if Diclofenac can be combined with Cetirizine.',
            risk: 'Moderate Caution'
          }
        ].map((item, i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 transition-all space-y-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Shared AI Report • {item.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  AI Match: {item.confidence}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Scanned Specimen: <span className="text-brand-500">{item.medicineScanned}</span>
              </span>
              <p className="text-slate-600 dark:text-slate-400">{item.notes}</p>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <button className="px-4 py-2 rounded-xl gradient-bg-emerald font-bold text-xs shadow-md flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> Start Video Consult
              </button>
              <button className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs">
                Approve Prescribed Regimen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
