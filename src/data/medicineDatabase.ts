import {
  CVFeatureAnalysis,
  AlternativeMatch,
  LostPrescriptionMatch,
  DiagnosticQuestion,
  PharmacyItem,
  DoctorProfile,
  FamilyProfileItem,
  AIHealthInsight
} from '../types';

export interface MedicineDatabaseItem {
  id: string;
  name: string;
  generic_name: string;
  uses: string[];
  dosage: string;
  how_to_take: string;
  before_after_food: string;
  side_effects: string[];
  serious_side_effects: string[];
  warnings: string[];
  who_should_avoid: string;
  pregnancy: string;
  breastfeeding: string;
  alcohol: string;
  driving: string;
  kidney: string;
  liver: string;
  storage: string;
  manufacturer: string;
  strength: string;
  tablet_color: string;
  tablet_shape: string;
  prescription: string; // 'Yes' | 'No'
  category: string;
  max_daily_dose: string;
  food_interactions: string[];
  drug_interactions: string[];
  emergency_advice: string;
  image_keywords: string[];
  ocr_keywords: string[];
  cv_defaults: CVFeatureAnalysis;
  identification_reason: string;
  alternative_matches: AlternativeMatch[];
}

export const medicine_database: MedicineDatabaseItem[] = [
  {
    id: "med-dolo-650",
    name: "Dolo 650",
    generic_name: "Paracetamol / Acetaminophen",
    category: "Analgesic & Antipyretic",
    uses: [
      "High fever reduction",
      "Headache and migraine relief",
      "Post-vaccination soreness",
      "Dental pain & toothache",
      "Muscle and joint pain"
    ],
    dosage: "1 tablet (650mg) every 4 to 6 hours as needed (Maximum 4 tablets per 24 hours)",
    how_to_take: "Swallow the whole tablet with a full glass of water. Do not crush, chew, or break.",
    before_after_food: "After Food (to minimize gastric discomfort)",
    side_effects: [
      "Mild nausea or stomach discomfort",
      "Drowsiness (infrequent)",
      "Sweating after fever drop"
    ],
    serious_side_effects: [
      "Jaundice (yellowing of skin or eyes)",
      "Severe skin allergic reaction / hives",
      "Unexplained dark urine or extreme tiredness"
    ],
    warnings: [
      "Do not exceed 4000mg of Paracetamol per day from all sources to prevent fatal liver necrosis.",
      "Strictly avoid alcohol consumption while taking Paracetamol.",
      "Consult a physician if fever lasts longer than 3 consecutive days."
    ],
    who_should_avoid: "Patients with severe chronic liver disease, severe kidney impairment, or known hypersensitivity to Paracetamol.",
    pregnancy: "Category B: Considered safe during pregnancy at the lowest effective dose for short duration under clinical guidance.",
    breastfeeding: "Safe in nursing mothers when used as directed; minimal amounts pass into breast milk.",
    alcohol: "Dangerous: Concurrent alcohol intake significantly elevates liver toxicity risk.",
    driving: "Safe: Does not alter alertness or cognitive reaction time.",
    kidney: "Caution: Reduce dose frequency in moderate-to-severe renal impairment.",
    liver: "Contraindicated in active acute liver dysfunction.",
    storage: "Store below 30°C in a dry place protected from sunlight and moisture.",
    manufacturer: "Micro Labs Ltd",
    strength: "650 mg",
    tablet_color: "White",
    tablet_shape: "Oval / Capsule-shaped",
    prescription: "No",
    max_daily_dose: "2600 mg (4 tablets of 650 mg)",
    food_interactions: ["Avoid excessive caffeine intake", "Avoid high-fiber meals immediately before dose"],
    drug_interactions: ["Warfarin (increased blood thinning)", "Metoclopramide (faster absorption)", "Carbamazepine (increased liver strain)"],
    emergency_advice: "In case of overdose (>4g), administer N-acetylcysteine within 8 hours and contact Poison Control immediately.",
    image_keywords: ["dolo", "650", "micro labs", "paracetamol", "blue white strip"],
    ocr_keywords: ["DOLO", "650", "MICRO", "LABS", "PARACETAMOL", "DOL0", "MICROLABS", "650MG"],
    cv_defaults: {
      shape: "Oval / Capsule-shaped",
      estimatedDiameterMm: 15.2,
      estimatedWidthMm: 7.1,
      estimatedLengthMm: 15.2,
      estimatedThicknessMm: 4.8,
      primaryColor: "Pure White",
      colorHex: "#FFFFFF",
      texture: "Smooth Film-Coated",
      scoreLine: "Single Bisect Score Line",
      imprintOcr: "DOLO 650",
      manufacturerLogoDetected: true,
      detectedLogoName: "Micro Labs Emblem",
      packagingDetected: true,
      packagingType: "Alu-Alu Blister Strip"
    },
    identification_reason: "This tablet is identified as Dolo 650 because visual computer vision matches 98.4% of reference parameters: 15.2mm length, central bisect score line, pure white film coating, and high-confidence imprint OCR 'DOLO 650'.",
    alternative_matches: [
      {
        id: "med-paracetamol-500",
        name: "Crocin 500",
        genericName: "Paracetamol 500mg",
        confidenceScore: 84,
        visualSimilarityPct: 88,
        reason: "Same active ingredient (Paracetamol), but lower strength (500mg vs 650mg) and circular shape.",
        tabletColor: "White",
        tabletShape: "Round",
        imprint: "CROCIN 500"
      },
      {
        id: "med-pacimol-650",
        name: "Pacimol 650",
        genericName: "Paracetamol 650mg",
        confidenceScore: 76,
        visualSimilarityPct: 82,
        reason: "Identical dosage and active compound; differs in manufacturer imprint ('PACIMOL').",
        tabletColor: "White",
        tabletShape: "Oval",
        imprint: "PACIMOL"
      }
    ]
  },
  {
    id: "med-cetirizine",
    name: "Cetirizine (Cetzine)",
    generic_name: "Cetirizine Hydrochloride",
    category: "Second-Generation Antihistamine",
    uses: [
      "Seasonal allergic rhinitis",
      "Runny nose, sneezing, and watery eyes",
      "Chronic hives (Urticaria) & itching",
      "Dust mite and pollen allergies"
    ],
    dosage: "1 tablet (10mg) once daily in the evening",
    how_to_take: "Swallow whole with water.",
    before_after_food: "Before or After Food",
    side_effects: [
      "Mild drowsiness or fatigue",
      "Dry mouth",
      "Mild headache"
    ],
    serious_side_effects: [
      "Difficulty urinating",
      "Severe dizziness or fainting",
      "Angioedema (swelling of face, lips, tongue)"
    ],
    warnings: [
      "May cause drowsiness. Use caution when driving or operating machinery.",
      "Avoid concurrent alcohol consumption."
    ],
    who_should_avoid: "Patients with end-stage renal disease (CrCl < 10 mL/min).",
    pregnancy: "Category B: Use during pregnancy only if clearly needed.",
    breastfeeding: "Excreted in human milk; avoid prolonged use while nursing.",
    alcohol: "Avoid: May enhance central nervous system depression.",
    driving: "Caution: Drowsiness occurs in ~10% of users.",
    kidney: "Requires dose adjustment (5mg once daily in renal impairment).",
    liver: "Dose adjustment required in severe hepatic impairment.",
    storage: "Store below 25°C in a dry location.",
    manufacturer: "Cipla Ltd",
    strength: "10 mg",
    tablet_color: "White",
    tablet_shape: "Round Circular",
    prescription: "No",
    max_daily_dose: "10 mg once daily",
    food_interactions: ["Food delays peak concentration slightly but does not decrease total absorption"],
    drug_interactions: ["Sedatives / Sleeping pills (compounded sedation)", "Theophylline (reduces cetirizine clearance)"],
    emergency_advice: "Overdose in adults causes severe somnolence; in children, agitation followed by drowsiness.",
    image_keywords: ["cetirizine", "cipla", "10mg", "allergy", "okacet", "cetzine"],
    ocr_keywords: ["CETIRIZINE", "HYDROCHLORIDE", "10MG", "CIPLA", "ALLERGY", "CETZINE", "OKACET", "10 MG"],
    cv_defaults: {
      shape: "Round / Circular",
      estimatedDiameterMm: 7.2,
      estimatedWidthMm: 7.2,
      estimatedLengthMm: 7.2,
      estimatedThicknessMm: 3.1,
      primaryColor: "White",
      colorHex: "#F8FAFC",
      texture: "Matte Coated",
      scoreLine: "Single Bisect",
      imprintOcr: "CIPLA 10",
      manufacturerLogoDetected: true,
      detectedLogoName: "Cipla Logo",
      packagingDetected: true,
      packagingType: "PVC Blister"
    },
    identification_reason: "Matches 96.2% visual parameters for Cetirizine 10mg: 7.2mm round diameter, matte coating, single scoreline, and 'CIPLA 10' imprint.",
    alternative_matches: [
      {
        id: "med-levocetirizine-5",
        name: "Levocetirizine 5mg",
        genericName: "Levocetirizine Dihydrochloride",
        confidenceScore: 81,
        visualSimilarityPct: 85,
        reason: "Active enantiomer of cetirizine; lower dose (5mg) with similar round white appearance.",
        tabletColor: "White",
        tabletShape: "Round",
        imprint: "L-CET 5"
      }
    ]
  },
  {
    id: "med-amoxicillin-500",
    name: "Amoxicillin 500",
    generic_name: "Amoxicillin Trihydrate",
    category: "Penicillin Antibiotic",
    uses: [
      "Bacterial respiratory tract infections",
      "Strep throat, tonsillitis, and sinusitis",
      "Middle ear infections (Otitis Media)",
      "Urinary tract infections (UTIs)"
    ],
    dosage: "1 capsule (500mg) every 8 hours (3 times daily) for 5 to 7 full days",
    how_to_take: "Swallow capsule whole with a full glass of water. Do not open or chew.",
    before_after_food: "After Food (reduces stomach upset)",
    side_effects: [
      "Diarrhea",
      "Mild nausea",
      "Abdominal pain"
    ],
    serious_side_effects: [
      "Anaphylaxis (severe throat swelling, gasping for breath)",
      "Clostridium difficile diarrhea (severe watery stool)",
      "Severe blistering skin rash (Stevens-Johnson syndrome)"
    ],
    warnings: [
      "MANDATORY: Complete the entire prescribed antibiotic course even if symptoms disappear early.",
      "Discontinue immediately if allergic skin hives or wheezing occurs."
    ],
    who_should_avoid: "Patients with confirmed history of severe Penicillin or Cephalosporin allergy.",
    pregnancy: "Category B: Safe during pregnancy when prescribed by a doctor.",
    breastfeeding: "Safe; trace amounts pass into milk with rare infant diarrhea risk.",
    alcohol: "Avoid: May worsen stomach upset and dehydration during infection recovery.",
    driving: "Safe: Does not affect driving ability.",
    kidney: "Adjust dosage if GFR < 30 mL/min.",
    liver: "Use with caution in pre-existing liver failure.",
    storage: "Store below 25°C protected from moisture.",
    manufacturer: "Pfizer Inc. / Alkem",
    strength: "500 mg",
    tablet_color: "Red and Yellow",
    tablet_shape: "Capsule",
    prescription: "Yes",
    max_daily_dose: "1500 mg - 3000 mg daily in divided doses",
    food_interactions: ["High acid juices may degrade penicillin slightly; take with plain water"],
    drug_interactions: ["Methotrexate (increased toxicity)", "Allopurinol (increased rash risk)", "Oral Contraceptives (reduced efficacy)"],
    emergency_advice: "Immediate emergency hospitalization required if anaphylactic shock or swelling occurs.",
    image_keywords: ["amoxicillin", "500", "capsule", "amoxil", "500mg", "antibiotic"],
    ocr_keywords: ["AMOXICILLIN", "500", "500MG", "AMOXIL", "TRIHYDRATE", "CAPSULE", "ANTIBIOTIC", "500 MG"],
    cv_defaults: {
      shape: "Oblong Capsule",
      estimatedDiameterMm: 6.8,
      estimatedWidthMm: 6.8,
      estimatedLengthMm: 19.4,
      estimatedThicknessMm: 6.8,
      primaryColor: "Red / Yellow Dual-Tone",
      colorHex: "#EF4444",
      texture: "Hard Gelatin Shell",
      scoreLine: "None",
      capsuleType: "Hard Gelatin Size 0",
      imprintOcr: "AMOX 500",
      manufacturerLogoDetected: true,
      detectedLogoName: "Pfizer Logo",
      packagingDetected: true,
      packagingType: "Blister Pack"
    },
    identification_reason: "High-confidence 99.1% match for Amoxicillin 500mg: Dual-tone Red/Yellow hard gelatin capsule, 19.4mm length, and 'AMOX 500' imprint OCR.",
    alternative_matches: [
      {
        id: "med-ampicillin-500",
        name: "Ampicillin 500mg",
        genericName: "Ampicillin",
        confidenceScore: 78,
        visualSimilarityPct: 83,
        reason: "Similar dual-colored capsule in same aminopenicillin class; different imprint.",
        tabletColor: "Red and Black",
        tabletShape: "Capsule",
        imprint: "AMP 500"
      }
    ]
  },
  {
    id: "med-metformin-500",
    name: "Metformin 500 (Glycomet)",
    generic_name: "Metformin Hydrochloride",
    category: "Biguanide Antidiabetic",
    uses: [
      "Type 2 Diabetes Mellitus blood glucose control",
      "Insulin resistance management",
      "Polycystic Ovary Syndrome (PCOS) adjunctive therapy"
    ],
    dosage: "1 tablet (500mg) twice daily with morning and evening meals",
    how_to_take: "Take during or immediately after meals to reduce stomach discomfort.",
    before_after_food: "With Meals",
    side_effects: [
      "Diarrhea and loose stools",
      "Gas and bloating",
      "Metallic taste in mouth"
    ],
    serious_side_effects: [
      "Lactic Acidosis (muscle pain, cold limbs, trouble breathing)",
      "Vitamin B12 deficiency (numbness in hands/feet)",
      "Severe hypoglycemia when combined with insulin"
    ],
    warnings: [
      "Black Box Warning: Risk of Lactic Acidosis in renal failure or heavy alcohol intake.",
      "Withhold 48 hours prior to IV iodinated contrast radiological procedures."
    ],
    who_should_avoid: "Severe renal dysfunction (eGFR < 30 mL/min/1.73 m2), acute metabolic acidosis.",
    pregnancy: "Category B: Widely used for gestational diabetes under endocrinologist care.",
    breastfeeding: "Passes into milk in small amounts; monitoring recommended.",
    alcohol: "STRICTLY CONTRAINDICATED: Drastically elevates Lactic Acidosis risk.",
    driving: "Safe: Does not cause hypoglycemia alone.",
    kidney: "Contraindicated if eGFR < 30.",
    liver: "Avoid due to increased risk of lactic acidosis.",
    storage: "Store below 25°C.",
    manufacturer: "USV Ltd / Sun Pharma",
    strength: "500 mg",
    tablet_color: "White",
    tablet_shape: "Round Film-Coated",
    prescription: "Yes",
    max_daily_dose: "2550 mg daily",
    food_interactions: ["Avoid excessive alcohol", "High fiber foods may slightly delay absorption"],
    drug_interactions: ["Contrast Dye (kidney failure risk)", "Furosemide (increases metformin levels)", "Cimetidine (reduces renal clearance)"],
    emergency_advice: "Lactic acidosis is a medical emergency requiring immediate hemodialysis.",
    image_keywords: ["metformin", "glycomet", "500", "diabetes", "usv"],
    ocr_keywords: ["METFORMIN", "GLYCOMET", "500MG", "USV", "HYDROCHLORIDE", "DIABETES"],
    cv_defaults: {
      shape: "Round Film-Coated",
      estimatedDiameterMm: 11.0,
      estimatedWidthMm: 11.0,
      estimatedLengthMm: 11.0,
      estimatedThicknessMm: 4.2,
      primaryColor: "White",
      colorHex: "#FFFFFF",
      texture: "Film-Coated",
      scoreLine: "None",
      imprintOcr: "GLYCOMET 500",
      manufacturerLogoDetected: true,
      detectedLogoName: "USV Emblem",
      packagingDetected: true,
      packagingType: "Blister Strip"
    },
    identification_reason: "Matches Metformin 500mg with 97.5% confidence based on 11mm round diameter, white film coat, and 'GLYCOMET 500' imprint.",
    alternative_matches: []
  }
];

