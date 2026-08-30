# 🏥 MEDISCAN AI — Verified Healthcare & Medicine Intelligence Platform

> **Hackathon-Grade Clinical AI Assistant & Medicine Scanner**  
> *Instant OCR recognition, Web Audio alarm system, Gemini clinical intelligence, verified medical databases, drug interaction checker, and smart inventory management.*

---

## 🌟 Overview & Problem Statement

Millions of patients struggle to identify medicine strips, understand complex pharmacological terms, remember daily dosage timings, or detect dangerous drug-drug interactions.

**MEDISCAN AI** solves this by providing:
1. **Instant OCR & Barcode Recognition**: Scan any medicine strip, syrup bottle, prescription sheet, or UPC/EAN barcode using device camera or file upload.
2. **Web Audio Alarm System**: Daily scheduled alarms that produce an audible beep sound notification when it's time to take medicine.
3. **Gemini AI Pharmacist**: Clinical assistant that provides plain-language explanations of **Dolo 650**, antibiotics, antacids, advantages, health benefits, side effects, dosage, and food administration rules.
4. **Verified Medical Databases**: Direct queries to official **OpenFDA**, **DailyMed (NLM)**, **RxNorm**, and local **MongoDB / JS** database registries.
5. **Drug Interaction Checker**: Evaluates safety risks when taking 2 or more medications together.
6. **Smart Inventory & Dose Calendar**: Tracks remaining tablet count, logs taken/skipped doses, and provides low-stock warning alerts.
7. **Multilingual Support**: Switch seamlessly between **English 🇺🇸**, **Tamil 🇮🇳**, and **Hindi 🇮🇳**.

---

## 🛠️ Languages, Frameworks & Technologies Used

| Category | Technology | Usage & Purpose |
|---|---|---|
| **Core Language** | **TypeScript / JavaScript (ES2022)** | Strong type safety, client-side application logic, and asynchronous data fetching. |
| **Frontend Framework** | **React 18 + React Router v6** | Single-page app architecture with dynamic routing and component state management. |
| **Styling & Theme** | **Tailwind CSS + Glassmorphism** | Modern, responsive UI design system with dark/light mode toggle and sleek animations. |
| **AI Model & Intelligence** | **Google Gemini AI (Gemini 1.5 Flash)** | Grounded clinical explanations without medical hallucinations. |
| **OCR & Vision Engine** | **Tesseract.js + Canvas API** | High-precision client-side Optical Character Recognition and image preprocessing. |
| **Audio Alarm Engine** | **Web Audio API (`AudioContext`)** | Browser-native dual-tone synthesizer that produces audible alarm beeps for medication reminders. |
| **Database System** | **OpenFDA / RxNorm / DailyMed APIs + MongoDB / Local Fuse.js** | Multi-tier medical database search with fuzzy matching resilience and optional MongoDB REST endpoint. |
| **Build & Tooling** | **Vite 5** | High-performance build system and hot module replacement development server. |

---

## 🚀 Key Features & Performance

### 1. 📷 Verified Medicine & Barcode Scanner
- Upload image, paste from clipboard, use live camera, or click **Instant 1-Click Demo Presets (Dolo 650 / Amoxicillin 500)**.
- Preprocesses images using HTML5 Canvas contrast normalization.
- Extracts brand name, generic formulation, strength, manufacturer, color/shape, and prescription requirement.

### 2. 🔔 Web Audio Dosage Alarm System
- Set daily alarm times per medicine.
- Audibly beeps using the browser's Web Audio API synthesizer.
- Allows 1-click **"I Took Medicine"** (automatically decreases inventory count), **"Snooze 10 Min"**, or **"Skip"**.
- Triggers low-stock toast alerts when remaining tablets drop below 5.

### 3. 💬 Gemini Clinical AI Assistant (Chatbot)
- Preset quick-inquiry buttons for **Dolo 650 Advantages, Benefits, Side Effects, and Dosage**.
- Answers queries on food administration (Before/After Food), alcohol precautions, pregnancy safety, and missed dose guidance.
- Text-to-Speech (TTS) integration reads out clinical advice for visual or reading accessibility.

### 4. 🧪 Drug Interaction Checker
- Input multiple medicines (e.g., Aspirin + Warfarin, Antacids + Antibiotics).
- Returns instant severity classification (**Safe**, **Minor**, **Moderate**, **Dangerous**) with clinical guidance.

### 5. 📦 Smart Inventory & Dose Calendar
- Visual calendar showing intake history, compliance rates, and upcoming scheduled doses.
- Reorder threshold tracking to prevent running out of critical medications.

---

## 📁 Project Structure

```
medicine/
├── public/                     # Static assets & icons
├── src/
│   ├── components/
│   │   ├── auth/              # Profile & Auth Modal components
│   │   ├── chatbot/           # Gemini Chatbot & Presets
│   │   ├── common/            # Navbar, Footer, Modal, Disclaimer
│   │   ├── comparison/        # Side-by-side Medicine Comparison Table
│   │   ├── dashboard/         # Patient Health Dashboard Overview
│   │   ├── explanation/       # AI Explanation Card & Confidence Badges
│   │   ├── history/           # Saved Scans & Favorites List
│   │   ├── interactions/      # Drug-Drug Interaction Engine
│   │   ├── inventory/         # Inventory Manager & Dose Calendar
│   │   ├── landing/           # Hero, Features, Live Demo, Pricing, FAQ
│   │   ├── prescription/      # Prescription OCR Reader
│   │   ├── reminders/         # Audio Alarm Beeper & Reminder Manager
│   │   ├── scanner/           # Image Uploader, Camera Capture, OCR Progress
│   │   └── settings/          # User Preferences & Language Selector
│   ├── contexts/              # Auth, Language, and Theme Context Providers
│   ├── data/                  # Local Verified Medicine Database (Dolo 650, etc.)
│   ├── hooks/                 # Custom React Hooks (useScanMedicine, useSpeech)
│   ├── services/              # Medical Database, Gemini AI, Barcode & Storage Services
│   ├── types/                 # TypeScript Interfaces & Types
│   ├── App.tsx                # Main App Router & Layout
│   ├── index.css              # Glassmorphic Utilities & Tailwind Base
│   └── main.tsx               # Entry Point
├── index.html                 # Main HTML5 Document & Google Fonts
├── tailwind.config.js         # Design System Config
├── vite.config.ts             # Vite Configuration
└── README.md                  # Comprehensive Hackathon Documentation
```

---

## ⚡ How to Setup & Run Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mediscan/medicine.git
   cd medicine
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   *(Note: The app includes built-in offline clinical fallbacks for Dolo 650 and common medicines if no API key is provided).*

4. **Start Local Development Server:**
   ```bash
   cmd /c npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for Production:**
   ```bash
   cmd /c npm run build
   ```

---

## 🏆 Hackathon Highlights
- **100% Privacy-First Architecture**: Operates locally in the browser with zero forced server reliance.
- **Audible Beeping Alarms**: Real-time browser audio synthesizer ensures alerts are never missed.
- **Zero Hallucination AI Grounding**: Strictly maps OpenFDA and clinical registry JSON into plain-language patient explanations.
- **Fully Responsive & Multilingual**: Supports dark mode and English, Tamil, and Hindi translations.

---

*© MEDISCAN AI. Built for Healthcare Innovation & Patient Safety.*
