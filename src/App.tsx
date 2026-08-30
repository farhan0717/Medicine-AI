import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { HackathonDemoBanner } from './components/common/HackathonDemoBanner';
import { PortalSwitcher, RolePortal } from './components/common/PortalSwitcher';

// Landing Page Components
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { LiveDemo } from './components/landing/LiveDemo';
import { Stats } from './components/landing/Stats';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { Pricing } from './components/landing/Pricing';

// Dashboard & Tool Components
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ImageUploader } from './components/scanner/ImageUploader';
import { CameraCapture } from './components/scanner/CameraCapture';
import { OCRProgress } from './components/scanner/OCRProgress';
import { AIExplanationCard } from './components/explanation/AIExplanationCard';
import { LostPrescriptionRecovery } from './components/scanner/LostPrescriptionRecovery';
import { PrescriptionScanner } from './components/prescription/PrescriptionScanner';
import { InteractionChecker } from './components/interactions/InteractionChecker';
import { ComparisonTable } from './components/comparison/ComparisonTable';
import { ChatWindow } from './components/chatbot/ChatWindow';
import { HistoryList } from './components/history/HistoryList';
import { ReminderManager } from './components/reminders/ReminderManager';
import { AlarmSetterView } from './components/reminders/AlarmSetterView';
import { ReminderNotificationModal } from './components/reminders/ReminderNotificationModal';
import { SettingsView } from './components/settings/SettingsView';
import { ProfileCard } from './components/auth/ProfileCard';

// Inventory & Calendar Components
import { InventoryManager } from './components/inventory/InventoryManager';
import { DoseCalendar } from './components/inventory/DoseCalendar';

// Advanced Platform Feature Components
import { PharmacyFinder } from './components/pharmacies/PharmacyFinder';
import { DoctorNetwork } from './components/doctors/DoctorNetwork';
import { EmergencyMode } from './components/emergency/EmergencyMode';
import { MedicationTimelineView } from './components/timeline/MedicationTimelineView';
import { FamilyProfiles } from './components/family/FamilyProfiles';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { AIHealthInsights } from './components/insights/AIHealthInsights';
import { MedicineAuthenticity } from './components/authenticity/MedicineAuthenticity';

// Role Portals
import { AdminConsole } from './components/admin/AdminConsole';
import { DoctorPortalView } from './components/portals/DoctorPortalView';
import { PharmacyPortalView } from './components/portals/PharmacyPortalView';

import { useScanMedicine } from './hooks/useScanMedicine';

const queryClient = new QueryClient();

function MainScannerView() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const { loading, statusMessage, progress, aiExplanation, currentScan, scanImage, resetScan } =
    useScanMedicine();

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 sm:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Computer Vision AI Medicine Identification
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Upload a tablet/capsule image, scan packaging, or enter pill markings for instant geometric, morphological, and OCR extraction.
        </p>
      </div>

      {loading ? (
        <OCRProgress statusMessage={statusMessage} progress={progress} />
      ) : !aiExplanation ? (
        <ImageUploader
          onImageSelected={scanImage}
          onOpenCamera={() => setCameraOpen(true)}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={resetScan}
              className="px-5 py-2.5 rounded-xl gradient-bg-primary text-xs font-bold shadow-md"
            >
              Scan Another Specimen
            </button>
          </div>
          <AIExplanationCard explanation={aiExplanation} imageUrl={currentScan?.imageUrl} />
        </div>
      )}

      <CameraCapture
        isOpen={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={scanImage}
      />
    </div>
  );
}

function LandingPage({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <div>
      <Hero />
      <Stats />
      <LiveDemo />
      <Features />
      <Testimonials />
      <Pricing onSelectPlan={onOpenAuth} />
      <FAQ />
    </div>
  );
}

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(true);
  const [currentPortal, setCurrentPortal] = useState<RolePortal>('patient');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-medicalBg dark:bg-darkBg text-slate-800 dark:text-slate-100">
      {/* Top Hackathon Judge Demo Banner */}
      {showDemoBanner && (
        <HackathonDemoBanner onDismiss={() => setShowDemoBanner(false)} />
      )}

      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Role Portal Switcher Toolbar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden sm:inline">
            Role Portal:
          </span>
          <PortalSwitcher currentPortal={currentPortal} onPortalChange={setCurrentPortal} />
        </div>
      </div>

      <main className="flex-grow">
        {/* Render Portal or Router based on selected role */}
        {currentPortal === 'doctor' ? (
          <DoctorPortalView />
        ) : currentPortal === 'pharmacy' ? (
          <PharmacyPortalView />
        ) : currentPortal === 'admin' ? (
          <AdminConsole />
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage onOpenAuth={() => setAuthModalOpen(true)} />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/scan" element={<MainScannerView />} />
            <Route path="/recovery" element={<LostPrescriptionRecovery />} />
            <Route path="/prescriptions" element={<PrescriptionScanner />} />
            <Route path="/inventory" element={<InventoryManager />} />
            <Route path="/calendar" element={<DoseCalendar />} />
            <Route path="/interactions" element={<InteractionChecker />} />
            <Route path="/compare" element={<ComparisonTable />} />
            <Route path="/pharmacies" element={<PharmacyFinder />} />
            <Route path="/doctors" element={<DoctorNetwork />} />
            <Route path="/emergency" element={<EmergencyMode />} />
            <Route path="/timeline" element={<MedicationTimelineView />} />
            <Route path="/family" element={<FamilyProfiles />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/insights" element={<AIHealthInsights />} />
            <Route path="/authenticity" element={<MedicineAuthenticity />} />
            <Route path="/chat" element={<ChatWindow />} />
            <Route path="/history" element={<HistoryList />} />
            <Route path="/favorites" element={<HistoryList favoritesOnly />} />
            <Route path="/reminders" element={<ReminderManager />} />
            <Route path="/alarms" element={<AlarmSetterView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/doctor-portal" element={<DoctorPortalView />} />
            <Route path="/pharmacy-portal" element={<PharmacyPortalView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ReminderNotificationModal />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