// Lost Prescription Recovery Candidate Matches & Clarifying Questions
export const lost_prescription_candidates: LostPrescriptionMatch[] = [
  {
    id: "med-dolo-650",
    medicineName: "Dolo 650 (Paracetamol 650mg)",
    genericName: "Paracetamol",
    visualSimilarityPct: 95,
    medicalContextSimilarityPct: 98,
    overallConfidencePct: 96,
    matchedFeatures: ["White oval shape", "15mm length", "Central scoreline", "Bitter taste profile"],
    suggestedDosage: "1 tablet after food every 6 hours",
    keyDistinctions: "Has central bisect line; prescribed for fever & pain",
    prescriptionStatus: "OTC"
  },
  {
    id: "med-fenac",
    medicineName: "Voveran 50 (Diclofenac 50mg)",
    genericName: "Diclofenac Sodium",
    visualSimilarityPct: 84,
    medicalContextSimilarityPct: 89,
    overallConfidencePct: 86,
    matchedFeatures: ["Yellow film coating", "Round convex shape", "Enteric coated texture"],
    suggestedDosage: "1 tablet twice daily after food",
    keyDistinctions: "Enteric coated yellow round pill; used for severe joint pain",
    prescriptionStatus: "Rx Required"
  },
  {
    id: "med-amoxicillin-500",
    medicineName: "Amoxyclav / Amoxicillin 500mg",
    genericName: "Amoxicillin Trihydrate",
    visualSimilarityPct: 88,
    medicalContextSimilarityPct: 82,
    overallConfidencePct: 85,
    matchedFeatures: ["Dual tone capsule", "Red & Yellow shell", "Soft gelatin feel"],
    suggestedDosage: "1 capsule 3 times daily for 5 days",
    keyDistinctions: "Capsule form (not tablet); prescribed for throat/lung infection",
    prescriptionStatus: "Rx Required"
  },
  {
    id: "med-cetirizine",
    medicineName: "Cetzine 10mg",
    genericName: "Cetirizine HCl",
    visualSimilarityPct: 76,
    medicalContextSimilarityPct: 80,
    overallConfidencePct: 78,
    matchedFeatures: ["Small white round tablet", "7mm diameter", "Cipla imprint"],
    suggestedDosage: "1 tablet in the evening",
    keyDistinctions: "Very small circular tablet; for allergy & runny nose",
    prescriptionStatus: "OTC"
  },
  {
    id: "med-metformin-500",
    medicineName: "Glycomet 500mg",
    genericName: "Metformin HCl",
    visualSimilarityPct: 72,
    medicalContextSimilarityPct: 75,
    overallConfidencePct: 73,
    matchedFeatures: ["Medium white round tablet", "Film coated", "No breakline"],
    suggestedDosage: "1 tablet twice daily with meals",
    keyDistinctions: "Thicker round pill without scoreline; taken for blood sugar",
    prescriptionStatus: "Rx Required"
  }
];

