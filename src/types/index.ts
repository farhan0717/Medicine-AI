export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isGuest: boolean;
  createdAt: string;
  subscriptionTier: 'free' | 'premium';
  languagePreference: 'en' | 'ta' | 'hi';
  role?: 'patient' | 'doctor' | 'pharmacy' | 'admin';
}

export interface CVFeatureAnalysis {
  shape: string;             // Oval, Round, Capsule, Oblong, Hexagonal
  estimatedDiameterMm: number; // e.g. 14.2 mm
  estimatedWidthMm: number;    // e.g. 7.5 mm
  estimatedLengthMm: number;   // e.g. 15.0 mm
  estimatedThicknessMm: number;// e.g. 4.8 mm
  primaryColor: string;      // White, Yellow, Blue, Red/Yellow, Orange
  colorHex: string;          // #FFFFFF, #EAB308, etc.
  texture: string;           // Smooth film-coated, Matte finish, Sugar-coated
  scoreLine: string;         // Single bisect score line, Quad-sect, None
  capsuleType?: string;      // Hard gelatin, Softgel, N/A
  imprintOcr: string;        // e.g. "DOLO 650", "CIPLA 10", "500"
  manufacturerLogoDetected: boolean;
  detectedLogoName?: string; // Micro Labs, Cipla, Pfizer
  packagingDetected: boolean;
  packagingType?: string;    // Blister strip, Amber bottle, Box
}

export interface AlternativeMatch {
  id: string;
  name: string;
  genericName: string;
  confidenceScore: number;   // 0-100%
  visualSimilarityPct: number;
  reason: string;
  tabletColor: string;
  tabletShape: string;
  imprint: string;
}

export interface OCRResult {
  rawText: string;
  medicineName: string;
  brand: string;
  genericName: string;
  strength: string;
  manufacturer: string;
  expiryDate: string;
  batchNumber: string;
  dosage: string;
  barcode?: string;
  confidence: number;
}

export interface ConfidenceScores {
  ocrConfidence: number;      // 0 - 100%
  databaseConfidence: number; // 0 - 100%
  aiGroundingScore: number;   // 0 - 100%
  visualMatchConfidence?: number; // 0 - 100%
}

export interface VerifiedMedicineData {
  id: string;
  brandName: string;
  genericName: string;
  manufacturer: string;
  strength: string;
  dosage: string;
  howToTake?: string;
  beforeAfterFood?: string;
  whoShouldAvoid?: string;
  tabletColor?: string;
  tabletShape?: string;
  prescription?: string;
  uses: string[];
  sideEffects: {
    common: string[];
    serious: string[];
  };
  warnings: string[];
  pregnancy: string;
  breastfeeding: string;
  alcohol: string;
  driving: string;
  kidney: string;
  liver: string;
  storage: string;
  foodInteractions?: string[];
  drugInteractionsList?: string[];
  emergencyAdvice?: string;
  maxDailyDose?: string;
  price?: string;
  barcode?: string;
  source: 'OpenFDA' | 'DailyMed' | 'RxNorm' | 'Firestore Cache' | 'Local Medicine Database' | 'MongoDB Database' | 'NotFound';
  lastUpdated: string;
}

export interface DosageGuideline {
  beforeFood: string;
  afterFood: string;
  timing: string;
  general: string;
}

export interface SideEffects {
  common: string[];
  serious: string[];
}

export interface SafetyWarnings {
  pregnancy: string;
  breastfeeding: string;
  alcohol: string;
  driving: string;
  kidneyDisease: string;
  liverDisease: string;
}

export interface AIExplanation {
  medicineName: string;
  genericName: string;
  purpose: string;
  howItWorks: string;
  uses: string[];
  dosage: DosageGuideline;
  howToTake?: string;
  beforeAfterFood?: string;
  whoShouldAvoid?: string;
  manufacturer?: string;
  strength?: string;
  tabletColor?: string;
  tabletShape?: string;
  prescription?: string;
  sideEffects: SideEffects;
  safetyWarnings: SafetyWarnings;
  storage: string;
  missedDose: string;
  overdose: string;
  warnings: string[];
  emergencyAdvice: string;
  doctorRecommendation: string;
  simpleSummary: string;
  priceCategory?: 'Low-cost Generic' | 'Standard' | 'Premium Brand';
  translatedIn?: 'en' | 'ta' | 'hi';
  isVerified: boolean;
  databaseSource?: string;
  confidenceScores?: ConfidenceScores;
  // CV Extensions
  cvAnalysis?: CVFeatureAnalysis;
  identificationReason?: string;
  alternativeMatches?: AlternativeMatch[];
}

export interface MedicineComparisonItem {
  name: string;
  genericName: string;
  purpose: string;
  strength: string;
  priceCategory: string;
  manufacturer: string;
  sideEffectsSummary: string;
  safetyRating: string;
}

