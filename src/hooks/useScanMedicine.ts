import { useState } from 'react';
import { performOCR } from '../services/ocrService';
import { generateVerifiedMedicineExplanation } from '../services/geminiService';
import { decodeBarcodeFromImage } from '../services/barcodeService';
import { saveScanToStorage } from '../services/storageService';
import { OCRResult, AIExplanation, ScanHistoryItem, VerifiedMedicineData, ConfidenceScores } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export function useScanMedicine() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'idle' | 'barcode' | 'ocr' | 'database' | 'ai' | 'done' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [verifiedData, setVerifiedData] = useState<VerifiedMedicineData | null>(null);
  const [aiExplanation, setAiExplanation] = useState<AIExplanation | null>(null);
  const [confidenceScores, setConfidenceScores] = useState<ConfidenceScores | null>(null);
  const [currentScan, setCurrentScan] = useState<ScanHistoryItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scanImage = async (imageDataUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Barcode Scan Check (Highest Priority)
      setStep('barcode');
      setStatusMessage('Scanning image for barcode / QR code...');
      setProgress(15);
      const barcodeDetected = await decodeBarcodeFromImage(imageDataUrl);

      // Step 2: OCR Image Text Extraction
      setStep('ocr');
      setStatusMessage('Pre-processing image and extracting OCR text...');
      setProgress(40);

      const ocr = await performOCR(imageDataUrl, (status, prog) => {
        setStatusMessage(status);
        setProgress(Math.min(60, prog));
      });
      if (barcodeDetected) ocr.barcode = barcodeDetected;
      setOcrResult(ocr);

      // Step 3: Search Verified Official Medical Databases (OpenFDA -> DailyMed -> RxNorm)
      setStep('database');
      setStatusMessage('Querying official medical databases (OpenFDA, DailyMed, RxNorm)...');
      setProgress(75);

      // Step 4: Strict Non-Hallucinating Gemini Grounding
      setStep('ai');
      setStatusMessage('Formatting verified explanation via Gemini Pharmacist AI...');
      setProgress(90);

      const { explanation, verifiedData: verData, confidenceScores: scores } =
        await generateVerifiedMedicineExplanation(ocr.rawText, barcodeDetected || undefined, language);

      setVerifiedData(verData);
      setAiExplanation(explanation);
      setConfidenceScores(scores);

      // Step 5: Save Scan Record
      const scanItem: ScanHistoryItem = {
        id: 'scan-' + Date.now(),
        userId: user?.uid || 'guest',
        type: 'medicine',
        timestamp: new Date().toISOString(),
        imageUrl: imageDataUrl,
        ocrData: ocr,
        verifiedData: verData || undefined,
        aiExplanation: explanation,
        isFavorite: false,
        language,
        confidenceScores: scores,
      };

      await saveScanToStorage(scanItem);
      setCurrentScan(scanItem);

      setProgress(100);
      setStep('done');
      setStatusMessage('Verified analysis complete!');
    } catch (err: any) {
      console.error('Scan pipeline error:', err);
      setError(err.message || 'Failed to analyze medicine image. Please try again.');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setLoading(false);
    setStep('idle');
    setStatusMessage('');
    setProgress(0);
    setOcrResult(null);
    setVerifiedData(null);
    setAiExplanation(null);
    setConfidenceScores(null);
    setCurrentScan(null);
    setError(null);
  };

  return {
    loading,
    step,
    statusMessage,
    progress,
    ocrResult,
    verifiedData,
    aiExplanation,
    confidenceScores,
    currentScan,
    error,
    scanImage,
    resetScan,
  };
}