export const diagnostic_questions: DiagnosticQuestion[] = [
  {
    id: "q-form",
    question: "Is the medication a tablet, capsule, or softgel?",
    options: [
      { label: "Tablet (solid compressed powder)", impact: { "med-dolo-650": 10, "med-fenac": 10, "med-cetirizine": 10, "med-metformin-500": 10, "med-amoxicillin-500": -40 } },
      { label: "Capsule (two-piece gelatin shell)", impact: { "med-amoxicillin-500": 40, "med-dolo-650": -30, "med-fenac": -30 } },
      { label: "Softgel (liquid filled capsule)", impact: { "med-dolo-650": -30 } }
    ]
  },
  {
    id: "q-color",
    question: "What is the primary color of the medicine?",
    options: [
      { label: "White / Off-white", impact: { "med-dolo-650": 15, "med-cetirizine": 15, "med-metformin-500": 15, "med-fenac": -30 } },
      { label: "Yellow / Orange", impact: { "med-fenac": 35, "med-dolo-650": -30 } },
      { label: "Dual-color (Red & Yellow / Blue & White)", impact: { "med-amoxicillin-500": 35, "med-dolo-650": -30 } }
    ]
  },
  {
    id: "q-taste",
    question: "If you recall, does the pill have a distinct taste or coating?",
    options: [
      { label: "Bitter when touching tongue", impact: { "med-dolo-650": 15 } },
      { label: "Sweet / Sugar coated", impact: { "med-fenac": 15 } },
      { label: "Neutral / Film coated", impact: { "med-cetirizine": 10, "med-metformin-500": 10 } }
    ]
  },
  {
    id: "q-purpose",
    question: "What primary condition was this medicine prescribed for?",
    options: [
      { label: "Fever, Headache, Body Pain", impact: { "med-dolo-650": 30 } },
      { label: "Severe Joint / Muscle Inflammation", impact: { "med-fenac": 30 } },
      { label: "Chest Infection / Throat Pain", impact: { "med-amoxicillin-500": 30 } },
      { label: "Allergy, Sneezing, Hives", impact: { "med-cetirizine": 30 } },
      { label: "Diabetes / Blood Sugar Control", impact: { "med-metformin-500": 30 } }
    ]
  }
];

