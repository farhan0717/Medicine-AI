export type SupportedLanguage = 'en' | 'ta' | 'hi';

export interface UIStrings {
  appName: string;
  tagline: string;
  scanNow: string;
  uploadImage: string;
  cameraScan: string;
  prescriptions: string;
  drugInteractions: string;
  compareMeds: string;
  aiAssistant: string;
  history: string;
  favorites: string;
  settings: string;
  dashboard: string;
  disclaimerText: string;
  login: string;
  register: string;
  logout: string;
  guestMode: string;
  safetyWarnings: string;
  dosage: string;
  sideEffects: string;
  howItWorks: string;
  purpose: string;
  doctorNotice: string;
}

const translations: Record<SupportedLanguage, UIStrings> = {
  en: {
    appName: 'MEDISCAN AI',
    tagline: 'Enterprise AI Medicine & Prescription Scanner',
    scanNow: 'Scan Medicine',
    uploadImage: 'Upload Image',
    cameraScan: 'Live Camera',
    prescriptions: 'Prescription Scanner',
    drugInteractions: 'Drug Interactions',
    compareMeds: 'Compare Medicines',
    aiAssistant: 'AI Pharmacist',
    history: 'Scan History',
    favorites: 'Saved Favorites',
    settings: 'Settings',
    dashboard: 'Dashboard',
    disclaimerText: 'This application provides educational information only. It is NOT medical advice. Always consult a qualified healthcare professional before taking or changing medications.',
    login: 'Log In',
    register: 'Create Account',
    logout: 'Log Out',
    guestMode: 'Continue as Guest',
    safetyWarnings: 'Safety & Precautions',
    dosage: 'Dosage Guidelines',
    sideEffects: 'Side Effects Profile',
    howItWorks: 'How It Works',
    purpose: 'Primary Uses',
    doctorNotice: 'Doctor Recommendation',
  },
  ta: {
    appName: 'மெடிஸ்கேன் AI',
    tagline: 'செயற்கை நுண்ணறிவு மருந்து மற்றும் மருந்துச்சீட்டு ஸ்கேனர்',
    scanNow: 'மருந்தை ஸ்கேன் செய்க',
    uploadImage: 'படத்தைப் பதிவேற்றவும்',
    cameraScan: 'நேரடி கேமரா',
    prescriptions: 'மருந்துச்சீட்டு ஸ்கேனர்',
    drugInteractions: 'மருந்து விளைவுகள்',
    compareMeds: 'மருந்துகளை ஒப்பிடுக',
    aiAssistant: 'AI மருந்தாளர் உதவி',
    history: 'ஸ்கேன் வரலாறு',
    favorites: 'சேமிக்கப்பட்டவை',
    settings: 'அமைப்புகள்',
    dashboard: 'முகப்பு',
    disclaimerText: 'இந்த பயன்பாடு கல்வித் தகவல்களை மட்டுமே வழங்குகிறது. இது மருத்துவ ஆலோசனை அல்ல. மருந்துகளை எடுப்பதற்கு முன் தகுதியான மருத்துவரை அணுகவும்.',
    login: 'உள்நுழைக',
    register: 'கணக்கு தொடங்க',
    logout: 'வெளியேறு',
    guestMode: 'விருந்தினராக தொடரவும்',
    safetyWarnings: 'பாதுகாப்பு எச்சரிக்கைகள்',
    dosage: 'அளவு வழிகாட்டுதல்கள்',
    sideEffects: 'பக்க விளைவுகள்',
    howItWorks: 'செயல்படும் விதம்',
    purpose: 'முதன்மை பயன்பாடுகள்',
    doctorNotice: 'மருத்துவர் ஆலோசனை',
  },
  hi: {
    appName: 'मेडिस्कैन AI',
    tagline: 'एआई दवा और नुस्खा स्कैनर',
    scanNow: 'दवा स्कैन करें',
    uploadImage: 'इमेज अपलोड करें',
    cameraScan: 'लाइव कैमरा',
    prescriptions: 'प्रिस्क्रिप्शन स्कैनर',
    drugInteractions: 'ड्रग इंटरैक्शन जांच',
    compareMeds: 'दवाओं की तुलना करें',
    aiAssistant: 'एआई फार्मासिस्ट सहायक',
    history: 'स्कैन इतिहास',
    favorites: 'सहेजी गई दवाएं',
    settings: 'सेटिंग्स',
    dashboard: 'डैशबोर्ड',
    disclaimerText: 'यह एप्लिकेशन केवल शैक्षणिक जानकारी प्रदान करता है। यह चिकित्सीय सलाह नहीं है। दवाएं लेने या बदलने से पहले हमेशा योग्य डॉक्टर से सलाह लें।',
    login: 'लॉग इन करें',
    register: 'खाता बनाएं',
    logout: 'लॉग आउट',
    guestMode: 'अतिथि के रूप में जारी रखें',
    safetyWarnings: 'सुरक्षा और सावधानियां',
    dosage: 'खुराक के निर्देश',
    sideEffects: 'दुष्प्रभाव (साइड इफेक्ट्स)',
    howItWorks: 'यह कैसे काम करता है',
    purpose: 'मुख्य उपयोग',
    doctorNotice: 'डॉक्टर की सलाह',
  },
};

export function getTranslation(lang: SupportedLanguage): UIStrings {
  return translations[lang] || translations.en;
}
