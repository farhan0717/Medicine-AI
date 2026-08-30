import React from 'react';
import { Store, CheckCircle2, Package, Clock, ShieldCheck } from 'lucide-react';

export const PharmacyPortalView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Store className="w-3.5 h-3.5 text-amber-300" />
            <span>Pharmacy Operations & Reservation Queue</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Apollo Pharmacy Partner Portal
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Manage incoming patient medicine reservations, update real-time stock availability, and fulfill prescription pickup passes.
          </p>
        </div>
      </div>

      {/* Reservation Queue */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
          Active Medicine Reservation Passes
        </h3>

        {[
          { code: 'MED-RES-491028', patient: 'Alex Morgan', med: 'Dolo 650 (650mg)', qty: '1 Strip (10 Tabs)', status: 'Ready for Pickup' },
          { code: 'MED-RES-883012', patient: 'Robert Morgan', med: 'Metformin 500 (500mg)', qty: '2 Strips (20 Tabs)', status: 'Processing' }
        ].map((res, i) => (
          <div key={i} className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-brand-500 text-sm">{res.code}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {res.status}
              </span>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Patient: {res.patient}</p>
              <p className="text-slate-600 dark:text-slate-400">Item: {res.med} • Quantity: {res.qty}</p>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl gradient-bg-primary font-bold text-xs shadow-md">
                Confirm Handover & Dispense
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
