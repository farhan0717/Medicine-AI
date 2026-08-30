# 🧪 Verification & Testing Guide — MEDISCAN AI

Follow these verification steps to test all functional components of MEDISCAN AI:

## 1. Type Verification & Build Check
Run TypeScript compiler in non-emitting lint mode:
```bash
npm run lint
```
Then test production bundling:
```bash
npm run build
```

## 2. Interactive Feature Walkthrough

| Feature | Step to Test | Expected Result |
| :--- | :--- | :--- |
| **Landing Page** | Visit `/` | Renders animated hero, glass card mockup, stats, features grid, interactive sample simulator, testimonials, pricing, and FAQ. |
| **Interactive Simulator** | Click sample pill image on home page | Runs instant demo OCR & Gemini parser without requiring manual upload. |
| **Medicine OCR Scan** | Visit `/scan` & upload/drag a medicine label | HTML5 Canvas pre-processes image, Tesseract extracts raw text, Gemini formats plain-language explanation. |
| **Audio Voice Output** | Click "Listen AI Voice" on explanation card | Web Speech API reads medicine explanation out loud. |
| **Prescription Scanner** | Visit `/prescriptions` & upload prescription | Extracts Doctor Name, Clinic, Prescribed Medicines list, Dose, Frequency, and Duration. |
| **Drug Interaction Checker**| Visit `/interactions` & select Aspirin + Warfarin | Calculates risk rating (Dangerous Collision) and displays bleeding hazard warning. |
| **Medicine Comparison** | Visit `/compare` | Renders side-by-side comparison table of generic ingredients, strengths, price categories, and safety ratings. |
| **AI Pharmacist Chatbot** | Visit `/chat` & ask "Can I take this after food?" | Returns clinical guidance with preset prompt buttons and speech support. |
| **Multi-Language Switcher**| Click language toggle (English / Tamil / Hindi) | Translates UI strings and AI response explanations into target language. |
| **Dark Mode Toggle** | Click Sun/Moon icon in Navbar | Toggles dark mode glassmorphic styling across all views. |
| **Auth & Guest Mode** | Click "Sign In" -> "Continue as Guest Mode" | Instant session initialization with local storage backup. |