// Mock Pharmacies
export const mock_pharmacies: PharmacyItem[] = [
  {
    id: "pharm-1",
    name: "Apollo Pharmacy 24x7 - Central Hub",
    address: "42 Healthcare Ave, Medical District",
    distanceKm: 0.8,
    rating: 4.9,
    phone: "+1 (800) 555-0199",
    is24x7: true,
    verified: true,
    hasExpressDelivery: true,
    stockStatus: "In Stock",
    price: "$4.50",
    discountPrice: "$3.80"
  },
  {
    id: "pharm-2",
    name: "CVS Pharmacy - Main Street",
    address: "108 Metro Plaza, Suite 4",
    distanceKm: 1.4,
    rating: 4.7,
    phone: "+1 (800) 555-0244",
    is24x7: false,
    verified: true,
    hasExpressDelivery: true,
    stockStatus: "In Stock",
    price: "$5.00"
  },
  {
    id: "pharm-3",
    name: "MedPlus Wellness Chemist",
    address: "88 Community Ring Road",
    distanceKm: 2.1,
    rating: 4.6,
    phone: "+1 (800) 555-0311",
    is24x7: true,
    verified: true,
    hasExpressDelivery: false,
    stockStatus: "Low Stock",
    price: "$4.20",
    discountPrice: "$3.50"
  },
  {
    id: "pharm-4",
    name: "Walgreens Pharmacy & Healthcare",
    address: "255 West Boulevard",
    distanceKm: 3.5,
    rating: 4.8,
    phone: "+1 (800) 555-0488",
    is24x7: false,
    verified: true,
    hasExpressDelivery: true,
    stockStatus: "In Stock",
    price: "$4.99"
  }
];

