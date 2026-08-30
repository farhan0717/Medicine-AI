import React, { useState } from 'react';
import { mock_doctors } from '../../data/medicineDatabase';
import { DoctorProfile } from '../../types';
import {
  Stethoscope,
  Video,
  MessageSquare,
  Share2,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  FileText,
  UserCheck,
  Award
} from 'lucide-react';

export const DoctorNetwork: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [videoConsultOpen, setVideoConsultOpen] = useState(false);
  const [reportShared, setReportShared] = useState(false);

  const handleConsult = (doctor: DoctorProfile) => {
    setSelectedDoctor(doctor);
    setVideoConsultOpen(true);
  };

  const handleShareReport = () => {
    setReportShared(true);
    setTimeout(() => setReportShared(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <Stethoscope className="w-3.5 h-3.5 text-amber-300" />
            <span>Tele-Health Medical Network</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Consult Verified Healthcare Professionals
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Connect with certified doctors, share your AI medicine identification reports, verify prescribed regimens, and schedule video consultations securely with patient consent.
          </p>
        </div>
      </div>

      {/* Doctor Directory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mock_doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 hover:border-brand-500/40 transition-all flex flex-col justify-between space-y-5 shadow-sm group"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {doctor.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-brand-500 block">
                    {doctor.specialty}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    {doctor.hospital}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {doctor.bio}
              </p>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{doctor.rating} Rating</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-500" />
                  <span>{doctor.experienceYears} Yrs Exp</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                <span>Fee: {doctor.consultationFee}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {doctor.availableNext}
                </span>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <button
                onClick={() => handleConsult(doctor)}
                className="w-full py-2.5 rounded-xl gradient-bg-primary font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Instant Video Consult</span>
              </button>

              <button
                onClick={handleShareReport}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 text-emerald-500" />
                <span>{reportShared ? '✓ Report Shared!' : 'Share AI Medicine Report'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Consultation Interactive Modal */}
      {videoConsultOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card rounded-3xl max-w-2xl w-full p-6 space-y-5 border border-brand-500/40 shadow-2xl relative bg-slate-900 text-white">
            <button
              onClick={() => setVideoConsultOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-400">
                Live Encryption Feed • HD 1080p
              </span>
            </div>

            {/* Mock Tele-Health Video Call View */}
            <div className="w-full h-72 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <img
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                <Stethoscope className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="font-bold text-xs text-white block">{selectedDoctor.name}</span>
                  <span className="text-[10px] text-slate-300 block">{selectedDoctor.specialty}</span>
                </div>
              </div>

              {/* Patient Self-View PIP */}
              <div className="absolute top-4 right-4 w-28 h-20 rounded-xl bg-slate-800 border-2 border-brand-500 overflow-hidden shadow-lg flex items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400">You (Patient)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareReport}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>{reportShared ? 'AI Dossier Transmitted' : 'Transmit AI Report'}</span>
                </button>
              </div>

              <button
                onClick={() => setVideoConsultOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg"
              >
                End Consultation Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
