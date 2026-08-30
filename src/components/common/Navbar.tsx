import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Scan,
  Pill,
  FileText,
  ShieldAlert,
  GitCompare,
  MessageSquare,
  History,
  Sun,
  Moon,
  Globe,
  User as UserIcon,
  Menu,
  X,
  Package,
  Calendar,
  Siren,
  Store,
  Stethoscope,
  Users,
  BarChart3,
  Sparkles,
  QrCode,
  FileQuestion,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { SupportedLanguage } from '../../services/translationService';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { user } = useAuth();
  const { setTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const mainNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Pill },
    { path: '/scan', label: 'AI Vision Scan', icon: Scan, highlight: true },
    { path: '/recovery', label: 'Lost Rx Recovery', icon: FileQuestion },
    { path: '/prescriptions', label: 'Rx Scanner', icon: FileText },
    { path: '/inventory', label: 'Smart Inventory', icon: Package },
    { path: '/interactions', label: 'Interactions', icon: ShieldAlert },
    { path: '/pharmacies', label: 'Pharmacies', icon: Store },
    { path: '/doctors', label: 'Doctors', icon: Stethoscope },
  ];

  const secondaryNavLinks = [
    { path: '/timeline', label: 'Intake Timeline', icon: Calendar },
    { path: '/family', label: 'Family Profiles', icon: Users },
    { path: '/analytics', label: 'Health Analytics', icon: BarChart3 },
    { path: '/insights', label: 'AI Insights Feed', icon: Sparkles },
    { path: '/authenticity', label: 'Authenticity Check', icon: QrCode },
    { path: '/chat', label: 'AI Assistant', icon: MessageSquare },
    { path: '/history', label: 'Scan History', icon: History },
    { path: '/admin', label: 'Admin Console', icon: Lock },
  ];

  const handleLangChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            <Scan className="w-5 h-5 animate-pulse-slow" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight gradient-text">MEDSCAN AI</span>
            <span className="hidden sm:block text-[9px] uppercase font-bold tracking-widest text-brand-500">
              Smart Medication Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/70 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
          {mainNavLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  active
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                } ${link.highlight ? 'text-brand-500 font-extrabold' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 ${link.highlight ? 'text-brand-500' : ''}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50"
            >
              <span>More Modules</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {moreMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-2xl shadow-xl py-2 z-50 border border-slate-200/80 dark:border-slate-700/80 space-y-0.5">
                {secondaryNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMoreMenuOpen(false)}
                      className="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-brand-500/10 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand-500" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Controls: Emergency Mode Button, Dark Mode, Language, Profile */}
        <div className="flex items-center gap-2">
          {/* Emergency Mode Speed Button */}
          <Link
            to="/emergency"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-500/30 transition-transform hover:scale-105 animate-pulse"
          >
            <Siren className="w-4 h-4" />
            <span className="hidden sm:inline">Emergency</span>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Auth Profile Button */}
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-brand-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {user.displayName?.[0] || 'U'}
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[90px] truncate hidden sm:inline">
                {user.displayName}
              </span>
            </Link>
          ) : (
            <button
              onClick={onOpenAuth}
              className="gradient-bg-primary px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1.5 max-h-[80vh] overflow-y-auto">
          {[...mainNavLinks, ...secondaryNavLinks].map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                  active
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
