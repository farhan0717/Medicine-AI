import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, ShieldCheck, Calendar, LogOut, Award, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfileCard: React.FC = () => {
  const { user, isGuest, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 max-w-2xl mx-auto shadow-xl border border-white/50 dark:border-slate-700/60">
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-500 to-emeraldBrand-500 text-white font-extrabold text-3xl flex items-center justify-center shadow-xl shadow-brand-500/20">
          {user.displayName?.[0] || 'U'}
        </div>

        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.displayName}</h2>
            {isGuest ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                Guest Mode
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>{user.email}</span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      {/* Subscription Tier Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 to-emeraldBrand-500/10 border border-brand-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-500 text-white rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {user.subscriptionTier === 'premium' ? 'Enterprise Pro Tier' : 'Standard Free Tier'}
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {user.subscriptionTier === 'premium'
                ? 'Unlimited OCR Scans & Multi-Language Gemini API'
                : 'Free tier active (Upgrade for unlimited drug interaction history)'}
            </p>
          </div>
        </div>
        {user.subscriptionTier !== 'premium' && (
          <button className="px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all">
            Upgrade
          </button>
        )}
      </div>

      {/* Action Controls */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
