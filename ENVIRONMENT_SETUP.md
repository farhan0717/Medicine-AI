# ⚙️ Environment Setup Guide — MEDISCAN AI

Follow these instructions to configure environment variables for Gemini AI and Firebase.

## 1. Gemini API Key Configuration
1. Obtain an API key from Google AI Studio: [https://aistudio.google.com/](https://aistudio.google.com/)
2. Create a `.env` file in the project root:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

## 2. Firebase Configuration (Optional)
If you wish to link live Firebase Auth and Firestore instead of Guest Mode:
1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Add a Web App to your project and copy the configuration object.
3. Add the keys to `.env`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note**: If environment variables are omitted, MEDISCAN AI automatically activates Guest Mode with local smart fallback intelligence, allowing full offline testing!