export interface LostPrescriptionMatch {
  id: string;
  medicineName: string;
  genericName: string;
  visualSimilarityPct: number;
  medicalContextSimilarityPct: number;
  overallConfidencePct: number;
  matchedFeatures: string[];
  suggestedDosage: string;
  keyDistinctions: string;
  prescriptionStatus: 'Rx Required' | 'OTC';
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    impact: Record<string, number>;
  }[];
}

export interface PrescribedMedicine {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface PrescriptionData {
  doctorName: string;
  hospital: string;
  medicines: PrescribedMedicine[];
  date: string;
  rawText: string;
  ocrConfidence?: number;
}

export type RiskLevel = 'Safe' | 'Minor' | 'Moderate' | 'Dangerous';

export interface DrugInteraction {
  med1: string;
  med2: string;
  severity: RiskLevel;
  description: string;
  advice: string;
  duplicateIngredient?: boolean;
}

export interface InteractionReport {
  medicines: string[];
  overallRisk: RiskLevel;
  interactions: DrugInteraction[];
  summary: string;
  foodInteractions?: string[];
  alcoholWarning?: string;
}

export interface PharmacyItem {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  phone: string;
  is24x7: boolean;
  verified: boolean;
  hasExpressDelivery: boolean;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price: string;
  discountPrice?: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experienceYears: number;
  rating: number;
  consultationFee: string;
  availableNext: string;
  imageUrl: string;
  verified: boolean;
  bio: string;
}

export interface FamilyProfileItem {
  id: string;
  name: string;
  relation: 'Self' | 'Father' | 'Mother' | 'Son' | 'Daughter' | 'Grandfather' | 'Grandmother' | 'Spouse';
  age: number;
  avatarColor: string;
  activeMedicationsCount: number;
  adherenceRatePct: number;
  allergies: string[];
  conditions: string[];
}

export interface AuthenticityCheckResult {
  overallAuthenticityScorePct: number;
  status: 'Genuine Packaging Detected' | 'Suspicious Packaging Alert' | 'Inconclusive Scan';
  fontAnalysisScore: number;
  qrCodeVerification: boolean;
  batchFormatValid: boolean;
  tamperSealIntact: boolean;
  serialNumberMatch: boolean;
  disclaimer: string;
  details: string[];
}

export interface AIHealthInsight {
  id: string;
  type: 'adherence_alert' | 'refill_forecast' | 'storage_warning' | 'scan_pattern' | 'safety_notice';
  severity: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  description: string;
  actionLabel?: string;
  actionRoute?: string;
  timestamp: string;
}

export interface ScanHistoryItem {
  id: string;
  userId: string;
  type: 'medicine' | 'prescription' | 'lost_recovery' | 'authenticity';
  timestamp: string;
  imageUrl: string;
  ocrData?: OCRResult;
  verifiedData?: VerifiedMedicineData;
  aiExplanation?: AIExplanation;
  prescriptionData?: PrescriptionData;
  isFavorite: boolean;
  language: 'en' | 'ta' | 'hi';
  confidenceScores?: ConfidenceScores;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  imageUrl?: string;
}

export interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string; // HH:mm format
  frequency: 'Daily' | 'Twice Daily' | 'Weekly' | 'As Needed';
  active: boolean;
  inventoryId?: string;
  profileId?: string;
}

export type MedicineFormType = 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment' | 'Drops' | 'Powder';

export interface InventoryItem {
  id: string;
  userId: string;
  medicineName: string;
  brand: string;
  strength: string;
  medicineType: MedicineFormType;
  initialQuantity: number;
  currentQuantity: number;
  dosePerIntake: number;
  frequency: 'Once Daily' | 'Twice Daily' | 'Three Times Daily' | 'As Needed';
  timesPerDay: number;
  reminderTimes: string[];
  startDate: string;
  endDate?: string;
  expiryDate: string;
  refillThreshold: number;
  lastRefillDate?: string;
  barcode?: string;
  profileId?: string;
}

export interface DoseLog {
  id: string;
  inventoryId: string;
  medicineName: string;
  timestamp: string;
  doseAmount: number;
  status: 'taken' | 'snoozed' | 'skipped';
  previousQuantity: number;
  newQuantity: number;
}

export interface RefillRecord {
  id: string;
  inventoryId: string;
  medicineName: string;
  purchasedQuantity: number;
  previousQuantity: number;
  newQuantity: number;
  date: string;
}

export interface ShoppingListItem {
  id: string;
  inventoryId?: string;
  medicineName: string;
  remainingTablets: number;
  urgency: 'critical' | 'low' | 'normal';
  purchased: boolean;
}
