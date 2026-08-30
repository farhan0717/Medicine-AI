import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, Clipboard, QrCode, Barcode } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string) => void;
  onOpenCamera: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onOpenCamera }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            handleFile(new File([blob], 'pasted-image.png', { type }));
            return;
          }
        }
      }
      alert('No image found in clipboard.');
    } catch (err) {
      alert('Paste shortcut requires browser permission.');
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Dropzone Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full min-h-[260px] rounded-3xl border-2 border-dashed p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          dragOver
            ? 'border-brand-500 bg-brand-500/10 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-brand-400 hover:bg-brand-500/5'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-500 to-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/25 mb-4 group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8" />
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Upload Medicine Image or Barcode
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mb-4">
          Supports Medicine Strips, Syrup Bottles, Prescription Sheets, and QR / Barcodes (UPC, EAN, GTIN).
        </p>

        <span className="px-5 py-2 rounded-xl gradient-bg-primary text-xs font-bold shadow-md">
          Browse Device Files
        </span>
      </div>

      {/* Alternative Input Options: Camera & Paste & Barcode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onOpenCamera}
          className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-700 hover:border-brand-500 flex items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all"
        >
          <Camera className="w-4 h-4 text-brand-500" />
          <span>Live Camera & Barcode Scan</span>
        </button>

        <button
          onClick={handlePaste}
          className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-700 hover:border-brand-500 flex items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all"
        >
          <Clipboard className="w-4 h-4 text-emeraldBrand-500" />
          <span>Paste Image from Clipboard</span>
        </button>
      </div>

      {/* Instant Demo Presets for Dolo 650 & Popular Medicines */}
      <div className="pt-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          ⚡ Instant Demo Scan Presets (Click to Test):
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              // Create SVG canvas data url representing Dolo 650 strip
              const canvas = document.createElement('canvas');
              canvas.width = 600;
              canvas.height = 350;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#0ea5e9';
                ctx.fillRect(0, 0, 600, 350);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 36px sans-serif';
                ctx.fillText('DOLO 650', 50, 100);
                ctx.font = '24px sans-serif';
                ctx.fillText('Paracetamol Tablets IP 650 mg', 50, 150);
                ctx.fillText('Micro Labs Limited', 50, 200);
                ctx.fillText('Batch: DL8922 | EXP: 12/2027', 50, 250);
                onImageSelected(canvas.toDataURL('image/png'));
              }
            }}
            className="px-4 py-2 rounded-2xl bg-brand-500/10 hover:bg-brand-500 hover:text-white text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-500/30 transition-all flex items-center gap-1.5"
          >
            <span>💊 Dolo 650 Strip Scan</span>
          </button>

          <button
            onClick={() => {
              const canvas = document.createElement('canvas');
              canvas.width = 600;
              canvas.height = 350;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#10b981';
                ctx.fillRect(0, 0, 600, 350);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 36px sans-serif';
                ctx.fillText('AMOXICILLIN 500', 50, 100);
                ctx.font = '24px sans-serif';
                ctx.fillText('Amoxicillin Trihydrate 500mg', 50, 150);
                ctx.fillText('Antibiotic Capsules IP', 50, 200);
                onImageSelected(canvas.toDataURL('image/png'));
              }
            }}
            className="px-4 py-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-all flex items-center gap-1.5"
          >
            <span>🌿 Amoxicillin 500mg Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
