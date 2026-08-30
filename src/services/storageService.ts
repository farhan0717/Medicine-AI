import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { ScanHistoryItem, Reminder, ChatMessage } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'mediscan_history',
  FAVORITES: 'mediscan_favorites',
  REMINDERS: 'mediscan_reminders',
  CHAT: 'mediscan_chat_history',
};

/**
 * Saves a new scan result to Firestore & LocalStorage
 */
export async function saveScanToStorage(scan: ScanHistoryItem): Promise<void> {
  // 1. LocalStorage save
  try {
    const existing = getLocalHistory();
    const updated = [scan, ...existing.filter((s) => s.id !== scan.id)];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }

  // 2. Firestore save if user is logged in
  if (scan.userId && scan.userId !== 'guest') {
    try {
      const docRef = doc(db, 'medicineHistory', scan.id);
      await setDoc(docRef, scan);
    } catch (e) {
      console.warn('Firestore write failed, stored in LocalStorage:', e);
    }
  }
}

/**
 * Gets all saved scan history items
 */
export async function getScanHistory(userId: string): Promise<ScanHistoryItem[]> {
  let localData = getLocalHistory();

  if (userId && userId !== 'guest') {
    try {
      const q = query(
        collection(db, 'medicineHistory'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      const firestoreData: ScanHistoryItem[] = [];
      snapshot.forEach((doc) => {
        firestoreData.push(doc.data() as ScanHistoryItem);
      });
      if (firestoreData.length > 0) {
        return firestoreData;
      }
    } catch (e) {
      console.warn('Firestore query fell back to LocalStorage:', e);
    }
  }

  return localData;
}

/**
 * Deletes a scan from storage
 */
export async function deleteScanFromStorage(scanId: string, userId: string): Promise<void> {
  const local = getLocalHistory();
  const filtered = local.filter((s) => s.id !== scanId);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));

  if (userId && userId !== 'guest') {
    try {
      await deleteDoc(doc(db, 'medicineHistory', scanId));
    } catch (e) {
      console.warn('Firestore delete error:', e);
    }
  }
}

/**
 * Toggles favorite bookmark status
 */
export async function toggleFavoriteScan(scanId: string, userId: string): Promise<boolean> {
  const local = getLocalHistory();
  let updatedFavState = false;

  const updated = local.map((s) => {
    if (s.id === scanId) {
      updatedFavState = !s.isFavorite;
      return { ...s, isFavorite: updatedFavState };
    }
    return s;
  });

  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

  if (userId && userId !== 'guest') {
    try {
      const docRef = doc(db, 'medicineHistory', scanId);
      await setDoc(docRef, { isFavorite: updatedFavState }, { merge: true });
    } catch (e) {
      console.warn('Firestore toggle favorite error:', e);
    }
  }

  return updatedFavState;
}

/**
 * Helper to retrieve local history
 */
function getLocalHistory(): ScanHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : getInitialMockHistory();
  } catch (e) {
    return getInitialMockHistory();
  }
}

/**
 * Reminders storage helper
 */
export function getReminders(): Reminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return raw ? JSON.parse(raw) : [
      { id: 'rem-1', medicineName: 'Amoxicillin 500mg', dosage: '1 Capsule', time: '08:00', frequency: 'Daily', active: true },
      { id: 'rem-2', medicineName: 'Pantoprazole 40mg', dosage: '1 Tablet', time: '07:30', frequency: 'Daily', active: true },
    ];
  } catch (e) {
    return [];
  }
}

export function saveReminders(reminders: Reminder[]): void {
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
}

/**
 * Pre-populates clean mock history for realistic initial user state
 */
function getInitialMockHistory(): ScanHistoryItem[] {
  return [
    {
      id: 'mock-1',
      userId: 'guest',
      type: 'medicine',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      isFavorite: true,
      language: 'en',
      ocrData: {
        rawText: 'Amoxicillin 500mg Capsules',
        medicineName: 'Amoxicillin 500mg',
        brand: 'Amoxil',
        genericName: 'Amoxicillin Trihydrate',
        strength: '500 mg',
        manufacturer: 'Pfizer Inc.',
        expiryDate: '12/2027',
        batchNumber: 'B94821',
        dosage: '1 capsule 3 times daily',
        confidence: 94,
      },
      aiExplanation: {
        medicineName: 'Amoxicillin 500 mg',
        genericName: 'Amoxicillin Trihydrate',
        purpose: 'Broad-spectrum antibiotic for bacterial respiratory & throat infections.',
        howItWorks: 'Prevents bacterial cell wall synthesis, destroying infection-causing bacteria.',
        uses: ['Bacterial respiratory infections', 'Strep throat', 'Ear infections'],
        dosage: {
          beforeFood: 'Can be taken before or after meals.',
          afterFood: 'Taking after food reduces stomach discomfort.',
          timing: 'Every 8 hours (3 times daily).',
          general: 'Complete full 7-day course.',
        },
        sideEffects: {
          common: ['Mild nausea', 'Diarrhea', 'Skin rash'],
          serious: ['Anaphylaxis allergic reaction', 'Severe colitis'],
        },
        safetyWarnings: {
          pregnancy: 'FDA Category B - safe when prescribed.',
          breastfeeding: 'Safe in small quantities.',
          alcohol: 'Avoid alcohol during infection recovery.',
          driving: 'No impact on driving.',
          kidneyDisease: 'Dose adjustment required for low GFR.',
          liverDisease: 'Use with caution.',
        },
        storage: 'Store below 25°C away from direct sunlight.',
        missedDose: 'Take as soon as remembered. Never double dose.',
        overdose: 'Seek immediate emergency medical attention.',
        warnings: ['Complete full antibiotic course.'],
        emergencyAdvice: 'Call emergency services if experiencing difficulty breathing.',
        doctorRecommendation: 'Inform physician of penicillin allergies.',
        simpleSummary: 'Amoxicillin 500mg treats bacterial infections. Take every 8 hours after meals.',
        priceCategory: 'Low-cost Generic',
        isVerified: true,
        databaseSource: 'OpenFDA',
      },
    },
    {
      id: 'mock-2',
      userId: 'guest',
      type: 'medicine',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951baa74c?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      language: 'en',
      ocrData: {
        rawText: 'Pantoprazole 40mg Gastro-resistant Tablets',
        medicineName: 'Pantoprazole 40mg',
        brand: 'Pan 40',
        genericName: 'Pantoprazole Sodium',
        strength: '40 mg',
        manufacturer: 'Alkem Laboratories',
        expiryDate: '08/2028',
        batchNumber: 'P88321',
        dosage: '1 tablet daily before breakfast',
        confidence: 96,
      },
    },
  ];
}
