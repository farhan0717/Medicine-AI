import React, { useState, useEffect } from 'react';
import {
  Pill,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  ShoppingBag,
  TrendingDown,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { InventoryItem, DoseLog, ShoppingListItem, MedicineFormType } from '../../types';
import {
  getInventoryItems,
  saveInventoryItem,
  deleteInventoryItem,
  logDoseIntake,
  refillMedicine,
  calculateDaysRemaining,
  generateShoppingList,
  getDoseLogs,
} from '../../services/inventoryService';
import { useAuth } from '../../contexts/AuthContext';
import { Modal } from '../common/Modal';

export const InventoryManager: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [logs, setLogs] = useState<DoseLog[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [refillTarget, setRefillTarget] = useState<InventoryItem | null>(null);
  const [refillAmount, setRefillAmount] = useState(30);

  // New Item Form
  const [medName, setMedName] = useState('');
  const [brand, setBrand] = useState('');
  const [strength, setStrength] = useState('500mg');
  const [medType, setMedType] = useState<MedicineFormType>('Tablet');
  const [initialQty, setInitialQty] = useState(18);
  const [dosePerIntake, setDosePerIntake] = useState(1);
  const [dailyDose, setDailyDose] = useState('2 tablets per day');
  const [alarmTimesInput, setAlarmTimesInput] = useState('09:00, 21:00');
  const [frequency, setFrequency] = useState<'Once Daily' | 'Twice Daily' | 'Three Times Daily' | 'As Needed'>('Twice Daily');
  const [timesPerDay, setTimesPerDay] = useState(2);
  const [refillThreshold, setRefillThreshold] = useState(5);
  const [expiryDate, setExpiryDate] = useState('2028-12-31');

  useEffect(() => {
    loadInventory();
  }, [user]);

  const loadInventory = async () => {
    const data = await getInventoryItems(user?.uid || 'guest');
    setItems(data);

    const doseLogList = getDoseLogs();
    setLogs(doseLogList);

    const shopList = generateShoppingList(data);
    setShoppingList(shopList);
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim()) return;

    const alarmTimes = alarmTimesInput.split(',').map((t) => t.trim()).filter(Boolean);

    const newItem: InventoryItem = {
      id: 'inv-' + Date.now(),
      userId: user?.uid || 'guest',
      medicineName: medName.trim(),
      brand: brand.trim() || medName.trim(),
      strength,
      medicineType: medType,
      initialQuantity: initialQty,
      currentQuantity: initialQty, // Remaining Tablets = Total Tablets initially
      dosePerIntake,
      frequency,
      timesPerDay: alarmTimes.length || timesPerDay,
      reminderTimes: alarmTimes.length ? alarmTimes : ['09:00', '21:00'],
      startDate: new Date().toISOString(),
      expiryDate,
      refillThreshold: 5, // Alert when < 5
    };

    await saveInventoryItem(newItem);
    setAddModalOpen(false);
    resetForm();
    loadInventory();
  };

  const resetForm = () => {
    setMedName('');
    setBrand('');
    setStrength('500mg');
    setInitialQty(18);
    setDosePerIntake(1);
    setDailyDose('2 tablets per day');
    setAlarmTimesInput('09:00, 21:00');
  };

  // DOSE INTAKE ACTION HANDLERS
  // RULE: Quantity ONLY decreases when pressing "Taken"!
  const handleDoseAction = async (inventoryId: string, status: 'taken' | 'snoozed' | 'skipped') => {
    await logDoseIntake(inventoryId, user?.uid || 'guest', status);
    loadInventory();
  };

  const handleRefillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refillTarget || refillAmount <= 0) return;

    await refillMedicine(refillTarget.id, user?.uid || 'guest', refillAmount);
    setRefillTarget(null);
    loadInventory();
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Delete this medicine from your inventory?')) {
      await deleteInventoryItem(id, user?.uid || 'guest');
      loadInventory();
    }
  };

  // Calculate Dashboard Summary Metrics
  const totalActiveMeds = items.length;
  const runningLowCount = items.filter((i) => i.currentQuantity > 0 && i.currentQuantity <= i.refillThreshold).length;
  const outOfStockCount = items.filter((i) => i.currentQuantity === 0).length;
  const totalTablets = items.reduce((acc, i) => acc + i.currentQuantity, 0);

  const takenLogsCount = logs.filter((l) => l.status === 'taken').length;
  const totalLogsCount = logs.length;
  const complianceRate = totalLogsCount > 0 ? Math.round((takenLogsCount / totalLogsCount) * 100) : 94;

  const getStockStatusBadge = (item: InventoryItem) => {
    if (item.currentQuantity === 0) {
      return (
        <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
          ⬛ Out of Stock
        </span>
      );
    }
    if (item.currentQuantity <= 2) {
      return (
        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-extrabold uppercase tracking-wider animate-pulse flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Critical Stock
        </span>
      );
    }
    if (item.currentQuantity <= item.refillThreshold) {
      return (
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
          🟠 Low Stock Warning
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
        🟢 Normal Stock
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Pill className="w-3.5 h-3.5" />
            <span>Apple Health Style Inventory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Smart Medicine Inventory
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Track tablet counts, log intake doses, set refill thresholds, and view auto-generated shopping lists.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="gradient-bg-primary px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Medicine</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Active Meds</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalActiveMeds}</div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Remaining Doses</span>
          <div className="text-2xl font-extrabold text-brand-500">{totalTablets}</div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Running Low</span>
          <div className="text-2xl font-extrabold text-amber-500">{runningLowCount}</div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 space-y-2">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Out of Stock</span>
          <div className="text-2xl font-extrabold text-red-500">{outOfStockCount}</div>
        </div>

        <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-slate-700/60 space-y-2 col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Compliance Rate</span>
          <div className="text-2xl font-extrabold text-emerald-500">{complianceRate}%</div>
        </div>
      </div>

      {/* Main Inventory Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Medicine Stock Cards ({items.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const daysLeft = calculateDaysRemaining(item);
            const progressPct = Math.min(100, Math.round((item.currentQuantity / item.initialQuantity) * 100));

            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-6 border border-white/60 dark:border-slate-700/60 space-y-5 glass-card-hover flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Title & Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {item.medicineName}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {item.strength} • {item.medicineType}
                      </p>
                    </div>
                    {getStockStatusBadge(item)}
                  </div>

                  {/* Low Stock Alert Warning (< 5 Tablets) */}
                  {item.currentQuantity > 0 && item.currentQuantity < 5 && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>⚠ Only {item.currentQuantity} tablets remaining. Consider buying this medicine.</span>
                    </div>
                  )}

                  {/* Stock Visual Progress Bar */}
                  <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                    <div className="flex justify-between items-baseline text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Remaining Quantity:</span>
                      <span className="text-brand-500 font-extrabold text-sm">
                        {item.currentQuantity} / {item.initialQuantity} {item.medicineType}s
                      </span>
                    </div>

                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.currentQuantity <= 2
                            ? 'bg-red-500 shadow-glow'
                            : item.currentQuantity <= item.refillThreshold
                            ? 'bg-amber-500'
                            : 'bg-emeraldBrand-500 shadow-emeraldGlow'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                      <span>Dose: {item.dosePerIntake} {item.medicineType} ({item.frequency})</span>
                      <span className="font-semibold text-purple-500">
                        ~{daysLeft} days remaining
                      </span>
                    </div>
                  </div>
                </div>

                {/* Intake Actions & Refill Control */}
                <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Log Intake Action
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleDoseAction(item.id, 'taken')}
                      disabled={item.currentQuantity <= 0}
                      className="py-2 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all disabled:opacity-30"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Taken</span>
                    </button>

                    <button
                      onClick={() => handleDoseAction(item.id, 'snoozed')}
                      className="py-2 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Snooze</span>
                    </button>

                    <button
                      onClick={() => handleDoseAction(item.id, 'skipped')}
                      className="py-2 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Skip</span>
                    </button>
                  </div>

                  {/* Refill & Delete Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setRefillTarget(item)}
                      className="px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center gap-1 hover:bg-brand-500/20 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refill Medicine</span>
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automated Shopping List */}
      {shoppingList.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Automated Pharmacy Shopping List ({shoppingList.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {shoppingList.map((shop, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-2 ${
                  shop.urgency === 'critical'
                    ? 'bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{shop.medicineName}</h4>
                  <p className="text-[11px] opacity-80">
                    Only {shop.remainingTablets} doses left • {shop.urgency === 'critical' ? '🔴 Critical' : '🟠 Low Stock'}
                  </p>
                </div>
                <button
                  onClick={() => setRefillTarget(items.find((i) => i.id === shop.inventoryId) || null)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white shadow-sm"
                >
                  Refill
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Medicine to Inventory">
        <form onSubmit={handleCreateItem} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dolo 650"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Strength
              </label>
              <input
                type="text"
                required
                placeholder="650mg"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Form Type
              </label>
              <select
                value={medType}
                onChange={(e) => setMedType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none font-semibold"
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Drops">Drops</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Total Tablets
              </label>
              <input
                type="number"
                min="1"
                value={initialQty}
                onChange={(e) => setInitialQty(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Dose Intake
              </label>
              <input
                type="number"
                min="1"
                value={dosePerIntake}
                onChange={(e) => setDosePerIntake(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Low Threshold
              </label>
              <input
                type="number"
                min="1"
                value={refillThreshold}
                onChange={(e) => setRefillThreshold(parseInt(e.target.value) || 5)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full gradient-bg-primary py-3 rounded-2xl text-xs font-bold shadow-lg"
          >
            Save to Smart Inventory
          </button>
        </form>
      </Modal>

      {/* Refill Modal */}
      {refillTarget && (
        <Modal
          isOpen={!!refillTarget}
          onClose={() => setRefillTarget(null)}
          title={`Refill Stock: ${refillTarget.medicineName}`}
        >
          <form onSubmit={handleRefillSubmit} className="space-y-4">
            <p className="text-xs text-slate-500">
              Current Stock: <strong>{refillTarget.currentQuantity}</strong> {refillTarget.medicineType}s.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Purchased Quantity to Add
              </label>
              <input
                type="number"
                min="1"
                value={refillAmount}
                onChange={(e) => setRefillAmount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs outline-none font-bold text-brand-500 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-bg-primary py-3 rounded-2xl text-xs font-bold shadow-lg"
            >
              Confirm Refill ({refillTarget.currentQuantity} + {refillAmount} = {refillTarget.currentQuantity + refillAmount})
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