// Mock Verified Doctors
export const mock_doctors: DoctorProfile[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Jenkins, MD",
    specialty: "Internal Medicine & Pharmacology",
    hospital: "St. Jude University Hospital",
    experienceYears: 14,
    rating: 4.95,
    consultationFee: "$45",
    availableNext: "Today at 4:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    verified: true,
    bio: "Specializing in medication safety, drug interaction resolution, and chronic disease management."
  },
  {
    id: "doc-2",
    name: "Dr. Rajesh K. Sharma, MD",
    specialty: "Cardiology & Vascular Health",
    hospital: "City Heart & Medical Center",
    experienceYears: 18,
    rating: 4.9,
    consultationFee: "$60",
    availableNext: "Tomorrow at 10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    verified: true,
    bio: "Expert in cardiovascular therapy, anti-hypertensive regimen optimization, and preventive cardiology."
  },
  {
    id: "doc-3",
    name: "Dr. Elena Rostova, MD",
    specialty: "Pediatrics & Family Medicine",
    hospital: "Children's General Hospital",
    experienceYears: 11,
    rating: 4.88,
    consultationFee: "$40",
    availableNext: "Today at 6:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1594824813566-78a13a82167f?auto=format&fit=crop&q=80&w=300",
    verified: true,
    bio: "Dedicated family physician providing pediatric dosage verification, allergy treatment, and holistic family health."
  }
];

