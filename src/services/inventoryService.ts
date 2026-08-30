import { doc, setDoc, getDocs, collection, query, where, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { InventoryItem, DoseLog, RefillRecord, ShoppingListItem } from '../types';

const STORAGE_KEYS = {
  INVENTORY: 'mediscan_inventory',
  DOSE_LOGS: 'mediscan_dose_logs',
  REFILLS: 'mediscan_refills',
};

/**
 * Gets all inventory items for user
 */
export async function getInventoryItems(userId: string): Promise<InventoryItem[]> {
  let localItems = getLocalInventory();

  if (userId && userId !== 'guest') {
    try {
      const q = query(collection(db, 'users', userId, 'inventory'));
      const snap = await getDocs(q);
      const fsData: InventoryItem[] = [];
      snap.forEach((d) => fsData.push(d.data() as InventoryItem));
      if (fsData.length > 0) return fsData;
    } catch (e) {
      console.warn('Firestore inventory query fallback:', e);
    }
  }

  return localItems;
}

/**
 * Adds or updates an inventory item
 */
export async function saveInventoryItem(item: InventoryItem): Promise<void> {
  const local = getLocalInventory();
  const index = local.findIndex((i) => i.id === item.id);
  let updated: InventoryItem[];

  if (index >= 0) {
    updated = local.map((i) => (i.id === item.id ? item : i));
  } else {
    updated = [item, ...local];
  }

  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(updated));

  if (item.userId && item.userId !== 'guest') {
    try {
      const docRef = doc(db, 'users', item.userId, 'inventory', item.id);
      await setDoc(docRef, item, { merge: true });
    } catch (e) {
      console.warn('Firestore inventory write failed:', e);
    }
  }
}

/**
 * Deletes an inventory item
 */
export async function deleteInventoryItem(itemId: string, userId: string): Promise<void> {
  const local = getLocalInventory();
  const updated = local.filter((i) => i.id !== itemId);
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(updated));

  if (userId && userId !== 'guest') {
    try {
      await deleteDoc(doc(db, 'users', userId, 'inventory', itemId));
    } catch (e) {
      console.warn('Firestore inventory delete error:', e);
    }
  }
}

/**
 * LOG DOSE INTAKE
 * CRITICAL RULE: Quantity ONLY decreases if status === 'taken'!
 */
export async function logDoseIntake(
  inventoryId: string,
  userId: string,
  status: 'taken' | 'snoozed' | 'skipped'
): Promise<InventoryItem | null> {
  const items = getLocalInventory();
  const item = items.find((i) => i.id === inventoryId);
  if (!item) return null;

  const previousQty = item.currentQuantity;
  let newQty = previousQty;

  // ONLY reduce inventory if user pressed "Taken"
  if (status === 'taken') {
    newQty = Math.max(0, previousQty - item.dosePerIntake);
  }

  const updatedItem: InventoryItem = {
    ...item,
    currentQuantity: newQty,
  };

  await saveInventoryItem(updatedItem);

  // Save log entry
  const logEntry: DoseLog = {
    id: 'log-' + Date.now(),
    inventoryId,
    medicineName: item.medicineName,
    timestamp: new Date().toISOString(),
    doseAmount: item.dosePerIntake,
    status,
    previousQuantity: previousQty,
    newQuantity: newQty,
  };

  saveDoseLog(logEntry);
  return updatedItem;
}

/**
 * REFILL MEDICINE
 * User enters purchased quantity (e.g. Bought 30 Tablets -> 2 + 30 = 32)
 */
export async function refillMedicine(
  inventoryId: string,
  userId: string,
  purchasedQty: number
): Promise<InventoryItem | null> {
  const items = getLocalInventory();
  const item = items.find((i) => i.id === inventoryId);
  if (!item) return null;

  const previousQty = item.currentQuantity;
  const newQty = previousQty + purchasedQty;

  const updatedItem: InventoryItem = {
    ...item,
    currentQuantity: newQty,
    lastRefillDate: new Date().toISOString(),
  };

  await saveInventoryItem(updatedItem);

  // Save refill record
  const refillRec: RefillRecord = {
    id: 'refill-' + Date.now(),
    inventoryId,
    medicineName: item.medicineName,
    purchasedQuantity: purchasedQty,
    previousQuantity: previousQty,
    newQuantity: newQty,
    date: new Date().toISOString(),
  };

  saveRefillRecord(refillRec);
  return updatedItem;
}

