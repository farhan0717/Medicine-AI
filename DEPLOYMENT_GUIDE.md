# 🚀 Deployment Guide — MEDISCAN AI

## Option A: Deploying to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Initialize project:
   ```bash
   firebase init
   ```
   - Select **Hosting**, **Firestore**, **Storage**, and **Functions**.
   - Set public directory to `dist`.
   - Configure as single-page app (`index.html` rewrite): **Yes**.

4. Build production bundle:
   ```bash
   npm run build
   ```

5. Deploy rules & app:
   ```bash
   firebase deploy
   ```

---

## Option B: Deploying to Vercel / Netlify

1. Connect your Git repository to Vercel or Netlify.
2. Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variables (`VITE_GEMINI_API_KEY`, `VITE_FIREBASE_API_KEY`, etc.) under Project Settings.