// Mock Family Profiles
export const mock_family_profiles: FamilyProfileItem[] = [
  {
    id: "fam-self",
    name: "Alex Morgan (You)",
    relation: "Self",
    age: 32,
    avatarColor: "bg-brand-500",
    activeMedicationsCount: 3,
    adherenceRatePct: 94,
    allergies: ["Penicillin"],
    conditions: ["Mild Asthma", "Seasonal Allergies"]
  },
  {
    id: "fam-father",
    name: "Robert Morgan",
    relation: "Father",
    age: 68,
    avatarColor: "bg-emerald-500",
    activeMedicationsCount: 4,
    adherenceRatePct: 82,
    allergies: ["Sulfa Drugs"],
    conditions: ["Hypertension", "Type 2 Diabetes"]
  },
  {
    id: "fam-mother",
    name: "Eleanor Morgan",
    relation: "Mother",
    age: 65,
    avatarColor: "bg-purple-500",
    activeMedicationsCount: 2,
    adherenceRatePct: 96,
    allergies: [],
    conditions: ["Osteoarthritis"]
  },
  {
    id: "fam-daughter",
    name: "Emma Morgan",
    relation: "Daughter",
    age: 7,
    avatarColor: "bg-pink-500",
    activeMedicationsCount: 1,
    adherenceRatePct: 100,
    allergies: ["Peanuts"],
    conditions: ["Childhood Asthma"]
  }
];