/**
 * Smart Prediction: Estimate remaining days until stock runs out
 */
export function calculateDaysRemaining(item: InventoryItem): number {
  if (item.currentQuantity <= 0 || item.dosePerIntake <= 0) return 0;
  const dosesPerDay = item.timesPerDay || 2;
  const dailyConsumption = item.dosePerIntake * dosesPerDay;
  if (dailyConsumption <= 0) return 99;

  return Math.floor(item.currentQuantity / dailyConsumption);
}

/**
 * Generate Automated Shopping List sorted by urgency
 */
export function generateShoppingList(items: InventoryItem[]): ShoppingListItem[] {
  const list: ShoppingListItem[] = [];

  for (const item of items) {
    if (item.currentQuantity <= item.refillThreshold) {
      let urgency: 'critical' | 'low' | 'normal' = 'normal';
      if (item.currentQuantity <= 2) urgency = 'critical';
      else if (item.currentQuantity <= item.refillThreshold) urgency = 'low';

      list.push({
        id: 'shop-' + item.id,
        inventoryId: item.id,
        medicineName: item.medicineName + ' (' + item.strength + ')',
        remainingTablets: item.currentQuantity,
        urgency,
        purchased: false,
      });
    }
  }

  // Sort: Critical first, then Low
  return list.sort((a, b) => {
    if (a.urgency === 'critical') return -1;
    if (b.urgency === 'critical') return 1;
    return 0;
  });
}

/**
 * Helper to get local inventory array
 */
function getLocalInventory(): InventoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return raw ? JSON.parse(raw) : getInitialMockInventory();
  } catch (e) {
    return getInitialMockInventory();
  }
}

function saveDoseLog(log: DoseLog): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOSE_LOGS);
    const existing: DoseLog[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(STORAGE_KEYS.DOSE_LOGS, JSON.stringify([log, ...existing]));
  } catch (e) {
    console.error(e);
  }
}

export function getDoseLogs(): DoseLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOSE_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRefillRecord(refill: RefillRecord): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFILLS);
    const existing: RefillRecord[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(STORAGE_KEYS.REFILLS, JSON.stringify([refill, ...existing]));
  } catch (e) {
    console.error(e);
  }
}

function getInitialMockInventory(): InventoryItem[] {
  return [
    {
      id: 'inv-1',
      userId: 'guest',
      medicineName: 'Dolo 650',
      brand: 'Dolo',
      strength: '650mg',
      medicineType: 'Tablet',
      initialQuantity: 18,
      currentQuantity: 14,
      dosePerIntake: 1,
      frequency: 'Twice Daily',
      timesPerDay: 2,
      reminderTimes: ['08:00', '20:00'],
      startDate: new Date().toISOString(),
      expiryDate: '2028-06-30',
      refillThreshold: 5,
    },
    {
      id: 'inv-2',
      userId: 'guest',
      medicineName: 'Pantoprazole 40mg',
      brand: 'Pan 40',
      strength: '40mg',
      medicineType: 'Tablet',
      initialQuantity: 10,
      currentQuantity: 3,
      dosePerIntake: 1,
      frequency: 'Once Daily',
      timesPerDay: 1,
      reminderTimes: ['07:30'],
      startDate: new Date().toISOString(),
      expiryDate: '2027-12-15',
      refillThreshold: 5,
    },
    {
      id: 'inv-3',
      userId: 'guest',
      medicineName: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      strength: '500mg',
      medicineType: 'Capsule',
      initialQuantity: 21,
      currentQuantity: 1,
      dosePerIntake: 1,
      frequency: 'Three Times Daily',
      timesPerDay: 3,
      reminderTimes: ['08:00', '14:00', '20:00'],
      startDate: new Date().toISOString(),
      expiryDate: '2027-08-10',
      refillThreshold: 4,
    },
  ];
}
