import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  Database,
  UserCheck,
  Store,
  Activity,
  FileText,
  CheckCircle2,
  XCircle,
  BarChart3,
  Search,
  Lock
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'db' | 'doctors' | 'pharmacies' | 'ai' | 'audit'>('db');

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
            <Lock className="w-3.5 h-3.5 text-purple-300" />
            <span>Platform Operations & Administrative Control</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            MedScan AI Master Administration Console
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Manage pharmaceutical databases, verify healthcare practitioner credentials, audit pharmacy network compliance, and monitor AI vision model telemetry.
          </p>
        </div>

        <div className="bg-purple-500/20 px-4 py-3 rounded-2xl border border-purple-400/30 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-200 block">
            System Status
          </span>
          <span className="text-sm font-black text-emerald-400">● Operational (99.99%)</span>
        </div>
      </div>

      {/* Admin Tab Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'db', label: 'Medicine Database', icon: Database },
          { id: 'doctors', label: 'Doctor Verification (2 Pending)', icon: UserCheck },
          { id: 'pharmacies', label: 'Pharmacy Partners', icon: Store },
          { id: 'ai', label: 'AI Model Monitoring', icon: Cpu },
          { id: 'audit', label: 'System Audit Logs', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'db' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Pharmaceutical Database Records (14,280 Verified Entries)
            </h3>
            <button className="px-4 py-2 rounded-xl gradient-bg-primary font-bold text-xs shadow-md">
              + Add New Drug Entry
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Dolo 650', generic: 'Paracetamol', mfr: 'Micro Labs', status: 'Approved' },
              { name: 'Cetirizine 10', generic: 'Cetirizine HCl', mfr: 'Cipla Ltd', status: 'Approved' },
              { name: 'Amoxicillin 500', generic: 'Amoxicillin Trihydrate', mfr: 'Pfizer', status: 'Approved' },
              { name: 'Metformin 500', generic: 'Metformin HCl', mfr: 'USV Ltd', status: 'Approved' },
            ].map((drug, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">{drug.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{drug.generic} • {drug.mfr}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  ✓ {drug.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Doctor Credential Verification Queue
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Dr. Marcus Vance, MD', specialty: 'Cardiology', license: 'NMC-883921', status: 'Pending Audit' },
              { name: 'Dr. Priya Sundaram, MD', specialty: 'Neurology', license: 'NMC-449102', status: 'Pending Audit' },
            ].map((doc, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">{doc.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{doc.specialty} • License #{doc.license}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold">Approve</button>
                  <button className="px-3 py-1.5 rounded-xl bg-red-500 text-white font-bold">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            AI Computer Vision Model Performance Telemetry
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Mean Precision Score</span>
              <span className="text-2xl font-black text-emerald-500 block">98.6%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">OCR Extraction Recall</span>
              <span className="text-2xl font-black text-brand-500 block">96.4%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Inference Latency</span>
              <span className="text-2xl font-black text-purple-500 block">240 ms</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pharmacies' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Pharmacy Partner Sync & Stock API Status
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Apollo Pharmacy API Sync: <span className="text-emerald-500 font-extrabold">Active (Real-time)</span>
            </p>
            <p className="font-bold text-slate-800 dark:text-slate-200">
              CVS Pharmacy API Sync: <span className="text-emerald-500 font-extrabold">Active (Real-time)</span>
            </p>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            System Security & Audit Logs
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 text-slate-300">
              [2026-08-04 22:10:04 UTC] AUDIT_LOG: User #9924 completed AI Scan match for Dolo 650 (Confidence: 98%).
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-slate-300">
              [2026-08-04 22:08:12 UTC] AUDIT_LOG: Pharmacy Reservation Code MED-RES-491028 issued to Apollo Pharmacy.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
