import React, { useState } from 'react';
import { mock_pharmacies } from '../../data/medicineDatabase';
import { PharmacyItem } from '../../types';
import {
  MapPin,
  Store,
  Phone,
  Clock,
  Truck,
  ShieldCheck,
  Star,
  CheckCircle2,
  Upload,
  Search,
  Check,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PharmacyFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyItem | null>(null);
  const [reservedSuccess, setReservedSuccess] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  const filteredPharmacies = mock_pharmacies.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReserve = (pharmacy: PharmacyItem) => {
    setSelectedPharmacy(pharmacy);
    const randomCode = 'MED-RES-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(randomCode);
    setReservedSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
            <Store className="w-3.5 h-3.5 text-amber-300" />
            <span>Verified Pharmacy Intelligence Network</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Nearby Verified Pharmacies & Stock Reservation
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Locate nearby pharmacies with real-time stock availability, compare prices, request express delivery, or reserve your medicine prior to visiting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-2xl gradient-bg-primary font-bold text-xs shadow-lg flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload Rx to Reserve All</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by pharmacy name, street, or zipcode..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Interactive Map & List Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Visualization Preview */}
        <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-500" /> Live Location Map
            </span>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              GPS Active
            </span>
          </div>

          <div className="w-full flex-1 min-h-[300px] rounded-2xl bg-slate-900 relative overflow-hidden border border-slate-700 flex items-center justify-center text-center p-4">
            {/* Mock Map Graphics */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            
            {/* Map Pins */}
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-500/30 border-2 border-brand-400 flex items-center justify-center animate-ping mx-auto"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-xl border border-white">
                📍 You Are Here
              </div>
              <p className="text-xs text-slate-400 font-semibold pt-12">
                4 Verified Pharmacies within 3.5 km radius
              </p>
            </div>
          </div>
        </div>

        {/* Pharmacy Cards Directory */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-700/80 hover:border-brand-500/40 transition-all space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {pharmacy.name}
                    </h3>
                    {pharmacy.verified && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Partner
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    {pharmacy.address} • <strong className="text-brand-500">{pharmacy.distanceKm} km away</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {pharmacy.discountPrice ? (
                      <>
                        <span className="text-emerald-600 dark:text-emerald-400">{pharmacy.discountPrice}</span>
                        <span className="text-xs text-slate-400 line-through ml-1.5">{pharmacy.price}</span>
                      </>
                    ) : (
                      pharmacy.price
                    )}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                    Unit Price
                  </span>
                </div>
              </div>

              {/* Status Chips */}
              <div className="flex items-center gap-3 flex-wrap text-xs">
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {pharmacy.rating} Rating
                </span>

                <span
                  className={`px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 ${
                    pharmacy.stockStatus === 'In Stock'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {pharmacy.stockStatus}
                </span>

                {pharmacy.is24x7 && (
                  <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 24x7 Open
                  </span>
                )}

                {pharmacy.hasExpressDelivery && (
                  <span className="px-3 py-1 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" /> Express Delivery (30 mins)
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <button
                  onClick={() => handleReserve(pharmacy)}
                  className="px-4 py-2 rounded-xl gradient-bg-primary font-bold text-xs shadow-md hover:scale-105 transition-transform"
                >
                  Reserve Medicine Now
                </button>
                <a
                  href={`tel:${pharmacy.phone}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-500" />
                  <span>Call Pharmacy</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Confirmation Modal */}
      {reservedSuccess && selectedPharmacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-3xl max-w-md w-full p-6 space-y-5 border border-emerald-500/40 shadow-2xl relative bg-white dark:bg-slate-900">
            <button
              onClick={() => setReservedSuccess(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Medicine Reserved Successfully!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Show this reservation code at {selectedPharmacy.name} within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center border border-dashed border-brand-500 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">
                Reservation Pass Code
              </span>
              <span className="text-2xl font-mono font-black text-brand-600 dark:text-brand-400">
                {reservationCode}
              </span>
            </div>

            <button
              onClick={() => setReservedSuccess(false)}
              className="w-full py-3 rounded-xl gradient-bg-emerald font-bold text-xs shadow-md"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