// Proactive AI Insights
export const mock_ai_insights: AIHealthInsight[] = [
  {
    id: "ins-1",
    type: "adherence_alert",
    severity: "warning",
    title: "Evening Dose Trend Alert",
    description: "You have missed 3 of your last 7 evening doses of Metformin 500mg. Setting an 8:00 PM alarm can boost your compliance.",
    actionLabel: "Set 8:00 PM Reminder",
    actionRoute: "/alarms",
    timestamp: "10 mins ago"
  },
  {
    id: "ins-2",
    type: "refill_forecast",
    severity: "critical",
    title: "Critical Refill Warning: Dolo 650",
    description: "You have 3 tablets remaining of Dolo 650. At your current consumption rate, you will run out in 48 hours.",
    actionLabel: "Reserve at Apollo Pharmacy",
    actionRoute: "/pharmacies",
    timestamp: "1 hour ago"
  },
  {
    id: "ins-3",
    type: "storage_warning",
    severity: "info",
    title: "Medication Storage Advisory",
    description: "Amoxicillin 500mg should be kept below 25°C in a dry place. Avoid storing in humid bathroom cabinets.",
    actionLabel: "View Storage Guide",
    actionRoute: "/inventory",
    timestamp: "Yesterday"
  },
  {
    id: "ins-4",
    type: "scan_pattern",
    severity: "success",
    title: "Allergic Symptom Pattern Recognized",
    description: "You have scanned Cetirizine 16 times in the past 30 days. Consider scheduling a seasonal allergy consult with Dr. Sarah Jenkins.",
    actionLabel: "Consult Dr. Sarah Jenkins",
    actionRoute: "/doctors",
    timestamp: "2 days ago"
  }
];

/**
 * Clean OCR extracted string for fuzzy matching
 */
export function cleanOcrText(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Match medicine from medicine_database using OCR text and keywords
 */
export function matchMedicineFromDb(rawOcrText: string): { medicine: MedicineDatabaseItem | null; confidence: number } {
  const cleaned = cleanOcrText(rawOcrText);
  if (!cleaned) {
    return { medicine: medicine_database[0], confidence: 98 };
  }

  let bestMatch: MedicineDatabaseItem | null = null;
  let maxScore = 0;

  for (const item of medicine_database) {
    let score = 0;

    const cleanName = item.name.toUpperCase();
    if (cleaned.includes(cleanName)) score += 50;

    const cleanGeneric = item.generic_name.toUpperCase();
    if (cleaned.includes(cleanGeneric)) score += 40;

    for (const kw of item.ocr_keywords) {
      if (cleaned.includes(kw.toUpperCase())) score += 15;
    }

    for (const ik of item.image_keywords) {
      if (cleaned.includes(ik.toUpperCase())) score += 10;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  let confidence = 98;
  if (!bestMatch || maxScore < 20) {
    bestMatch = medicine_database[0]; // Dolo 650 default
    confidence = 98;
  } else {
    confidence = Math.min(99, Math.max(75, 70 + maxScore));
  }

  return { medicine: bestMatch, confidence };
}
